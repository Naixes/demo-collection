
// 定义接口
interface o {
	prop: number,
	num: number
}

declare function create(o: o | null): void
create({prop: 0, num: 2})

// 可选属性
interface Square {
	color: string
	area: number
}

interface SquareConfig {
	color?: string
	width?: number

	// 索引签名：可能拥有特殊用途或者额外属性时使用，表示其他任意数量的属性
	// 索引属性名（字符串），值（any）
	[propName: string]: any
} 

function createSquare(config: SquareConfig): Square {
	// 应用：对属性进行预定义
	let newSquare = {color: 'white', area: 100}
	// 可以防止拼写错误
	if(config.color) {
		newSquare.color = config.color
	}
	if(config.width) {
		newSquare.area = config.width * config.width
	}
	return newSquare
}

// 额外属性检查：利用字面量传递属性有额外属性时会报错（现在又不报了，可能是版本的不同），可以不使用字面量或者属性断言，不推荐，可以使用索引签名
let mySquare = createSquare({color: 'black', height: 200})
// let mySquare = createSquare({color: 'black'})

// 只读属性
interface Point {
	readonly x: number
	readonly y: number
}

let p1: Point = {x: 10, y: 10}
// p1.x = 0

// 泛型只读数组
let a: number[] = [1, 2, 3]
let ro: ReadonlyArray<number> = a
// ro[0] = 0

// 函数类型
interface SearchFunc {
	(source: string, subString: string): boolean
}
// 参数名称可以改变，但是类型不能变
// let mySearch: SearchFunc = function(src: string, sub: string): boolean {
// 也可以省略类型
let mySearch: SearchFunc = function(src, sub) {
	let result = src.search(sub)
	return result > -1
}

// 可索引类型
interface StringArray {
	// 索引签名，可以是数字和字符串，可以同时使用但是数字索引的返回值必须是字符串索引返回值的子类型
	// 所以一般使用any
	[index: number]: string  
}

let myArray: StringArray = ['Bob', 'Fred']
let str: string = myArray[0]

	// 可以同时使用但是数字索引的返回值必须是字符串索引返回值的子类型 
// class Animal {
// 	name: string
// }
// class Dog extends Animal {
// 	breed: string
// }
// 报错
// inter
interface IsOkay {
	[x: number]: Dog
	[x: string]: Animal
}

// 只读索引类型
interface ReadonlyStringArray {
	readonly [index: number]: string
}

let myReadonlyStringArray: ReadonlyStringArray = ['Alice', 'Bob']
// myReadonlyStringArray[2] = 'Mallory  '

// 类类型
// 1. 实例接口
// interface ClockInterface {
// 	currentTime: Date 
// 	setTime(d: Date)
// }

class Clock implements ClockInterface {
	currentTime: Date
	constructor(h: number, m: number) {

	}
	tick() {
		throw new Error("Method not implemented.")
	}
	setTime(d: Date) {
		this.currentTime = d
	}
}

// 2. 构造器接口
// 实例部分
interface ClockInterface {
	tick()
}
// 静态部分
interface ClockConstructor {
	new(h: number, m: number): ClockInterface
}

function createClock(ctor: ClockConstructor, h: number, m: number): ClockInterface {
	return new ctor(h, m)
}

class DigitalClock implements ClockInterface {
	constructor(h: number, m: number) {
	}
	tick() {
		console.log('tick')
	}
}

let digital = createClock(DigitalClock, 12, 13)

// 继承接口：可继承多个
interface Shape {
	color: string
}
interface Square extends Shape {
	sideLength: number
}
let square = {} as Square
square.color = 'blue'
square.sideLength = 2

// 混合类型
interface Counter {
	// 作为函数
	(start: number): string

	// 作为对象
	interval: number
	reset(): void
}
function getCounter(): Counter {
	let counter = (function (start: number) {

	}) as Counter
	counter.interval = 123
	counter.reset = function() {}
	return counter
}

let counter = getCounter()
c(10)
c.reset()

// 接口继承类
class Control {
	private state: any
}
// 接口继承类时会继承到类的成员（包括私有成员和受保护成员）但是不会继承实现，就是说这个接口只能被这个类或子类所实现
interface SelectableControl extends Control {
	select()
}
class Button extends Control implements SelectableControl {
	select() {}
}
// SelectableControl只能被Control类或子类所实现
// class ImageC implements SelectableControl {
// 	select() {}
// }
