/**
 * 防抖，防止触发多次点击，造成资源浪费
 * (在N秒内只能执行一次事件，若在N秒内再次进行触发，则会清除前一个事件，重新进行计算)
 * @param {Number} delay
 */
export function Debounce(delay: number = 100) {
  let timeOut
  return (t, k, p) => {
    const fn = p.value
    p.value = function(...args) {
      if (timeOut) {
        clearTimeout(timeOut)
      }
      timeOut = setTimeout(() => {
        fn.call(this, ...args)
      }, delay)
    }
  }
}

/**
 * 节流，防止触发多次点击，造成资源浪费
 * (连续触发事件在N秒内只执行一次函数，会起到稀释效果)
 * @param {Number} delay
 */
export function Throttle(delay: number = 200) {
  let timeOut
  return (t, k, p) => {
    const fn = p.value
    p.value = function(...args) {
      if (!timeOut) {
        timeOut = setTimeout(() => {
          timeOut = null
          fn.apply(this, args)
        }, delay)
      }
    }
  }
}

/**
 * 锁
 */
export function Lock() {
  return (t, k, p) => {
    let locked = false
    const fn = p.value
    p.value = async function(...args) {
      if (locked) {
        return
      }
      try {
        locked = true
        await fn.call(this, ...args)
      } catch (error) {
        console.trace(error)
      } finally {
        locked = false
      }
    }
  }
}
