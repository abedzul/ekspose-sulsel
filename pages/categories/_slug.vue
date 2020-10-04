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
        no data
      </v-row>
    </client-only>
  </div>
</template>

<script>
import ArticlesGrid from "~/components/ArticlesGrid";
import axios from "axios";

export default {
  data() {
    return {
      category: []
    };
  },
  components: {
    ArticlesGrid
  },
  created() {
    axios
      .get(`${process.env.baseUrl}/categories?slug=${this.$route.params.slug}`)
      .then(res => {
        this.category = res.data[0];
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
