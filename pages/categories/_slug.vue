<template>
  <div>
    <client-only>
      <h2 class="text-uppercase">kategori: {{ category.name }}</h2>
      <v-row v-if="category.articles.length">
        <v-col md="3" cols="12" v-for="art in category.articles" :key="art.id">
          <ArticlesGrid :article="art"></ArticlesGrid>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col md="12" cols="12">
          no data
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    ArticlesGrid: () => import("@/components/ArticlesGrid")
  },
  asyncData(context) {
    return context.$axios
      .get(`${process.env.baseUrl}/categories?slug=${context.params.slug}`)
      .then(res => {
        return { category: res.data[0] };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
