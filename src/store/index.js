import Vue from 'vue';
import Vuex from 'vuex';

import tab from './tab'
import user from './user'

Vue.use(Vuex)



// const actions = {}
// const mutations = {}
// const state = {}

export default new Vuex.Store({
  modules: {
    tab,
    user
  }
})
