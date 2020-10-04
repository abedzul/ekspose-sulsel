<template>
  <div>
    <client-only>
      <h2 class="text-uppercase">hasil pencarian: {{ findWhat }}</h2>
      <v-row v-if="results.length">
        <v-col md="3" cols="12" v-for="res in results" :key="res.id">
          <ArticlesGrid :article="res"></ArticlesGrid>
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
import ArticlesGrid from "~/components/ArticlesGrid";
import axios from "axios";

export default {
  data() {
    return {
      results: [],
      findWhat: ""
    };
  },
  components: {
    ArticlesGrid
  },
  created() {
    axios
      .get(
        `${process.env.baseUrl}/articles?title_contains=${this.$route.params.slug}`
      )
      .then(res => {
        this.results = res.data;
        this.findWhat = this.$route.params.slug;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
