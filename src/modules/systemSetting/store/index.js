// import Vuex from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loadingTime: 0,
    loading: false,
    loadingText: '正在加载...',
    textCont: 'store 存储的 text',
    breadcrumbBtn: {},

    projectDetails: [], // 专题管理的组件列表
    currentIndex: -1, // 专题管理当前选中的组件
    jumpType: 0, // 跳转类型
    jumpPopStatus: false, // 跳转弹窗
    currentImageItemIndex: null, // 当前图片组件的图片单元索引
    checkJumpPopStatus: false, // 查看选择的弹窗状态
    tagProductPopStatus: false, // 标签弹窗状态
    projectId:'',// 专题管理id
  },
  getters: {
    menuName: () => '前端管理',
    textCont: state => state.textCont,
    breadcrumbBtn: state => state.breadcrumbBtn,
    formMapList: () => ([ // 表单映射表
      {
        type: '1',
        componentShow: 'ImageShow',
        componentConf: 'ImageConf',
        initStr: {
          floorType: 1,
          projectDetaiId: "",
          projectId: "",
          showActive: false,
          imageConfigInfoList: [{
            imgUrl: "",
            jumpType: 0,
            selectName: ""
          }], // 专题管理的图片组件属性列表
        }
      },
      {
        type: '2',
        componentShow: 'TagProductShow',
        componentConf: 'TagProductConf',
        initStr: {
          floorType: 2,
          projectDetaiId: "",
          tagId: "",
          projectId: "",
          tagName: "",
          showActive: false,
        }
      },
      {
        type: '3',
        componentShow: 'RecommendProductShow',
        componentConf: 'RecommendProductConf',
        initStr: {
          floorType: 3,
          projectDetaiId: "",
          projectId: "",
          showActive: false,
        }
      },
      {
        type: '4',
        componentShow: 'SpaceShow',
        componentConf: 'SpaceConf',
        initStr: {
          spaceColor: "#666666",
          spaceHeight: 10,
          floorType: 4,
          projectDetaiId: "",
          projectId: "",
          showActive: false
        }
      },
    ]),
    currentCompItem: state => (state.projectDetails[state.currentIndex]), // 获取当前选中的组件
    getProjectId: state => (state.projectId), // 获取专题Id
    checkJumpItem: state => (state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex]) // 当前选中的组件的图片单元，点击选中的选项出现弹窗使用
  },
  mutations: {
    showLoading(state) {
      state.loadingText = '正在加载...'
      state.loading = true
    },
    importLoading(state) {
      state.loadingText = '数据导入中...'
      state.loading = true
    },
    hideLoading(state) {
      let endTime = new Date().getTime()
      let interval = 500 - (endTime - state.loadingTime)
      if (interval < 0) {
        state.loading = false
      } else {
        setTimeout(() => {
          state.loading = false
        }, interval)
      }
    },
    updateText(state, params) {
      state.textCont = params
    },
    updateBreadcrumbBtn(state, newBreadcrumbBtn) {
      state.breadcrumbBtn = newBreadcrumbBtn
    },

    // 设置专题详情id
    setProjectId(state, projectId) {
      state.projectId = projectId;
    },

    // 设置配置详情组件
    setProjectDetails(state, detail) {
      state.projectDetails = detail;
    },

    // 修改间隔组件的颜色
    updateSpaceCompColor(state, color) {
      state.projectDetails[state.currentIndex].spaceColor = color
    },

    // 修改间隔组件的高度
    updateSpaceCompHeight(state, height) {
      state.projectDetails[state.currentIndex].spaceHeight = height
    },

    // 修改组件详情
    updateProjectDetails(state, value) {
      state.projectDetails.push(value)
    },

    // 给当前组件添加选中样式
    updateProjectItem(state, index) {
      state.projectDetails[index].showActive = true
    },

    // 去除组件的选中样式
    updateProjectDetailsCss(state) {
      state.projectDetails.forEach(item => {
        item.showActive = false
      })
    },

    // 给当前选中组件上移、下移
    updateProjectDetailsSort(state, sort) {
      let targetIndex
      if (sort > 0) { // 升序(向下)
        if (state.currentIndex === state.projectDetails.length - 1) return
        targetIndex = state.currentIndex + 1
      } else {
        if (state.currentIndex === 0) return
        targetIndex = state.currentIndex - 1
      }
      state.projectDetails.splice(state.currentIndex, 1, ...state.projectDetails.splice(targetIndex, 1, state.projectDetails[state.currentIndex]))
    },

    // 保存当前选中组件的索引
    updateCurrentIndex(state, index) {
      state.currentIndex = index
    },

    // 删除当前选中的组件
    deleteCurrentItem(state) {
      state.projectDetails.splice(state.currentIndex, 1);
      state.currentIndex = -1;
    },

    // 给图片组件属性添加图片单元
    updateImageConfigInfoList(state, item) {
      state.projectDetails[state.currentIndex].imageConfigInfoList.push(item);
    },

    // 删除专题详情的图片组件属性的图片单元
    deleteImageConfigInfoItem(state, index) {
      state.projectDetails[state.currentIndex].imageConfigInfoList.splice(index, 1);
    },

    // 设置专题详情的图片组件属性的图片单元图片路径
    setImageConfigInfoItemUrl(state, obj) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[obj.index].imgUrl = obj.url;
    },

    // 删除专题详情的图片组件属性的图片单元路径
    deleteImageConfigInfoItemUrl(state, index) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].imgUrl = "";
    },

    // 设置专题详情的图片组件属性的图片单元的跳转类型
    setImageConfigInfoItemJumpType(state, obj) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[obj.index].jumpType = obj.value;
    },

    // 设置图片组件的图片单元的选中弹窗的类型
    setJumpType(state, type) {
      state.jumpType = type;
    },

    // 设置图片组件的图片单元的选中弹窗
    setJumpPopStatus(state, status) {
      state.jumpPopStatus = status;
    },

    // 设置图片组件的图片单元的当前索引
    setCurrentImageItemIndex(state, index) {
      state.currentImageItemIndex = index;
    },
    // 设置专题详情的图片组件属性的图片单元的选择名称
    setImageConfigInfoItemJumpLableValue(state, value) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].selectName = value;
    },

    // 设置图片组件选中商品的商品id
    // setImageConfigInfoItemJumpProductId(state, value) {
    //   state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].productId = value;
    // },

    // // 设置图片组件选中店铺的商家id
    // setImageConfigInfoItemJumpSupplierId(state, value) {
    //   state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].supplierId = value;
    // },

    // // 设置图片组件选中专题的专题id
    // setImageConfigInfoItemJumpProjectId(state, value) {
    //   state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].projectId = value;
    // },

    // 设置图片组件选中的id
    setImageConfigInfoItemJumpId(state, obj) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex][obj.id] = obj.value;
    },

    // 设置专题详情的图片组件属性的图片单元的自定义路由
    setImageConfigInfoItemJumpSelectRoute(state, obj) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].androidRoute = obj.androidRoute;
      state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].iosRoute = obj.iosRoute;
      state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].miniappRoute = obj.miniappRoute;
    },

    // 设置专题详情的图片组件属性的图片单元的M站链接
    setImageConfigInfoItemJumpSelectPcmRoute(state, pcmRoute) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[state.currentImageItemIndex].pcmRoute = pcmRoute;
    },

    // 删除图片单元的选择项
    deleteImageConfigInfoItemSelected(state, index) {
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].jumpType = 0;
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].selectName = "";
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].androidRoute = "";
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].iosRoute = "";
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].miniappRoute = "";
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].pcmRoute = "";
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].productId = "";
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].supplierId = "";
      state.projectDetails[state.currentIndex].imageConfigInfoList[index].projectId = "";
    },
    
    // 设置查看弹窗的显示或隐藏
    setCheckJumpPopStatus(state, status) {
      state.checkJumpPopStatus = status;
    },

    // 设置标签商品弹窗的显示或隐藏
    setTagProductPopStatus(state, status) {
      state.tagProductPopStatus = status;
    },

    // 设置选中标签商品的id和名称
    setTagProductSelection(state, selection) {
      state.projectDetails[state.currentIndex].tagId = selection.tagId;
      state.projectDetails[state.currentIndex].tagName = selection.tagName;
    }
  },
  actions: {

  }
})

// 方便 axios 调用
Vue.prototype.$store = store

export default store
