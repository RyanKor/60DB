<template>
  <div>
    <div class="Root">
      <div class="base-info__cont1">
        <div class="base__title">사회력</div>
        <div class="radiobox">
          <span class="base__head">
            음주 여부
            <span class="base__head base__asterisk">*</span>
          </span>
          <div class="radiobox__inputboxes">
            <label for="drink_yes">
              <div class="radiobox__inputbox">
                <input
                  class="radiobox__input"
                  type="radio"
                  v-model="update.drinking"
                  name="drinking"
                  id="drink_yes"
                  :value="true"
                />네
              </div>
            </label>
            <label for="drink_no">
              <div class="radiobox__inputbox">
                <input
                  type="radio"
                  v-model="update.drinking"
                  name="drinking"
                  id="drink_no"
                  :value="false"
                />아니오
              </div>
            </label>
          </div>
        </div>
        <div class="textbox">
          <span v-show="update.drinking" class="base__head">
            일주일에 소주를 몇병정도 마시나요?(병)
            <input
              class="textbox__input"
              type="number"
              ref="drinking_per_week"
              v-model="update.drinking_per_week"
              placeholder="예) 2병 -> 2"
            />
          </span>
        </div>
        <div class="radiobox">
          <div class="radiobox__inputboxes--multiple2">
            <span class="base__head">
              흡연 여부
              <span class="base__head base__asterisk">*</span>
            </span>
            <div class="radiobox__inputbox">
              <input type="radio" v-model="update.smoking" name="smoking" id="yes" :value="true" />네
            </div>
            <div class="radiobox__inputbox">
              <input type="radio" v-model="update.smoking" name="smoking" id="no" :value="false" />아니오
            </div>
            <div class="radiobox__inputbox">
              <input type="radio" v-model="update.smoking" name="smoking" id="no" value="끊었음" />끊었음
            </div>
          </div>
        </div>
        <div v-show="update.smoking" class="textbox textbox--2">
          <div class="textbox__inputbox">
            <input
              class="textbox__input textbox__input--2"
              type="number"
              placeholder="예) 2"
              v-model.number="update.how_long_smoking"
            />년간 하루에
            <input
              class="textbox__input textbox__input--2"
              type="text"
              placeholder="예) 반"
              v-model.number="update.how_much_smoking"
            />갑씩.
          </div>
          <div class="textbox__inputbox">
            <div v-show="update.smoking.length">
              <input
                class="textbox__input textbox__input--2"
                type="number"
                placeholder="예) 1"
                v-model.number="update.quit_smoking"
              />년전에 끊었다.
            </div>
          </div>
          <br />
        </div>

        <div class="radiobox">
          <span class="base__head">커피 이력(하루 기준)</span>
          <div class="radiobox__inputboxes--multiple">
            <label for="coffee-1">
              <div class="radiobox__inputbox">
                <input
                  id="coffee-1"
                  class="radiobox__input"
                  type="radio"
                  v-model="update.coffee"
                  value="0-1잔"
                />0-1잔
              </div>
            </label>
            <label for="coffee-2">
              <div class="radiobox__inputbox">
                <input
                  id="coffee-2"
                  class="radiobox__input"
                  type="radio"
                  v-model="update.coffee"
                  value="1-2잔"
                />1-2잔
              </div>
            </label>
            <label for="coffee-3">
              <div class="radiobox__inputbox">
                <input
                  id="coffee-3"
                  class="radiobox__input"
                  type="radio"
                  v-model="update.coffee"
                  value="2-3잔"
                />2-3잔
              </div>
            </label>
            <label for="coffee-4">
              <div class="radiobox__inputbox">
                <input
                  id="coffee-4"
                  class="radiobox__input"
                  type="radio"
                  v-model="update.coffee"
                  value="4잔 이상"
                />4잔이상
              </div>
            </label>
          </div>
        </div>
        <div class="radiobox">
          <span class="base__head">최근 스트레스를 심하게 받으시나요</span>
          <div class="radiobox__inputboxes">
            <label for="stress_yes">
              <div class="radiobox__inputbox">
                <input
                  type="radio"
                  v-model="update.stress_recent"
                  name="stress_recent"
                  id="stress_yes"
                  :value="true"
                />네
              </div>
            </label>
            <label for="stress_no">
              <div class="radiobox__inputbox">
                <input
                  type="radio"
                  v-model="update.stress_recent"
                  name="stress_recent"
                  id="stress_no"
                  :value="false"
                />아니오
              </div>
            </label>
          </div>
        </div>
        <div class="textbox">
          <span class="base__head">
            직업
            <span class="base__head base__asterisk">*</span>
          </span>
          <input type="text" v-model="update.job" class="textbox__input" placeholder="예)학생" />
        </div>
        <div class="radiobox">
          <span class="base__head">다음 중 해당되는 사항에 모두 체크해주세요</span>
          <div class="radiobox__inputboxes--multiple">
            <div class="radiobox__inputbox" v-for="factor in factorLabel" :key="factor">
              <input type="checkbox" :name="factor" :value="factor" v-model="update.relevant_data" />
              <label :for="factor">{{ factor }}</label>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import profileMixin from "../../mixin/profileMixin.js";
export default {
  computed: {
    click_profile() {
      return this.$store.state.click_profile;
    }
  },
  watch: {
    click_profile(click) {
      if (click) {
        this.$store.dispatch("setProfileData", this.update);
      }
    }
  },

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


<style scoped>
/* base */
.base__title {
  color: #182633;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}
.base__head {
  margin-bottom: 0.3rem;
  color: rgb(161, 161, 161);
  font-size: 1rem;
  font-weight: 700;
}

.base__asterisk {
  color: rgb(218, 51, 51);
  vertical-align: sub;
}
input::placeholder {
  color: rgb(165, 165, 165);
}
.base__hilight {
  color: rgb(32, 114, 207);
}
.inline {
  display: inline;
}

/* base Info Container1 */
.base-info__cont1 {
  padding: 0 1.6rem;
}
.imagebox {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 1.6rem;
}
.imagebox__image {
  width: 150px;
  height: 150px;
}
/* History Info Container2 */
.base-info__cont2 {
  padding: 0 1.6rem;
}
/* Textbox */
.textbox {
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0;
}
.textbox--2 {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgb(52, 121, 250);
  border-radius: 5px;
}
.textbox__input {
  outline: none;
  width: 100%;
  height: 42px;
  border: 1px solid rgb(209, 209, 209);
  border-radius: 5px;
  padding: 0.7rem;
}
.textbox__input:focus {
  border: 2px solid rgb(52, 121, 250);
  transition: 0.5s;
}
.textbox__input--2 {
  width: 25%;
  height: 36px;
  margin: 0 0.5rem;
}
.textbox__inputbox {
  margin: 0.3rem 0;
}
.textbox__wrap {
  border: 1px solid rgb(52, 121, 250);
  border-radius: 5px;
  padding: 1rem 0.5rem;
  margin: 0.5rem 0;
}

/* Radiobox */
.radiobox {
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0;
}
.radiobox__inputboxes {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.radiobox__inputboxes label {
  width: 47%;
  margin: 0;
}
.radiobox__inputboxes--multiple {
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.radiobox__inputboxes--multiple2 {
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.radiobox__inputbox {
  display: flex;
  align-items: center;
  height: 42px;
  border: 1px solid rgb(209, 209, 209);
  border-radius: 5px;
  padding: 0 1rem;
}

.radiobox__inputbox input[type="radio"],
.radiobox__inputbox input[type="checkbox"] {
  margin-right: 0.3rem;
  vertical-align: middle;
}
/* Datebox*/
.datebox {
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0;
}
.datebox__input {
  outline: none;
  width: 100%;
  height: 42px;
  border: 1px solid rgb(209, 209, 209);
  border-radius: 5px;
  padding: 0.7rem;
}
</style>


