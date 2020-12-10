<template>
  <div>
    <div
      v-for="post in news"
      :key="post.id"
      class="flex border-b pt-3 pb-3 first:pt-0"
    >
      <div class="w-1/3">
        <!-- post image -->
        <nuxt-link
          :to="{
            name: 'posts-slug',
            params: { slug: post.slug }
          }"
        >
          <img
            class="h-20"
            :src="post.better_featured_image.source_url"
            alt="news"
          />
        </nuxt-link>
      </div>

      <div class="w-2/3">
        <!-- post title -->
        <nuxt-link
          :to="{
            name: 'posts-slug',
            params: { slug: post.slug }
          }"
        >
          <h3 class="font-semibold hover:text-blue">
            {{ post.title.rendered }}
          </h3>
        </nuxt-link>

        <!-- post date -->
        <div class="flex items-center mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-4 w-4 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-xs uppercase">
            {{
              moment(news.date)
                .locale("ID")
                .format("DD MMM YYYY")
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    news: Array
  },
  data() {
    return {
      moment: moment
    };
  }
};
</script>

<style></style>
