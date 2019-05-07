## 构造函数重载

## 方法重载-类型和(or)数量不同

## 7.2 把对象作为参数

## 7.3 参数是如何传递的
> 按值传递(call-by-value)，子程序的参数改变不影响调用它的参数

> 引用调用(call-by-reference)，参数的引用传递给子程序参数。对子程序参数的改变将会影响调用子程序的参数

> 当一个简单类型传递给一个方法时，使用按值传递.对象传递则按引用传递

## 7.5 递归
```javascript
var fac = n => n * (n-1); 
fac(4)
```

## 7.6 介绍访问控制(access control)
> 封装将数据和处理数据的代码连接起来.
> 通过封装你可以控制程序的哪一部分可以访问类的成员。通过控制访问，可以阻止对象的滥用

