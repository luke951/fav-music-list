<template>
  <b-container>
    <music-list></music-list>
  </b-container>
</template>

<script>
export default {
  name: "HomePage",
  components: {
    MusicList: () => import("./components/MusicList/MusicList.vue"),
  },
};
</script>