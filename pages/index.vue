<template>
  <div>
    <v-row>
      <v-col md="8" cols="12">
        <v-carousel cycle>
          <v-carousel-item
            v-for="img in articles"
            :key="img.id"
            :src="img.image.url"
          >
            <v-row
              no-gutters
              align="flex-end"
              class="px-10 py-15"
              style="height: 100%; background: linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,1) 80%);"
            >
              <v-col md="12" cols="12">
                <h1>{{ img.title }}</h1>
              </v-col>
              <v-col md="12" cols="12">
                <h5 class="text-uppercase" v-if="img.published">
                  admin {{ moment(img.published).format("DD MMM YYYY") }}
                </h5>
              </v-col>
            </v-row>
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
  mounted() {
    console.log(this.articles);
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
