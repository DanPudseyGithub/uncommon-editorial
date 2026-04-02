const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sass = require('sass');

const blocksDir  = path.join(__dirname, 'blocks');
const scssDir    = path.join(__dirname, 'assets/scss');
const cssDir     = path.join(__dirname, 'assets/css');
const sassOptions = { loadPaths: [scssDir] };

// Compile all SCSS files from assets/scss into assets/css
if (fs.existsSync(scssDir)) {
    fs.readdirSync(scssDir)
        .filter((file) => path.extname(file) === '.scss')
        .forEach((file) => {
            const input  = path.join(scssDir, file);
            const output = path.join(cssDir, file.replace('.scss', '.css'));
            console.log(`Compiling SCSS: assets/scss/${file} → assets/css/${file.replace('.scss', '.css')}`);
            const result = sass.compile(input, sassOptions);
            fs.writeFileSync(output, result.css);
        });
}

fs.readdirSync(blocksDir).forEach((blockName) => {
    const blockPath = path.join(blocksDir, blockName);
    if (!fs.statSync(blockPath).isDirectory()) return;

    const jsPath    = path.join(blockPath, 'src', 'scripts');
    const scssPath  = path.join(blockPath, 'src', 'styles');
    const buildPath = path.join(blockPath, 'build');

    // Build JS
    if (fs.existsSync(jsPath)) {
        const jsFiles = fs.readdirSync(jsPath).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
        if (jsFiles.length > 0) {
            console.log(`Building JS:   ${blockName}`);
            if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

            const relInputs    = jsFiles.map((f) => `"${path.relative(__dirname, path.join(jsPath, f))}"`).join(' ');
            const relBuildPath = path.relative(__dirname, buildPath);

            execSync(`npx wp-scripts build ${relInputs} --output-path="${relBuildPath}"`, { stdio: 'inherit' });
        }
    }

    // Compile SCSS from src/scss/ → build/
    if (fs.existsSync(scssPath)) {
        fs.readdirSync(scssPath)
            .filter((file) => path.extname(file) === '.scss')
            .forEach((file) => {
                const input  = path.join(scssPath, file);
                const output = path.join(buildPath, file.replace('.scss', '.css'));
                console.log(`Compiling SCSS: ${blockName}/src/styles/${file} → build/${file.replace('.scss', '.css')}`);
                if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);
                const result = sass.compile(input, sassOptions);
                fs.writeFileSync(output, result.css);
            });
    }
});
