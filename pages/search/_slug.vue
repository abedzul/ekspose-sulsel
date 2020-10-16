<template>
  <div>
    <client-only>
      <div class="title font-weight-medium text-uppercase">
        Hasil Pencarian: {{ findWhat }}
      </div>

      <v-divider
        :class="$vuetify.breakpoint.mobile ? 'mt-1 mb-3' : 'mt-1'"
      ></v-divider>

      <v-row
        :no-gutters="$vuetify.breakpoint.mobile ? true : false"
        v-if="results.length"
      >
        <v-col md="3" cols="12" v-for="res in results" :key="res.id">
          <ArticlesGrid :article="res"></ArticlesGrid>
          <v-divider v-if="$vuetify.breakpoint.mobile" class="my-3"></v-divider>
        </v-col>
      </v-row>
      <v-row :no-gutters="$vuetify.breakpoint.mobile ? true : false" v-else>
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
      .get(
        `${process.env.baseUrl}/articles?title_contains=${context.params.slug}`
      )
      .then(res => {
        return { results: res.data, findWhat: context.params.slug };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
