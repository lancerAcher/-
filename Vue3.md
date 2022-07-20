### Composition API

1.什么是Composition API

```
Composition: 构成，组合方式
API：应用程序接口，指一些预先定义的函数，用来系统之间，组件之间，函数之间交互的一种约定。

在 Vue3.0中的意思是什么？
中文名：合成函数

以函数为载体，将业务相关的逻辑代码抽取到一起，整体打包对外提供相应能力，这就是Composition API

可以理解它是我们组织代码，解决逻辑服用的一种方案。

```

2.为什么要使用Composition API

```js
vue2的代码组织方式：
export default {
  props: {
    ……
  },
  data() {
    return {
        ……
    };
  },
  watch: {
    ……
  },
  computed: {
    ……
  }
  methods: {
      ……
  }
在一个组件当中实现某一个功能，可能会有以下几个代码块：
	在props中接受参数
    在data中定义变量
    在watch中监听变化
    在computed中定义需要用到的计算属性
    在methods中定义事件响应方法
    
此类代码如果需要修改某个功能则需要去当前组件中查看复杂的逻辑，因此不利于维护

虽然在使用中我们可以使用 Mixins,HOC,Renderless Components 来规避此类 问题
但是在一定程度上是可以解决此类问题的，但是都存在一些问题。

	模板中的数据来源不清晰，举例来说，当一个组件中使用量多个mixin的时候，光看模板会很难愤青一个属性到底是来自哪一个mixin。HOC也有类似问题。
    
    命名空间冲突，由不同开发者开发的mixin无法保证不会正好用到一样的属性或者是方法名，HOC在注入的props中也存在类似问题。
    
    性能。HOC和 Renderless Components都需要额为的组件实例嵌套来封装逻辑，导致无谓的性能开销。
    另外，将 Vue2.x 现有的 API 在与 Typescript 集成时的确有一些挑战，主要是因为 Vue 依赖于 this 上下文来抛出属性，而且相较于简单的 JavaScript，this 在 Vue 组件中有很多魔法性 (比如：methods 属性里面定义的函数里的 this 指向的是组件实例，而不是 methods 对象)。

    Composition API 有两个优势:
	类型推导：基于函数的 API 天然对类型推导很友好，因为 TS 对函数的参数、返回值和泛型的支持已经非常完备。
    打包尺寸：基于函数的 API 每一个函数都可以作为 named ES export 被单独引入，这使得它们对 tree-shaking 非常友好。同时，因为所有的函数名和 setup 函数体内部的变量名都可以被压缩，所以拥有更好的压缩效率。
    
```

3.Composition API 在哪里使用呢？

我们要知道 Composition API 是代码逻辑组合和复用的方案，不是替代组件的方案。换言之，原来组件该怎么划分，现在继续怎么划分，丝毫不受影响。

但是组件内的代码的组织，组件间代码的复用，则和 Composition API 息息相关

```
import { ref, onMounted, onUnmounted } from 'vue'
function useMouse() {
    const x = ref(0)
    const y = ref(0)
    const update = e => {
      x.value = e.pageX
      y.value = e.pageY
    }
    onMounted(() => {
      window.addEventListener('mousemove', update)
    })
    onUnmounted(() => {
      window.removeEventListener('mousemove', update)
    })
    return { x, y }
  }
export default useMouse;

```

这里将 变量定义 x, y，生命周期函数 onMounted，onUnmounted，更新方法 update 都集成到一块了，以函数 useMouse 为载体，统一对外提供监听鼠标位置的 API 服务。于是在任何的组件中都可以使用到该服务，不受限制。

如下在组件中使用 listenMouse 提供的服务：

```go

<template>
    <p>Mouse Position:</p>
    <p>x:{{ x }},y:{{ y }}</p>
</template>
<script>
import useMouse from './listenMouse';
export default {
    setup (props) {
        let {x, y} = useMouse();
        return {
            x,
            y
        }
    }
}
</script>
```

使用 Composition API 的方式，你会发现逻辑复用超简单了，且超清晰，代码更整洁，形象如下图

通过对 Composition API 的了解，你会发现在代码组织上有一个很大的变化：干掉了 Vue2.x 中神奇的 this。

在 Vue2.x 中，我们的代码中大量的使用到了 this，组件中的 props, data，methods 都是绑定到 this 上下文，然后由 this 去访问。

那么使用 Compositon API 之后，当涉及到跨组件之间提取、复用逻辑时，就会非常的灵活。一个合成函数只依赖于它的参数和全局引入的 Vue APIs，而不是充满魔法的 this 上下文。我们只需要将组件中你想复用的那部分代码抽离，然后将它导出为函数就可以了。

比如上面中的 listenMouse.js，单独导出 useMouse，在其他组件都可以使用。

###  Composition API

Vue3.0 的 Composition API 中将来会避免不了出现 “面条代码” 这个问题！

面条代码：代码的控制结构复杂、混乱，逻辑不清，关系耦合，让人一时难以理解。

#### 为啥会担忧出现“面条代码”？

Options API 和 Composition API 的差异我们上面已经分析过了，我们再换个角度总结一下：

Options API 约定：

​		我们需要在 props 里面设置接收参数

​		我们需要在 data 里面设置变量

​		我们需要在 computed 里面设置计算属性

​		我们需要在 watch 里面设置监听属性

​		我们需要在 methods 里面设置事件方法

你会发现 Options APi 都约定了我们该在哪个位置做什么事，这反倒在一定程度上也强制我们进行了代码分割。

现在用 Composition API，不再这么约定了，于是乎，代码组织非常灵活，我们的控制代码写在 setup 里面即可。

#### 如何规避？

没有了 this 上下文，没有了 Options API 的强制代码分离。Composition API 给了我们更加广阔的天地，那么我们更加需要慎重自约起来。

对于复杂的逻辑代码，我们要更加重视起 Composition API 的初心，不要吝啬使用 Composition API 来分离代码，用来切割成各种模块导出。


就算 setup 内容代码量越来越大，但是始终围绕着大而不乱，代码结构清晰的路子前进。

setup 是我们的代码控制器，尽量不要写入大量的业务逻辑代码。始终秉承着为 “控制器分忧，为 setup 减负” 的思想来撸代码！

当然我们同样要规避坠入“混沌代码”的魔咒。还需秉承：高内聚，低耦合 的撸代码方针。
