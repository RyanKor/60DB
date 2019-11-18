<template>
	<div class="form">
		<basic-info />
		<history />
		<social />

		<div class="updatecomplete">
			<v-btn @click.native="postProfileInfo()" class="button" color="#669999"
				>프로필 업데이트</v-btn
			>
			<div class="pluslist"></div>
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
		combine_profile(profile) {
			if (profile === 3) {
				this.$store.dispatch('postProfileInfo');
			}
		},
	},
	methods: {
		postProfileInfo() {
			this.$store.commit('SET_CLICK_PROFILE', true);
			// this.$store.dispatch('postProfileInfo');
			// this.$store.commit('SET_CLICK_PROFILE', true);
			// setTimeout(() => {
			// 	this.$store.dispatch('postProfileInfo', this.$store.state.profile);
			// }, 500);
		},
	},
};
</script>
<style scoped>
/* .cont1 {
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
} */
</style>
