<template>
  <div>
    <v-row>
      <v-col md="8" cols="12">
        <div v-if="article.image">
          <img :src="article.image.url" alt="" width="100%" />
        </div>

        <h1 class="mt-5">{{ article.title }}</h1>

        <h5 class="text-uppercase mt-5 mb-1" v-if="article.published">
          admin {{ moment(article.published).format("DD MMM YYYY") }}
        </h5>

        <v-row no-gutters v-if="article.categories" class="mt-2">
          <v-col
            md="auto"
            cols="auto"
            v-for="(category, i) in article.categories"
            :key="category.id"
          >
            <router-link
              :to="{ name: 'categories-id', params: { id: category.id } }"
            >
              <v-btn
                dark
                small
                depressed
                :class="i == article.categories.length - 1 ? null : 'mr-2'"
              >
                {{ category.name }}
              </v-btn>
            </router-link>
          </v-col>
        </v-row>

        <p
          class="mt-5"
          v-if="article.content"
          v-html="$md.render(article.content)"
        ></p>
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
      moment: moment
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
