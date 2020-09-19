<template>
  <div>
    <client-only>
      <h2 class="text-uppercase">{{ category.name }}</h2>
      <v-row>
        <v-col md="4" cols="12">
          <Articles :articles="category.articles || []"></Articles>
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
import articlesQuery from "~/apollo/queries/article/articles-categories";
import Articles from "~/components/Articles";

export default {
  data() {
    return {
      category: []
    };
  },
  components: {
    Articles
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
