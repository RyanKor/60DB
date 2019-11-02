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
						<input type="text" ref="name" v-model="update.name" placeholder="ex)홍길동"/>
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
						<span>신장(cm)</span>
						<input type="number" ref="height" v-model="update.height" />
						<br />
						<span>체중(kg)</span>
						<input type="number" ref="weight" v-model="update.weight" />
						<br />
					</div>
				</div>
			</div>
			<!-------- 과거력 -------->
			<div class="cont2">
				<div class="upload-title">과거력</div>
				<div class="upload-detail2">
					<!-- 11/02 인우 수정 -->
					<span class="span2">알레르기 이력</span>
					<label for="rhinitis">
						<input
							class="select"
							type="checkbox"
							v-model="update.allergy"
							name="allergy"
							id="rhinitis"
							value="rhinitis"
						/>비염
					</label>
					<label for="dermatitis">
						<input
							class="select"
							type="checkbox"
							v-model="update.allergy"
							name="allergy"
							id="dermatitis"
							value="dermatitis"
						/>피부염
					</label>
					<label for="asthma">
						<input
							class="select"
							type="checkbox"
							v-model="update.allergy"
							name="allergy"
							id="asthma"
							value="asthma"
						/>천식
					</label>
					<label for="others">
						<input
							class="select"
							type="checkbox"
							v-model="update.allergy"
							name="allergy"
							id="others"
							value="others"
							@click="allergyRest"
						/>기타
					</label>
					<input type="text" v-show="allergy_rest" v-model="allergy_restText" placeholder="어떤 알레르기이신가요?"/>
					<br />
					<span class="span2">건강검진 여부</span>
					<label for="yes">
						<input
							class="select"
							type="radio"
							v-model="update.had_checkup"
							name="had_checkup"
							id="yes"
							value="true"
						/>있음
					</label>
					<label for="no">
						<input
							class="select"
							type="radio"
							v-model="update.had_checkup"
							name="had_checkup"
							id="no"
							value="false"
						/>없음
					</label>
					<br />
					<span class="span2" for="had_long_before">마지막으로 건강검진 받은 시기</span>
					<br />

					<input
						class="select selectline"
						type="radio"
						v-model="update.had_checkup_true"
						name="had_checkup_true"
						value="1년 이내"
					/>1년 이내
					<input
						class="select selectline"
						type="radio"
						v-model="update.had_checkup_true"
						name="had_checkup_true"
						value="1-3년"
					/>1~3년
					<input class="select selectline" type="radio" v-model="update.had_checkup_true" name="had_checkup_true" value="3-5년" />3~5년
					<input
						class="select selectline"
						type="radio"
						v-model="update.had_checkup_true"
						name="had_checkup_true"
						value="5-10년"
					/>5~10년
					<br />
					<span>이상소견</span>
					<input type="text" ref="feedback" v-model="update.feedback" placeholder="ex)갑상선 수치에 이상이 있어요"/>
					<span class="span2" for="disease_list">병 진단 이력</span>
					<br />
					<input
						type="checkbox"
						class="select selectline"
						v-model="update.diagnosed_disease"
						value="고혈압"
					/>고혈압
					<input
						class="select selectline"
						type="checkbox"
						v-model="update.diagnosed_disease"
						value="간염"
					/>간염
					<input
						class="select selectline"
						type="checkbox"
						v-model="update.diagnosed_disease"
						value="결핵"
					/>결핵
					<input
						class="select selectline"
						type="checkbox"
						v-model="update.diagnosed_disease"
						value="없음"
					/>없음
					<input
						class="select selectline"
						type="checkbox"
						v-model="update.diagnosed_disease"
						@click="diseaseRest"
						value="기타"
					/>기타
					<br />
					<input type="text" v-show="diagnosed_disease_rest" v-model="diagnosed_disease_restText" />
					<p v-if="diagnosed_disease_rest"></p>
					<span class="span2">복용중인 약</span>
					<br />
					<label for="yes">
						<input
							class="select selectline"
							type="radio"
							v-model="update.taking_medicine"
							name="taking_medicine"
							id="yes"
							value="true"
						/>있음
					</label>
					<label for="no">
						<input
							class="select"
							type="radio"
							v-model="update.taking_medicine"
							name="taking_medicine"
							id="no"
							value="false"
						/>없음
					</label>
					<br />
					<span>약 이름</span>
					<input type="text" ref="what_medicine" v-model="update.what_medicine" />
					<!-- 11/02 인우 수정 -->
					<span>복용중인 건강 식품</span>
					<label for="vitamins">
					<input type="radio" name="healthy_food" v-model="update.healthy_food" id="vitamins">비타민제
					</label>
					<label for="oriental-medicine">
						<input type="radio" name="healthy_food" v-model="update.healthy_food" id="oriental-medicine">한약
					</label>
					<label for="others">
						<input type="radio" name="healthy_food" v-model="update.healthy_food" id="others">기타
					</label>
					<span for="family_disease">가족력</span>
					<!-- 11/02 인우 수정 -->
					<input class="select" type="checkbox" v-model="have_family_history" value="true" />있음
					<input class="select" type="checkbox" v-model="update.family_history" value="없음" />없음
					<div v-show="have_family_history">
						<input class="select" type="checkbox" v-model="update.from_whom" value="부모" >부모
						<input class="select" type="checkbox" v-model="update.from_whom" value="형제" >형제
						<input class="select" type="checkbox" v-model="update.from_whom" value="4촌 내 친척" >4촌 내 친척
						<input class="select" type="checkbox" v-model="update.from_whom" value="이외 기타" >이외 기타
						<br>
						<input
							class="select"
							type="checkbox"
							v-model="update.family_history"
							value="고혈압"
						/>고혈압
						<input class="select" type="checkbox" v-model="update.family_history" value="간염" />간염
						<input class="select" type="checkbox" v-model="update.family_history" value="결핵" />결핵
						<input
							class="select"
							type="checkbox"
							v-model="update.family_history"
							value="기타"
							@click="familyRest"
						/>기타
						<input type="text" v-model="family_history_restText" v-show="family_history_rest" />
					</div>

					<br />
				</div>
			</div>
			<!-------- 사회력 -------->
			<div class="cont3">
				<div class="upload-title">사회력</div>
				<div class="upload-detail3">
					<span class="span3">커피 이력</span>
					<label for="zero-to-one">
						<input type="radio" name="coffee" v-model="update.coffee" id="zero-to-one">0-1잔
					</label>
					<label for="two-to-three">
						<input type="radio" name="coffee" v-model="update.coffee" id="two-to-three">2-3잔
					</label>
					<label for="more-than-four">
						<input type="radio" name="coffee" v-model="update.coffee" id="more-than-four">4잔 이상
					</label>
					<span class="span3">스트레스 이력</span>
					<label for="yes">
						<input type="radio" name="stress" v-model="update.stress" id="yes">예
					</label>
					<label for="no">
						<input type="radio" name="stress" v-model="update.stress" id="no">아니요
					</label>
					<span class="span3">음주 여부</span>
					<label for="yes">
						<input type="radio" v-model="update.drinking" name="drinking" id="yes" value="True" @click="bottlesCount"/>네
					</label>
					<label for="no">
						<input
							type="radio"
							v-model="update.drinking"
							name="drinking"
							id="no"
							value="False"
						/>아니오
					</label>
					<br />
					<div v-show="bottles">
						<span class="span3 spanlong">일주일에 소주를 몇 병 정도 마시나요?</span>
						<input
							class="inputsmall"
							type="number"
							ref="drinking_per_week"
							v-model="update.drinking_per_week"
						/>
					</div>
					<span class="span3">흡연 여부</span>
					<label for="yes">
						<input type="radio" v-model="update.smoking" name="smoking" id="yes" value="True" />네
					</label>
					<label for="no">
						<input
							type="radio"
							v-model="update.smoking"
							name="smoking"
							id="no"
							value="False"
						/>아니오
					</label>
					<br />
					<span class="span3">흡연 기간(년)</span>
					<input
						class="inputsmall"
						type="number"
						ref="how_long_smoking"
						v-model="update.how_long_smoking"
					/>
					<br />
					<span class="span3 spanlong">흡연 양(갑)(일주일)</span>
					<input
						class="inputsmall"
						type="number"
						ref="how_much_smoking"
						v-model="update.how_much_smoking"
					/>
					<br />
					<span class="span3">직업</span>
					<input type="text" ref="job" v-model="update.job" class="inputsmall" />
					<br />
					<div class="habit-box">
						<label for="bad_habits" class="habit-head"
							>다음 중 해당되는 사항에 모두 체크해주세요</label
						>
						<br />
						<input
							type="checkbox"
							v-model="update.relevant_data"
							value="스트레스를 많이 받는 편"
						/>스트레스를 많이 받음
						<input type="checkbox" v-model="update.relevant_data" value="식사 불규칙" />식사 불규칙
						<br />
						<input
							type="checkbox"
							v-model="update.relevant_data"
							value="기름진 음식을 많이 먹음"
						/>기름진 음식을 많이 먹음
						<input type="checkbox" v-model="update.relevant_data" value="수면시간 불규칙" />수면시간
						불규칙
					</div>
					<br />
				</div>
			</div>
		</form>
		<div class="updatecomplete">
			<v-btn @click.native="updateProfileInfo()" class="button" color="#669999"
				>프로필 업데이트</v-btn
			>
			<div class="pluslist"></div>
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		update: function() {
			let update = { ...this.$store.state.profile };
			update.allergy = [];
			update.from_whom = [];
			update.family_history = [];
			update.diagnosed_disease = [];
			update.relevant_data = [];
			return update;
		},
	},
	data() {
		return {
			diagnosed_disease_rest: false,
			family_history_rest: false,
			allergy_rest: false,
			bottles: false,	
			diagnosed_disease_restText: '',
			family_history_restText: '',
			allergy_restText: '',
			have_family_history: false
		};
	},
	methods: {
		updateProfileInfo() {
			for (let ans in this.update) {
				if (!this.update[ans]) {
					alert(`${ans}를 입력해주세요.`);
					return;
				}
			}
			this.$store.dispatch('updateProfileInfo', this.update);
		},
		diseaseRest() {
			this.diagnosed_disease_rest = !this.diagnosed_disease_rest;
		},
		familyRest() {
			this.family_history_rest = !this.family_history_rest;
		},
		allergyRest() {
			this.allergy_rest = !this.allergy_rest;
		},
		bottlesCount() {
			this.bottles = !this.bottles;
		},
	},
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
