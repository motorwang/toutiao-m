module.exports = () => ({
    plugins: [
        require('autoprefixer')(),
        require('postcss-pxtorem')({
            // 如果设计稿是375宽, 那这里一定就要写37.5
            // 如果设计稿是750宽, 那这里一定就要写75
            // 一般设计稿是以 iPhone 6 7 8 为原型设计的 宽是375
            rootValue: 37.5,
            propList: ['*']
        })
    ]
});
