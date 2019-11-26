<template>
  <div>
    <div class="Root">
      <div class="base-info__cont1">
        <div class="base__title">과거력</div>
        <div class="radiobox">
          <span class="base__head">
            건강검진 여부
            <span class="base__asterisk">*</span>
          </span>
          <div class="radiobox__inputboxes">
            <label for="yes">
              <div class="radiobox__inputbox">
                <input
                  class="radiobox__input"
                  type="radio"
                  v-model="update.had_checkup"
                  name="had_checkup"
                  id="yes"
                  :value="true"
                />있음
              </div>
            </label>
            <label for="no">
              <div class="radiobox__inputbox">
                <input
                  class="radiobox__input"
                  type="radio"
                  v-model="update.had_checkup"
                  name="had_checkup"
                  @click="
										deleteProperty('checkup_history');
										deleteProperty('had_checkup_comment');
									"
                  id="no"
                  :value="false"
                />없음
              </div>
            </label>
          </div>
        </div>
        <div v-show="update.had_checkup">
          <!-- <div> -->
          <div class="radiobox">
            <span class="base__head">
              마지막으로 건강검진 받은 시기
              <span class="base__asterisk">*</span>
            </span>
            <div class="radiobox__inputboxes--multiple">
              <label for="1">
                <div class="radiobox__inputbox">
                  <input
                    class="radiobox__input"
                    id="1"
                    name="checkup_history"
                    type="radio"
                    v-model="update.checkup_history"
                    value="1년 이내"
                  />1년 이내
                </div>
              </label>
              <label for="2">
                <div class="radiobox__inputbox">
                  <input
                    class="radiobox__input"
                    id="2"
                    name="checkup_history"
                    type="radio"
                    v-model="update.checkup_history"
                    value="1-3년 이내"
                  />1~3년 이내
                </div>
              </label>
              <label for="3">
                <div class="radiobox__inputbox">
                  <input
                    class="radiobox__input"
                    id="3"
                    type="radio"
                    name="checkup_history"
                    v-model="update.checkup_history"
                    value="3-5년 이내"
                  />3~5년 이내
                </div>
              </label>
              <label for="4">
                <div class="radiobox__inputbox">
                  <input
                    class="radiobox__input"
                    id="4"
                    type="radio"
                    name="checkup_history"
                    v-model="update.checkup_history"
                    value="5-10년 이내"
                  />5~10년 이내
                </div>
              </label>
            </div>
          </div>
          <div class="textbox">
            <span class="base__head">건강검진-이상소견</span>
            <input
              class="textbox__input"
              type="text"
              placeholder="ex)갑상선 수치에 이상이 있어요"
              v-model="update.had_checkup_comment"
            />
          </div>
        </div>
      </div>
      <div class="base-info__cont2">
        <div class="radiobox">
          <span class="base__head">
            병 진단 이력
            <span class="base__asterisk">*</span>
          </span>
          <div class="radiobox__inputboxes">
            <label for="boolean_yes">
              <div class="radiobox__inputbox">
                <input
                  class="radiobox__input"
                  id="boolean_yes"
                  type="radio"
                  :value="true"
                  name="disease_boolean"
                  v-model="update.disease_boolean"
                />있음
              </div>
            </label>
            <label for="boolean_no">
              <div class="radiobox__inputbox">
                <input
                  id="boolean_no"
                  class="radiobox__input"
                  type="radio"
                  name="disease_boolean"
                  @click="initiateDiagnosedDisease()"
                  :value="false"
                  v-model="update.disease_boolean"
                />
                없음
              </div>
            </label>
          </div>
        </div>
        <div v-if="update.disease_boolean" class="radiobox">
          <span class="base__head">
            진단 병명(복수선택)
            <span class="base__asterisk">*</span>
          </span>
          <div class="radiobox__inputboxes--multiple">
            <div
              v-for="disease in update.diagnosed_disease"
              class="radiobox__inputbox"
              :key="disease.name"
            >
              <span>
                <input :id="disease" type="checkbox" :name="disease" v-model="disease.checked" />
                <label v-if="!disease.label" :for="disease">{{ disease.name }}</label>
                <label v-else :for="disease">기타</label>
              </span>
            </div>
          </div>
        </div>
        <div v-for="(disease, index) in update.diagnosed_disease" :key="disease.name">
          <div v-if="disease.checked">
            <div class="textbox__wrap">
              <div v-if="index === 3">
                <div class="textbox">
                  <span class="base__head">기타 진단 받은 병을 기술해주세요</span>
                  <input
                    class="textbox__input"
                    type="text"
                    placeholder="ex)대장암"
                    v-model="update.diagnosed_disease[3].name"
                  />
                </div>
              </div>
              <div class="textbox">
                <span class="base__head">
                  <span class="base__hilight">{{ disease.name }}</span>(은/는) 몇 년 전에 진단 받으셨나요?(년)
                </span>
                <input
                  class="textbox__input"
                  type="number"
                  v-model.number="disease.histroy"
                  placeholder="예) 4, 생략가능"
                />
              </div>
              <div class="textbox">
                <span class="base__head">
                  <span class="base__hilight">{{ disease.name }}</span>과 관련하여 복용중인 약을 적어주세요
                </span>
                <input
                  class="textbox__input"
                  type="text"
                  placeholder="복용 중이지 않은 경우 생략가능"
                  v-model="disease.medicine"
                />
              </div>
              <div class="textbox">
                <span class="base__head">
                  <span class="base__hilight">{{ disease.name }}</span>(은/는) 어디서 진단 받으셨나요?
                </span>
                <input
                  class="textbox__input"
                  type="text"
                  placeholder="기억나지 않는 경우 생략가능"
                  v-model="disease.where"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="textbox">
          <div class="base__head inline">
            <span v-for="disease in update.diagnosed_disease" :key="disease.name">
              <span v-show="disease.checked">
                <span class="base__hilight">{{ disease.name }}</span>&nbsp;
              </span>
            </span>
            <span class="base__head">이 외 복용중인 약</span>
          </div>
          <input
            class="textbox__input"
            type="text"
            ref="other_medicine"
            v-model="update.other_medicine"
          />
        </div>

        <div class="radiobox">
          <div class="radiobox__inputboxes--multiple2">
            <span class="base__head">복용중인 건강식품(없으면 생략가능)</span>
            <div v-for="element in healthy" :key="element" class="radiobox__inputbox">
              <input
                class="select selectline"
                type="radio"
                v-model="update.taking_healthy"
                :value="element"
              />
              {{ element }}
            </div>
          </div>
        </div>
        <div class="radiobox">
          <span class="base__head" for="family_disease">가족력(없으면 생략가능)</span>
          <div class="radiobox__inputboxes--multiple">
            <div v-for="(disease, index) in diseaseLabel" :key="index">
              <label :for="disease">
                <div class="radiobox__inputbox">
                  <input
                    type="checkbox"
                    :name="disease"
                    :value="disease"
                    v-model="update.family_history"
                  />
                  {{ disease }}
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="radiobox" v-show="update.family_history.length">
          <div class="textbox__wrap">
            <span class="base__head">가족 관계를 선택해주세요.</span>
            <div class="radiobox__inputboxes--multiple">
              <div class="radiobox__inputbox" v-for="history in family_history" :key="history">
                <input
                  type="checkbox"
                  :name="history"
                  :value="history"
                  v-model="update.family_history_true"
                />
                {{ history }}
              </div>
            </div>
          </div>
        </div>
        <div class="radiobox">
          <span class="base__head">알레르기 이력(없으면 생략가능)</span>
          <div class="radiobox__inputboxes--multiple">
            <div class="radiobox__inputbox" v-for="allergy in allergyLabel" :key="allergy">
              <input type="checkbox" :name="allergy" :value="allergy" v-model="update.allergy" />
              <label :for="allergy">{{ allergy }}</label>
            </div>
          </div>
        </div>

        <div v-show="update.allergy.includes('기타 알레르기')">
          <input
            class="textbox__input"
            type="text"
            placeholder="어떤 알레르기이신가요?"
            v-model="update.allergy_other"
          />
        </div>
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
        diagnosed_disease: [
          {
            name: "고혈압",
            checked: false
          },
          {
            name: "간염",
            checked: false
          },
          {
            name: "결핵",
            checked: false
          },
          {
            name: "",
            label: "기타",
            checked: false
          }
        ],
        taking_healthy: [],
        family_history: [],
        family_history_true: [],
        allergy: []
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
.base__hilight--red {
  color: rgb(218, 51, 51);
}
.inline {
  display: inline;
}
/* base Info Container1 */
.guidebox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 1rem;
  padding: 1rem;
  border: 1px solid rgb(218, 51, 51);
  border-radius: 5px;
}
.guidebox__title {
  color: rgb(218, 51, 51);
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.guidebox__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
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
  margin-bottom: 1.6rem;
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
  background-color: rgb(241, 241, 241);
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

.radiobox__inpubox:focus {
  border: 2px solid rgb(52, 121, 250);
  transition: 0.5s;
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
