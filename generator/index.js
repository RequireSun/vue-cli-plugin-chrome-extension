'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        devDependencies: {
            "copy-webpack-plugin": "^4.0.0",
        },
    });

    api.render('./template');

    const indexPath = path.resolve(process.cwd(), 'public' + path.sep + 'index.html');

    fs.lstat(indexPath, (...args) => {
        if (args[0]) {
            // do nothing
        }
        console.log('lstat', args);
    });

    fs.unlink(indexPath, (err) => {
        if (err) {
            // do nothing
            console.log('remove file fail', err);
        } else {
            console.log('remove file success', indexPath);
        }
    });
};
