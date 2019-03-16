
import store from '../store'
import customPage from '../utils/customPage'

customPage({
  store,

  data: {
    
  },

  onLoad () {
    setTimeout(() => {
      this.store.setData({
        test: 'lala',
      })
      console.log(this.store.instances);
    }, 5000);
  },

})