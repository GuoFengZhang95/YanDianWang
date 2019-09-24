<template>
  <div class="ALL">
    <img src="../assets/images/good-top.jpg" alt="pic" class="good-back-top" />
    <div class="swiper-wrap">
      <!-- swiper 轮播图 -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperInfo" :key="index">
            <img :src="item" alt />
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="top-operations">
      <ul class="clearfix">
        <li class="ml20 fl" @click="$router.go(-1)">
          <van-icon name="arrow-left" />
        </li>
        <li>
          <van-icon name="ellipsis" />
        </li>
        <li class="mr40 fr">
          <van-icon name="shopping-cart-o" @click="goShopCart()" />
        </li>
      </ul>
    </div>
    <div class="good-info">
      <div class="good-info-top">
        <p class="good-title">{{detailInfo.name}}</p>
      </div>
      <div class="good-info-bot clearfix">
        <div class="price fl">
          <p>￥{{detailInfo.reduct_price}}</p>
          <p>￥{{detailInfo.original_price}}</p>
        </div>
        <div class="tag fl">
          <ul class="tag-list">
            <li>{{(detailInfo.allowance*10).toFixed(1)}}折</li>
            <li>包邮</li>
          </ul>
          <ul class="tag-list">
            <li v-for="(item,index) in detailInfo.describe" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="gap"></div>
    </div>
    <div class="good-more">
      <div class="top">
        <span @click="changeTable('goodDetail')" :class="[isSel==true?'sel':'']">商品详情</span>
        <span @click="changeTable('goodComments')" :class="[isSel==false?'sel':'']">卖家口碑</span>
      </div>
      <div :is="currentItem" :sInfo="detailInfo"></div>
    </div>
    <div class="good-buy">
      <div class="price">
        总价：
        <span>￥</span>
        <span>{{totalPrice}}</span>
      </div>
      <div class="add-shopcart" @click="addShopCart()">加入购物车</div>
      <div class="buy-now" @click="buyNow()">立即购买</div>
    </div>
    <!-- 购买参数部分 -->
    <transition name="fade">
      <div class="good-options" v-show="isOptionsShow===true">
        <van-icon name="cross" @click="closeOptions()" />
        <img src="../assets/images/header-image.jpg" alt class="good-image" />
        <div class="options-header">
          <div class="price">￥{{detailInfo.original_price}}</div>
          <div class="stock">库存{{detailInfo.total}}件</div>
          <div class="stock">请选择商品属性</div>
        </div>
        <div class="options-num clearfix">
          <span>购买数量</span>
          <van-stepper v-model="value" step="1" integer input-width="1rem" button-size=".5rem" />
        </div>
        <div class="options-select" v-if="detailInfo.buySelect">
          <div class="options-select-li clearfix">
            <p>{{detailInfo.buySelect[0].name}}</p>
            <ul>
              <li
                v-for="(item,index) in detailInfo.buySelect[0].list"
                :key="index"
                @click="choose1(index)"
                :class="[index==isChoose[0]?'active':'']"
              >{{item}}</li>
            </ul>
          </div>
          <div class="options-select-li clearfix">
            <p>{{detailInfo.buySelect[1].name}}</p>
            <ul>
              <li
                v-for="(item,index) in detailInfo.buySelect[1].list"
                :key="index"
                @click="choose2(index)"
                :class="[index==isChoose[1]?'active':'']"
              >{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <h3>{{isChoose[0]}}</h3>
    <h3>{{isChoose[1]}}</h3>
  </div>
</template>
<script>
import api from "../assets/common/api";
import goodDetail from "./pages/subPages/goodDetail";
import goodComments from "./pages/subPages/goodComments";
export default {
  components: {
    goodDetail,
    goodComments
  },
  data() {
    return {
      // 点击加入购物车的次数
      addNum:1,
      // 商品options
      // 商品options动态样式flag
      isChoose: [-1, -1],
      value: "1",
      // 商品参数显示flag
      isOptionsShow: false,
      // 当前商品价格
      currentGoodPrice: "",
      // 组件切换动态样式flag
      isSel: true,
      // 传值到 goodComments 组件
      detailInfo: "",
      swiperInfo: [],
      currentItem: "goodDetail"
    };
  },
  computed: {
    totalPrice() {
      return (this.value - 0) * this.currentGoodPrice;
    }
  },
  methods: {
    // 选择商品参数
    choose1(index) {
      if (this.isChoose[0] == index) {
        this.$set(this.isChoose, 0, -1);
      } else {
        this.$set(this.isChoose, 0, index);
      }
    },
    choose2(index) {
      if (this.isChoose[1] == index) {
        this.$set(this.isChoose, 1, -1);
      } else {
        this.$set(this.isChoose, 1, index);
      }
    },
    // 购买参数显示
    addShopCart() {
      // 如果没有参数要选择就直接加入购物车 否则弹出选择框
      if (this.detailInfo.buySelect.length > 0) {
        this.isOptionsShow = true;

      } else {
        console.log('直接加入购物车')
      }
    },
    buyNow() {
      this.isOptionsShow = true;
    },
    // 购买参数隐藏
    closeOptions() {
      this.isOptionsShow = false;
    },
    // 商品介绍与评价切换
    changeTable(e) {
      this.isSel = !this.isSel;
      this.currentItem = e;
    },
    goShopCart() {
      this.$router.push({
        path: "/index/shopCart"
      });
    }
  },
  mounted() {
    // 调取商品详情
    this.$axios({
      method: "get",
      url: api.getDetails,
      params: {
        pid: this.$route.query.id
      }
    }).then(res => {
      this.swiperInfo = res.data.data.swiperImgArr;
      this.detailInfo = res.data.data;
      this.currentGoodPrice = res.data.data.reduct_price;
      console.log(this.detailInfo);
      this.$nextTick(() => {
        // 实例化轮播图
        new this.$swiper(".swiper-container", {
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    });
  }
};
</script>
<style lang="" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(6rem);
}
.fade-enter-to {
  bottom: 0.99rem;
}
/* 商品参数部分 */
.active {
  background: #ff9900 !important;
  color: white;
}
.good-options {
  width: 100%;
  height: 5.74rem;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0.99rem;
  padding-top: 0.63rem;
  background-color: white;
}
.good-options .van-icon {
  position: absolute;
  right: 0.3rem;
  top: 0;
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  box-sizing: border-box;
  border: 0.03rem solid #999999;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.32rem;
  color: #999999;
}
.good-options .good-image {
  display: block;
  position: absolute;
  left: 0.42rem;
  top: -0.28rem;
  width: 2.02rem;
  height: 2.02rem;
  border: 0.07rem solid #dddddd;
  border-radius: 0.05rem;
}
.good-options .options-header {
  height: 0.98rem;
  font-size: 0.24rem;
  line-height: 0.32rem;
  color: #333333;
  padding-left: 2.8rem;
}
.good-options .options-header > div:nth-child(1) {
  color: #eb2222;
}
.good-options .options-num {
  font-size: 0.32rem;
  line-height: 0.5rem;
  margin-top: 0.48rem;
}
.good-options .options-num > span {
  float: left;
  margin-left: 0.42rem;
}
.good-options .options-num > .van-stepper {
  float: right;
  margin-right: 0.4rem;
}
.good-options .options-num > .van-stepper > .van-stepper__input {
  border-top: 0.02rem solid #dddddd !important;
  border-bottom: 0.02rem solid #dddddd !important;
  margin: 0rem !important;
}
.options-select .options-select-li {
  padding: 0.4rem 0.4rem 0 0.4rem;
}
.options-select .options-select-li p {
  font-size: 0.3rem;
  color: #333333;
  line-height: 0.3rem;
}
.options-select .options-select-li ul {
  margin-top: 0.17rem;
  text-align: center;
}
.options-select .options-select-li ul li {
  float: left;
  width: 1.2rem;
  height: 0.44rem;
  line-height: 0.44rem;
  font-size: 0.2rem;
  border-radius: 0.1rem;
  color: #999999;
  background-color: #dddddd;
  margin-right: 0.2rem;
}
.good-back-top {
  width: 100%;
  height: 0.4rem;
  display: block;
}
.swiper-wrap {
  width: 100%;
  height: 5.44rem;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #eeeeee;
}
.swiper-wrap img {
  display: block;
  width: 5.74rem;
  height: 5rem;
  margin: 0.15rem auto 0;
}
/* 轮播图上的选项 */
.top-operations {
  position: absolute;
  left: 0;
  top: 0.48rem;
  width: 100%;
  z-index: 100;
}
.top-operations ul li {
  width: 0.56rem;
  height: 0.56rem;
  border-radius: 50%;
  background-color: #b2b2b2;
  opacity: 0.7;
  line-height: 0.56rem;
  text-align: center;
  color: white;
  font-size: 0.3rem;
}
.top-operations ul li:nth-child(2) {
  float: right;
  margin-right: 0.28rem;
}
.good-info-top {
  margin-bottom: 0.1rem;
}
.good-info-top p {
  line-height: 0.4rem;
  font-size: 0.3rem;
  color: #333333;
  padding: 0 0.99rem 0 0.29rem;
}
.good-info-bot .price {
  margin-left: 0.24rem;
}
.good-info-bot .price p:nth-child(1) {
  color: #eb2222;
  font-size: 0.4rem;
  line-height: 0.4rem;
}
.good-info-bot .price p:nth-child(2) {
  color: #999999;
  font-size: 0.3rem;
  text-decoration: line-through;
}
.good-info-bot .tag {
  margin-left: 0.34rem;
}
.good-info-bot .tag .tag-list {
  display: flex;
  justify-content: flex-start;
  text-align: center;
  font-size: 0.2rem;
  margin-bottom: 0.1rem;
}
.good-info-bot .tag .tag-list li {
  margin-right: 0.2rem;
}
.good-info-bot .tag > ul:nth-child(1) > li {
  width: 0.7rem;
  height: 0.3rem;
  line-height: 0.3rem;
  background-color: #ff9900;
  color: #fff;
}
.good-info-bot .tag > ul:nth-child(2) > li {
  width: 1.05rem;
  height: 0.3rem;
  line-height: 0.3rem;
  background-color: #fff;
  color: #ff9900;
  border: 0.02rem solid #ff9900;
}
/* 分隔栏 */
.gap {
  height: 0.3rem;
  background-color: #eeeeee;
}
/* 商品详情和评论的tab */
.good-more .top {
  height: 0.6rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
.good-more .top > span {
  display: block;
  width: 1.5rem;
  /* border-bottom: .03rem solid #ff9900 */
  border-bottom: 0.03rem solid white;
  color: #999999;
  font-size: 0.26rem;
  line-height: 0.6rem;
  text-align: center;
}
/* tab选中时添加动态样式 */
.sel {
  border-bottom: 0.03rem solid #ff9900 !important;
  color: #ff9900 !important;
}
/* 购买栏 */
.good-buy {
  height: 1.01rem;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  border-top: 0.01rem solid #dddddd;
  background: white;
  line-height: 1.01rem;
  display: flex;
  justify-content: flex-end;
  font-size: 0.3rem;
  text-align: center;
  z-index: 100;
}
.good-buy .price {
  width: 3.22rem;
  color: #666666;
  text-align: left;
}
.good-buy .price > span {
  color: #eb2222;
}
.good-buy .add-shopcart,
.good-buy .buy-now {
  width: 1.98rem;
  color: #fff;
}
.good-buy .add-shopcart {
  background-color: #ff9900;
}
.good-buy .buy-now {
  background-color: #eb2222;
}
</style>