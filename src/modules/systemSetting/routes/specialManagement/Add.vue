<template>
  <div class="wrap">
    <el-card class="box-card">
      <el-row class="tac">
        <!-- 左侧添加组件区域 -->
        <tool-tips @addConf="addConf" :isMenuTop="isMenuTop"></tool-tips>
        <div id="materialRight" class="material-right-wrap">
          <div class="material-right">
            <div class="material-edit">
              <div class="box-card m-l-30">
                <!-- 专题名称 -->
                <div @click="showSpecialConf" class="clearfix material-title">
                  <h4 :class="['break-word', specialConfState?'active':'transparent']">{{specialInfo.projectName}}</h4>
                </div>
                <div class="material-content">
                  <!-- 中间内容区域显示的内容组件 -->
                  <common-show v-for="(item,index) in projectDetails" :class="['common-show', item.showActive?'active':'']" :ref="'show'+index" :key="index" :info="item" @click.native="handleClick(index)"></common-show>
                </div>
              </div>
            </div>
            <div class="w400">
              <div id="materialConfig" :style="{height:clientHeight + 'px'}" :class="['w400', 'fixed', isMenuTop ? 'top' : '']">
                <!-- 素材组设置属性的模板 -->
                <div v-if="specialConfState">
                  <special-conf :special-info.sync="specialInfo" @handleShareImage="handleShareImage($event)" @handleShareCardImage="handleShareCardImage($event)"></special-conf>
                </div>
                <!-- 组件属性的设置模板 -->
                <div v-if="showComponentConf">
                  <div class="move-del">
                    <el-button :disabled="currentIndex == 0 ? true:false" @click="handleSort(-1)">上移</el-button>
                    <el-button :disabled="currentIndex == projectDetails.length -1 ? true:false" @click="handleSort(1)">下移</el-button>
                    <el-button @click="handleDel">删除</el-button>
                  </div>
                  <!-- 组件属性信息 -->
                  <common-conf></common-conf>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-row>
    </el-card>
    <div class="btn-fixed">
      <el-button @click="submitSave" type="primary">提交保存</el-button>
      <el-button @click="cancel" class="cancel">取消返回</el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from "vuex";

import ToolTips from "./components/ToolTips";
import SpecialConf from "./components/SpecialConf";
import CommonShow from "./components/CommonShow";
import CommonConf from "./components/CommonConf";

export default {
  name: "add",
  data() {
    return {
      editState: 0, // 进入详情页的类型  0新增或者复制 1是编辑
      clientHeight: document.body.clientHeight - 220, // 220代表页面上、下位置加起来的高度
      showComponentConf: false, // 是否显示组件的配置选择
      specialConfState: true, // 专题属性的显示状态
      isMenuTop: false, // 左右两侧距离顶部的位置使用
      specialInfo: {
        // 专题属性信息
        projectId: "",
        projectName: "",
        shareTitle: "",
        shareAlert: "",
        shareImage: "",
        shareCardImage: ""
      }
    };
  },
  components: {
    ToolTips,
    SpecialConf,
    CommonShow,
    CommonConf
  },
  watch: {
    $route() {
      this.init();
    }
  },

  /**
   * formMapList 整体组件的默认数据
   * projectDetails 专题组件的总数组
   * currentIndex 选中组件的索引
   */
  computed: {
    ...mapGetters(["formMapList"]),
    ...mapState(["projectDetails", "currentIndex"])
  },

  mounted() {
    this.init();
    this.initScroll();
  },
  methods: {
    init() {
      // type 1编辑方式进入  2 复制方式进入
      let { type = "", id } = this.$route.params;
      if (id !== undefined) {
        this.request(id, type);
      }

      if (type === "edit") {
        this.editState = 1;
      }
    },

    // 渲染对应要显示的组件
    renderComp(type) {
      return this.formMapList.filter(item => item.type == type)[0];
    },

    // 复制或者编辑的状态下请求数据
    request(id, type) {
      this.$service.systemSetting.specialManagement
        .queryById({ projectId: id })
        .then(res => {
          if (res) {
            if (type == "edit") {
              this.$store.commit("setProjectId", res.projectId);
              this.specialInfo.projectId = res.projectId;
            }
            this.specialInfo.projectName = res.projectName;
            this.specialInfo.shareTitle = res.shareTitle;
            this.specialInfo.shareAlert = res.shareAlert;
            this.specialInfo.shareImage = res.shareImage;
            this.specialInfo.shareCardImage = res.shareCardImage;
            this.$store.commit("setProjectDetails", res.projectDetails || []);
          }
        });
    },

    // 显示专题属性
    showSpecialConf() {
      this.$store.commit("updateProjectDetailsCss");
      this.specialConfState = true;
      this.showComponentConf = false;
    },

    // 点击组件内容
    handleClick(index) {
      this.$store.commit("updateProjectDetailsCss");
      this.$store.commit("updateCurrentIndex", index);
      this.$store.commit("updateProjectItem", index);
      this.showComponentConf = true;
      this.specialConfState = false;
    },

    // 移动位置，dir: -1上移  1下移
    handleSort(dir) {
      if (dir < 0) {
        // 上移，如果在最上面不移动
        if (this.currentIndex == 0) return;
      }
      if (dir > 0) {
        // 下移，如果在最下面不移动
        if (this.currentIndex == this.projectDetails.length - 1) return;
      }
      this.$store.commit("updateProjectDetailsSort", dir);
      this.$store.commit("updateCurrentIndex", this.currentIndex + dir);
    },

    // 添加组件
    addConf(type) {
      const { initStr } = this.renderComp(type);
      let rel = this.$utils.deepCopy(initStr);
      this.$store.commit("updateProjectDetails", rel);
      this.handleClick(this.projectDetails.length - 1);
    },

    // 删除组件
    handleDel() {
      const del = window.confirm("确认删除该楼层组件？");
      if (del) {
        this.showComponentConf = false;
        this.$store.commit("deleteCurrentItem");
      }
    },

    // editState是1 说明是编辑状态   editState是0 是新增或者复制状态
    submitSave() {
      if (!this.checkProjectConf()) return;

      if (this.projectDetails.length == 0) {
        this.$message.warning("专题内容为空，不可保存");
        return;
      }

      // 校验部分组件内容是不是为空
      let { flag, isAllEmpty } = this.checkCompContentEmpty();
      if (isAllEmpty) {
        this.$message.warning("有楼层使用了图片控件，但是未上传图片");
        return;
      }
      if (!flag) {
        let publish = window.confirm(
          "部分组件内容为空，提交保存后此部分数据将丢失，确认提交保存？"
        );
        if (!publish) {
          return;
        }
      }

      // 获取删除之后的组件
      let projectDetails = this.getProjectDetails();

      // 删除部分内容为空的组件，在重新校验专题内容是否为空
      // if(projectDetails.length == 0) {
      //   this.$message.warning("专题内容为空，不可保存");
      //   return;
      // }

      let param = Object.assign({}, this.specialInfo);
      param.projectDetails = projectDetails;

      // editState为1 说明是编辑状态，否则是新增保存状态
      let apiStr = this.editState === 1 ? "update" : "create";
      this.$service.systemSetting.specialManagement[apiStr](param).then(res => {
        if (res) {
          this.$router.push({ path: "/specialManagement/index" });
        }
      });
    },

    // 获取删除不符合条件之后的组件内容
    getProjectDetails() {
      let projectDetails = JSON.parse(JSON.stringify(this.projectDetails));
      let projectDetailsLength = projectDetails.length;
      // 循环删除缺少内容的图片组件
      while (projectDetailsLength--) {
        const element = projectDetails[projectDetailsLength];
        // 删除没用的属性
        delete element.showActive;
        // 图片组件
        if (element.floorType == 1) {
          if (element.imageConfigInfoList.length == 0) {
            projectDetails.splice(projectDetailsLength, 1);
          } else {
            let itemIndex = 0;
            let itemLength = element.imageConfigInfoList.length;
            // 保留原来组件图片单元的长度
            let originLength = JSON.parse(JSON.stringify(element.imageConfigInfoList)).length;
            // 循环删除缺少内容的图片单元
            while (itemLength--) {
              let item = element.imageConfigInfoList[itemLength];
              if (!item.imgUrl) {
                // 如果没有图片就删掉
                itemIndex++;
                element.imageConfigInfoList.splice(itemLength, 1);
              }
            }
            // 如果图片组件里面所有的图片单元都确认内容，则删除整个图片组件。
            if (itemIndex == originLength) {
              projectDetails.splice(projectDetailsLength, 1);
            }
          }
        }
        // 标签组件。如果没有选择标签商品，提交时删除标签组件
        if (element.floorType == 2) {
          if (!element.tagId) {
            projectDetails.splice(projectDetailsLength, 1);
          }
        }
      }

      // 过滤没有添加图片的组件
      return projectDetails;
    },

    /**
     * 添加了组件，但是组件内容为空，二次确认是否要丢失内容为空的组件
     * 只校验标签商品组件和图片组件
     * 间隔组件有默认值，无需检验
     * 推荐商品组件为推荐商品为统一提供，不可编辑修改，无需检验
     */
    checkCompContentEmpty() {
      let projectDetails = this.projectDetails;
      let flag = true;
      let isAllEmpty = false;

      let projectDetailsLength = projectDetails.length;
      // 循环删除缺少内容的图片组件
      while (projectDetailsLength--) {
        const element = projectDetails[projectDetailsLength];
        // 删除没用的属性
        delete element.showActive;
        // 图片组件
        if (element.floorType == 1) {
          if (element.imageConfigInfoList.length == 0) {
            flag = false;
          } else {
            let itemLength = element.imageConfigInfoList.length;
            // 先判断图片组件里面的图片单元是不是全部无图片
            isAllEmpty = element.imageConfigInfoList.every(item => {
              return item.imgUrl == "";
            });
            // 如果某一个图片组件内的图片单元全部无图片，则跳出循环，直接提示
            if (isAllEmpty) {
              break;
            }

            // 校验是否存在没有上传图片的图片单元（也有已上传）
            while (itemLength--) {
              let item = element.imageConfigInfoList[itemLength];
              if (!item.imgUrl) {
                flag = false;
              }
            }
          }
        }
        // 标签组件。校验标签组件是否有没有上传商品标签的情况
        if (element.floorType == 2) {
          if (!element.tagId) {
            flag = false;
          }
        }
      }

      return {
        flag,
        isAllEmpty
      };
    },

    // 校验专题属性信息是否填写
    checkProjectConf() {
      if (!this.specialInfo.projectName) {
        this.$message.warning("专题名称不能为空");
        return false;
      }

      if (!this.specialInfo.shareTitle) {
        this.$message.warning("分享标题不能为空");
        return false;
      }

      if (!this.specialInfo.shareAlert) {
        this.$message.warning("分享描述不能为空");
        return false;
      }

      if (!this.specialInfo.shareImage) {
        this.$message.warning("分享图片不能为空");
        return false;
      }

      if (!this.specialInfo.shareCardImage) {
        this.$message.warning("分享卡片不能为空");
        return false;
      }
      return true;
    },

    // 点击取消返回
    cancel() {
      this.$router.push({ path: "/specialManagement/index" });
    },

    // 处理专题属性中的分享图片
    handleShareImage(value) {
      this.specialInfo.shareImage = value;
    },

    // 处理专题属性中的分享卡片
    handleShareCardImage(value) {
      this.specialInfo.shareCardImage = value;
    },

    // 监听页面滚动
    initScroll() {
      window.addEventListener("scroll", _ => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 60) {
          this.isMenuTop = true;
        } else {
          this.isMenuTop = false;
        }
      });
    }
  },
  destroyed() {
    window.removeEventListener("scroll", _ => {})
  }
};
</script>
<style scoped>
.active {
  position: relative;
  border: 2px dashed #18e5ec !important;
}

.transparent {
  position: relative;
  border: 2px dashed transparent;
}

.move-del {
  display: flex;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  border-radius: 4px;
  padding: 20px;
}

.tac {
  display: flex;
}

.material-right-wrap {
  width: 100%;
  padding-left: 120px;
}

.material-right {
  flex-grow: 1;
  display: flex;
  padding-bottom: 50px;
  position: relative;
  border-left: solid 1px #e6e6e6;
}

.material-right .save-btn {
  position: fixed;
  left: 30px;
  bottom: 0px;
}

.material-edit {
  flex-grow: 1;
}

.box-card {
  min-height: 500px;
  margin: 0 10px;
  border: 2px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  border-radius: 4px;
  overflow: hidden;
}

.common-show {
  margin-top: 10px;
  box-sizing: border-box;
  border: 2px solid #ebeef5;
}

.material-title {
  padding: 20px 15px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}

.material-content {
  padding: 15px;
}

.w400 {
  width: 400px;
  flex-shrink: 0;
  min-height: 500px;
  overflow-y: scroll;
}

.w400::-webkit-scrollbar {
  display: none;
}

.break-word {
  word-break: break-all;
  padding: 10px;
  box-sizing: border-box;
  min-height: 43px;
}

.el-button.preview {
  margin-left: 115px;
}

.el-button {
  display: block;
  margin-left: 15px;
  margin-top: 10px;
  width: 80px;
}

/* 左右下 浮动 */
.wrap {
  position: relative;
  padding-bottom: 50px;
}

.fixed {
  position: fixed;
}

.fixed.top {
  top: 70px;
}

.btn-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.btn-fixed .el-button {
  margin-top: 0;
}
</style>