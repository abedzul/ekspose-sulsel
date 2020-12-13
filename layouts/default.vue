<template>
  <div>
    <!-- navbar -->
    <nav
      class="bg-blue text-white shadow text-grey p-4 flex justify-between items-center w-full z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-6 w-6 lg:hidden"
        @click="drawer = !drawer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <nuxt-link
        to="/"
        class="font-bold tracking-wide lg:w-1/3"
        @click.native="drawer = false"
      >
        EKSPOSE SULSEL
      </nuxt-link>

      <div
        :class="
          drawer
            ? `absolute flex flex-col p-4 uppercase text-sm font-semibold tracking-wide bg-blue items-center inset-0 mt-14 gap-y-2`
            : `hidden lg:flex lg:w-2/3 justify-between uppercase text-sm font-semibold tracking-wide`
        "
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
          @click.native="drawer = false"
        >
          {{ category.name }}
        </nuxt-link>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-6 w-6 lg:ml-8 cursor-pointer"
        @click="modal = !modal"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>

      <div
        v-if="modal"
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50"
      >
        <div class="relative bg-blue p-4 flex items-center w-80 lg:w-96">
          <input
            v-model="search"
            autofocus
            @keyup.enter="searchPosts"
            class="text-black focus:outline-none px-2 py-1 w-full"
          />
          <button
            @click="searchPosts"
            class="uppercase bg-yellow focus:outline-none ml-2 px-2 py-1"
          >
            cari
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-6 w-6 cursor-pointer ml-2"
            @click="modal = false"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div v-if="modal" class="absolute z-40 inset-0 opacity-25 bg-black"></div>
    </nav>
    <!-- end navbar -->

    <main class="px-4 lg:px-24">
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
      drawer: false,
      modal: false,
      search: ""
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
    searchPosts() {
      this.modal = false;
      this.$router.push({
        name: "search-slug",
        params: { slug: this.search }
      });
    }
  }
};
</script>
