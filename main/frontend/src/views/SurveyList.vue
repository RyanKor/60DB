<template>
  <div class="survey-history">
    <Navbar />
    <survey-list></survey-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "../components/homePage/Navbar.vue";
import SurveyList from "../components/SurveyList";

export default {
  computed: {
    ...mapState(["survey_history"])
  },
  mounted() {
    this.$store.commit("SET_LOADING", false);
  },
  components: {
    Navbar,
    SurveyList
  }
};
</script>

<style scoped>
.survey-history {
  min-height: 1000px;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}
</style>
