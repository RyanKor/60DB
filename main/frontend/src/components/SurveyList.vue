<template>
  <div class="container">
    <div class="box">
      <div class="header">
        <h1 class="header__title">지난 설문이력 보기</h1>
        <p class="header__body">
          지난 설문을 확인해 볼 수 있습니다.
          <br />바로가기를 클릭해주세요
        </p>
      </div>
      <div class="table__header">
        <div class="table__header--col table__header--col1"></div>
        <div class="table__header--col table__header--col2">증상</div>
        <div class="table__header--col table__header--col3">작성일</div>
        <div class="table__header--col table__header--col4">바로가기</div>
      </div>
      <div v-for="(item,index) in survey_history" :key="item.id">
        <div class="table__body">
          <span class="table__body--col table__body--col1">{{ index +1}}</span>
          <span class="table__body--col table__body--col2">복통</span>
          <span
            class="table__body--col table__body--col3"
          >{{item.createdAt.slice(0,item.createdAt.indexOf('T'))}}</span>
          <router-link class="table__body--col table__body--col4" :to="`/stomach/${item._id}`">
            <img class="link-img" src="../assets/link.png" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { async } from "q";
export default {
  computed: {
    ...mapState(["survey_history"])
  },
  mounted() {
    this.$store.commit("SET_LOADING", false);
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
}
/* header */
.header {
  width: 100%;
  margin: 1rem 0 3rem 0;
  padding-left: 1.5rem;
}
.header__title {
  margin-bottom: 0.5rem;
}
.header__body {
  line-height: 1.3rem;
  color: rgb(90, 90, 90);
}
.box {
  width: 98%;
  min-height: 800px;
  margin: 1rem auto;
  padding-bottom: 1rem;
  border-radius: 10px;
  /* border: 0.5px solid gray; */
  background-color: rgb(255, 255, 255, 0.8);
  padding: 1rem 0.5rem;
}
.link-img {
  width: 23px;
  height: 23px;
}
/* table__header */
.table__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
  border: 1px solid rgb(210, 210, 210);
  border-bottom: 1px solid rgb(114, 114, 114);
  background-color: #f8fbff;
  color: rgb(56, 56, 56);
  font-weight: bold;
}
.table__header--col {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.table__header--col1 {
  width: 15%;
  border-right: 1px solid rgb(210, 210, 210);
}
.table__header--col2 {
  width: 20%;
  border-right: 1px solid rgb(210, 210, 210);
}
.table__header--col3 {
  width: 40%;
  border-right: 1px solid rgb(210, 210, 210);
}
.table__header--col4 {
  width: 25%;
}
/* table__body */
.table__body {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  width: 100%;
}
.table__body--col {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(210, 210, 210);
}
.table__body--col1 {
  width: 15%;
  border-right: 1px solid rgb(210, 210, 210);
}
.table__body--col2 {
  width: 20%;
  border-right: 1px solid rgb(210, 210, 210);
}
.table__body--col3 {
  width: 40%;
  border-right: 1px solid rgb(210, 210, 210);
}
.table__body--col4 {
  width: 25%;
}
</style>