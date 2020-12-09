<template>
  <div class="lg:flex">
    <!-- headline -->
    <section class="py-5 lg:py-10 lg:w-2/3 lg:px-5">
      <div class="h-60 lg:h-96 w-full bg-yellow"></div>
    </section>

    <!-- posts list -->
    <section class="py-5 lg:py-10 lg:w-1/3 lg:px-5">
      <div v-for="post in posts" :key="post.id">
        <nuxt-link
          :to="{
            name: 'posts-slug',
            params: { slug: post.slug }
          }"
        >
          <h3 class="font-bold">{{ post.title.rendered }}</h3>
        </nuxt-link>
        <p class="text-sm">
          {{
            moment(post.date)
              .locale("ID")
              .format("LL")
          }}
        </p>
      </div>
    </section>
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
  async mounted() {
    try {
      const res = await axios.get(`${process.env.baseUrl}/posts`);
      this.posts = res.data;
    } catch (error) {
      this.error = error;
    }
  }
};
</script>
