<template>
  <div>
    <router-link
      v-for="article in articles"
      :to="{ name: 'articles-id', params: { id: article.id } }"
      :key="article.id"
    >
      <div>
        <div v-if="article.image">
          <img :src="api_url + article.image[0].url" alt="" height="100" />
        </div>
        <div>
          <p v-if="article.category">
            {{ article.category.name }}
          </p>
          <p>{{ article.title }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import articlesQuery from "~/apollo/queries/article/articles";

export default {
  data() {
    return {
      api_url: process.env.strapiBaseUrl
    };
  },
  props: {
    articles: Array
  }
};
</script>

<style></style>
