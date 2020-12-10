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
        id="navMobile"
        class="hidden absolute lg:static lg:flex lg:w-2/3 justify-between uppercase text-sm font-semibold tracking-wide"
      >
        <nuxt-link
          v-for="category in categories"
          :key="category.id"
          :to="{
            name: 'categories-id',
            params: { id: category.id }
          }"
          :class="
            $route.fullPath === `/categories/${category.id}`
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
      drawer: false
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  async created() {
    const urls = ["posts", "categories"];

    try {
      const response = await Promise.all(
        urls.map(url =>
          fetch(`${process.env.baseUrl}/${url}`).then(res => res.json())
        )
      );
      this.$store.dispatch("storePosts", response[0]);
      this.$store.dispatch("storeCategories", response[1]);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // toggleNav() {
    //   console.log(this.drawer);
    //   this.drawer == !this.drawer;
    //   const nav = document.getElementById("navMobile");
    //   nav.style.display = "flex";
    //   nav.style.flexDirection = "column";
    //   nav.style.padding = "1rem";
    //   nav.style.backgroundColor = "#102674";
    //   nav.style.top = 0;
    //   nav.style.left = 0;
    // }
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
