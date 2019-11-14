<template>
  <div class="profile">
    <navbar class="nav" />
    <ProfPost class="body" />
  </div>
</template>
<script>
import Navbar from "../components/homePage/Navbar.vue";
import ProfPost from "../components/profilePostPage/Container.vue";

export default {
  components: {
    Navbar,
    ProfPost
  },
  mounted() {
    this.$store.commit("SET_LOADING", false);
  }
};
</script>
<style scoped>
</style>
