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
                <div class="headline font-weight-bold">
                  {{ img.title }}
                </div>
              </router-link>
              <div class="caption text-uppercase mt-2">
                admin
                {{
                  moment(img.published)
                    .locale("ID")
                    .format("DD MMM YYYY")
                }}
              </div>
            </div>
          </v-carousel-item>
        </v-carousel>

        <div class="title font-weight-medium text-uppercase mt-4">
          Terbaru
        </div>

        <v-divider
          :class="$vuetify.breakpoint.mobile ? 'mt-1 mb-3' : 'mt-1'"
        ></v-divider>

        <v-row :no-gutters="$vuetify.breakpoint.mobile ? true : false">
          <v-col md="4" cols="12" v-for="art in articles" :key="art.id">
            <ArticlesGrid :article="art"></ArticlesGrid>
            <v-divider
              v-if="$vuetify.breakpoint.mobile"
              class="my-3"
            ></v-divider>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4" cols="12">
        <v-card class="px-3 py-1">
          <div class="title font-weight-medium text-uppercase mb-1">
            Populer
          </div>
          <div
            v-for="(art, i) in articles.slice(0, 5)"
            :key="art.id"
            class="mb-2"
          >
            <v-divider :class="i > 0 ? 'my-3' : 'mb-3'"></v-divider>
            <Articles :article="art"></Articles>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
    Articles: () => import("@/components/Articles"),
    ArticlesGrid: () => import("@/components/ArticlesGrid")
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
    padding: 50px 20px;
  }
}
</style>
