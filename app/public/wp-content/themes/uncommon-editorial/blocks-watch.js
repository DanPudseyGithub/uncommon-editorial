const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const browserSync = require('browser-sync').create();

const blocksDir   = path.join(__dirname, 'blocks');
const scssDir     = path.join(__dirname, 'assets/scss');
const cssDir      = path.join(__dirname, 'assets/css');
const sassOptions = { loadPaths: [scssDir] };

// Change this to match your Local site URL
const PROXY_URL = 'localhost:10005';

browserSync.init({
    proxy: PROXY_URL,
    injectChanges: false,
    open: false,
    notify: false,
});

// Debounce map — prevents multiple rapid saves triggering duplicate builds
const timers = {};
const debounce = (key, fn, delay = 150) => {
    clearTimeout(timers[key]);
    timers[key] = setTimeout(fn, delay);
};

const buildJs = (blockName, blockPath) => {
    const jsPath  = path.join(blockPath, 'src', 'scripts');
    const indexJs = path.join(jsPath, 'index.js');
    if (!fs.existsSync(indexJs)) return;

    const buildPath = path.join(blockPath, 'build');
    if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

    const relInput  = path.relative(__dirname, indexJs);
    const relOutput = path.relative(__dirname, buildPath);

    console.log(`[JS]   Building ${blockName}...`);
    try {
        execSync(`npx wp-scripts build "${relInput}" --output-path="${relOutput}"`, { stdio: 'inherit' });
    } catch {
        console.error(`[JS]   Build failed: ${blockName}`);
    }
};

const buildBlockScss = (blockName, blockPath, scssFile) => {
    const buildPath = path.join(blockPath, 'build');
    if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

    const cssFile = path.basename(scssFile).replace(/\.scss$/, '.css');
    const cssPath = path.join(buildPath, cssFile);
    const label   = `${blockName}/src/styles/${path.basename(scssFile)}`;

    console.log(`[SCSS] Compiling ${label}...`);
    try {
        const result = sass.compile(scssFile, sassOptions);
        fs.writeFileSync(cssPath, result.css);
        console.log(`[SCSS] Done → ${blockName}/build/${cssFile}`);
        browserSync.reload();
    } catch (err) {
        console.error(`[SCSS] Error in ${label}:\n       ${err.message}`);
    }
};

const buildAssetScss = (scssPath) => {
    const filename = path.basename(scssPath).replace(/\.scss$/, '.css');
    const cssPath  = path.join(cssDir, filename);
    const label    = path.relative(__dirname, scssPath);

    console.log(`[SCSS] Compiling ${label}...`);
    try {
        const result = sass.compile(scssPath, sassOptions);
        fs.writeFileSync(cssPath, result.css);
        console.log(`[SCSS] Done → assets/css/${filename}`);
        browserSync.reload();
    } catch (err) {
        console.error(`[SCSS] Error in ${label}:\n       ${err.message}`);
    }
};

// Compile all non-partial entry-point scss files in assets/scss root
const buildAllAssetScss = () => {
    fs.readdirSync(scssDir)
        .filter((f) => f.endsWith('.scss') && !f.startsWith('_'))
        .forEach((f) => buildAssetScss(path.join(scssDir, f)));
};

console.log('Watching blocks and assets for changes...\n');

// Watch assets/scss recursively so subdirectory changes (type/, variables/) are caught.
// Any change in the tree rebuilds all entry points.
if (fs.existsSync(scssDir)) {
    console.log('  · assets/scss');
    fs.watch(scssDir, { recursive: true }, (_, filename) => {
        if (!filename || path.extname(filename) !== '.scss') return;
        debounce('asset-scss', buildAllAssetScss);
    });
}

fs.readdirSync(blocksDir).forEach((blockName) => {
    const blockPath = path.join(blocksDir, blockName);
    if (!fs.statSync(blockPath).isDirectory()) return;

    const jsPath   = path.join(blockPath, 'src', 'scripts');
    const scssPath = path.join(blockPath, 'src', 'styles');

    if (!fs.existsSync(jsPath) && !fs.existsSync(scssPath)) return;

    console.log(`  · ${blockName}`);

    if (fs.existsSync(jsPath)) {
        fs.watch(jsPath, (_, filename) => {
            if (!filename || path.extname(filename) !== '.js') return;
            debounce(jsPath, () => buildJs(blockName, blockPath));
        });
    }

    if (fs.existsSync(scssPath)) {
        fs.watch(scssPath, (_, filename) => {
            if (!filename || path.extname(filename) !== '.scss') return;
            const fullPath = path.join(scssPath, filename);
            debounce(fullPath, () => {
                if (fs.existsSync(fullPath)) buildBlockScss(blockName, blockPath, fullPath);
            });
        });
    }
});

console.log('\nReady. Ctrl+C to stop.\n');
