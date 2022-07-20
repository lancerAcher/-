### **require.context**

```
require.context(directory, useSubdirectories, regExp)

directory: 要查找的文件路径
useSubdirectories: 是否查找子目录
regExp: 要匹配文件的正则

用法：require.context('./components/', true, /\.js$/)


var map = {
	"./A.js": "./src/components/test/components/A.js",
	"./B.js": "./src/components/test/components/B.js",
	"./C.js": "./src/components/test/components/C.js",
	"./D.js": "./src/components/test/components/D.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/components/test/components sync recursive \\.js$";


require.context执行后，返回一个方法webpackContext，这个方法又返回一个__webpack_require__，这个__webpack_require__就相当于require或者import。同时webpackContext还有二个静态方法keys与resolve，一个id属性。

keys: 返回匹配成功模块的名字组成的数组
resolve: 接受一个参数request，request为test文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
id: 执行环境的id，返回的是一个字符串，主要用在module.hot.accept，应该是热加载

keys作用

const ctx = require.context('./components/', true, /\.js$/)
console.log(ctx.keys())
// ["./A.js", "./B.js", "./C.js", "./D.js"]



公共方法
const importAll = context => {
  const map = {}

  for (const key of context.keys()) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    map[keyArr.join('.').replace(/\.js$/g, '')] = context(key)
  }

  return map
}

export default importAll

使用
import importAll from '$common/importAll'
export default importAll(require.context('./', true, /\.js$/))
```

