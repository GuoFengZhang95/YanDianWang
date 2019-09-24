<template>
  <div>
    <div class="cmt-list">
      <div class="cmt-tag">
        <a href="javascript:;" @click="show(0)" :class="[isCmtShow[0] ==1?'sel':'']">全部评价</a>
        <a href="javascript:;" @click="show(1)" :class="[isCmtShow[1] ==1?'sel':'']">好评</a>
        <a href="javascript:;" @click="show(2)" :class="[isCmtShow[2] ==1?'sel':'']">差评</a>
        <a href="javascript:;" @click="show(3)" :class="[isCmtShow[3] ==1?'sel':'']">晒单</a>
      </div>
      <div class="cmt" v-show="isCmtShow[0]===1">
        <ul class="cmt-info" v-for="(item,index) in sInfo.buyerReviews.all" :key="index">
          <li>
            <div class="top">
              <span>{{item.buyerName}}</span>
              <span>{{item.createTime|time('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
            <div class="middle clearfix">
              <img :src="item" alt v-for="(item,index) in item.postImg" :key="index" />
            </div>
            <p class="cmt">{{item.postDescribe}}</p>
            <p class="reply">管理员：{{item.adminReviews}}</p>
          </li>
        </ul>
      </div>
      <div class="cmt" v-show="isCmtShow[1]===1">
        <ul class="cmt-info" v-for="(item,index) in sInfo.buyerReviews.good" :key="index">
          <li>
            <div class="top">
              <span>{{item.buyerName}}</span>
              <span>2015-10-03 21:47:13</span>
            </div>
            <div class="middle clearfix">
              <img :src="item" alt v-for="(item,index) in item.postImg" :key="index" />
            </div>
            <p class="cmt">{{item.postDescribe}}</p>
            <p class="reply">管理员：{{item.adminReviews}}</p>
          </li>
        </ul>
      </div>
      <div class="cmt" v-show="isCmtShow[2]===1">
        <ul class="cmt-info" v-for="(item,index) in sInfo.buyerReviews.bad" :key="index">
          <li>
            <div class="top">
              <span>{{item.buyerName}}</span>
              <span>2015-10-03 21:47:13</span>
            </div>
            <div class="middle clearfix">
              <img :src="item" alt v-for="(item,index) in item.postImg" :key="index" />
            </div>
            <p class="cmt">{{item.postDescribe}}</p>
            <p class="reply">管理员：{{item.adminReviews}}</p>
          </li>
        </ul>
      </div>
      <div class="cmt" v-show="isCmtShow[3]===1">
        <ul class="cmt-info" v-for="(item,index) in sInfo.buyerReviews.postForm" :key="index">
          <li>
            <div class="top">
              <span>{{item.buyerName}}</span>
              <span>2015-10-03 21:47:13</span>
            </div>
            <div class="middle clearfix">
              <img :src="item" alt v-for="(item,index) in item.postImg" :key="index" />
            </div>
            <p class="cmt">{{item.postDescribe}}</p>
            <p class="reply">管理员：{{item.adminReviews}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isCmtShow: [0, 1, 0, 0]
      isCmtShow: {
        0: 1,
        1: 0,
        2: 0,
        3: 0
      }
    };
  },
  // 接收父组件的传值
  props: ["sInfo"],
  methods: {
    show(index) {
      for (let i in this.isCmtShow) {
        this.isCmtShow[i] = 0;
      }
      this.isCmtShow[index] = 1;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.cmt-tag {
  height: 0.71rem;
  box-sizing: border-box;
  line-height: 0.7rem;
  border-top: 0.01rem solid #dddddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.cmt-tag > a {
  display: block;
  width: 1.35rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 0.2rem;
  color: white;
  background-color: #999999;
}
.cmt-info {
  width: 6.9rem;
  margin: 0 auto 0.2rem;
  font-size: 0.2rem;
  border-top: 0.01rem solid #dddddd;
}
.cmt-info .top {
  display: flex;
  justify-content: space-between;
  height: 0.62rem;
  line-height: 0.62rem;
}
.cmt-info .top > span:nth-child(1) {
  color: #ff9900;
  font-size: 0.24rem;
}
.cmt-info .top > span:nth-child(2) {
  color: #999999;
}
.cmt-info .middle > img {
  width: 1.51rem;
  height: 1.51rem;
  float: left;
}
.cmt-info .cmt {
  line-height: 0.38rem;
  color: #999999;
}
.cmt-info .reply {
  line-height: 0.26rem;

  padding: 0.12rem 0.1rem;
  background-color: #dddddd;
  border-radius: 0.1rem;
}
.sel {
  background-color: #ff9900 !important;
}
</style>