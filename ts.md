### 1.TypeScript 的主要特点是什么？

```
跨平台：TypeScript 编译器可以安装在任何操作系统上，包括 Windows、macOS 和 Linux。

ES6特性：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性，例如箭头函数。

面向对象的语言：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块。

静态类型检查：TypeScript 使用静态类型并帮助在编译时进行类型检查。因此，你可以在编写代码时发现编译时错误，而无需运行脚本。

可选的静态类型：如果你习惯了 JavaScript 的动态类型，TypeScript 还允许可选的静态类型。

DOM操作：可以使用 TypeScript 来操作 DOM 以添加或删除客户端网页元素。

```

### 2.使用TypeScript 有什么好处？

```
TypeScript 更具表现力，这意味着它的语法混乱更少。
由于高级调试器专注于在编译时之前捕获逻辑错误，因此调试很容易。
静态类型使 TypeScript 比 JavaScript 的动态类型更易于阅读和结构化。
由于通用的转译，它可以跨平台使用，在客户端和服务器端项目中。
```

### JavaScript 中的弱类型，动态类型

```
JavaScript 是一门弱类型（weakly typed），动态类型（dynamically typed）的编程语言，


编程语言的类型:
编程语言可以被分为若类型或者强类型，静态类型或动态类型。

强弱类型：
强弱类型描述了编程语言对于混入不同数据类型的值进行运算时的处理方式。强类型语言对类型的要求很严格，很强势，当遇到参与运算的类型不同或不符合规则时，往往会编译失败；而弱类型语言对类型的要求不严格，很松散，在编译阶段时遇到数据类型有问题时，往往会进行隐式转换（type coercion），这使得开发者在编写代码时对数据类型的处理可以更随意。

静态动态类型：
静态动态类型描述了编程语言进行类型检查（type checking）的阶段，静态类型语言在编译阶段进行检查类型，动态类型语言在运行阶段（run-time）进行检查类型。

宽松相等（Loose Equality）：
JavaScript 中的 == 与大部分语言中的 == 不同，其 === 才是大部分语言中的 ==。JavaScript 中的 == 被称为宽松相等，它会尝试将两边的操作数转化为同一类型后再进行严格比较。这里出现了隐式转换，所以我认为 == 是 JavaScript 弱类型的体现。

```

### 3.TypeScript 的内置数据类型有哪些？

```js
数字类型：用于表示数字类型的值。TypeScript 中的所有数字都存储为浮点值。
let identifier: number = value;

布尔类型：一个逻辑二进制开关，包含true或false
let identifier: string = " ";

Null 类型：Null 表示值未定义的变量。
let identifier: bool = Boolean value;

未定义类型：一个未定义的字面量，它是所有变量的起点。
let num: number = null;

void 类型：分配给没有返回值的方法的类型。
let unusable: void = undefined;
```

### 4.TypeScript 目前的稳定版本是什么？

```
当前的稳定版本是 4.2.3。
```

### 5.TypeScript 中的接口是什么

```js
接口为使用改接口的对象定义契约或结构
接口是用关键字定义的interface，它可以包含使用函数或箭头函数的属性和方法声明。


interface IEmployee {
    empCode: number;
    empName: string;
    getSalary: (number) => number; // arrow function
    getManagerName(number): string; 
}
```

### 6.TypeScript中的模块是什么？

```js
TypeScript 中的模块是相关变量、函数、类和接口的集合。

你可以将模块视为包含执行任务所需的一切的容器。可以导入模块以轻松地在项目之间共享代码。


module module_name{
class xyz{
export sum(x, y){
return x+y;
}
}
```

### 联合类型

```js
联合类型：可以通过管道 (|) 将变量设置多种类型，赋值时可以根据设置的类型来赋值
   Type1|Type2|Type3 
             
            var val:string|number 
            val = 12 
            console.log("数字为 "+ val) 
            val = "Runoob" 
            console.log("字符串为 " + val)
             
```

### 元组类型

```js
数组合并想用类型的对象，而元组合并了不同类型的对象，元组可以属于理解成一个任意类型并且长度有限的数组

`例子`
let tom: [string, number] = ['Tom', 25];

let tom: [string, number];
tom[0] = 'Tom';
tom[1] = 25;

tom[0].slice(1);
tom[1].toFixed(2);

元组越界
当添加的元组越界(超出长度)的时候，越界的类型会被限制为元组类型中每个类型的联合类型
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true); //这里会报错
```

### 枚举

```js
使用枚举 我们可以定义一些带名字的常量。使用枚举可以清晰的表达意图或创建一组有区别的用例，
TypeScript支持数字的和基于字符串的枚举。枚举使用 enum 关键字来定义。


// 枚举 
// 枚举无法修改，因为其是只读属性

// 按照枚举成员分类
// 都有三种 数字，字符串，异构 三种
// 1 数字枚举
enum numTest{
    one,
    two,
    three,
    four
}
// 数字枚举的默认值是从0 开始
console.log(numTest.one,'num'); //0
console.log(numTest[0]);//num

enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
 
console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
/**
 * 可以看出
 * 1. 数字枚举如果没有初始化，默认初始化值为0，每项+1
 * 2.如果有初始化，则在初始化的基础上，每项+1
 * 3.如果某项被赋值(可以是正数或负数,或者小数)，那么之后的项在此基础上加一
 * 4.如果未动手的赋值的枚举项与手动赋值的重复了，ts是不会察觉的但应该尽量避免
 * 5.反向映射 除了创建一个属性名作为对象成员之外，数字枚举成员(字符串成员没有反向映射
 * )还具有反向映射，从枚举值到枚举名字
 *  ***/

// 字符串枚举
// 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化

enum strTest {
    one='one',
    two='two',
    three='three',
    four='four'
}

// 异构枚举
// 将数字枚举与字符串枚举混用，但不建议

enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// 按照声明方式
// 普通枚举，const枚举，外部枚举，外部常量枚举
// 1.普通枚举

enum normal{
    one,
    two,
    three='three'.length
}
console.log(normal.three); //5
// 下面的情况不被允许
// enum normal{
//     one='one'.length,
//     two,
//     three
// }
// 上面代码会报错，因为one 为 计算值，而后面的值无法获取其数值
// 官方定义，不带初始化的枚举要么被放在第一的位置，要么被放在了使用 了数字常量
// 或者其它常量初始化了的枚举后面

// 2.常数枚举(const enum 定义的枚举)
const enum constTest {
    one,
    two,
    three
}
let constArr=[constTest.one,constTest.two,constTest.three] //[0,1,2]

// 其与普通枚举的区别为，他会在编译阶段被删除，并且不能包括计算成员，加入包括了 会报错

// 3.外部枚举
// 外部枚举的声名方式比较特别，该类型不会生成反向映射
// 外部枚举用来描述已经存在的枚举类型的形状，这样听起来很晦涩。
// 同时可以防止声名枚举的命名冲突和成员冲突

// declare enum next{
//     one=1,
//     two,
//     three,
//     four,
//     five
// }
// console.log(next);
// console.log(next.five);
// 放在另一个文件这里不做赘述
// const next={
//     one:1,
//     two:2,
//     three:3,
//     four:4,
//     five:5
// }

// 4.外部常量枚举
// 和上着没有什么区别，只是会提示是否有枚举命名冲突和成员冲突，不会生成反向映射

```



### 基础类型

```js
ts基础类型：
Boolean/number/string/object/数组/元组/枚举/any/undefined/null/void/never
上面的为ts 类型的关键字，其中 object 其实时包含 数组/元组/枚举,在ts 概念中，叫做类型兼容，就是说，数组类型数据也可以用object 来标注

```

### 字面量

什么叫做字面量： 字面量的意思就是直接声名，而非new 关键词实例化出来的数据.

```js
// 字面量
const n:number = 123;
const s:string = '456';
const o:object = {a:1,b:'2'};

// 非字面量
const n:Number = new Number(123);
const s:String = new String('456');
const o:Object = new Object({a:1,b:'2'});

ts 中小写字母开头的类型表示字面量大写别欧式的通过new实例化的数据

```

