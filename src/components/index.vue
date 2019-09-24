<template>
  <div>
    <router-view></router-view>
    <div class="bot-table">
      <a
        :to="item.router"
        :class="[tableIsShow==index?'indexTable sel':'indexTable']"
        v-for="(item,index) in tabImgInfo"
        :key="index"
        @click="changeTable(item.router,index)"
      >
        <img :src="tableImgFlag==index?item.one:item.two" alt="pic" />
        <p>{{item.text}}</p>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableImgFlag: 0,
      tableIsShow: 0,
      tabImgInfo: [
        {
          router: "/index/homePage",
          text: "首页",
          one: require("../assets/i-images/tab_home_hig.png"),
          two: require("../assets/i-images/tab_home_nor.png")
        },
        {
          router: "/index/classification",
          text: "分类",
          one: require("../assets/i-images/tab_menu_hig.png"),
          two: require("../assets/i-images/tab_menu_nor.png")
        },
        {
          router: "/index/shopCart",
          text: "购物车",
          one: require("../assets/i-images/tab_shopping_hig.png"),
          two: require("../assets/i-images/tab_shopping_nor.png")
        },
        {
          router: "/index/personCenter",
          text: "个人中心",
          one: require("../assets/i-images/tab_me_hig.png"),
          two: require("../assets/i-images/tab_me_nor.png")
        }
      ]
    };
  },
  methods: {
    // 底部选项卡切换
    changeTable(path, index) {
      if (this.tableIsShow == index) {
        return false;
      }
      this.$router.push({
        path: path,
        query: {}
      });
      this.tableIsShow = index;
      this.tableImgFlag = index;
    }
  },
  updated() {
    // 刷新页面后初始化 tableImgFlag tableIsShow
    this.tabImgInfo.map((item, index) => {
      if (this.$route.path == item.router) {
        this.tableIsShow = index;
        this.tableImgFlag = index;
      }
    });
  }
};
</script>
<style lang="">
/* 設置底部切換的樣式 */
.bot-table {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 7.5rem;
  height: 1.03rem;
  box-sizing: border-box;
  border-top: 0.02rem solid #eeeeee;
  display: flex;
  justify-content: space-around;
  align-content: center;
  background-color: #ffffff;
}
.bot-table .indexTable {
  display: block;
  width: 1rem;
  text-align: center;

  color: #333333;
  padding-top: 0.16rem;
}
.bot-table .sel {
  color: #fb9b00;
}
.bot-table .indexTable p {
  line-height: 0.48rem;
}
</style>