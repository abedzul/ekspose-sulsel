<template>
  <div>
    <v-row no-gutters class="mb-3">
      <v-col md="4" cols="4" v-if="article.image">
        <router-link :to="{ name: 'articles-id', params: { id: article.id } }">
          <img :src="article.image.url" alt="" width="90%" />
        </router-link>
      </v-col>
      <v-col md="8" cols="8">
        <router-link :to="{ name: 'articles-id', params: { id: article.id } }">
          <h5 class="mb-1">{{ article.title }}</h5>
        </router-link>

        <v-row no-gutters align="center" class="mb-1">
          <v-icon x-small>mdi-clock-outline</v-icon>
          <h6 class="text-uppercase ml-1">
            {{ moment(article.published).format("DD MMM YYYY") }}
          </h6>
        </v-row>

        <v-row no-gutters v-if="article.categories">
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
                x-small
                depressed
                :class="i == article.categories.length - 1 ? null : 'mr-1'"
              >
                {{ category.name }}
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
var moment = require("moment");

export default {
  data() {
    return {
      moment: moment
    };
  },
  props: {
    article: Object
  }
};
</script>

<style></style>
