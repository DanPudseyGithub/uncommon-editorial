const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sass = require('sass');

const blocksDir = path.join(__dirname, 'blocks');
const scssDir = path.join(__dirname, 'assets/scss');
const cssDir  = path.join(__dirname, 'assets/css');

// Compile all SCSS files from assets/scss into assets/css
if (fs.existsSync(scssDir)) {
    fs.readdirSync(scssDir)
        .filter((file) => path.extname(file) === '.scss')
        .forEach((file) => {
            const input  = path.join(scssDir, file);
            const output = path.join(cssDir, file.replace('.scss', '.css'));
            console.log(`Compiling SCSS: assets/scss/${file} → assets/css/${file.replace('.scss', '.css')}`);
            const result = sass.compile(input);
            fs.writeFileSync(output, result.css);
        });
}

fs.readdirSync(blocksDir).forEach((blockName) => {
    const blockPath = path.join(blocksDir, blockName);

    // Build JS
    const indexJs = path.join(blockPath, 'index.js');
    if (fs.existsSync(indexJs)) {
        console.log(`Building JS:   ${blockName}`);

        const buildPath = path.join(blockPath, 'build');
        if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

        const relIndexJs = path.relative(__dirname, indexJs);
        const relBuildPath = path.relative(__dirname, buildPath);

        execSync(`npx wp-scripts build "${relIndexJs}" --output-path="${relBuildPath}"`, { stdio: 'inherit' });
    }

    // Compile SCSS
    fs.readdirSync(blockPath)
        .filter((file) => path.extname(file) === '.scss')
        .forEach((file) => {
            const input = path.join(blockPath, file);
            const output = path.join(blockPath, file.replace('.scss', '.css'));
            console.log(`Compiling SCSS: ${blockName}/${file}`);
            const result = sass.compile(input);
            fs.writeFileSync(output, result.css);
        });
});
