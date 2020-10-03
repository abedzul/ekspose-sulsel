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

      <v-btn text @click="search = true">
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>

      <v-dialog v-model="search" max-width="1000px">
        <v-card>
          <v-container>
            <v-text-field> </v-text-field>
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
      search: false
    };
  },
  created() {
    axios
      .get(`http://localhost:1337/categories`)
      .then(res => {
        this.categories = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
