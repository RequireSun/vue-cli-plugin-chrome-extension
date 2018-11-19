'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = (api, {
    language = 'javascript',
}, rootOptions) => {
    api.extendPackage({
        devDependencies: {
            "copy-webpack-plugin": "^4.0.0",
        },
    });

    const indexPath = path.resolve(process.cwd(), 'public' + path.sep + 'index.html');
    const srcPath = path.resolve(process.cwd(), 'src');
    // 删掉 public/index.html, 因为用不到
    fs.remove([
        indexPath,
        srcPath,
    ]);

    switch (language) {
        case 'typescript':
            api.render('./template-ts');
            break;
        case 'javascript':
            api.render('./template');
            break;
    }
};
