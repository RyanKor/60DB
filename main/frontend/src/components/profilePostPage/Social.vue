<template>
  <div>
    <div class="cont3">
      <div class="upload-title">사회력</div>
      <div class="upload-detail3">
        <span class="span3">음주 여부</span>
        <label for="yes">
          <input type="radio" v-model="update.drinking" name="drinking" id="yes" :value="true" />네
        </label>
        <label for="no">
          <input type="radio" v-model="update.drinking" name="drinking" id="no" :value="false" />아니오
        </label>
        <br />
        <span v-show="update.drinking" class="span3 spanlong">
          일주일에 소주를 몇병정도 마시나요?
          <input
            class="inputsmall"
            type="number"
            ref="drinking_per_week"
            v-model="update.drinking_per_week"
          />
        </span>
        <br />
        <span class="span3">흡연 여부</span>
        <input type="radio" v-model="update.smoking" name="smoking" id="yes" :value="true" />네
        <input type="radio" v-model="update.smoking" name="smoking" id="no" :value="false" />아니오
        <input type="radio" v-model="update.smoking" name="smoking" id="no" value="끊었음" />끊었음
        <br />

        <span v-show="update.smoking" class="span3">
          <input
            class="inputsmall"
            type="number"
            ref="how_long_smoking"
            v-model.number="update.how_long_smoking"
          />년간 하루에
          <input
            class="inputsmall"
            type="number"
            ref="how_much_smoking"
            v-model.number="update.how_much_smoking"
          />갑씩 피웠다.
          <div v-show="update.smoking.length">
            <input
              class="inputsmall"
              type="number"
              ref="quit_smoking"
              v-model.number="update.quit_smoking"
            />년전에 끊었다.
          </div>
          <br />
        </span>

        <span class="span3">
          커피 이력(하루 기준)
          <input
            class="select selectline"
            type="radio"
            v-model="update.coffee"
            value="0-1잔"
          />0-1잔
          <input class="select selectline" type="radio" v-model="update.coffee" value="2-3잔" />2-3잔
          <input class="select" type="radio" v-model="update.coffee" value="4잔 이상" />4잔 이상
        </span>
        <span class="span3">
          최근 스트레스를 심하게 받으시나요
          <label for="yes">
            <input
              type="radio"
              v-model="update.stress_recent"
              name="stress_recent"
              id="yes"
              :value="true"
            />네
          </label>
          <label for="no">
            <input
              type="radio"
              v-model="update.stress_recent"
              name="stress_recent"
              id="no"
              :value="false"
            />아니오
          </label>
          <span class="span3">직업</span>
        </span>
        <input type="text" ref="job" v-model="update.job" class="inputsmall" />
        <br />
        <div class="habit-box">
          <label for="bad_habits" class="habit-head">다음 중 해당되는 사항에 모두 체크해주세요</label>
          <br />
          <span v-for="factor in factorLabel" :key="factor">
            <input type="checkbox" :name="factor" :value="factor" v-model="update.relevant_data" />
            <label :for="factor">{{ factor }}</label>
          </span>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import profileMixin from "../../mixin/profileMixin.js";
export default {
  data() {
    return {
      update: {
        relevant_data: [],
        smoking: ""
      }
    };
  },
  mixins: [profileMixin]
};
</script>

<style>
</style>