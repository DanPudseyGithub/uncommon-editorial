const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const blocksDir = path.join(__dirname, 'blocks');
const args = [];

fs.readdirSync(blocksDir).forEach((blockName) => {
    const blockPath = path.join(blocksDir, blockName);
    const indexJs = path.join(blockPath, 'index.js');
    const buildPath = path.join(blockPath, 'build');

    if (fs.existsSync(indexJs)) {
        if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);
        args.push(`"${path.relative(__dirname, indexJs)}" --output-path="${path.relative(__dirname, buildPath)}"`);
    }
});

const cmd = `npx wp-scripts start ${args.join(' ')}`;
console.log('Watching blocks for changes...');
execSync(cmd, { stdio: 'inherit' });
