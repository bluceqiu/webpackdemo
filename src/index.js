// let a = require('./a');
document.getElementById('app').innerHTML = 'ok';
// document.write('<b>index.js111111</b>');
import './index.css';
// import './index.sass';
// module.hot && module.hot.accept();

import {add} from './calc' // tree-shaking 默认只支持es6语法的静态导入

add(1, 2);