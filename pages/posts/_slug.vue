<template>
  <client-only>
    <div class="lg:flex">
      <!-- post detail -->
      <section class="py-5 lg:py-10 lg:w-2/3 lg:px-5">
        <!-- post image -->
        <img
          class="w-full"
          :src="post.better_featured_image.source_url"
          alt="news"
        />

        <!-- post title -->
        <h1 class="text-4xl font-bold pt-5 leading-tight">
          {{ post.title.rendered }}
        </h1>

        <!-- post date -->
        <div class="flex items-center mt-5">
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
              moment(post.date)
                .locale("ID")
                .format("DD MMM YYYY")
            }}
          </p>
        </div>

        <!-- post categories -->
        <div class="mt-2">
          <nuxt-link
            :to="{
              name: 'categories-id',
              params: { id: cat.id }
            }"
            v-for="cat in categories"
            :key="cat.id"
            class="bg-yellow text-white mr-2 last:mr-0 px-2 py-1 rounded uppercase text-xs hover:bg-blue tracking-wide font-semibold"
          >
            {{ cat.name }}
          </nuxt-link>
        </div>

        <!-- post content -->
        <p class="mt-5 leading-relaxed" v-html="post.content.rendered"></p>
      </section>

      <hr class="lg:hidden" />

      <!-- posts list -->
      <section class="py-5 lg:py-10 lg:w-1/3 lg:px-5">
        <postsList :news="posts" />
      </section>
    </div>
  </client-only>
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
      moment: moment
    };
  },
  asyncData(context) {
    return context.$axios
      .get(`${process.env.baseUrl}/posts?slug=${context.params.slug}`)
      .then(res => {
        return { post: res.data[0] };
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    categories() {
      let categoriesFilter = [];
      let cats = this.$store.state.categories;
      cats.forEach(cat => {
        let id = cat.id;
        let name = cat.name;

        let postCats = this.post.categories;
        postCats.forEach(postCat => {
          if (id == postCat) {
            let postCatId = {
              id: id,
              name: name
            };
            categoriesFilter.push(postCatId);
          }
        });
      });
      return categoriesFilter;
    }
  }
  // head() {
  //   let article = this.article;

  //   return {
  //     title: `${article.title} | Ekspose Sulsel`,
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: article.content
  //       },
  //       {
  //         hid: "og:url",
  //         property: "og:url",
  //         content: `https://ekspose-sulsel.herokuapp.com/articles/${article.slug}`
  //       },
  //       {
  //         hid: "og:title",
  //         property: "og:title",
  //         content: `${article.title} | Ekspose Sulsel`
  //       },
  //       {
  //         hid: "og:description",
  //         property: "og:description",
  //         content: article.content
  //       },
  //       {
  //         hid: "og:image",
  //         property: "og:image",
  //         content: article.image.url
  //       },
  //       {
  //         hid: "twitter:card",
  //         property: "twitter:card",
  //         content: article.image.url
  //       },
  //       {
  //         hid: "twitter:url",
  //         property: "twitter:url",
  //         content: `https://ekspose-sulsel.herokuapp.com/articles/${article.slug}`
  //       },
  //       {
  //         hid: "twitter:title",
  //         property: "twitter:title",
  //         content: `${article.title} | Ekspose Sulsel`
  //       },
  //       {
  //         hid: "twitter:description",
  //         property: "twitter:description",
  //         content: article.content
  //       },
  //       {
  //         hid: "twitter:image",
  //         property: "twitter:image",
  //         content: article.image.url
  //       }
  //     ]
  //   };
  // }
};
</script>

<style></style>
