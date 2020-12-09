<template>
  <div>
    <div>Hasil Pencarian: {{ findWhat }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData(context) {
    return context.$axios
      .get(`${process.env.baseUrl}/posts?search=${context.params.slug}`)
      .then(res => {
        return { results: res.data, findWhat: context.params.slug };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
