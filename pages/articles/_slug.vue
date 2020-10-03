<template>
  <div>
    <v-row>
      <v-col md="8" cols="12">
        <div v-if="article.image">
          <img :src="article.image.url" alt="" width="100%" />
        </div>

        <h1 class="mt-5">{{ article.title }}</h1>

        <h5 class="text-uppercase mt-5 mb-1" v-if="article.published">
          admin {{ moment(article.published).format("DD MMM YYYY") }}
        </h5>

        <v-row no-gutters v-if="article.categories" class="mt-2">
          <v-col
            md="auto"
            cols="auto"
            v-for="(category, i) in article.categories"
            :key="category.id"
          >
            <router-link
              :to="{ name: 'categories-slug', params: { slug: category.slug } }"
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
        <h2 class="mb-3">TERBARU</h2>
        <v-row no-gutters v-for="art in articles" :key="art.id">
          <Articles :article="art"></Articles>
        </v-row>
      </v-col>
    </v-row>
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
      article: {},
      articles: [],
      moment: moment
    };
  },
  created() {
    let one = `http://localhost:1337/articles?slug=${this.$route.params.slug}`;
    let two = `http://localhost:1337/articles`;

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...res) => {
          this.article = res[0].data[0];
          this.articles = res[1].data;
        })
      )
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
