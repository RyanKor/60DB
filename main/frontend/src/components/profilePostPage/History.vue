<template>
	<div>
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
							deleteProperty('checkup_history');
							deleteProperty('had_checkup_comment');
						"
						id="no"
						:value="false"
					/>없음
				</label>
				<br />
				<div v-show="update.had_checkup">
					<span class="span2" for="had_long_before">마지막으로 건강검진 받은 시기</span>
					<br />
					<input
						class="select selectline"
						name="checkup_history"
						type="radio"
						v-model="update.checkup_history"
						value="1년 이내"
					/>1년 이내
					<input
						class="select selectline"
						name="checkup_history"
						type="radio"
						v-model="update.checkup_history"
						value="1-3년"
					/>1~3년
					<input
						class="select"
						type="radio"
						name="checkup_history"
						v-model="update.checkup_history"
						value="3-5년"
					/>3~5년
					<input
						class="select"
						type="radio"
						name="checkup_history"
						v-model="update.checkup_history"
						value="5-10년"
					/>5~10년
					<span class="span2">건강검진-이상소견</span>
					<input
						type="text"
						placeholder="ex)갑상선 수치에 이상이 있어요"
						v-model="update.had_checkup_comment"
					/>
				</div>
				<br />
				<span class="span2" for="disease_list">병 진단 이력</span>
				<br />
				<input
					type="radio"
					:value="true"
					name="disease_boolean"
					v-model="update.disease_boolean"
				/>있음
				<input
					type="radio"
					name="disease_boolean"
					@click="initiateDiagnosedDisease()"
					:value="false"
					v-model="update.disease_boolean"
				/>
				없음
				<template v-if="update.disease_boolean">
					<span v-for="disease in update.diagnosed_disease" :key="disease.name">
						<input type="checkbox" :name="disease" v-model="disease.checked" />
						<label v-if="!disease.label" :for="disease">{{ disease.name }}</label>
						<label v-else :for="disease">기타</label>
					</span>
				</template>

				<div v-for="(disease, index) in update.diagnosed_disease" :key="`disease.name${index}`">
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
						<span class="span2">{{ disease.name }} 때문에 드시고 계신 약이 있다면 적어주세요</span>
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
				<br />
				<span class="span2">
					<template v-for="disease in update.diagnosed_disease">
						<span v-show="disease.checked">{{ disease.name, }}</span>
					</template>
					이외 복용중인 약
				</span>
				<br />
				<br />
				<input type="text" ref="other_medicine" v-model="update.other_medicine" />
				<span>복용중인 건강식품</span>
				<span v-for="element in healthy" :key="element">
					<input
						class="select selectline"
						type="radio"
						v-model="update.taking_healthy"
						:value="element"
					/>
					{{ element }}
				</span>
				<span for="family_disease">가족력</span>
				<br />
				<span v-for="(disease, index) in diseaseLabel" :key="index">
					<input type="checkbox" :name="disease" :value="disease" v-model="update.family_history" />
					<label :for="disease">{{ disease }}</label>
				</span>

				<div v-show="update.family_history.length">
					<span v-for="history in family_history" :key="history">
						<input
							type="checkbox"
							:name="history"
							:value="history"
							v-model="update.family_history_true"
						/>
						{{ history }}
					</span>
				</div>
				<br />
				<span>알레르기 이력(없으면 생략해주세요)</span>
				<br />
				<span v-for="allergy in allergyLabel" :key="allergy">
					<input type="checkbox" :name="allergy" :value="allergy" v-model="update.allergy" />
					<label :for="allergy">{{ allergy }}</label>
				</span>
				<div v-show="update.allergy.includes('기타 알레르기')">
					<input type="text" placeholder="어떤 알레르기이신가요?" v-model="update.allergy_other" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profileMixin from '../../mixin/profileMixin.js';
export default {
	computed: {
		click_profile() {
			return this.$store.state.click_profile;
		},
	},
	watch: {
		click_profile(click) {
			if (click) {
				this.$store.dispatch('setProfileData', this.update);
			}
		},
	},

	data() {
		return {
			update: {
				diagnosed_disease: [
					{
						name: '고혈압',
						checked: false,
					},
					{
						name: '간염',
						checked: false,
					},
					{
						name: '결핵',
						checked: false,
					},
					{
						name: '',
						label: '기타',
						checked: false,
					},
				],
				taking_healthy: [],
				family_history: [],
				family_history_true: [],
				allergy: [],
			},
		};
	},
	mixins: [profileMixin],
};
</script>

<style></style>
