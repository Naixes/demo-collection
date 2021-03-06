// 实例化Vue之后，会使用defineProperty都数据进行响应化注册，在响应化的同时在get方法中进行依赖收集（向订阅中添加当前的的观察者，触发get方法时会进行收集）

// render时都会实例化观察者
// 实例化观察者时，将dep.target更新为当前观察者，同时触发观察者的get方法会触发数据的get方法，进而触发依赖收集

// 当数据发生改变时，触发set方法，通知所有订阅者进行视图更新

// Vue基类
// 数据劫持，数据代理和编译
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.$methods = options.methods
        let computed = options.computed
        if(this.$el) {
            // 数据劫持：将所有的数据转化为Object.defineProperty()
            new Observer(this.$data)
            // 实现computed
            for(let key in computed) {
                // 将computed代理到$data上，形成依赖关系
                Object.defineProperty(this.$data, key, {
                    // 访问computed中的属性时返回方法的结果
                    get:() => {
                        // 执行实例中的函数时注意this的指向
                        return computed[key].call(this)
                    }
                })
            }

            // 将$methods取值操作都代理到实例上
            this.proxyVm(this.$methods)

            // 将$data取值操作都代理到实例上
            this.proxyVm(this.$data)
            // 根据数据编译模板
            // ！！注意：实际上vue不是在这里进行dom操作，而是得到一个render函数，视图更新是patch阶段的工作
            new Compiler(this.$el, this)
        }
    }
    proxyVm(data) {
        for(let key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                }
            })
        }
    }
}

// 订阅者(包含发布订阅模式)
// 实现发布订阅
class Dep {
    constructor() {
        // 存放所有的watcher
        this.subs = []
    }
    // 订阅
    addSub(watcher) {
        this.subs.push(watcher)
    }
    // 发布
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}
// 观察者
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 先保存旧值
        this.oldVal = this.get()
    }
    get() {
        // 记录下当前的watcher
        Dep.target = this
        // 这里会调用数据的get方法，会将当前的watcher加入到subs当中
        const value = CompileUtil.getVal(this.vm, this.expr)
        // 要将当前target清空，否则在其他地方获取数据时也会重复加入当前的观察者
        Dep.target = null
        return value
    }
    // 数据更新时执行的方法
    update() {
        let newVal = CompileUtil.getVal(this.vm, this.expr)
        if(newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}

// 数据劫持
class Observer {
    constructor(data) {
        // 对data的数据进行劫持
        this.observer(data)
    }
    observer(data) {
        // 校验传入的参数
        if(data && typeof data === "object") {
            for(const key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(data, key, value) {
        // 如果该值也是一个对象，对这个对象也进行劫持
        this.observer(data[key])
        // 给每一个属性增加发布订阅的功能，Dep和key一对一对应
        let dep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                // 获取属性值时判断是否有新的观察者并将它添加到subs中
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set:(newVal) => {
                // 如果新值也是一个对象，对这个对象也进行劫持
                this.observer(newVal)
                value = newVal
                dep.notify()
            }
        })
    }
}

// 模板编译
class Compiler {
    constructor(el, vm) {
        // 校验参数

        // 校验el是否为元素
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        // 将当前的DOM放入内存中
        let fragment = this.el2Fragment(this.el)
        // 编译模板
        this.compile(fragment)
        // 渲染画面
        this.el.appendChild(fragment)
    }
    // 编译模板核心方法
    compile(node) {
        let childNodes = node.childNodes
        // childNodes为伪数组
        ;[...childNodes].forEach(child => {
            if(this.isElementNode(child)) {
                this.compileElementNode(child)
                // 如果还包含子元素继续编译
                if(child.childNodes) {
                    this.compile(child)
                }
            }else {
                this.compileTextNode(child)
            }
        });
    }
    // 编译元素节点
    compileElementNode(node) {
        // 判断是否有v-开头的指令
        let attrs = node.attributes
        ;[...attrs].forEach(sttr => {
            // console.log("attrs",sttr.value)
            let {name, value:expr} = sttr
            if(this.isDirective(name)) {
                // name:v-model
                let [, directive] = name.split("-") 
                // directive: on:click, name: v-on:click
                let [directiveName, method] = directive.split(":")
                // 编译 directiveName: model, html, on
                CompileUtil[directiveName](node, expr, this.vm, method)
            }
        })

    }
    // 编译文本节点
    compileTextNode(node) {
        // test：返回布尔值
        // node.textContent：文本内容
        let content = node.textContent
        // // 自己写的，功能没有分离
        // while(/\{\{(.+?)\}\}/.test(node.textContent)) { // content:xxx{{}} {{}}
        //     // expr[0]：{{xx.xx}};expr[1]：xx.xx
        //     let expr = node.textContent.match(/\{\{(.+?)\}\}/)
        //     console.log(expr)
        //     // 获取数据
        //     let value = this.CompileUtil.getVal(this.vm, expr[1])
        //     // console.log(typeof node.textContent, expr[0], value)
        //     // 替换数据
        //     node.textContent = node.textContent.replace(expr[0], value)
        //     // console.log(node.textContent)
        // }

        if(/\{\{(.+?)\}\}/.test(content)) { // content:xxx{{}} {{}}
            CompileUtil["text"](node, content, this.vm)
        }
    }
    // 判断是否为指令
    isDirective(name) {
        return name.startsWith("v-")
    }
    // 判断是否为元素节点
    isElementNode(node) {
        // 1：元素；2：属性；3：文本
        return node.nodeType === 1
    }
    // 将DOM转换为文档片段
    el2Fragment(node) {
        // DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

        // 因为文档片段存在于内存中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。
        let fragment = document.createDocumentFragment()
        let firstChild = null
        while(firstChild = node.firstChild) {
            // console.log("firstChild",firstChild)
            // console.log("nodeType",firstChild.nodeType)
            // appendChild有移动DOM的功能
            fragment.appendChild(firstChild)
        }
        return fragment
    }
}

// 编译工具
CompileUtil = {
    model(node, expr, vm) {
        const modelUpdate = this.updater["modelUpdate"]

        // 加入观察者
        // 会调用watcher的get方法
        new Watcher(vm, expr, (newVal) => {
            modelUpdate(node, newVal)
        })

        // 双向绑定，实现画面改变数据：添加事件
        node.addEventListener("input", (e) => {
            this.setVal(vm, expr, e.target.value)
        })

        let value = this.getVal(vm, expr)
        modelUpdate(node, value)
    },
    // 处理v-html指令
    html(node, html, vm) {
        node.innerHTML = html
    },
    // 处理绑定事件
    on(node, method, vm, eventName) {
        console.log(vm)
        node.addEventListener(eventName, (e) => {
            // 注意这里的this指向
            vm[method].call(vm, e)
        })
    },
    text(node, expr, vm) {
        const textUpdate = this.updater["textUpdate"]
        // 获取替换过后的文本
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {

            // 给每一个{{}}加上观察者
            // 会调用watcher的get方法
            new Watcher(vm, args[1], (newVal) => {
                textUpdate(node, this.getTextContentValue(vm, expr))
            })

            // ...args: 匹配到的内容，括号中的内容，开始的索引，原始字符串
            // 这里会对匹配到的内容进行循环
            // console.log(...args)
            return this.getVal(vm, args[1])
        })
        // console.log(content)
        textUpdate(node, content)
    },
    updater: {
        modelUpdate(node, value) {
            node.value = value
        },
        htmlUpdate() {

        },
        // 处理文本更新
        // 参数：节点，文本内容
        textUpdate(node, value) {
            node.textContent = value
        }
    },
    // 获取存在插值表达式的文本的值
    getTextContentValue(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    // 获取模板中表达式的值
    getVal(vm, expr) {
        // console.log(expr)
        // expr:stu.name
        // data就是给的初始值vm.$data，以及每一轮的返回值
        return expr.split(".").reduce((data, current)=>{
            return data[current]
        }, vm.$data)
    },
    // 修改数据
    setVal(vm, expr, value) {
        expr.split(".").reduce((data, current, index, arr) => {
            if(index === arr.length - 1) {
                return data[current] = value
            }
            return data[current]
        }, vm.$data)
    }
}
