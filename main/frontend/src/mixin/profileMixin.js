export default {
	data() {
		return {
			allergyLabel: ['비염', '피부염', '천식', '기타 알레르기'],
			healthy: ['비타민제', '한약', '기타'],
			diseaseLabel: ['고혈압', '간염', '결핵', '없음', '기타'],
			factorLabel: [
				'스트레스를 많이 받는 편',
				'식사 불규칙',
				'기름진 음식을 많이 먹음',
				'수면시간 불규칙',
			],
			family_history: ['부모', '형제', '4촌 내 친천', '이외 기타'],
		};
	},
	computed: {
		click_profile() {
			return this.$store.state.click_profile;
		},
	},
	watch: {
		click_profile(click) {
			if (click) {
				this.$store.commit('COMBINE_PROFILE', this.update);
			}
		},
	},
	methods: {
		initiateDiagnosedDisease() {
			this.update.diagnosed_disease.forEach(disease => {
				disease.checked = false;
			});
		},
		deleteProperty(property) {
			delete this.update[property];
		},
	},
};
