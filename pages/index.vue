<template>
  <div>
    <v-row>
      <v-col md="8" cols="12">
        <v-carousel>
          <v-carousel-item
            v-for="img in articles"
            :key="img.id"
            :src="api_url + img.image.url"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col md="4" cols="12">
        <Articles :articles="articles"></Articles>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import articlesQuery from "~/apollo/queries/article/articles";
import Articles from "~/components/Articles";

export default {
  data() {
    return {
      articles: [],
      api_url: process.env.strapiBaseUri
    };
  },
  components: {
    Articles
  },
  apollo: {
    articles: {
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
