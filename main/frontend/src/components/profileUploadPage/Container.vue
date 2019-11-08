<template>
  <div class="form">
    <form method="put" enctype="multipart/form-data">
      <!-------- 기본 정보 -------->
      <div class="cont1">
        <div class="upload-title">기본 정보</div>
        <div class="upload-detail">
          <div class="upload-img">
            <div class="bold">프로필 이미지</div>
            <br />
            <img src="../../assets/user.png" alt="사용자 기본 프로필" class="img" />
          </div>
          <div class="upload-info">
            <span>이름</span>
            <input type="text" ref="name" v-model="update.name" placeholder="홍길동" />
            <br />
            <span>성별</span>
            <form>
              <label for="male">
                <input
                  class="select"
                  type="radio"
                  ref="male"
                  v-model="update.gender"
                  name="gender"
                  id="male"
                  value="남성"
                />남성
              </label>
              <label for="female">
                <input
                  class="select"
                  type="radio"
                  ref="female"
                  v-model="update.gender"
                  name="gender"
                  id="female"
                  value="여성"
                />여성
              </label>
            </form>
            <br />
            <span>생년월일</span>
            <input type="date" v-model="update.birth_date" class="input-birth" />
            <br />
            <span>신장</span>
            <input type="number" ref="height" v-model.number="update.height" />cm
            <br />
            <span>체중</span>
            <input type="number" ref="weight" v-model.number="update.weight" />kg
            <br />
          </div>
        </div>
      </div>
      <!-------- 과거력 -------->
      <div class="cont2">
        <div class="upload-title">과거력</div>
        <div class="upload-detail2">
          <span class="span2">건강검진 여부</span>
          <label for="yes">
            <input
              class="select"
              type="radio"
              v-model="update.had_checkup"
              name="had_checkup"
              id="yes"
              :value="true"
            />있음
          </label>
          <label for="no">
            <input
              class="select"
              type="radio"
              v-model="update.had_checkup"
              name="had_checkup"
              id="no"
              :value="false"
            />없음
          </label>
          <br />
          <div v-show="update.had_checkup===true">
            <span class="span2" for="had_long_before">마지막으로 건강검진 받은 시기</span>
            <br />
            <input
              class="select selectline"
              type="radio"
              v-model="update.had_checkup_true"
              value="1년 이내"
            />1년 이내
            <input
              class="select selectline"
              type="radio"
              v-model="update.had_checkup_true"
              value="1-3년"
            />1~3년
            <input class="select" type="radio" v-model="update.had_checkup_true" value="3-5년" />3~5년
            <input class="select" type="radio" v-model="update.had_checkup_true" value="5-10년" />5~10년
            <br />
            <span class="span2">건강검진-이상소견</span>
            <input type="text" placeholder="ex)갑상선 수치에 이상이 있어요" />
          </div>

          <br />
          <span class="span2" for="disease_list">병 진단 이력</span>
          <br />
          <input type="radio" :value="true" v-model="disease_boolean" />있음
          <input
            type="radio"
            :value="false"
            v-model="disease_boolean"
            @click="initiateDiagnosedDisease"
          />
          없음
          <br />
          <span v-show="disease_boolean" v-for="disease in diseaseLabel" :key="disease">
            <input
              type="checkbox"
              :name="disease"
              :value="disease"
              v-model="update.diagnosed_disease"
            />
            <label :for="disease">{{ disease }}</label>
          </span>
          <br />
          <div v-if="update.diagnosed_disease.includes('기타')">
            <span class="span2">어떤 병을 진단 받으셨는지 자유롭게 기술해주세요</span>
            <input type="text" placeholder="ex)대장암" v-model="disease_other" />
            <br />
            <span class="span2">{{disease_other}}(은/는) 몇 년 전에 진단 받으셨나요?</span>
            <input type="number" placeholder="년 단위의 숫자를 입력해주세요" />
            <br />
            <span class="span2">{{disease_other}} 때문에 드시고 계신 약이 있다면 적어주세요</span>
            <input type="text" placeholder="드시고 계신 약이 없다면 생략해주세요" />
            <br />
            <span class="span2">{{disease_other}}(은/는) 어디서 진단 받으셨나요?</span>
            <input type="text" placeholder="기억나지 않는다면 생략해주세요" />
            <br />
          </div>
          <div v-else-if="update.diagnosed_disease.includes('없음')"></div>
          <div v-else>
            <div v-for="disease in diseaseLabel" :key="disease">
              <!-- 인우 : v-for문 안에서 v-model 어떻게 설정하는지 몰라서 일단 놔뒀습니다.
              노드 백 가보시면 제가 diagnosed_disease관련해서 모델 확장해놨어요
              모델명은 그거 참고하시면 될 것 같습니다.-->
              <div v-show="update.diagnosed_disease.includes(disease)&&disease!=('없음'||'기타')">
                <span class="span2">{{disease}}(은/는) 몇 년 전에 진단 받으셨나요?</span>
                <input type="number" />
                <br />
                <span class="span2">{{disease}} 때문에 드시고 계신 약이 있다면 적어주세요</span>
                <input type="text" placeholder="드시고 계신 약이 없다면 생략해주세요" />
                <br />
                <span class="span2">{{disease}}(은/는) 어디서 진단 받으셨나요?</span>
                <input type="text" placeholder="기억나지 않는다면 생략해주세요" />
                <br />
              </div>
            </div>
          </div>

          <span class="span2">복용중인 약</span>
          <br />
          <label for="yes">
            <input
              class="select selectline"
              type="radio"
              v-model="update.taking_medicine"
              name="taking_medicine"
              id="yes"
              :value="true"
            />있음
          </label>
          <label for="no">
            <input
              class="select"
              type="radio"
              v-model="update.taking_medicine"
              name="taking_medicine"
              id="no"
              :value="false"
            />없음
          </label>
          <br />
          <span>약 이름</span>
          <input type="text" ref="what_medicine" v-model="update.what_medicine" />

          <span for="family_disease">가족력</span>
          <br />
          <span v-for="(disease, index) in diseaseLabel" :key="index">
            <input type="checkbox" :name="disease" :value="disease" v-model="update.family_history" />
            <label :for="disease">{{ disease }}</label>
          </span>
          <br />
          <span>알레르기 이력(없으면 생략해주세요)</span>
          <!-- 인우 : '없음'을 안 넣고 싶어서 일단 이렇게 했는데 혹시 모르겠네요 필요한건지 -->
          <br />
          <span v-for="allergy in allergyLabel" :key="allergy">
            <input
              type="checkbox"
              :name="allergy"
              :value="allergy"
              v-model="update.allergy_history"
              @click="showAllergyHistory"
            />
            <label :for="allergy">{{ allergy }}</label>
          </span>
          <div v-show="update.allergy_history.includes('기타 알레르기')">
            <input type="text" placeholder="어떤 알레르기이신가요?" />
            <!-- 인우 : 굳이 span으로 질문지 만들 거 있나 싶어요 그냥 placeholder에 이렇게만 띄워도 될 거 같은데 -->
          </div>
          <!-- 인우 : 아직 배포 백에 allergy_history모델이 반영이 안 돼서 기능을 하지 않습니다 -->
        </div>
      </div>
      <br />

      <!-------- 사회력 -------->
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
          <span class="span3 spanlong">음주량(병)(일주일)</span>
          <input
            class="inputsmall"
            type="number"
            ref="drinking_per_week"
            v-model="update.drinking_per_week"
          />
          <br />
          <span class="span3">흡연 여부</span>
          <label for="yes">
            <input type="radio" v-model="update.smoking" name="smoking" id="yes" :value="true" />네
          </label>
          <label for="no">
            <input type="radio" v-model="update.smoking" name="smoking" id="no" :value="false" />아니오
          </label>
          <br />
          <span class="span3">흡연 기간(년)</span>
          <input
            class="inputsmall"
            type="number"
            ref="how_long_smoking"
            v-model.number="update.how_long_smoking"
          />
          <br />
          <span class="span3 spanlong">흡연 양(갑)(일주일)</span>
          <input
            class="inputsmall"
            type="number"
            ref="how_much_smoking"
            v-model.number="update.how_much_smoking"
          />
          <br />
          <span class="span3">직업</span>
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
    </form>
    <div class="updatecomplete">
      <v-btn @click.native="updateProfileInfo()" class="button" color="#669999">프로필 업데이트</v-btn>
      <div class="pluslist"></div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.update = { ...this.$store.state.profile };
    console.log(this.update);
  },
  data() {
    return {
      update: {},
      diseaseLabel: ["고혈압", "간염", "결핵", "기타 진단명"],
      // 인우 : duplicate keys에러 때문에 기타를 기타 진단명으로 바꿨습니다.
      disease_other: "",
      // 인우 : 얘가 병 진단 이력에서 기타 선택하고 입력받는 병명인데, 얘를 update의 diagnosed_disease에 넣어서 dispatch해야 될 것 같아요
      disease_boolean: "",
      allergyLabel: ["비염", "피부염", "천식", "기타 알레르기"],
      // 인우 : duplicate keys에러 때문에 기타를 기타 알레르기로 바꿨습니다.
      factorLabel: [
        "스트레스를 많이 받는 편",
        "식사 불규칙",
        "기름진 음식을 많이 먹음",
        "수면시간 불규칙"
      ]
    };
  },
  methods: {
    updateProfileInfo() {
      this.update.diagnosed_disease.push(this.data.disease_other);
      // 인우 : 위의 disease_other를 diagnosed_disease에 집어넣으려고 추가한 코드입니다
      for (let ans in this.update) {
        if (!this.update[ans]) {
          if (this.update[ans] === false) continue;
          alert(`${ans}를 입력해주세요.`);
          return;
        }
      }
      this.$store.dispatch("updateProfileInfo", this.update);
    },
    initiateDiagnosedDisease() {
      this.update.diagnosed_disease = [];
      console.log(this.update.diagnosed_disease);
    },
    showAllergyHistory() {
      console.log(this.update.allergy_history);
    }
  }
};
</script>
<style scoped>
.cont1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background: white;
  width: 100%;
  min-height: 27rem;
}
.cont2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #ebebeb;
  width: 100%;
  height: 25rem;
}
.cont3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #ffffff;
  width: 100%;
  height: 25rem;
}
.upload-title {
  color: #397979;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-weight: bolder;
  font-weight: 800;
  width: 100%;
  text-align: center;
}
.upload-detail {
  max-width: 400px;
  font-size: 1rem;
  line-height: 150%;
}
.upload-info {
  width: 168px;
  margin: 0 auto;
}
.upload-detail2 {
  max-width: 400px;
  /* margin: 0 50px; */
}
.upload-detail3 {
  max-width: 400px;
  font-size: 1rem;
}
span {
  color: rgb(48, 48, 48);
  font-weight: bolder;
  font-weight: 800;
  display: inline-block;
  width: 30%;
  margin-bottom: 12px;
  line-height: 120%;
}
.span2 {
  width: 100px;
}
.span3 {
  width: 55%;
  line-height: 140%;
}
.bold {
  color: rgb(48, 48, 48);
  font-weight: bolder;
  font-weight: 800;
}
.img {
  width: 75px;
  height: 75px;
}
.imgfield {
  width: 260px;
  height: 30px;
}
.upload-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}
.file-upload-form {
  margin-bottom: 12px;
}
input {
  border: 1px solid #397979;
}
.input-birth {
  width: 168px;
  height: 26px;
}
.select {
  margin-right: 5px;
  margin-left: 5px;
}
.selectline {
  margin-bottom: 15px;
}
.inputsmall {
  width: 35%;
  height: 26px;
}
.spanlong {
  width: 55%;
}
.button {
  color: white;
}
.updatecomplete {
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
}
.habit-box {
  max-width: 300px;
  line-height: 150%;
}
.habit-head {
  font-weight: 700;
}
</style>
