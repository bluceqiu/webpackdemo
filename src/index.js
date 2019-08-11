// let a = require('./a');

// document.getElementById('app').innerHTML = 'ok蹦蹦蹦蹦';
// document.write('<b>index.js111111</b>');
// import './index.css';
// import './index.sass';
// module.hot && module.hot.accept();

let app = document.getElementById("app");

function render(){
    app.innerHTML = require('./title').default;
}

render();