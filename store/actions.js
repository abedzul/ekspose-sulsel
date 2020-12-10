export default {
  storePosts({ commit }, payload) {
    commit("STORE_POSTS", payload);
  },
  storeCategories({ commit }, payload) {
    commit("STORE_CATEGORIES", payload);
  }
};
