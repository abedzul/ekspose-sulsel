<template>
  <div>
    <router-link
      :to="{ name: 'articles-slug', params: { slug: article.slug } }"
    >
      <v-img
        :src="article.image.formats.small.url"
        :lazy-src="article.image.formats.small.url"
        alt="news"
        width="100%"
        :height="$vuetify.breakpoint.mobile ? '200px' : '180px'"
      ></v-img>
      <div class="body-2 font-weight-bold mt-1">
        {{ article.title }}
      </div>
    </router-link>

    <v-row no-gutters align="center" class="my-1">
      <v-icon x-small>mdi-clock-outline</v-icon>
      <div class="caption text-uppercase ml-1">
        {{
          moment(article.published)
            .locale("ID")
            .format("DD MMM YYYY")
        }}
      </div>
    </v-row>

    <v-row no-gutters v-if="article.categories">
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
    </v-row>
  </div>
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
    article: Object
  }
};
</script>

<style></style>
