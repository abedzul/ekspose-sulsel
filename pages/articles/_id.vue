<template>
  <div>
    <v-row>
      <v-col md="8" cols="12">
        <div v-if="article.image">
          <img :src="api_url + article.image.url" alt="" width="100%" />
        </div>

        <h1 class="mt-5">{{ article.title }}</h1>

        <h5 class="text-uppercase mt-5 mb-1" v-if="article.published">
          admin {{ moment(article.published).format("DD MMM YYYY") }}
        </h5>

        <v-btn dark x-small depressed v-if="article.category">
          {{ article.category.name }}
        </v-btn>

        <p
          class="mt-5"
          v-if="article.content"
          v-html="$md.render(article.content)"
        ></p>
      </v-col>

      <v-col md="4" cols="12">
        <Articles :articles="articles" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import articleQuery from "~/apollo/queries/article/article";
import articlesQuery from "~/apollo/queries/article/articles";
import Articles from "~/components/Articles";
var moment = require("moment");

export default {
  components: {
    Articles
  },
  data() {
    return {
      article: {},
      articles: [],
      moment: moment,
      api_url: process.env.strapiBaseUri
    };
  },
  apollo: {
    article: {
      prefetch: true,
      query: articleQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) };
      }
    },
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
