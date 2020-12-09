<template>
  <div>
    <img :src="post.better_featured_image.source_url" alt="news" />
    <h1 class="text-4xl font-bold">
      {{ post.title.rendered }}
    </h1>
    <p v-html="post.content.rendered"></p>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      posts: [],
      moment: moment,
      error: null
    };
  },
  asyncData(context) {
    return context.$axios
      .get(`${process.env.baseUrl}/posts?slug=${context.params.slug}`)
      .then(res => {
        return { post: res.data[0] };
      })
      .catch(err => {
        console.log(err);
      });
  },
  async mounted() {
    try {
      const res = await axios.get(`${process.env.baseUrl}/posts`);
      this.posts = res.data;
    } catch (error) {
      this.error = error;
    }
  }
  // head() {
  //   let article = this.article;

  //   return {
  //     title: `${article.title} | Ekspose Sulsel`,
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: article.content
  //       },
  //       {
  //         hid: "og:url",
  //         property: "og:url",
  //         content: `https://ekspose-sulsel.herokuapp.com/articles/${article.slug}`
  //       },
  //       {
  //         hid: "og:title",
  //         property: "og:title",
  //         content: `${article.title} | Ekspose Sulsel`
  //       },
  //       {
  //         hid: "og:description",
  //         property: "og:description",
  //         content: article.content
  //       },
  //       {
  //         hid: "og:image",
  //         property: "og:image",
  //         content: article.image.url
  //       },
  //       {
  //         hid: "twitter:card",
  //         property: "twitter:card",
  //         content: article.image.url
  //       },
  //       {
  //         hid: "twitter:url",
  //         property: "twitter:url",
  //         content: `https://ekspose-sulsel.herokuapp.com/articles/${article.slug}`
  //       },
  //       {
  //         hid: "twitter:title",
  //         property: "twitter:title",
  //         content: `${article.title} | Ekspose Sulsel`
  //       },
  //       {
  //         hid: "twitter:description",
  //         property: "twitter:description",
  //         content: article.content
  //       },
  //       {
  //         hid: "twitter:image",
  //         property: "twitter:image",
  //         content: article.image.url
  //       }
  //     ]
  //   };
  // }
};
</script>

<style></style>
