'use strict';

const { chalk, } = require('@vue/cli-shared-utils');

const prompts = module.exports = [
    {
        name: 'language',
        type: 'checkbox',
        message: 'choose your language:',
        choices: [{
            name: 'javascript',
            value: 'javascript',
            checked: true,
        }, {
            name: 'typescript' + chalk.red(' (please use vue-cli-plugin-typescript first)'),
            value: 'typescript',
        }],
    },
];

module.exports.getPrompts = pkg => {
    // 当 vue-cli-plugin-typescript 在 package 的依赖中时才会触发选择, 否则默认就会是 javascript 了
    prompts[0].when = () => ('@vue/cli-plugin-typescript' in (pkg.devDependencies));
    return prompts;
};
