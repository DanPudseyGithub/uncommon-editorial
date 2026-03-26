const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const blocksDir = path.join(__dirname, 'blocks');

fs.readdirSync(blocksDir).forEach((blockName) => {
    const blockPath = path.join(blocksDir, blockName);
    const indexJs = path.join(blockPath, 'index.js');

    if (fs.existsSync(indexJs)) {
        console.log(`Building block: ${blockName}`);

        const buildPath = path.join(blockPath, 'build');
        if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

        // Convert absolute paths to relative paths from __dirname
        const relIndexJs = path.relative(__dirname, indexJs);
        const relBuildPath = path.relative(__dirname, buildPath);

        const cmd = `npx wp-scripts build "${relIndexJs}" --output-path="${relBuildPath}"`;
        execSync(cmd, { stdio: 'inherit' });
    }
});