import axios from "axios";

export default {
  env: {
    baseUrl:
      process.env.BASE_URL || process.env.NODE_ENV !== "production"
        ? "http://localhost:1337"
        : "https://strapi-ekspose-sulsel.herokuapp.com"
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Ekspose Sulsel - Portal Berita Sulawesi Selatan",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Portal Berita Sulawesi Selatan"
      },
      {
        name: "google-site-verification",
        content: "EEgQ7byeOq_F_HG7sCIOt_8_ieexLqddiL1zb0Bh3e0"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://ekspose-sulsel.herokuapp.com"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Ekspose Sulsel - Portal Berita Sulawesi Selatan"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Portal Berita Sulawesi Selatan"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://ekspose-sulsel.herokuapp.com/logo.jpg"
      },
      {
        hid: "twitter:card",
        property: "twitter:card",
        content: "https://ekspose-sulsel.herokuapp.com/logo.jpg"
      },
      {
        hid: "twitter:url",
        property: "twitter:url",
        content: "https://ekspose-sulsel.herokuapp.com"
      },
      {
        hid: "twitter:title",
        property: "twitter:title",
        content: "Ekspose Sulsel - Portal Berita Sulawesi Selatan"
      },
      {
        hid: "twitter:description",
        property: "twitter:description",
        content: "Portal Berita Sulawesi Selatan"
      },
      {
        hid: "twitter:image",
        property: "twitter:image",
        content: "https://ekspose-sulsel.herokuapp.com/logo.jpg"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: "~plugins/ga.js", mode: "client" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/vuetify"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/markdownit", "@nuxtjs/axios", "@nuxtjs/sitemap"],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true
  },

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true
  },

  sitemap: {
    routes: async () => {
      let url =
        process.env.BASE_URL || process.env.NODE_ENV !== "production"
          ? "http://localhost:1337"
          : "https://strapi-ekspose-sulsel.herokuapp.com";
      let { data } = await axios.get(`${url}/articles`);
      return data.map(art => `/${art.slug}`);
    }
  }
};
