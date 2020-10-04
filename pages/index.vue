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
                :to="{
                  name: 'articles-slug',
                  params: { slug: img.slug }
                }"
              >
                <h1>{{ img.title }}</h1>
              </router-link>
              <h5 class="text-uppercase mt-2" v-if="img.published">
                admin {{ moment(img.published).format("DD MMM YYYY") }}
              </h5>
            </div>
          </v-carousel-item>
        </v-carousel>

        <h2 class="text-uppercase mt-5">terbaru</h2>
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
        <h2 class="text-uppercase mb-3">populer</h2>
        <v-row no-gutters v-for="art in articles" :key="art.id">
          <Articles :article="art"></Articles>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Articles from "~/components/Articles";
import ArticlesGrid from "~/components/ArticlesGrid";
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      articles: [],
      moment: moment
    };
  },
  components: {
    Articles,
    ArticlesGrid
  },
  created() {
    axios
      .get(`${process.env.baseUrl}/articles`)
      .then(res => {
        this.articles = res.data;
      })
      .catch(err => {
        console.log(err);
      });
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
