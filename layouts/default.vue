<template>
  <div>
    <!-- navbar -->
    <nav
      class="bg-blue text-white shadow text-grey p-4 flex lg:justify-between items-center fixed w-full z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-6 w-6 mr-4 lg:hidden"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <nuxt-link to="/" class="font-bold tracking-wide lg:w-1/3">
        EKSPOSE SULSEL
      </nuxt-link>
      <div
        class="hidden lg:flex lg:w-2/3 justify-between uppercase text-sm font-semibold tracking-wide"
      >
        <nuxt-link
          v-for="category in categories"
          :key="category.id"
          :to="{
            name: 'categories-slug',
            params: { slug: category.slug, id: category.id }
          }"
          :class="
            $route.fullPath === `/categories/${category.slug}`
              ? `text-yellow`
              : `hover:text-yellow`
          "
        >
          {{ category.name }}
        </nuxt-link>
      </div>
    </nav>
    <!-- end navbar -->

    <main style="padding-top: 56px" class="px-4 lg:px-24">
      <Nuxt />
    </main>

    <!-- footer -->
    <footer class="bg-blue px-4 py-2 text-white">
      <a
        href="https://github.com/kalamangna"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-semibold hover:text-yellow"
      >
        &copy; 2020 - github.com/kalamangna
      </a>
    </footer>
    <!-- end footer -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      // searchDialog: false,
      // searchWhat: "",
      drawer: false
    };
  },
  created() {
    axios
      .get(`${process.env.baseUrl}/categories`)
      .then(res => {
        this.categories = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // openSearch() {
    //   this.searchDialog = true;
    //   this.searchWhat = "";
    // },
    // searchArticle() {
    //   this.searchDialog = false;
    //   this.$router.push({
    //     name: "search-slug",
    //     params: { slug: this.searchWhat }
    //   });
    // }
  }
};
</script>
