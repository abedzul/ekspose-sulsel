<template>
  <div>
    <client-only>
      <v-row>
        <v-col md="8" cols="12">
          <div v-if="article.image">
            <v-img
              :src="article.image.url"
              alt="news"
              max-height="640px"
            ></v-img>
          </div>

          <h1 class="mt-5">{{ article.title }}</h1>

          <h5 class="text-uppercase mt-5 mb-1" v-if="article.published">
            admin
            {{
              moment(article.published)
                .locale("ID")
                .format("DD MMM YYYY")
            }}
          </h5>

          <v-row no-gutters v-if="article.categories" class="mt-2">
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
          </v-row>

          <p
            class="mt-5"
            v-if="article.content"
            v-html="$md.render(article.content)"
          ></p>
        </v-col>

        <v-col md="4" cols="12">
          <h2 class="text-uppercase mb-3">populer</h2>
          <v-row no-gutters v-for="art in articles" :key="art.id">
            <Articles :article="art"></Articles>
          </v-row>
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
import Articles from "~/components/Articles";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    Articles
  },
  data() {
    return {
      articles: [],
      moment: moment,
      error: null
    };
  },
  asyncData(context) {
    return context.$axios
      .get(`${process.env.baseUrl}/articles?slug=${context.params.slug}`)
      .then(res => {
        return { article: res.data[0] };
      })
      .catch(err => {
        console.log(err);
      });
  },
  async mounted() {
    try {
      const res = await axios.get(`${process.env.baseUrl}/articles`);
      this.articles = res.data;
    } catch (error) {
      this.error = error;
    }
  },
  head() {
    let article = this.article;

    return {
      title: `${article.title} | Ekspose Sulsel`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: article.content
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://ekspose-sulsel.herokuapp.com/articles/${article.slug}`
        },
        {
          hid: "og:title",
          property: "og:title",
          content: `${article.title} | Ekspose Sulsel`
        },
        {
          hid: "og:description",
          property: "og:description",
          content: article.content
        },
        {
          hid: "og:image",
          property: "og:image",
          content: article.image.url
        }
      ]
    };
  }
  // created() {
  //   let one = `${process.env.baseUrl}/articles?slug=${this.$route.params.slug}`;
  //   let two = `${process.env.baseUrl}/articles`;

  //   const requestOne = axios.get(one);
  //   const requestTwo = axios.get(two);

  //   axios
  //     .all([requestOne, requestTwo])
  //     .then(
  //       axios.spread((...res) => {
  //         this.article = res[0].data[0];
  //         this.articles = res[1].data;
  //       })
  //     )
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};
</script>

<style></style>
