const path = require('path');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(__dirname, '../src');
const buildOutputPath = path.resolve(__dirname, '../dist');
const staticsPath = path.resolve(buildOutputPath, 'statics/');
const appEntryPath = path.resolve(srcPath, 'main.js');
const assetsPath = path.resolve(srcPath, 'assets/');
const distIndexHtmlPath = path.resolve(buildOutputPath, 'index.html');
const indexHtmlPath = path.resolve(srcPath, 'index.html');

module.exports = {
    rootPath,
    srcPath,
    buildOutputPath,
    staticsPath,
    appEntryPath,
    assetsPath,
    distIndexHtmlPath,
    indexHtmlPath,
};
