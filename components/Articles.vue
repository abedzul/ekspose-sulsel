<template>
  <v-row no-gutters>
    <v-col cols="4" v-if="post.better_featured_image.source_url">
      <router-link
        :to="{
          name: 'posts-slug',
          params: { slug: post.slug }
        }"
      >
        <v-img
          :src="post.better_featured_image.source_url"
          :lazy-src="post.better_featured_image.source_url"
          alt="news"
          width="90%"
          height="80px"
        ></v-img>
      </router-link>
    </v-col>
    <v-col cols="8">
      <router-link
        :to="{
          name: 'posts-slug',
          params: { slug: post.slug }
        }"
      >
        <div class="body-2 font-weight-bold">
          {{ post.title.rendered }}
        </div>
      </router-link>

      <v-row no-gutters align="center" class="mt-1">
        <v-icon x-small>mdi-clock-outline</v-icon>
        <div class="caption text-uppercase ml-1">
          {{
            moment(post.date)
              .locale("ID")
              .format("DD MMM YYYY")
          }}
        </div>
      </v-row>

      <!-- <v-row no-gutters v-if="article.categories">
        <v-col
          md="auto"
          cols="auto"
          v-for="(category, i) in article.categories"
          :key="category.id"
        >
          <router-link
            :to="{ name: 'categories-slug', params: { slug: category.slug } }"
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
      </v-row> -->
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      moment: moment
    };
  },
  props: {
    post: Object
  }
};
</script>

<style></style>
