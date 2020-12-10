<template>
  <div class="lg:flex">
    <!-- headline -->
    <section class="py-5 lg:py-10 lg:w-2/3 lg:px-5">
      <div class="h-60 lg:h-screen w-full bg-yellow"></div>
    </section>

    <hr class="lg:hidden" />

    <!-- posts list -->
    <section class="py-5 lg:py-10 lg:w-1/3 lg:px-5">
      <postsList :news="posts" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import postsList from "@/components/postsList.vue";

export default {
  components: {
    postsList
  },
  data() {
    return {
      moment: moment,
      error: null
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  }
};
</script>
