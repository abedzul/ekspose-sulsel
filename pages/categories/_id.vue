<template>
  <div>
    <client-only>
      <h2 class="text-uppercase">{{ category.name }}</h2>
      <v-row>
        <v-col md="3" cols="12" v-for="art in category.articles" :key="art.id">
          <ArticlesGrid :article="art"></ArticlesGrid>
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
import articlesQuery from "~/apollo/queries/article/articles-categories";
import ArticlesGrid from "~/components/ArticlesGrid";

export default {
  data() {
    return {
      category: []
    };
  },
  components: {
    ArticlesGrid
  },
  apollo: {
    category: {
      prefetch: true,
      query: articlesQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) };
      }
    }
  }
};
</script>

<style></style>
