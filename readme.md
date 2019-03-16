
使用 store 在小程序中多页面同步更新数据

#### 使用

先定义 store

```js
export default {
  data: {
    test: 'haha',
  },

  onChange (data) {
    console.log(data);
  },
}
```



```js
// 使用
import store from '../store'
import customPage from '../utils/customPage'

customPage({
  store,

  data: {
    
  },

  onLoad () {
    // 多个页面同步更新
    this.store.setData({
      test: 'lala',
    })
  },
})
```


