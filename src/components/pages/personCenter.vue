<template>
  <div>
    <div class="top">
      <van-icon name="setting-o" />
      <span>个人中心</span>
      <van-icon name="comment-o"></van-icon>
    </div>
    <div class="headerframe" @click="goRegister()">
      <div class="headerimage">
        <img src alt />
      </div>
      <p class="nickname">点击登录</p>
    </div>
    <div class="my-collection clearfix">
      <van-icon name="like-o" class="fl" />
      <span class="fl">我的收藏</span>
      <span class="fl">(5)</span>
    </div>
    <div class="gap"></div>
    <div class="my-order clearfix">
      <span class="fl">我的订单</span>
      <span class="fr">查看全部订单</span>
    </div>
    <ul class="my-operations">
      <li>
        <van-icon class-prefix="my-icon"  name="daifukuan" />
        <span>待付款</span>
      </li>
      <li>
        <van-icon class-prefix="my-icon" name="daifahuo" info="1" />
        <span>待发货</span>
      </li>
      <li>
        <van-icon class-prefix="my-icon" name="daishouhuo" info="2" />
        <span>待收货</span>
      </li>
      <li>
        <van-icon class-prefix="my-icon" name="evaluate" />
        <span>待评价</span>
      </li>
      <li>
        <van-icon class-prefix="my-icon" name="tuikuan" />
        <span>退款/售后</span>
      </li>
    </ul>
    <div class="gap"></div>
    <div class="address-manage">
      <router-link to class="a-m">收货地址管理</router-link>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goRegister() {
      this.$router.push({
        path: "/register"
      });
    }
  },
  mounted() {}
};
</script>
<style lang="" scoped>
body {
  background: #f3f3f3;
  min-height: 100vh;
}
.top {
  width: 100%;
  height: 5rem;
  box-sizing: border-box;
  background-image: url(../../assets/images/class-top.jpg);
  background-size: 100% 100%;
  color: white;
  font-size: 0.42rem;
  line-height: 0.42rem;
  display: flex;
  justify-content: space-between;
  padding: 0.73rem 0.3rem 0 0.3rem;
  align-items: flex-start;
}
.headerframe {
  position: absolute;
  left: 2.7rem;
  top: 2.35rem;
  width: 2.06rem;
  height: 2.62rem;
  text-align: center;
  color: #333333;
}
.headerframe .headerimage {
  width: 100%;
  height: 2.06rem;
  box-sizing: border-box;
  border: 0.12rem solid #fff;
  border-radius: 50%;
  background: #e6dfdf;
}
.headerframe > p {
  font-size: 0.32rem;
  line-height: 0.32rem;
  margin-top: 0.22rem;
}
.my-collection {
  font-size: 0.34rem;
  line-height: 0.34rem;
  padding: 0.44rem 0;
  margin-top: 0.1rem;
}
.my-collection .van-icon {
  margin-left: 0.35rem;
  color: #ed6a66;
  font-size: 0.34rem !important;
}
.my-collection > span {
  margin-left: 0.25rem;
}
.gap {
  height: 0.14rem;
  background-color: #eeeeee;
}
.my-order {
  height: 1.24rem;
  box-sizing: border-box;
  font-size: 0.34rem;
  padding: 0.44rem 0.2rem 0.44rem 0.46rem;
}
.my-order > span {
  line-height: 0.34rem;
}
.my-order > span:nth-child(2) {
  font-size: 0.32rem;
  color: #999999;
}
.my-operations {
  height: 1.89rem;
  box-sizing: border-box;
  border-top: 0.01rem solid #b3b3b3;
  display: flex;
  justify-content: space-around;
  padding: 0.45rem 0;
}
.my-operations > li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.my-operations > li > .my-icon {
  font-size: 0.46rem;
  line-height: 0.46rem;
  color: #aaaaaa;
}
.my-operations > li > span {
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: #666666;
}
.address-manage {
  height: 1.3rem;
  background: #fafafa;
  padding: 0.48rem 0 0.48rem 0.46rem;
  box-sizing: border-box;
}
.address-manage .a-m {
  font-size: 0.34rem;
  line-height: 0.34rem;
  color: #999999;
}
</style>