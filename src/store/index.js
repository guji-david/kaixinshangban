import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  activeIndex: 0,
};
const mutations = {
  updateActiveIndex(state,index){
    state.activeIndex =index;
  },





}
const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})

