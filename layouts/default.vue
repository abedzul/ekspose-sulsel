<template>
  <v-app>
    <v-app-bar app>
      <router-link to="/">
        <h3>
          EKSPOSE SULSEL
        </h3>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn text v-for="category in categories" :key="category.id">
        <router-link
          :to="{
            name: 'categories-slug',
            params: { slug: category.slug }
          }"
        >
          {{ category.name }}
        </router-link>
      </v-btn>

      <v-btn text @click="searchDialog = true">
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>

      <v-dialog v-model="searchDialog" max-width="1000px">
        <v-card>
          <v-container>
            <v-row align="center">
              <v-col md="10" cols="10">
                <v-text-field
                  autofocus
                  @keyup.enter="searchArticle"
                  clearable
                  hide-details
                  v-model="searchWhat"
                  filled
                >
                </v-text-field>
              </v-col>
              <v-col md="2" cols="2">
                <v-btn dark block @click="searchArticle">cari</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <h5>
        2020
        <a
          href="http://github.com/abedzul"
          target="_blank"
          rel="noopener noreferrer"
          >github.com/abedzul</a
        >
      </h5>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      searchDialog: false,
      searchWhat: ""
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
    searchArticle() {
      this.searchDialog = false;
      this.$router.push({
        name: "search-slug",
        params: { slug: this.searchWhat }
      });
    }
  }
};
</script>

<style></style>
