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
						<input type="text" ref="name" v-model="update.name" />
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
						<input type="number" ref="height" v-model.number="update.height" />
						<br />
						<span>체중</span>
						<input type="number" ref="weight" v-model.number="update.weight" />
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
							@click="
								deleteProperty('had_checkup');
								deleteProperty('had_checkup_comment');
							"
							id="no"
							:value="false"
						/>없음
					</label>
					<br />
					<span class="span2" for="had_long_before" v-show="update.had_checkup"
						>건강검진 시기
						<br />
						<input
							class="select selectline"
							type="radio"
							v-model="update.had_checkup_true"
							value="1년 이내"
						/>1년 이내
						<input
							class="select selectline"
							cd
							type="radio"
							v-model="update.had_checkup_true"
							value="1-3년"
						/>1~3년
						<input
							class="select"
							type="radio"
							v-model="update.had_checkup_true"
							value="3-5년"
						/>3~5년
						<input
							class="select"
							type="radio"
							v-model="update.had_checkup_true"
							value="5-10년"
						/>5~10년

						<span class="span2">건강검진-이상소견</span>
						<input
							type="text"
							placeholder="ex)갑상선 수치에 이상이 있어요"
							v-model="update.had_checkup_comment"
						/>
					</span>
					<br />
					<span class="span2" for="disease_list">병 진단 이력</span>
					<br />
					<input
						type="radio"
						:value="true"
						name="had_checkup"
						v-model="update.disease_boolean"
					/>있음
					<input
						type="radio"
						name="had_checkup"
						@click="initiateDiagnosedDisease()"
						:value="false"
						v-model="update.disease_boolean"
					/>
					없음

					<!-- <div v-if="update.diagnosed_disease[3].checked">
						<span class="span2">어떤 병을 진단 받으셨는지 자유롭게 기술해주세요</span>
						<input type="text" placeholder="ex)대장암" v-model="update.diagnosed_disease[3].name" />
						<br />
					</div> -->

					<template v-if="update.disease_boolean">
						<span v-for="disease in update.diagnosed_disease" :key="disease.name">
							<input type="checkbox" :name="disease" v-model="disease.checked" />
							<label v-if="!disease.label" :for="disease">{{ disease.name }}</label>
							<label v-else :for="disease">기타</label>
						</span>
					</template>

					<!-- <div v-else-if="update.diagnosed_disease.includes('없음')"></div> -->
					<div v-for="(disease, index) in update.diagnosed_disease" :key="`disease.name${index}`">
						<!-- 인우 : v-for문 안에서 v-model 어떻게 설정하는지 몰라서 일단 놔뒀습니다.
              노드 백 가보시면 제가 diagnosed_disease관련해서 모델 확장해놨어요
              모델명은 그거 참고하시면 될 것 같습니다.-->
						<div v-if="disease.checked">
							<div v-if="index === 3 && update.diagnosed_disease[index].checked">
								<span class="span2">어떤 병을 진단 받으셨는지 자유롭게 기술해주세요</span>
								<input
									type="text"
									placeholder="ex)대장암"
									v-model="update.diagnosed_disease[3].name"
								/>
								<br />
							</div>
							<span class="span2">{{ disease.name }}(은/는) 몇 년 전에 진단 받으셨나요?</span>
							<input type="number" v-model.number="disease.histroy" />
							<br />
							<span class="span2"
								>{{ disease.name }} 때문에 드시고 계신 약이 있다면 적어주세요</span
							>
							<input
								type="text"
								placeholder="드시고 계신 약이 없다면 생략해주세요"
								v-model="disease.medicine"
							/>
							<br />
							<span class="span2">{{ disease.name }}(은/는) 어디서 진단 받으셨나요?</span>
							<input
								type="text"
								placeholder="기억나지 않는다면 생략해주세요"
								v-model="disease.where"
							/>
							<br />
						</div>
					</div>
					<!-- <input
						type="checkbox"
						class="select selectline"
						value="고혈압"
						v-model="update.diagnosed_disease"
					/>고혈압
					<input
						class="select selectline"
						value="간염"
						type="checkbox"
						v-model="update.diagnosed_disease"
					/>간염
					<input
						class="select selectline"
						value="결핵"
						type="checkbox"
						v-model="update.diagnosed_disease"
					/>결핵
					<input
						class="select selectline"
						value="없음"
						type="checkbox"
						v-model="update.diagnosed_disease"
					/>없음
					<input
						class="select selectline"
						value="기타"
						type="checkbox"
						v-model="update.diagnosed_disease"
					/>기타 -->
					<br />
					<!-- <input type="text" v-if="update.diagnosed_disease.indexOf('기타') >= 0" /> -->
					<!-- <input type="text" v-show="diagnosed_disease_rest" v-mo
					del="diagnosed_disease_restText" /> -->
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
						<input
							type="checkbox"
							:name="disease"
							:value="disease"
							v-model="update.family_history"
						/>
						<label :for="disease">{{ disease }}</label>
					</span>
					<!-- <input
						class="select"
						type="checkbox"
						v-model="update.family_history"
						value="고혈압"
					/>고혈압
					<input class="select" type="checkbox" v-model="update.family_history" value="간염" />간염
					<input class="select" type="checkbox" v-model="update.family_history" value="결핵" />결핵
					<input class="select" type="checkbox" v-model="update.family_history" value="없음" />없음
					<input
						class="select"
						type="checkbox"
						v-model="update.family_history"
						value="기타"
						@click="familyRest"
					/>기타 -->
				</div>
			</div>
			<!-------- 사회력 -------->
			<div class="cont3">
				<div class="upload-title">사회력</div>
				<div class="upload-detail3">
					<span class="span3">음주 여부</span>
					<label for="yes">
						<input
							type="radio"
							v-model="update.drinking"
							name="drinking"
							id="yes"
							:value="true"
						/>네
					</label>
					<label for="no">
						<input
							type="radio"
							v-model="update.drinking"
							name="drinking"
							id="no"
							:value="false"
						/>아니오
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
						<input
							type="radio"
							v-model="update.smoking"
							name="smoking"
							id="no"
							:value="false"
						/>아니오
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
						<label for="bad_habits" class="habit-head"
							>다음 중 해당되는 사항에 모두 체크해주세요</label
						>
						<br />
						<span v-for="factor in factorLabel" :key="factor">
							<input
								type="checkbox"
								:name="factor"
								:value="factor"
								v-model="update.relevant_data"
							/>
							<label :for="factor">{{ factor }}</label>
						</span>
						<!-- <input
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
						불규칙 -->
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
	// computed: {
	// 	profile: function() {
	// 		return { ...this.$store.state.profile };
	// 	},
	// },
	created() {
		this.update = { ...this.$store.state.profile };
	},
	data() {
		return {
			update: {},
			disease_boolean: '',
			disease_other: '',
			diseaseLabel: ['고혈압', '간염', '결핵', '없음', '기타'],
			factorLabel: [
				'스트레스를 많이 받는 편',
				'식사 불규칙',
				'기름진 음식을 많이 먹음',
				'수면시간 불규칙',
			],
		};
	},
	methods: {
		updateProfileInfo() {
			// if (this.disease_other) this.update.disease_other = this.disease_other;
			this.$store.dispatch('updateProfileInfo', this.update);
		},
		initiateDiagnosedDisease() {
			this.update.diagnosed_disease.forEach(disease => {
				disease.checked = false;
			});
		},
		deleteProperty() {
			delete this.update.had_checkup_true;
			delete this.update.had_checkup_comment;
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
