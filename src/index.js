
// import("lodash")
// console.log(lodash);


// import $ from 'jquery';
// console.log($);

// 抽离自己的代码
import split from './splitcode';
console.log(split);


// 动态加载文件
// let btn = document.createElement("button");
// btn.innerHTML = 'dianwo'

// btn.addEventListener("click", function () {
//     import(/*webpackChunkName:'video'*/'./calc.js').then(calc=>{ // import 可以实现代码懒加载的功能
//         calc.add(1, 2);
//     })
// });
// document.body.appendChild(btn);








// let a = require('./a');
// document.getElementById('app').innerHTML = 'ok';
// document.write('<b>index.js111111</b>');

// import './index.css'; // 引入css文件，需要这package.son中指定它不是副作用，不如会被tree-shaking掉，认为没有被引用, 非esmodule 不受影响
// import './index.sass';


// module.hot && module.hot.accept();

// import {add} from './calc' // tree-shaking 默认只支持es6语法的静态导入

// import d from './hoisting'


// import sideEfects from './sideefects'

// add(1, 2);

// scope hoisting, 作用域提升，节省内存
// console.log("hoisting:", d);



// dll 动态打包优化, 编译的时候，将不需要重复打包的没有改动的文件暂存，维护这manifest。json里面，不必重复编译打包
// dll 可以用作生产环境
// document.write("hello1");

// import React from 'react'
// import {render} from 'react-dom';

// render('hello', document.getElementById('app'));