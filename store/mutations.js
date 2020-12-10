export default {
  STORE_POSTS(state, payload) {
    state.posts = payload;
  },
  STORE_CATEGORIES(state, payload) {
    state.categories = payload;
  }
};
