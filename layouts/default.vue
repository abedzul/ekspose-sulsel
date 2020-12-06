<template>
  <div>
    <!-- navbar -->
    <nav
      class="bg-blue text-white shadow text-grey p-4 flex justify-between items-center fixed w-full z-50"
    >
      <router-link to="/" class="font-bold tracking-wide lg:w-1/3">
        EKSPOSE SULSEL
      </router-link>

      <div
        class="flex lg:w-2/3 justify-between uppercase text-sm font-semibold tracking-wide"
      >
        <router-link
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
        </router-link>
      </div>
    </nav>
    <!-- end navbar -->

    <main style="padding-top: 56px">
      <Nuxt />
    </main>

    <!-- footer -->
    <footer class="bg-blue p-2 text-white">
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
