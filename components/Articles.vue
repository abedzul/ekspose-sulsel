<template>
  <div>
    <v-row no-gutters v-for="article in articles" :key="article.id">
      <v-col md="4" cols="4" v-if="article.image">
        <router-link :to="{ name: 'articles-id', params: { id: article.id } }">
          <img :src="api_url + article.image.url" alt="" width="90%" />
        </router-link>
      </v-col>
      <v-col md="8" cols="8">
        <router-link :to="{ name: 'articles-id', params: { id: article.id } }">
          <h5 class="mb-2">{{ article.title }}</h5>
        </router-link>
        <v-row no-gutters v-if="article.categories">
          <v-btn
            dark
            x-small
            depressed
            v-for="(category, i) in article.categories"
            :key="category.id"
            :class="i == article.categories.length - 1 ? null : 'mr-1'"
          >
            {{ category.name }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
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
