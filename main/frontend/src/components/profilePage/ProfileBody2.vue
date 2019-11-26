<template>
  <div class="prof-record">
    <div class="content3">
      <div class="txt-head">과거력</div>
      <!-- 건강검진 이력 -->
      <div class="profiletitle">최근 건강 검진</div>
      <div v-if="profile.had_checkup">{{profile.checkup_history}}</div>
      <div v-else>
        <span>검진 이력 없음</span>
      </div>
      <div class="profiletitle">최근 진단 병명</div>
      <div v-for="disease in profile.diagnosed_disease" :key="disease.name">
        <div v-show="disease.checked">{{disease.name}}&nbsp;</div>
      </div>
      <div class="profiletitle">알레르기 이력</div>
      <div v-for="allergy in profile.allergy" :key="allergy">
        <span>{{allergy.toString()}}</span>
      </div>
      <!-- 복용약 -->
      <div class="profiletitle">복용약</div>
      <div v-for="disease in profile.diagnosed_disease" :key="disease.medicine">
        <span v-show="disease.medicine">{{disease.medicine }}</span>
      </div>
      <span>{{profile.other_medicine}}</span>
      <div class="profiletitle">복용중인 건강식품</div>
      <div v-for="taking in profile.taking_healthy" :key="taking">
        <span>{{taking.toString()}}</span>
      </div>
      <!-- 가족력 -->

      <div class="profiletitle">가족력</div>

      <div v-show="profile.family_history.length">{{ profile.family_history.toString() }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["profile"])
  }
};
</script>

<style scoped>
.content3 {
  padding: 2rem;
  max-width: 700px;

  margin: 0 auto;
}
.profileinfo {
  font-size: 1.05rem;
  display: flex;
  line-height: 150%;
  padding-left: 2rem;
}
.profiletitle {
  color: rgb(80, 80, 80);
  font-weight: 800;
}
.profiledetail {
  padding-left: 3rem;
}
.txt-head {
  color: #397979;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 800;
}
.button {
  color: white;
}
.profileplus {
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
}
</style>
