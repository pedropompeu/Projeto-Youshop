import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedProduct: null,
  },
  mutations: {
    setProduct(state, product) {
      state.selectedProduct = product;
    },
  },
  actions: {
    setProduct({ commit }, product) {
      commit('setProduct', product);
    },
  },
  getters: {
    selectedProduct: (state) => state.selectedProduct,
  },
});
