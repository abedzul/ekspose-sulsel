<template>
  <div>
    <client-only>
      <v-row>
        <v-col md="8" cols="12">
          <!-- <div v-if="article.image">
            <v-img
              :src="article.image.url"
              :lazy-src="article.image.url"
              alt="news"
              max-height="640px"
            ></v-img>
          </div> -->

          <div class="display-1 font-weight-bold mt-5">
            {{ post.title.rendered }}
          </div>

          <v-row no-gutters align="center" class="caption text-uppercase mt-5">
            <span>admin</span>
            <v-icon class="mx-1" x-small>mdi-clock-outline</v-icon>
            <span>
              {{
                moment(post.date)
                  .locale("ID")
                  .format("DD MMM YYYY")
              }}
            </span>
          </v-row>

          <!-- <v-row no-gutters v-if="article.categories" class="mt-1">
            <v-col
              md="auto"
              cols="auto"
              v-for="(category, i) in article.categories"
              :key="category.id"
            >
              <router-link
                :to="{
                  name: 'categories-slug',
                  params: { slug: category.slug }
                }"
              >
                <v-btn
                  dark
                  small
                  depressed
                  :class="i == article.categories.length - 1 ? null : 'mr-2'"
                >
                  {{ category.name }}
                </v-btn>
              </router-link>
            </v-col>
          </v-row> -->

          <div class="mt-5" v-html="$md.render(post.content.rendered)"></div>
        </v-col>

        <v-col md="4" cols="12">
          <v-card class="px-3 py-1">
            <div class="title font-weight-medium text-uppercase mb-1">
              Populer
            </div>
            <div
              v-for="(post, i) in posts.slice(0, 5)"
              :key="post.id"
              class="mb-2"
            >
              <v-divider :class="i > 0 ? 'my-3' : 'mb-3'"></v-divider>
              <Articles :post="post"></Articles>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  components: {
    Articles: () => import("@/components/Articles")
  },
  data() {
    return {
      posts: [],
      moment: moment,
      error: null
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
  async mounted() {
    try {
      const res = await axios.get(`${process.env.baseUrl}/posts`);
      this.posts = res.data;
    } catch (error) {
      this.error = error;
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
