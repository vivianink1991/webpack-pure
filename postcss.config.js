/*
 * @Author: your name
 * @Date: 2020-08-12 18:48:09
 * @LastEditTime: 2020-08-12 18:48:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /webpack-pure/postcss.config.js
 */
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [autoprefixer(['IE 10'])]
};