<template>
  <div>
    <div>
      <li v-for="category in categories" :key="category.id">
        <router-link
          :to="{ name: 'categories-id', params: { id: category.id } }"
          >{{ category.name }}
        </router-link>
      </li>
    </div>

    <Nuxt />
  </div>
</template>

<script>
import categoriesQuery from "~/apollo/queries/category/categories";

export default {
  data() {
    return {
      categories: []
    };
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    }
  }
};
</script>

<style>
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
