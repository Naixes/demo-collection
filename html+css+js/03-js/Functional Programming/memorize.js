// 缓存函数
function memorize(fn) {
    let cache = new map()
    return function() {
      const key = JSON.strinify(arguments)
      if(!cahce.has(key)) {
          cache.set(key, fn.apply(this, arguments))
      }
      return cahce.get(key)
    }
  }