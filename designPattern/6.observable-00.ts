// on 订阅 off 取消 emit 发布 once 执行一次
class Observer1 {
    // 事件中心
    private caches = {}
    on(eventName, fn) {
        // 一个名称对应一个fn数组
        this.caches[eventName] = this.caches[eventName] || []
        this.caches[eventName].push(fn)
    }
    off(eventName, fn) {
        if(this.caches[eventName]) {
            const newFns = fn ? this.caches[eventName].filter(v => v !== fn) : []
            this.caches[eventName] = newFns
        }
    }
    emit(eventName, data) {
        if(this.caches[eventName]) {
            this.caches[eventName].foreach(fn => fn(data))
        }
    }
}

// map实现
class Observer2 {
    static events = new Map
    static on(name, fn) {
        this.events.set(name, {isOnce: false, fn})
    }
    static off(name) {
        this.events.delete(name)
    }
    static once(name, fn) {
        this.events.set(name, {isOnce: true, fn})
    }
    static emit(name, data) {
        const obj = this.events.get(name)
        if(obj) {
            if(obj.isOnce) {
                this.events.delete(name)
            }
            obj.fn(data)
        }
    }
}
// ========================================
class Sub {
    private observers = new Map()
    public addObserver(key, obj) {
        this.observers.set(key, obj)
    }
    public deleteObserver(key) {
        if(this.observers.has(key)) {
            this.observers.delete(key)
        }else {
            throw new Error('not exist')
        }
    }
    public notifyObserver() {
        for(const item of this.observers) {
            item[1].update()
        }
    }
    public publish() {
        this.notifyObserver()
    }
  }
class Observer0 {
    public update() {
        console.log('update');
    }
}