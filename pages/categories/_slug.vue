<template>
  <div>
    <client-only>
      Kategori: {{ name }}
      <div v-for="post in posts" :key="post.id">
        {{ post.title.rendered }}
      </div>
    </client-only>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ $axios, params }) {
    const posts = await $axios.$get(
      `${process.env.baseUrl}/posts?categories=${params.id}`
    );
    const name = params.slug;
    return {
      posts,
      name
    };
  }
};
</script>
