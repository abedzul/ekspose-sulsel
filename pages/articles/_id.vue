<template>
  <div>
    <div v-if="article.image" :data-src="api_url + article.image.url">
      <h1>{{ article.title }}</h1>
    </div>

    <div>
      <div>
        <div v-if="article.content" v-html="$md.render(article.content)"></div>
        <p v-if="article.published">
          {{ moment(article.published_at).format("DD MMM YYYY") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import articleQuery from "~/apollo/queries/article/article";
var moment = require("moment");

export default {
  data() {
    return {
      article: {},
      moment: moment,
      api_url: process.env.strapiBaseUri
    };
  },
  apollo: {
    article: {
      prefetch: true,
      query: articleQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) };
      }
    }
  }
};
</script>

<style></style>
