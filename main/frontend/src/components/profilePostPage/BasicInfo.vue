<template>
	<div>
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
					<input type="text" ref="name" v-model="update.name" placeholder="예)홍길동" />
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
	</div>
</template>

<script>
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
			update: {},
		};
	},
};
</script>

<style></style>
