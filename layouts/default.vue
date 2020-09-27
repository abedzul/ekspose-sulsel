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
          :to="{ name: 'categories-id', params: { id: category.id } }"
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
import categoriesQuery from "~/apollo/queries/category/categories";

export default {
  data() {
    return {
      categories: [],
      search: false
    };
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    }
  }
};
</script>

<style></style>
