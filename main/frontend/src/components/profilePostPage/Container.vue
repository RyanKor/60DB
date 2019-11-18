<template>
	<div class="form">
		<basic-info />
		<history />
		<social />

		<div class="updatecomplete">
			<div class="button-div">
				<button @click="postProfileInfo()" class="button">프로필 업데이트</button>
			</div>
		</div>
	</div>
</template>
<script>
import BasicInfo from './BasicInfo.vue';
import History from './History.vue';
import Social from './Social.vue';

export default {
	components: {
		BasicInfo,
		History,
		Social,
	},
	computed: {
		combine_profile() {
			return this.$store.state.combine_profile;
		},
	},
	watch: {
		combine_profile(combine) {
			if (combine === 3) {
				this.$store.dispatch('postProfileInfo');
			}
		},
	},
	methods: {
		postProfileInfo() {
			console.log('asdf');
			// this.$store.dispatch('postProfileInfo');
			this.$store.commit('SET_CLICK_PROFILE', true);
			// setTimeout(() => {
			// 	this.$store.dispatch('postProfileInfo', this.$store.state.profile);
			// }, 500);
		},
	},
};
</script>
<style scoped>
.button {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(255, 182, 47);
	width: 90%;
	height: 42px;
	margin: 1rem auto;
	color: white;
	font-weight: bold;
	border-radius: 8px;
}
</style>
