<template>
  <div>
    <div class="Root">
      <div class="guidebox">
        <span class="guidebox__title">프로필 입력 안내</span>
        <div class="guidebox__body">
          <p>
            <span class="base__hilight--red">필수문항(*)</span>에는 반드시 응답해주세요.
          </p>
          <p>이외 모든 문항은 선택사항입니다.</p>
        </div>
      </div>
      <div class="base-info__cont1">
        <div class="base__title">기본정보입력</div>
        <div class="imagebox">
          <img src="../../assets/user.png" alt="사용자 기본 프로필" class="imagebox__image" />
        </div>
      </div>
      <div class="base-info__cont2">
        <div class="textbox">
          <span class="base__head">
            이름
            <span class="base__asterisk">*</span>
          </span>
          <input class="textbox__input" type="text" v-model="update.name" />
        </div>
        <div class="radiobox">
          <span class="base__head">
            성별
            <span class="base__asterisk">*</span>
          </span>
          <div class="radiobox__inputboxes">
            <label for="male">
              <div class="radiobox__inputbox">
                <input
                  class="radiobox__input"
                  type="radio"
                  v-model="update.gender"
                  name="gender"
                  id="male"
                  value="남성"
                />
                <span>남성</span>
              </div>
            </label>
            <label for="female">
              <div class="radiobox__inputbox">
                <input
                  class="radiobox__input"
                  type="radio"
                  v-model="update.gender"
                  name="gender"
                  id="female"
                  value="여성"
                />
                <span>여성</span>
              </div>
            </label>
          </div>
        </div>
        <div class="datebox">
          <span class="base__head">
            생년월일
            <span class="base__asterisk">*</span>
          </span>
          <input type="date" v-model="update.birth_date" class="datebox__input" />
        </div>
        <div class="textbox">
          <span class="base__head">
            신장(cm)
            <span class="base__asterisk">*</span>
          </span>
          <input
            class="textbox__input"
            type="number"
            v-model.number="update.height"
            placeholder="예)173"
          />
          <span></span>
        </div>
        <div class="textbox">
          <span class="base__head">
            체중(kg)
            <span class="base__asterisk">*</span>
          </span>
          <input
            class="textbox__input"
            type="number"
            v-model.number="update.weight"
            placeholder="예)55"
          />
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
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
      update: {}
    };
  }
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
.base__hilight--red {
  color: rgb(218, 51, 51);
}
input::placeholder {
  color: rgb(165, 165, 165);
}

/* Basic Info Container1 */
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
  margin: 1.6rem 0;
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
/* Basic Info Container2 */
.base-info__cont2 {
  margin: 1.6rem 0;
  padding: 0 1.6rem;
}
/* Textbox */
.textbox {
  display: flex;
  flex-direction: column;
  margin: 0.8rem 0;
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
  color: transparent;
  border: 2px solid rgb(52, 121, 250);
  transition: 0.5s;
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
.radiobox__inputbox input[type="radio"] {
  margin-right: 0.3rem;
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
