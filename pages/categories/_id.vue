<template>
  <client-only>
    <div class="lg:flex">
      <section class="py-5 lg:py-10 lg:px-5 lg:w-1/3">
        <!-- category title -->
        <h1 class="font-bold text-lg uppercase">kategori:</h1>

        <!-- posts list -->
        <div class="mt-5">
          <div v-if="posts.length">
            <postsList :news="posts" />
          </div>
          <div v-else>
            no data
          </div>
        </div>
      </section>

      <section class="py-5 lg:py-10 lg:px-5 lg:w-2/3">
        ads
      </section>
    </div>
  </client-only>
</template>

<script>
import axios from "axios";
import postsList from "@/components/postsList.vue";

export default {
  components: {
    postsList
  },
  async asyncData({ $axios, params }) {
    const posts = await $axios.$get(
      `${process.env.baseUrl}/posts?categories=${params.id}`
    );
    return {
      posts
    };
  }
};
</script>
