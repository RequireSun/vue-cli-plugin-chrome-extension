'use strict';

module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        devDependencies: {
            "copy-webpack-plugin": "latest",
        },
    });

    api.render('./template');
};
