# vue3 随笔

### 对vue 的应用配置进行了解

每个vue 应用都会暴露出一个包含其配置项的config对象

```js
const app = createApp({})

console.log(app.config,'配置信息')

```

再次对下图进行解析

![image1](C:\Users\Acher\Desktop\问题\积累\pic\image1.png)

```js
根据排序方式进行分析
1.compilerOptions:
'配置运行时编译器的选项，设置在这个对象上的值会被传入浏览器内的模板编译器，并影响配置过的应用的每个组件'注意，也可以在单个组件的基础上使用
	属性 
    	(1)compilerOptions.isCustomElement
            类型 (tag:string)=>boolean 
            默认值 undefined 
            用法
            // 任何以 'ion-' 开头的元素都会被识别为自定义元素
            app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
            作用 `指定一个方法来识别vue以外定义的自定义元素(例如通过 Web Components API) ，如果一个组件匹配了这个条件，它就不需要再本地或者全局注册，vue也不会抛出 Unknown custom element`
		(2)compilerOptions.whitespace
			类型 'condense' | 'preserve'
            默认值 condense 
            用法
            app.config.compilerOptions.whitespace = 'preserve'
			默认情况下，vue 会移除/压缩模板元素之间的空格以产生更高效的编译结果
				元素内的多个开头/结空格会被压缩成一个空格
				元素之间的包括折行在内的多个空格会被移除
                文本节点之间可被压缩的空格都会被压缩成为一个空格
                
            `将其值设置为presever`可以金庸后两个
		(3)compilerOptions.delimiters
			类型 Array<string>
            默认值 ['{{', '}}']
			用法
            // 将分隔符设置为 ES6 模板字符串风格
			app.config.compilerOptions.delimiters = ['${', '}']
			用于配置模板内文本插值的分隔符
            这个选项一般会用于`避免和同意使用双大括号语法的服务端框架发生冲突`
		(4)compilerOptions.comments
			类型：boolean
            默认值：false
            用法：
            app.config.compilerOptions.comments = true
			默认情况下，vue会在生产环境下移除模板内的HTML注释。将这个选项设置为true 可以强制vue在生产环境下保留注释，而在开发环境下注释是始终被保留的
            `一般用于依赖HTML注释的其他库和vue配合使用`

            
2.errorHandler
	类型 function /
	默认 underfined
    用法：
            app.config.errorHandler = (err, vm, info) => {
          // 处理错误
          // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
        }
    指定一个处理函数，来处理组件渲染函数和侦听器执行期间抛出的未捕获错误，这个处理函数被调用时，可以获取错误信息和相应的应用实例
    
  
3.globalProperties
	类型 [key: string]: any
    默认 undefined
	用法
    	app.config.globalProperties.foo = 'bar'

        app.component('child-component', {
          mounted() {
            console.log(this.foo) // 'bar'
          }
        })
		添加一个可以在应用的任何组件实例中访问的全局property。组件的property在命名冲突时具有优先权，同时route和store 也在里面
        `可以替代vue2 的Vue.prototype 扩展：`
        // 之前 (Vue 2.x)
        Vue.prototype.$http = () => {}

        // 之后 (Vue 3.x)
        const app = createApp({})
        app.config.globalProperties.$http = () => {}
        
        
4.warnHandler
	类型 function/
	默认 undefined
	用法 
    app.config.warnHandler=funciton(msg,vm,trace){
        //`trace` 是组件的继承关系追踪
    }
	为vue的运行时警告一个自定义处理函数，注意这只会在开发环境下生效，在生产环境下他会被忽略
 
5. optionMergeStrategies
	类型：{ [key: string]: Function }
    默认：{}
    用法：
    const app = createApp({
      mounted() {
        console.log(this.$options.hello)
      }
    })

    app.config.optionMergeStrategies.hello = (parent, child) => {
      return `Hello, ${child}`
    }

    app.mixin({
      hello: 'Vue'
    })

    // 'Hello, Vue'
	为自定义选项定义合并策略
    合并策略分别接受在父实例和子实例上定义的选项的值作为第一个和第二个参数。
    
    
6.performance
	类型：boolean
    默认：false
    设置为true以在浏览器开发工具的performance/timeline面板中启用对组件初始化编译渲染和更新的性能追踪。只适用于开发者模式和支持performance.mark API 的浏览器。e
```

### 关于子组件能否更改父组件的值（官网资料）

```js
所有的prop都使得其父子prop之间形成了一个单向下行绑定：`父级prop的更新会向下流动到子组件中，但是反过来不行。这样会防止子组件意外变更父组件的状态，从而导致你的应用的数据流向难以理解`。
 	每次父组件发生变更时，子组件中所有的prop都将会刷新为最新的值，这意味着你不应该在一个子组件内部改变prop。如果这样做了，vue会在浏览器的控制台中发出警告。
    

```

