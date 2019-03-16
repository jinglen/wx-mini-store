
class CustomPage {

  initPage (options) {
    if (options.store) {
      // HACK 微信不会直接使用 options，会克隆一次，导致多个页面的 store 对象不同
      const store = options.store
      options.store = null
      this.initStore(store)

      const { onLoad, onUnload } = options
      
      options.onLoad = function (pageOpt) {
        this.store = store
        this.store.instances.push(this)
        const clone = JSON.parse(JSON.stringify(this.store.data))
        this.setData({
          store: clone,
        })

        if (onLoad) { onLoad.call(this, pageOpt) }
      }

      options.onUnload = function (pageOpt) {
        const { instances } = this.store
        const index = instances.findIndex(c => Object.is(c, this))
        this.store.instances.splice(index, 1)
        
        if (onUnload) { onUnload.call(this, pageOpt) }
      }

      Page(options)
    } else {
      Page(options)
    }
  }

  initStore (store) {
    if (!store.instances) {
      store.instances = []
    }

    if (!store.setData) {
      this.initSetData(store)
    }
  }

  initSetData (store) {
    store.setData = function setEachPageData (rawData) {
      const data = Object.entries(rawData)
        .map(([key, value]) =>  [`store.${key}`, value])
        .reduce((prev, c) => {
          const [key, value] = c
          prev[key] = value
          return prev
        }, {})

      // TIPS 原作者在此使用了 setTimeout ，可能在规避小程序某些奇怪表现，还是在优化性能？
      for (const page of this.instances) {
        page.setData(data)
      }

      // 同步数据到 store.data
      Object.keys(rawData).forEach((rawKey) => {
        const trimKey = rawKey.endsWith(']') ? rawKey.slice(0, -1) : rawKey
        const keyArr = trimKey.split(/[\.\[\]]/)
        const lastKey = keyArr.pop()

        // 取得最后一个对象或数组，为赋值准备
        const lastObj = keyArr.reduce((prev, c) => {
          return prev[c]
        }, this.data)

        lastObj[lastKey] = rawData[rawKey]
      })

      if (this.onChange) { this.onChange(rawData) }
    }
  }

}

const customPage = new CustomPage()
const initPage = customPage.initPage.bind(customPage)

export default initPage
