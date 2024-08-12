import { createStore } from 'vuex'

export default createStore({
  state: {
    offerCode: ''
  },
  mutations: {
    SET_OFFER_CODE(state, code) {
      state.offerCode = code;
    }
  },
  actions: {
    updateOfferCode({ commit }, code) {
      commit('SET_OFFER_CODE', code);
    }
  },
  getters: {
    getOfferCode(state) {
      return state.offerCode;
    }
  }
})
