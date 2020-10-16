<template>
  <v-app>
    <v-navigation-drawer app v-if="drawer" v-model="drawer">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" v-for="category in categories" :key="category.id">
            <v-btn text large>
              <router-link
                :to="{
                  name: 'categories-slug',
                  params: { slug: category.slug }
                }"
              >
                {{ category.name }}
              </router-link>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-row no-gutters align="center">
        <div v-if="$vuetify.breakpoint.mobile">
          <v-icon @click.stop="drawer = !drawer" class="mr-3">
            mdi-menu
          </v-icon>
        </div>

        <router-link to="/">
          <h3>
            EKSPOSE SULSEL
          </h3>
        </router-link>

        <v-spacer></v-spacer>

        <div v-if="!$vuetify.breakpoint.mobile">
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
        </div>

        <v-icon @click="openSearch" class="ml-5">
          mdi-magnify
        </v-icon>
      </v-row>

      <v-dialog v-model="searchDialog" max-width="1000px">
        <v-card>
          <v-container>
            <v-row no-gutters align="center">
              <v-col class="flex-grow-1 pr-3">
                <v-text-field
                  autofocus
                  @keyup.enter="searchArticle"
                  clearable
                  hide-details
                  v-model="searchWhat"
                  filled
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col md="2" cols="3">
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
          href="http://github.com/kalamangna"
          target="_blank"
          rel="noopener noreferrer"
          >github.com/kalamangna</a
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
      searchWhat: "",
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
    openSearch() {
      this.searchDialog = true;
      this.searchWhat = "";
    },
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
