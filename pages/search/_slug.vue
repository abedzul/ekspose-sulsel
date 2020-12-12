<template>
  <client-only>
    <div class="lg:flex">
      <section class="py-5 lg:py-10 lg:px-5 lg:w-1/3">
        <!-- search title -->
        <h1 class="font-bold text-lg uppercase">
          hasil pencarian: {{ searchQuery }}
        </h1>

        <!-- posts list -->
        <div class="mt-5">
          <div v-if="results.length">
            <postsList :news="results" />
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
    const results = await $axios.$get(
      `${process.env.baseUrl}/posts?search=${params.slug}`
    );
    const searchQuery = params.slug;
    return {
      results,
      searchQuery
    };
  }
};
</script>

<style></style>
