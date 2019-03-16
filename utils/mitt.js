
function mitt(all = Object.create(null)) {
  return {
    on(type, handler) {
      all[type] = all[type] || []
      all[type].push(handler)
    },

    off(type) {
      if (all[type]) {
        all[type] = []
      } else {
        console.warn(`无法关闭，无对应的 ${type}`)
      }
    },

    emit(type, event) {
      const map = all[type]
      if (map && map.length !== 0) {
        for (const iterator of map) {
          iterator(event)
        }
      } else {
        console.warn(`未监听 ${type} 事件`)
      }
    },
  }
}

const emitter = mitt()
mitt.emitter = emitter

module.exports = mitt
