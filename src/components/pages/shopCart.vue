<template>
  <div>
    <div class="shopcart-top">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <p class>购物车</p>
    </div>
    <div class="shopcart-wrap">
      <ul v-for="(item,index) in shopCartGoodInfo" :key="item.id">
        <li>
          <p class="good-store">
            <van-icon name="shop-o" />
            {{item.location}}
          </p>
          <div class="good-info">
            <label for class="checkbox" @click="selOne(index)">
              <input type="checkbox" v-model="item.flag" />
              <span :class="[item.flag==true?'active':'']"></span>
            </label>
            <div class="main clearfix" ref="box">
              <div class="main-left fl">
                <img :src="item.imgUrl" alt />
              </div>
              <div class="main-mid fl">
                <p>{{item.title}}</p>
                <p>{{item.tip}}</p>
                <p>
                  <span>-</span>
                  <input type="number" name id value="1" />
                  <span>+</span>
                </p>
              </div>
              <div class="main-right fl">￥{{item.price}}</div>
            </div>
            <div class="del" @click="del(index)">删除</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="operate clearfix">
      <div class="sel-all fl check">
        <label for @click="selAll()">
          <input type="checkbox" name id />
          <span :class="[allActive==true?'active':'']"></span>
          <p>全选</p>
        </label>
      </div>
      <div class="edit fl check">
        <label for @click="edit()">
          <input type="checkbox" name id />
          <span :class="[editActive==true?'active':'']"></span>
          <p>编辑</p>
        </label>
      </div>
      <div class="total fl">
        <p>
          合计
          <span>118.00</span>
        </p>
        <p>不含运费</p>
      </div>
      <div class="cal fr">去结算</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editChecked: false,
      allActive: false,
      editActive: false,
      checkedArr: [false, false],
      bool: false,
      shopCartGoodInfo: [
        {
          id: "0001",
          location: "杭州保税区",
          imgUrl: require("../../assets/images/shopcart-img-1.jpg"),
          title: "ChildLift/童年时光婴幼儿啊哈哈哈哈",
          tip: "90粒装",
          price: 118,
          flag: false
        },
        {
          id: "0002",
          location: "上海保税区",
          imgUrl: require("../../assets/images/shopcart-img-1.jpg"),
          title: "这是第二件商品的名字",
          tip: "tiptiptiptip",
          price: 218,
          flag: false
        }
      ]
    };
  },
  methods: {
    // 删除操作
    del(index) {
      console.log(index);
    },
    // 选中某件商品
    selOne(index) {
      this.shopCartGoodInfo[index].flag = !this.shopCartGoodInfo[index].flag;
      // checkedArr 赋值并给出boo的值
      this.shopCartGoodInfo.forEach((item, index) => {
        this.checkedArr[index] = item.flag;
      });
      this.bool = this.checkedArr.every((d, i) => {
        return d == true;
      });
      // 都勾选自动勾选全选按钮，有一个取消勾选，全选不勾选
      if (this.bool) {
        this.allActive = true;
      } else {
        this.allActive = false;
      }
    },
    // 编辑事件
    edit() {
      this.editActive = !this.editActive;
      console.log(this.$refs.box);
      let box = this.$refs.box;
      box.forEach((item, index) => {
        this.$U.move(item, {
          left: 1
        });
      });
    },
    // 全选事件
    selAll() {
      // checkedArr 赋值并给出boo的值
      this.shopCartGoodInfo.forEach((item, index) => {
        this.checkedArr[index] = item.flag;
      });
      this.bool = this.checkedArr.every((d, i) => {
        return d == true;
      });
      // 如果都勾选了，点击全选为全取消
      if (this.bool) {
        this.shopCartGoodInfo.forEach((item, index) => {
          item.flag = false;
        });
        this.allActive = false;
      } else {
        // 否则全部勾选
        this.allActive = true;
        this.shopCartGoodInfo.forEach((i, index) => {
          // i.flag == false ? true : i.flag;
          if (i.flag == false) {
            i.flag = true;
          }
        });
      }
    }
  },
  mounted() {
    //根据返回的商品数据 给input 添加是否选中的flag
    // this.shopCartGoodInfo.map((item, index) => {
    //   return (item.flag = true);
    // });
    // console.log(this.shopCartGoodInfo);
  }
};
</script>
<style lang="">
.shopcart-top {
  width: 100%;
  height: 1.32rem;
  position: relative;
  background: url(../../assets/images/class-top.jpg);
  background-size: 100%, 100%;
  line-height: 1.32rem;
  color: white;
  font-size: 0.42rem !important;
  text-align: center;
}
.shopcart-top > .van-icon {
  position: absolute;
  left: 0.4rem;
  bottom: 0.28rem;
  font-size: 0.4rem;
}
.shopcart-wrap {
  padding: 0 0.19rem;
}
.shopcart-wrap li {
  background-color: #f7f7f7;
  overflow: hidden;
}
.good-store {
  position: relative;
  padding-left: 0.8rem;
  position: relative;
  line-height: 1.18rem;
  font-size: 0.42rem;
  color: #999;
}
.good-store > i {
  position: absolute;
  left: 0.2rem;
  top: 0.35rem;
}

.good-info {
  height: 2.08rem;
  position: relative;
}
/* 设置复选框 */
.good-info > .checkbox {
  position: absolute;
  left: 0.19rem;
  top: 0.55rem;
}
.good-info > .checkbox > span {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background-image: url(../../assets/i-images/unsel.jpg);
  background-size: 100%, 100%;
}
.good-info > .checkbox > span.active {
  background-image: url(../../assets/i-images/sel.jpg) !important;
}
.good-info > .checkbox > input {
  position: absolute;
  left: -111111111px;
}
/* 商品中间部分 */
.good-info .main {
  position: absolute;
  left: 0.83rem;
  z-index: 10;
  background: #f7f7f7;
  padding: 0.15rem 0;
}
.good-info .main img {
  width: 1.58rem;
  height: 1.58rem;
}
.good-info .main .main-mid {
  color: #333;
  font-size: 0.42rem;
  line-height: 0.42rem;
  width: 3rem;
  margin-left: 0.2rem;
}
.good-info .main .main-mid > p:nth-child(1) {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0.15rem;
}
.good-info .main .main-mid > p:nth-child(2) {
  color: #999;
}
.good-info .main .main-mid > p:nth-child(3) {
  width: 2.34rem;
  height: 0.46rem;
  box-sizing: border-box;
  border: 0.02rem solid #cccccc;
  border-radius: 0.03rem;
  display: flex;
  text-align: center;
  justify-content: flex-start;
  margin-top: 0.3rem;
}
.good-info .main .main-mid > p:nth-child(3) span {
  display: block;
  width: 0.74rem;
  align-items: stretch;
  line-height: 0.42rem;
}
.good-info .main .main-mid > p:nth-child(3) > input {
  width: 0.8rem;
  box-sizing: border-box;
  border: none;
  border-left: 0.01rem solid #cccccc;
  border-right: 0.01rem solid #cccccc;
  padding-left: 0.3rem;
}
.good-info .main .main-right {
  color: #000000;
  font-size: 0.42rem;
  line-height: 1.8rem;
  padding-right: 0.35rem;
}
.good-info .del {
  position: absolute;
  right: 0;
  top: 0;
  width: 0.7rem;
  height: 2.08rem;
  background-color: #ff9900;
  line-height: 2.08rem;
  color: white;
  font-size: 0.32rem;
  text-align: center;
}
/* 结算栏 */
.operate {
  width: 100%;
  height: 1.15rem;
  box-sizing: border-box;
  border-top: 0.03rem solid #eeeeee;
  background-color: white;
  position: fixed;
  bottom: 1.03rem;
}
.operate .check {
  margin-top: 0.18rem;
}
.operate input {
  position: absolute;
  left: 10000px;
}
.operate .sel-all {
  margin-left: 0.4rem;
}
.operate .edit {
  margin-left: 0.65rem;
  margin-right: 1.15rem;
}
.operate label > span {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background-image: url(../../assets/i-images/unsel.jpg);
  background-size: 100%, 100%;
}
.operate label > .active {
  background-image: url(../../assets/i-images/sel.jpg) !important;
}
.operate label > p {
  font-size: 0.28rem;
  line-height: 0.28rem;
  color: #666;
  margin-top: 0.1rem;
}
.operate .total {
  margin-top: 0.24rem;
}
.operate .total > p {
  line-height: 0.3rem;
  font-size: 0.24rem;
  color: #999999;
}
.operate .cal {
  width: 2.14rem;
  background-color: #ff5500;
  height: 100%;
  text-align: center;
  font-size: 0.36rem;
  line-height: 1.12rem;
  color: white;
}
</style>

