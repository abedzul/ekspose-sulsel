<template>
  <div>
    <v-row>
      <v-col md="8" cols="12">
        <v-carousel cycle hide-delimiters>
          <v-carousel-item
            v-for="img in articles.slice(0, 5)"
            :key="img.id"
            :src="img.image.url"
          >
            <div
              class="d-flex flex-column justify-end fill-height headline-container"
            >
              <router-link
                :to="{ name: 'articles-id', params: { id: img.id } }"
              >
                <h1>{{ img.title }}</h1>
              </router-link>
              <h5 class="text-uppercase mt-2" v-if="img.published">
                admin {{ moment(img.published).format("DD MMM YYYY") }}
              </h5>
            </div>
          </v-carousel-item>
        </v-carousel>

        <h2 class="mt-5">POPULER</h2>
        <v-row>
          <v-col
            md="4"
            cols="12"
            v-for="art in articles.slice(0, 6)"
            :key="art.id"
          >
            <ArticlesGrid :article="art"></ArticlesGrid>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4" cols="12">
        <h2 class="mb-3">TERBARU</h2>
        <v-row no-gutters v-for="art in articles" :key="art.id">
          <Articles :article="art"></Articles>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import articlesQuery from "~/apollo/queries/article/articles";
import Articles from "~/components/Articles";
import ArticlesGrid from "~/components/ArticlesGrid";
var moment = require("moment");

export default {
  data() {
    return {
      articles: [],
      moment: moment
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

<style scoped>
.headline-container {
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(0, 0, 0, 1) 90%
  );
  padding: 50px 100px;
}
</style>
