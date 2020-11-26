<template>
  <div>
    <client-only>
      <div class="title font-weight-medium text-uppercase">
        Kategori: {{ name }}
      </div>

      <v-divider
        :class="$vuetify.breakpoint.mobile ? 'mt-1 mb-3' : 'mt-1'"
      ></v-divider>

      <v-row :no-gutters="$vuetify.breakpoint.mobile ? true : false">
        <v-col md="3" cols="12" v-for="post in posts" :key="post.id">
          <ArticlesGrid :post="post"></ArticlesGrid>
          <v-divider v-if="$vuetify.breakpoint.mobile" class="my-3"></v-divider>
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
      .get(`${process.env.baseUrl}/posts?categories=${context.params.id}`)
      .then(res => {
        return { posts: res.data, name: context.params.slug };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
