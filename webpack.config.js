let path=require('path');
module.exports={
    entry:'./src/main.js', // модуль с которого начинается упаковка
    output: {
        path: path.resolve(__dirname,'src'),
        filename:'bundle.js'
    },
    mode: 'development'
};
