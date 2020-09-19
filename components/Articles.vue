<template>
  <div>
    <router-link
      v-for="article in articles"
      :to="{ name: 'articles-id', params: { id: article.id } }"
      :key="article.id"
    >
      <v-row no-gutters>
        <v-col md="4" cols="4" v-if="article.image">
          <img :src="api_url + article.image.url" alt="" width="90%" />
        </v-col>
        <v-col md="6" cols="6">
          <h5 class="mb-2">{{ article.title }}</h5>
          <v-btn dark x-small depressed v-if="article.category">
            {{ article.category.name }}
          </v-btn>
        </v-col>
      </v-row>
    </router-link>
  </div>
</template>

<script>
import articlesQuery from "~/apollo/queries/article/articles";

export default {
  data() {
    return {
      api_url: process.env.strapiBaseUri
    };
  },
  props: {
    articles: Array
  }
};
</script>

<style></style>
