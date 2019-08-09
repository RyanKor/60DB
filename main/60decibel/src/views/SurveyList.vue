<template>
  <div class="survey-history">
    <ul>
      <router-link :to="`/stomach/${item.id}`" v-for="item in survey_history">
        번호 : {{ item.id }}
        증상 : {{ item.symptom }}
        <small>작성일 : {{ item.created_at}}</small>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["survey_history"])
  },
  created() {
    this.$store.dispatch("getSurveyHistory");
  }
};
</script>

<style>
</style>
