<template>
  <div>
    <v-row>
      <v-col md="8" cols="12">
        <v-carousel
          cycle
          hide-delimiter-background
          :show-arrows="false"
          :height="$vuetify.breakpoint.mobile ? '250px' : '500px'"
        >
          <v-carousel-item
            v-for="img in articles.slice(0, 5)"
            :key="img.id"
            :src="img.image.url"
            :lazy-src="img.image.url"
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
                <h1 class="slide-title">{{ img.title }}</h1>
              </router-link>
              <h5 class="text-uppercase mt-2 slide-date" v-if="img.published">
                admin
                {{
                  moment(img.published)
                    .locale("ID")
                    .format("DD MMM YYYY")
                }}
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
        <div v-for="art in articles" :key="art.id">
          <Articles :article="art"></Articles>
        </div>
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
      moment: moment,
      error: null
    };
  },
  components: {
    Articles,
    ArticlesGrid
  },
  async mounted() {
    try {
      const res = await axios.get(
        `${process.env.baseUrl}/articles?_sort=id:DESC`
      );
      this.articles = res.data;
    } catch (error) {
      this.error = error;
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
  padding: 70px 100px;
}

@media (min-width: 320px) and (max-width: 480px) {
  .headline-container {
    padding: 60px 30px;
  }
  .slide-title {
    font-size: 20px;
  }
  .slide-date {
    font-size: 12px;
  }
}
</style>
