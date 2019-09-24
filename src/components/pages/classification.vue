<template>
  <div class="ALL">
    <img src="../../assets/images/class-top.jpg" alt="pic" class="topBack" />
    <div class="search-wrap">
      <input type="text" v-model="inpVal" />
      <i class="icon iconsousuo"></i>
    </div>
    <div class="content-wrap">
      <!-- 左侧边栏 -->
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          :title="item.name"
          @click="tableChange"
          v-for="(item,index) in classData"
          :key="index"
        />
      </van-sidebar>
      <!-- 右侧数据 -->
      <div class="subGood" v-for="(item,index) in classData" :key="index" v-show="index==isShow">
        <ul>
          <li v-for="i in item.list" :key="i.id" @click="goodsShow(i.id)">
            <div>
              <img :src="i.thumbnail" />
              <p>{{i.name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../assets/common/api";
export default {
  data() {
    return {
      inpVal: "Montange jeunesse",
      activeKey: 0,
      classData: [],
      isShow: 0
    };
  },
  methods: {
    tableChange(index) {
      this.isShow = index;
    },
    // 跳转到商品展示页
    goodsShow(id) {
      // console.log(id)
      this.$router.push({
        path: "/goodShow",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {
    this.$axios({
      method: "get",
      url: api.getClassify
    }).then(res => {
      // console.log(res);
      this.classData = res.data.data;
    });
  }
};
</script>
<style lang="">
.ALL {
  width: 7.5rem;
  position: relative;
}
.topBack {
  display: block;
  width: 100%;
  height: 1.38rem;
}
/* 搜索区域 */
.search-wrap {
  position: absolute;
  left: 50%;
  top: 0.6rem;
  transform: translate(-2.56rem, 0);
  width: 5.12rem;
  height: 0.62rem;
  line-height: 0.62rem;
  color: #999999;
}
.search-wrap input {
  width: 100%;
  height: 100%;
  padding-left: 0.23rem;
  background: rgb(0, 0, 0, 0.1);
  border: none;
  border-radius: 0.1rem;
}
/* 设置测导航和右侧组件的弹性盒子样式 */
.content-wrap {
  display: flex;
}
/* 设置侧导航组件样式 */
.van-sidebar {
  width: 2.34rem;
  background: #fafafa;
  align-items: stretch;
  min-height: 100vh;
}
.van-sidebar-item {
  width: 2.34rem;
  height: 0.94rem;
  line-height: 0.94rem;
  padding: 0 0 0 0.58rem;
  background-color: #fafafa;
}
.van-sidebar-item--select {
  color: #ff9900;
  border-left: 0.1rem solid #1d84a7;
  background-color: #fff;
}
/* 设置三级页面公共样式 */
.subGood {
  width: 5.16rem;
  padding: 0.2rem 0.2rem 0.2rem;
  box-sizing: border-box;
}
.subGood ul {
  width: 100%;
  margin-bottom: 0.24rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.subGood ul li {
  margin-bottom: 0.23rem;
}
.subGood ul div {
  width: 2.28rem;
  height: 2.38rem;
  box-sizing: border-box;
  border: 0.02rem solid #1d84a7;
  border-radius: 0.06rem;
}
.subGood ul div img {
  width: 1.7rem;
  height: 1.7rem;
  display: block;
  margin: 0.2rem auto 0;
}
.subGood ul div p {
  text-align: center;
  background-color: #1d84a7;
  line-height: 0.46rem;
  color: #fff;
}
</style>