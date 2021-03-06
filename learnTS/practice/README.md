## ts实战

### 01 注入

安装ts`npm i -g typescript`

esprima：给js生成ast树，其中使用到了estree库

安装yarn`node install -g yarn`

ioc

元编程`yarn add reflect-metadata`，增强反射

### 02

webpack环境

Loader

#### swc-loader配置

babel-loader麻烦，swc-loader：激进一些，对底层进行重写了，不是使用js构建，使用的rust构建，直接编译成机器码，快一些

`npm i --save-dev @swc/core swc-loader`

*配置见代码提交记录*

#### babel-loader配置

js`npm install -D babel-loader @babel/core @babel/preset-env`

ts`npm i -D @babel/preset-typescript`

*配置见代码提交记录*

> eslint，eslint-config-airbnb-typescript

#### 小技巧

高级类型

```ts
const sin = (name: string, age: number) => {}

// 获取函数参数类型
type p = Parameters<typeof sin>

const sin2 = (...data: p) => {
    const [name, age] = data
    console.log(name, age);
}

sin2('sin', 18)

// ===============================

// 对象类型强制key校验
const res = {
    name: 'sin',
    age: '3'
}

function get<T extends object, K extends keyof T>(o: T, key: K): T[K] {
    return o[key]
}

const data = get(res, 'name')

// ===============================

// 高级类型

interface User {
    id: string,
    age: number,
    name: string
}

// 选填
type PartialUser = Partial<User>
// 必填
type RequiredUser = Required<User>
// 过滤字段
type PickUser = Pick<User, 'age' | 'id'>
// 排除字段
type OmitUser = Omit<User, 'age' | 'id'>
// 排除某些字段
type A = Exclude<'a'|'b', 'a'|'y'|'z'>
// 提取某些字段，交集
type B = Extract<'a'|'b', 'a'|'y'|'z'>

type Select = 'id' | 'age'
type PartialSelect = Partial<Pick<User, Select>>

// 合并
type Final = OmitUser & PartialSelect

// 设置可选字段，相当于Final的封装
type SelectPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
type SP = SelectPartial<User, 'name'>

// ===============================

interface ProductIncart {
    id: string,
    name: string,
    label?: string
}

// Record<K, V>，将V作为整体当成value，key类型为K，生成新的类型，对象嵌套对象
class CarModel {
    products: Record<string, ProductIncart> = {
        "sin": {
            id: "string",
            name: "string",
            label: "string"
        }
    }
}
// 相当于
interface Same {
    [key: string]: ProductIncart
}

// ==================解决旧版本的代码提示失效===================
// 相当于type t = string & {}
type LiteralUnion<T extends UIEvent,U=string> = T | (U & {})

// ================================================

// 检查参数不为null
type NonNullableType = string | number | null | undefined

function showType(args: NonNullable<NonNullableType>) {
    console.log(args);
}

console.log('xx');

type StringMap<T> = {
    [P in keyof T]: string
}

function showType2(args: StringMap<{id: number, name: string}>) {
    console.log(args);
}
}

// =========================apply=======================
// 要使用apply时要显示传入this，否则报错

// =========================唯一属性=======================
// 严格校验下使用symbol时报错可以这样
const DEV: unique symbol = Symbol('dev')
const obj = {
    [DEV]: 2
}

// 不能使用symbol的某些值，改lib为ESNext

// =========================伴侣模式=======================
// 强制转换类型时可能发生危险

type OrderID = string & {readonly brand: unique symbol}
type UserID = string & {readonly brand: unique symbol}

type ID = OrderID | UserID

function OrderID(id: string) {
    return id as OrderID
}
function UserID(id: string) {
    return id as UserID
}

function queryForUser(id: UserID) {}
queryForUser(UserID('xx'))

// =========================构造参数类型=======================
// 只能用到类中
class User {
    constructor(public name: string) {}
}

interface IConstructor<T extends new(...args: any) => any> {
    type: new(...args: ConstructorParameters<T>) => InstanceType<T>
}

type UserConstructor = IConstructor<typeof User>
const constr: UserConstructor = {
    type: User
}
const userInstance = new constr.type('sin')

// ================================================

function isString(a: unknown): a is string {
    return typeof a === 'string'
}

type toArray<T> = T extends unknown[] ? T : T[]
const data2: toArray<string> = Array.from('123')
```

