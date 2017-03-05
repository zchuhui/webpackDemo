# webpack 简单上手

## 一、要点说明

- Webpack 适用于单页项目
- Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。


## 二、初级使用

案例目录：


```
//文件目录： 
webpackDemo
    --index.html   
    --main.js      //webpack编译文件
    --entry.js     //模块入口
    --module1.js   //模块1
    --module2.js   //模块2

```

```
//module1.js  用两种方式暴露接口
document.write("I am module1.js");
exports.AA = function(){
	alert("I am AA()!"); 
}
module.exports.BB = function(){
	alert("I am BB()!");
}
```
```
//module2.js
exports.ShowModule2 = function(){
	document.write("I am module!!"); 
}

exports.text_title = "I am text tille!!"; 
```
```
//entry.js

//引用module1.js
var m1 = require('./module1.js');
m1.AA();
m1.BB();

//引用module2.js
var m2 = require('./module2.js');
m2.ShowModule2();
document.write(m2.text_title);
```

使用`webpack`，把上面的entry.js入口文件编译到 `main.js` 

```
$ webpck entry.js main.js
```
然后就生成好main.js文件了，接着在`index.js`引用
```
<!DOCTYPE html>
<html>
<head>
	<title>webpack demo</title>
</head>
<body>

	<script src="main.js"></script>
</body>
</html>
```

输出正常，说明你已经搞定了。



## 三、使用`Loader`

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。

#### 1`Loader`简单模式
安装要使用的`loader`，这里用到`css-loader`
```
npm install css-loader style-loader
```

然后把要引用的css文件在上面的`entry.js`里面引入即可
```
//entry.js

//引用 base.css
require("!style-loader!css-loader!./base.css") // 载入 base.css

//引用module1.js
var m1 = require('./module1.js');
m1.AA();
m1.BB();

//引用module2.js
var m2 = require('./module2.js');
m2.ShowModule2();
document.write(m2.text_title);
```

这样，`base.css` 样式就可以在 `index.html`上面展示了


#### 1`Loader`配置文件模式
1、先在目录下新建`package.js`并添加要使用的依赖：

```
//package.js
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "A simple webpack example.",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "webpack"
  ],
  "author": "zchuhui",
  "license": "MIT",
  "devDependencies": {
    "css-loader": "^0.21.0",
    "style-loader": "^0.13.0",
    "webpack": "^1.12.2"
  }
}
```
执行/安装依赖：
```
npm install
```

#### 2、目录下新建`webpack.config.js`文件
```
//webpack.config.js

var webpack = require('webpack');

module.exports = {
	entry:'./entry.js',
	output:{
		path:__dirname,
		filename:'main.js'
	},
	module:{
		loaders:[
			{test: /\.css$/, loader: 'style-loader!css-loader'}
		]
	}
}

```

既然配置文件里已经添加`css.loader`，那么担任`entry.js`的引用不用那么繁琐了：
```
//entry.js

//引用 base.css
require("./base.css")

...

```

最后执行 `webpack` 即可




