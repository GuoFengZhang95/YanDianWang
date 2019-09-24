<template>
  <div class="ALL">
    <img src="../../assets/images/top.jpg" alt="pic" class="topBack" />
    <img src="../../assets/images/adver.jpg" alt="pic" class="topAdver" />
    <div class="search-wrap">
      <input type="text" v-model="inpVal" />
      <van-icon class-prefix="my-icon" name="sousuo" />
    </div>
    <div class="content">
      <div class="list" v-for="(item,index) in indexData" :key="index">
        <div class="list-top">
          <img :src="item.icon" alt />
          <h3>{{item.name}}</h3>
        </div>
        <ul class="list-main">
          <li v-for="i in item.list" :key="i.id" @click="goodShow(i.id)">
            <img :src="i.thumbnail" alt />
            <p class="price">
              <span>￥{{i.reduct_price}}</span>
              <span>￥{{i.original_price}}</span>
            </p>
            <p class="text">{{i.name}}</p>
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
      indexData: [],
      iconArray: [
        require("../../assets/i-images/hot.png"),
        require("../../assets/i-images/baby.png"),
        require("../../assets/i-images/meizhuang.png"),
        require("../../assets/i-images/furniture.png"),
        require("../../assets/i-images/food.png"),
        require("../../assets/i-images/airplane.png")
      ]
    };
  },
  mounted() {
    this.$axios({
      method: "get",
      url: api.getIndexData
    }).then(res => {
      // console.log(res);
      let resArr = res.data.data;
      resArr.map((item, index) => {
        item.icon = this.iconArray[index];
      });
      // console.log(resArr);
      this.indexData = resArr;
    });
  },
  methods: {
    // 跳转到商品展示页
    goodShow(id) {
      // console.log(id)
      this.$router.push({
        path: "/goodShow",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="" scoped>
.ALL {
  width: 7.5rem;
  position: relative;
}
.topBack {
  display: block;
  width: 100%;
  height: 1.46rem;
}
.topAdver {
  display: block;
  width: 100%;
  height: 3.8rem;
}
/* 搜索区域 */
.search-wrap {
  position: absolute;
  left: 50%;
  top: 0.65rem;
  transform: translate(-2.56rem, 0);
  width: 5.12rem;
  height: 0.62rem;
  line-height: 0.62rem;
  color: #999999;
}
.search-wrap input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 0.23rem;
  background: #fed8e2;
  border: none;
  border-radius: 0.1rem;
}
.search-wrap .my-icon {
  position: absolute;
  right: 0.2rem;
  top: 0.1rem;
  font-size: 0.5rem;
  line-height: 0.5rem;
}
/* 商品展示部分 */
.content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.19rem 0.21rem 0.19rem;
  border-bottom: 0.02rem solid #eeeeee;
  background-color: #fafafa;
  padding-bottom: 1.4rem;
}
.content .list {
  width: 100%;
  height: 5.65rem;
}
.content .list .list-top {
  height: 0.95rem;
  line-height: 0.95rem;
  color: #333333;
  font-size: 0.28rem;
}
.content .list .list-top h3 {
  margin-left: 0.12rem;
  display: inline-block;
}
.content .list .list-top img {
  width: 0.2rem;
  height: 0.2rem;
  vertical-align: middle;
}
.content .list .list-main {
  display: flex;
  justify-content: space-between;
}
.content .list .list-main li {
  width: 3.3rem;
  height: 4.7rem;
  box-sizing: border-box;
  border: 0.02rem solid #f1f1f1;
  text-align: center;
  background-color: #fff;
}
.content .list .list-main li img {
  display: block;
  width: 2.32rem;
  height: 2.23rem;
  margin: 0.5rem auto 0.5rem;
}
.content .list .list-main li p {
  line-height: 0.4rem;
}
.content .list .list-main li .price {
  color: #f8bbc0;
  text-align: left;
}
.content .list .list-main li .price span:nth-child(1) {
  color: #e60012;
  margin-left: 0.3rem;
}
.content .list .list-main li .price span:nth-child(2) {
  color: #707070;
  margin-left: 0.82rem;
  font-size: 0.24rem;
  text-decoration: line-through;
}
.content .list .list-main li .text {
  color: #666666;
  text-align: left;
  padding-left: 0.2rem;
}
</style>