const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sass = require('sass');

const blocksDir = path.join(__dirname, 'blocks');

// Debounce map — prevents multiple rapid saves triggering duplicate builds
const timers = {};
const debounce = (key, fn, delay = 150) => {
    clearTimeout(timers[key]);
    timers[key] = setTimeout(fn, delay);
};

const buildJs = (blockName, blockPath) => {
    const indexJs = path.join(blockPath, 'index.js');
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

const buildScss = (scssPath) => {
    const cssPath = scssPath.replace(/\.scss$/, '.css');
    const label   = path.relative(__dirname, scssPath);

    console.log(`[SCSS] Compiling ${label}...`);
    try {
        const result = sass.compile(scssPath);
        fs.writeFileSync(cssPath, result.css);
        console.log(`[SCSS] Done → ${path.basename(cssPath)}`);
    } catch (err) {
        console.error(`[SCSS] Error in ${label}:\n       ${err.message}`);
    }
};

const scssDir = path.join(__dirname, 'assets/scss');
const cssDir  = path.join(__dirname, 'assets/css');

// Override buildScss for assets — output goes to assets/css, not alongside the source
const buildAssetScss = (scssPath) => {
    const filename = path.basename(scssPath).replace(/\.scss$/, '.css');
    const cssPath  = path.join(cssDir, filename);
    const label    = path.relative(__dirname, scssPath);

    console.log(`[SCSS] Compiling ${label}...`);
    try {
        const result = sass.compile(scssPath);
        fs.writeFileSync(cssPath, result.css);
        console.log(`[SCSS] Done → assets/css/${filename}`);
    } catch (err) {
        console.error(`[SCSS] Error in ${label}:\n       ${err.message}`);
    }
};

console.log('Watching blocks and assets for changes...\n');

// Watch assets/scss for changes
if (fs.existsSync(scssDir)) {
    console.log('  · assets/scss');
    fs.watch(scssDir, (_, filename) => {
        if (!filename || path.extname(filename) !== '.scss') return;
        const fullPath = path.join(scssDir, filename);
        debounce(fullPath, () => {
            if (fs.existsSync(fullPath)) buildAssetScss(fullPath);
        });
    });
}

fs.readdirSync(blocksDir).forEach((blockName) => {
    const blockPath = path.join(blocksDir, blockName);
    if (!fs.statSync(blockPath).isDirectory()) return;

    console.log(`  · ${blockName}`);

    fs.watch(blockPath, { recursive: true }, (_, filename) => {
        if (!filename) return;

        // Ignore compiled output
        if (filename.startsWith('build')) return;

        const fullPath = path.join(blockPath, filename);
        const ext      = path.extname(filename);

        if (ext === '.scss') {
            debounce(fullPath, () => {
                if (fs.existsSync(fullPath)) buildScss(fullPath);
            });
        } else if (ext === '.js') {
            debounce(blockPath, () => buildJs(blockName, blockPath));
        }
    });
});

console.log('\nReady. Ctrl+C to stop.\n');
