function sideEffect() {
    return "hello sideeffect"
}

console.log(sideEffect()); // 测试sideeffects，有效，认为这样的是有用代码，不会去除， // 参考package.json 里面的sideeffects 配置
sideEffect(); // 测试sideeffects， 无效，webpack 认为这样的是无用代码

export default sideEffect;