
import customPage from '../../utils/customPage'
import store from '../../store'

customPage({
  data: {
    
  },

  store,

  onLoad () {
    console.log(this.store);
    const store = getCurrentPages().shift().store
    console.log(Object.is(store, this.store))
  },

})