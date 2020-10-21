// 在这里书写gulpfile.js的整理思路版本,不规范版本
const gulp = require('gulp');

// 任务一:压缩src文件下面的css文件夹里面的css文件
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
/* 
    使用autoprefixer需要 在package.json里面设置浏览器列表
    "browserslist": [
        "last 2 versions",
        "iOS>7",
        "Firefox < 20",
        "last 2 Explorer versions"
    ]
*/
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}

// 任务二:移动src里面的images文件夹
const imgHandler = ()=>{
    return gulp.src('./src/img/**')
    .pipe(gulp.dest('./dist/img'))
}
const phpHandler = ()=>{
    return gulp.src('./src/php/**')
    .pipe(gulp.dest('./dist/php'))
}
const jsonHandler = ()=>{
    return gulp.src('./src/json/**')
    .pipe(gulp.dest('./dist/json'))
}
const fontHandler = ()=>{
    return gulp.src('./src/font/**')
    .pipe(gulp.dest('./dist/font'))
}
// 任务三:压缩src里面的js文件夹里面的js文件
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
/* 
    下载包的时候,除了gulp-babel还有另外两个包:@babel/core @babel/preset-env
*/
const jsHanlder = ()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

// 任务四:移动lib文件夹
const jqueryHandler = ()=>{
    return gulp.src('./src/jquery/*.js')
    .pipe(gulp.dest('./dist/jquery'))
}

// 任务五:压缩src里面的pages里面的html文件
const htmlmin = require('gulp-htmlmin');
const htmlHanlder = ()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes:true, //移除属性的引号
        collapseBooleanAttributes:true,//把值为布尔值的属性简写
        removeComments:true,//移除注释
        minifyCSS:true,//把页面里面的style标签里面的css样式也去空格
        minifyJS:true,//把页面里的script标签里面的js代码给去空格
    }))
    .pipe(gulp.dest('./dist/pages'))
}

// 任务六:开启以dist为网站根目录的热更新的web服务器
const webserver = require('gulp-webserver');
const serverHanler = ()=>{
    return gulp.src('./dist')
    .pipe(webserver({
        port:8080,
        open:'./pages/index.html',
        livereload:true,
        proxies:[
            // 每一个代理配置就是一个对象
            {
                source:'/login', //源,你的代理标识符
                // 你直接请求下面这个地址压根也拿不到东西,因为跨域了
                target:'http://localhost/src/php/LoginPage.php' //目标,你要代理的地址

            },
            {
                source:'/reg', //源,你的代理标识符
                // 你直接请求下面这个地址压根也拿不到东西,因为跨域了
                target:'http://localhost/src/php/Registration.php' //目标,你要代理的地址

            }
        ]
    }))
}

// 任务七:监控src文件夹下面的所有文件
const watchHandler = ()=>{
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHanlder);
    gulp.watch('./src/pages/*.html',htmlHanlder);
    gulp.watch('./src/img/**',imgHandler);
    gulp.watch('./src/jquery/*.js',jqueryHandler)
    gulp.watch('./src/php/**',phpHandler)
    gulp.watch('./src/json/**',jsonHandler)
    gulp.watch('./src/font/**',fontHandler)


}

// 任务八:删除dist目录
const del = require('del')
const delHandler = ()=>{
    return del(['./dist'])
}

// 导入默认任务
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,jsHanlder,htmlHanlder,imgHandler,jqueryHandler,phpHandler,jsonHandler,fontHandler
    ),
    serverHanler,
    watchHandler
)