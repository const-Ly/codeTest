import Vue from 'vue'
let mockUrl = '/static/mock'

// 线上环境需要 /app 路径
if (!Vue.config.productionTip) {
  mockUrl = '/app' + mockUrl
}

const cmsConfig = {
  mockUrl,
  serverUrl: 'http://cmsapp.biyao.com',
  proxyUrl: '/cms',
  paths: {
    menus: '/acl/getResources',
    auth: '/auth',
    login: {
      logout: '/logout'
    },
    common: {
      getBackendCategoryTree: '/category/getBackendCategoryTree', // 获取后台三级类目
      getAllSuppliers: '/common/getAllSuppliers', // 获取所有商家
      getAllProductTags: '/common/getAllProductTags', // 获取推荐标签
      getOnlineTopicList: '/topic/getOnlineTopicList', // 获取专题列表
      getTopicDetail: '/topic/getTopicDetail', // 根据专题id获取专题详情
      querySkuInfoById: '/activity/toggroupChannelPage/querySpuInfoById', // 根据spuid查询有效的一起拼商品信息
      queryAllSCMTagList: '/activity/toggroupChannelPage/queryAllSCMTagList', // 从SCM服务中查询所有有效的SCM信息
      queryProductPools: '/activity/robCashBack/activity/queryProductPools', // 公海系统中业务类型为“每日抽奖”且状态为“启用”的活动商品池名称
      searchProductById: '/common/searchProductById', // 根据SPUID获取可售商品信息
      queryAppVersionByPlatform: '/appVersion/queryAppVersionByPlatform', // 查询App版本号列表
      checkLiveId: '/live/checkLiveId', // 根据直播间ID获取直播间可用状态
      searchDVListByName: '/common/searchDVListByName', // 模糊搜索大V信息(或企业定制)
      searchChannelListByName: '/common/searchChannelListByName', // 模糊搜索代理商信息
      getFrontendCategoryTree: '/category/getFrontendCategoryTree', // 获取一级类目
    },
    activity: {
      dailyNewGoods: {
        list: '/activity/dailynewgoods/list', // 查询每日上新活动列表
        goodsList: '/activity/dailynewgoods/goodsList', // 获取每日上新商品列表
        arrangeTimeManual: '/activity/dailynewgoods/arrangeTimeManual', // 保存每日上新商品手工排时
        getSupplierInfo: '/activity/dailynewgoods/getSupplierInfo', // 获取指定日期的上新商家列表

      },
      gift: {
        getGiftConfig: '/activity/gift/getGiftConfig', // 获取礼物功能配置项
        saveGiftConfig: '/activity/gift/saveGiftConfig', // 保存礼物配置
      },
      boosterTask: { // 助力任务
        getDetails: '/activity/friendHelp/config/getConfigDetails', // 获取全局配置
        saveDetails: '/activity/friendHelp/config/saveConfigDetails', // 保存全局配置
        log: '/activity/friendHelp/config/getOperateLogList', // 日志列表
        list: '/activity/friendHelp/task/getTaskList', // 获取任务列表
        add: '/activity/friendHelp/task/saveTask', // 添加任务
        detail: '/activity/friendHelp/task/getTaskDetail', // 获取任务详情
        relates: '/activity/friendHelp/task/getRelatesActivityList' // 查询任务关联场景
      },
      boosterPrevilege: { // 助力权益
        add: '/activity/friendHelp/rights/saveRights', // 添加权益
        list: '/activity/friendHelp/rights/getRightsList', // 权益列表
        copy: '/activity/friendHelp/rights/copy', // 复制
        getTaskList: '/activity/friendHelp/rights/getRelatedTaskList', // 查看关联任务
        updateTotal: '/activity/friendHelp/rights/updateRightsIssueTotal', // 修改权益发放总数
        productList: '/activity/friendHelp/rights/getRightsProductList', // 权益商品列表
        detail: '/activity/friendHelp/rights/getRightsDetail' // 权益详情
      },
      boosterConfig: { // 调用助力设置
        list: '/activity/project/getProjectList', // 映射列表
        addProject: '/activity/project/addProjectList', // 添加项目
        addScene: '/activity/project/addActivityScene', // 添加场景
        getProjectNameAndSceneName: '/activity/project/getProjectNameAndSceneName', // 通过场景id获取项目名称和场景名称
        tasksList: '/activity/project/getActivitySceneAndTask', // 关联任务列表
        abolish: '/activity/project/invalidProjectSceneTask', // 废除任务
        gotoConnect: '/activity/project/addActivitySceneAndTask' // 关联任务
      },
      appActiveRights: { // app引导下载
        getAppRights: '/activity/appActivationRights/rightsConfig/getAppRights', // 获取权益配置
        saveAppRights: '/activity/appActivationRights/rightsConfig/saveAppRights', // 权益配置保存
        getProjectAndScene: '/activity/appActivationRights/project/getProjectAndScene', // 获取项目列表和场景列表
        addProject: '/activity/appActivationRights/project/addProject', // 添加项目
        addScene: '/activity/appActivationRights/scene/addScene', // 添加场景
        switchScene: '/activity/appActivationRights/scene/switchScene', // 开启关闭场景
        saveSceneMask: '/activity/appActivationRights/sceneMask/saveSceneMask', // 保存更新弹层
        getSceneMask: '/activity/appActivationRights/sceneMask/getSceneMask' // 获取弹层
      },
      activityProduct: { // 活动商品
        getActivityProductByPage: '/activity/activityProduct/getActivityProductByPage', // 获取活动商品列表
        activityProductexport: '/activity/toggroupChannelPage/activityProductexport' // 导出
      },
      merchantsAudit: { // 商家提报审核
        getApplicationFormsByPage: '/activity/shopActivityProductAudit/getApplicationFormsByPage', // 获取商家提报审核列表
        auditApplicationFormsByApplyNo: '/activity/shopActivityProductAudit/auditApplicationFormsByApplyNo', // 单条审核
        batchAuditPassByApplyNo: '/activity/shopActivityProductAudit/batchAuditByApplyNoList', // 批量审核
        getApplicationFormsByApplyNo: '/activity/shopActivityProductAudit/getApplicationFormsByApplyNo' // 审核详情
      },
      secondAudit: { // 活动提报二审
        getSecondAuditFormByPage: '/activity/shopActivityProductSecondAudit/getSecondAuditFormByPage', // 获取二审审批单列表
        exportActivitySkuByApplyNos: '/activity/shopActivityProductSecondAudit/exportActivitySkuByApplyNos', // 导出
        auditApplicationFormsByApplyNo: '/activity/shopActivityProductSecondAudit/auditApplicationFormsByApplyNo', // 二审单条审批
        getApplicationFormDetailByApplyNo: '/activity/shopActivityProductSecondAudit/getApplicationFormDetailByApplyNo', // 获取二审的审核详情
        batchAuditPassByApplyNo: '/activity/shopActivityProductSecondAudit/batchAuditByApplyNoList' // 批量审批
      },
      together: { // 一起拼活动
        saveActivity: '/activity/toggroup/saveActivity', // 全局配置
        getActivityDetail: '/activity/toggroup/getActivityDetail', // 获取全局配置
        getActivityProductByPage: '/activity/toggroupProduct/getActivityProductByPage', // 获取一起拼活动商品
        batchFirstAuditPassByApplyNo: '/activity/toggroupProduct/batchFirstAuditPassByApplyNo', // 一起拼活动商品批量初审通过
        deleteByApplyNo: '/activity/toggroupProduct/deleteByApplyNo', // 一起拼活动商品删除
        getApplicationFormsByApplyNo: '/activity/toggroupProduct/getApplicationFormsByApplyNo', // 一起拼活动商品审核详情
        updatePlatformDiscountByApplyNo: '/activity/toggroupProduct/updateTogGroupProduct', // 一起拼活动商品修改新平台优惠
        firstAuditByApplyNo: '/activity/toggroupProduct/firstAuditByApplyNo', // 一起拼活动商品初审
        getPreActivityProductByPage: '/activity/toggroupProduct/getPreActivityProductByPage', // 一起拼活动商品预选商品列表
        batchSaveActivityProduct: '/activity/toggroupProduct/batchSaveActivityProduct', // 一起拼活动商品保存
        togGroupActivityExport: '/activity/toggroupChannelPage/togGroupActivityExport', // 导出
        togetherImport: '/activity/toggroupChannelPage/import', // 导入
        judgeNegativeProfit: '/activity/toggroupProduct/judgeNegativeProfit', // 一起拼活动商品判断衍生品是否负毛利
        batchFirstAuditRejectByApplyNo: '/activity/toggroupProduct/batchFirstAuditRejectByApplyNo' // 一起拼活动商品批量初审拒绝接口
      },
      stepsExchange: {
        stepsSettingInfo: '/steps/stepsSettingInfo', // 获取步数换配置信息
        stepsSetting: '/steps/stepsSetting', // 步数换全局配置
        loginAwardSetting: '/steps/loginAwardSetting', // 登录奖励配置
        newbieTaskSetting: '/steps/newbieTaskSetting', // 首次邀请配置
        inviteFriendsSetting: '/steps/inviteFriendsSetting', // 日常任务—邀请好友配置
        challengeSetting: '/steps/challengeSetting', // 日常任务—挑战
        sharingMaterialSetting: '/steps/sharingMaterialSetting' // 分享素材
      },
      togetherOperation: { // 一起拼运营位
        batchSaveBannerConfig: '/activity/toggroupChannelPage/batchSaveBannerConfig', // Banner图保存
        getBannerConfigList: '/activity/toggroupChannelPage/getBannerConfigList', // Banner图查询
        queryOperationsConfig: '/activity/toggroupChannelPage/queryOperationsConfig', // 运营位1/2/3/4查询
        saveOperationsConfig: '/activity/toggroupChannelPage/saveOperationsConfig' // 运营位1/2/3/4保存
      },
      faceScore: { // 颜值
        deploy: { // 首页配置&参数配置&颜值配置
          queryConfig: '/activity/beauty/queryConfig', // 查询配置
          saveConfig: '/activity/beauty/saveConfig' // 保存配置
        },
        motifManage: { // 主题管理
          queryTopicList: '/activity/beauty/queryTopicList', // 查询主题管理列表
          queryTopicSequenceList: '/activity/beauty/queryTopicSequenceList', // 查询主题序号列表
          saveTopicSequenceList: '/activity/beauty/saveTopicSequenceList', // 保存调整主题序号
          addTopic: '/activity/beauty/addTopic', // 新增主题
          updateTopic: '/activity/beauty/updateTopic', // 修改主题
          queryTopicById: '/activity/beauty/queryTopicById', // 查询主题详情
          deleteTopic: '/activity/beauty/deleteTopic' // 删除主题
        },
        templateManage: { // 模板管理
          queryTemplateList: '/activity/beauty/queryTemplateList', // 查询模板管理列表
          updateTemplate: '/activity/beauty/updateTemplate', // 修改模板(用于编辑模板，设置精选非精选)
          deleteTemplate: '/activity/beauty/deleteTemplate', // 删除模板
          addTemplate: '/activity/beauty/addTemplate', // 添加模板
          batchUpdateTemplate: '/activity/beauty/batchUpdateTemplate', // 批量设置融合度
          queryTemplateById: '/activity/beauty/queryTemplateById', // 查询模板详情
          fuseImage: '/activity/beauty/fuseImage' // 融合图片
        },
        materialManage: { // 素材管理
          queryMatter: '/activity/beauty/queryMatter', // 查询素材管理
          saveMatter: '/activity/beauty/saveMatter' // 保存素材
        }
      },
      luckDraw: {
        getLotteryPage: '/activity/lottery/getLotteryPage', // 查询抽奖活动列表
        addPlatformLottery: '/activity/lottery/addPlatformLottery', // 新增抽奖活动
        updatePlatformLottery: '/activity/lottery/updatePlatformLottery', // 修改抽奖活动
        getShopRewardList: '/activity/lotteryReward/getShopRewardList', // 查询商家奖品列表
        editLottery: '/activity/lottery/editLottery', // 编辑查看抽奖活动
        stickLottery: '/activity/lottery/stickLottery', // 置顶活动
        closeLottery: '/activity/lottery/closeLottery', // 关闭抽奖
        getLotteryResultByLotteryId: '/activity/lottery/getLotteryResultByLotteryId', // 查询抽奖活动结果
        getLotteryResultPage: '/activity/lottery/getLotteryResultPage', // 分页查询开奖结果列表
        getReceiveInfo: '/activity/lottery/getReceiveInfo', // 收货信息
        saveDeliveryInfo: '/activity/lottery/saveDeliveryInfo', // 发货信息
        getAwardInfo: '/activity/lottery/getAwardInfo', // 发奖情况
        getPlatformRewardPage: '/activity/lotteryReward/getPlatformRewardPage', // 查询平台奖品列表
        addPlatformReward: '/activity/lotteryReward/addPlatformReward', // 添加平台奖品
        editPlatfromReward: '/activity/lotteryReward/editPlatfromReward', // 编辑平台奖品
        updatePlatformReward: '/activity/lotteryReward/updatePlatformReward', // 修改平台奖品
        getPersonLotteryPage: '/activity/lottery/getPersonLotteryPage', // 查询个人抽奖活动列表
        getPersonLotteryResultPage: '/activity/lottery/getPersonLotteryResultPage', // 查询个人抽奖活动开奖结果列表
        savePlatformLotteryMatter: '/activity/lottery/savePlatformLotteryMatter', // 保存平台抽奖素材
        savePersonLotteryTitle: '/activity/lottery/savePersonLotteryTitle', // 保存个人抽奖默认标题及入口开关
        savePersonLotteryImage: '/activity/lottery/savePersonLotteryImage', // 保存个人抽奖默认图及分享卡片
        queryPersonLotteryMatter: '/activity/lottery/queryPersonLotteryMatter', // 查询个人抽奖素材
        queryPlatformLotteryMatter: '/activity/lottery/queryPlatformLotteryMatter', // 查询平台抽奖素材
        getRewardDescById: '/activity/lotteryReward/getRewardDescById', // 获取图文详情
        getSceneMask: '/activity/appActivationRights/sceneMask/getSceneMask' // 获取弹层
      },
      cashback: { // 抢返现
        // 抢返现商品
        pageList: '/activity/robCashBack/product/pageList', // 查询 抢返现商品池(抢返现商品列表,抢返现活动添加/编辑 --可选择商品列表)
        deleteCashback: '/activity/robCashBack/product/delete', // 抢返现商品删除
        getPageList: '/activity/robCashBack/offer/product/pageList', // 查询 抢返现商品->弹层列表
        addCashback: '/activity/robCashBack/product/add', // 保存  抢返现商品
        export: '/activity/robCashBack/product/export', // 导出商品 --商品池
        // 抢返现活动
        activityPageList: '/activity/robCashBack/activity/pageList', // 查询 抢返现活动列表
        activityDetail: '/activity/robCashBack/activity/detail', // 查询 抢返现活动 详情
        addOrUpdate: '/activity/robCashBack/activity/addOrUpdate', // 保存(新增或修改) 抢返现活动
        finish: '/activity/robCashBack/activity/finish', // 结束抢返现活动
        exportProduct: '/activity/robCashBack/activity/exportProduct', // 抢返现活动商品导出 -- 活动商品
        // 抢返现素材
        getMaterial: '/activity/robCashBack/material/get', // 获取抢返现素材
        channelUpdate: '/activity/robCashBack/material/channel/update', // 保存 抢返现频道介绍图
        shareUpdate: '/activity/robCashBack/material/share/update' // 保存 分享素材
      },
      // 咖啡馆
      cafe: {
        getPrivateCoffeeHome: '/activity/privateCoffee/getPrivateCoffeeHome', // 咖啡管素材首页查询
        saveOrUpdateMaterial: '/activity/privateCoffee/saveOrUpdateMaterial', // 咖啡馆素材新增/修改
        saveOrUpdateQrCodeLconnection: '/activity/privateCoffee/saveOrUpdateQrCodeLconnection', // 杯套二维码新增/修改
        saveOrUpdateGuideURL: '/activity/privateCoffee/saveOrUpdateGuideURL', // 新手引导页配置新增/修改
        saveOrUpdPcConfig: '/activity/privateCoffee/saveOrUpdPcConfig',// 个人中心配置
        // 推荐咖啡
        saveOrUpdatePosterImg: '/activity/privateCoffee/saveOrUpdatePosterImg',//“海报图案”模块 素材的修改和保存
        queryAddedListByPage: '/activity/recommendCoffee/queryAddedListByPage', //分页查询"已添加"的推荐咖啡列表
        queryUnAddedListByPage: '/activity/recommendCoffee/queryUnAddedListByPage', //分页查询"未添加"的推荐咖啡列表
        addCoffeeList: '/activity/recommendCoffee/addCoffeeList',//在“添加”弹窗中勾选“未添加”的咖啡，提交保存
        deleteCoffee: '/activity/recommendCoffee/deleteCoffee'//确认删除时调用
      },
      ladderGroup: { // 阶梯团
        activityList: '/activity/ladderGroup/activityList', // 阶梯团活动搜索列表
        stopActivity: '/activity/ladderGroup/stopActivity', // 手动结束阶梯团活动
        verifyResultInfo: '/activity/ladderGroup/verifyResultInfo', // 阶梯团活动 初审/二审/审核单 弹层信息
        verify: '/activity/ladderGroup/verify', // 阶梯团活动审核
        addActivity: '/activity/ladderGroup/addActivity', // 新增阶梯团活动
        productList: '/activity/ladderGroupProduct/productList', // 查询阶梯团可选择商品列表
        activityInfo: '/activity/ladderGroup/activityInfo', // 查看阶梯团活动详情
        selectedList: '/activity/ladderGroupProduct/selectedList', // 查看某个活动的已选择商品列表
        updateVerifyTerm: '/activity/ladderGroup/updateVerifyTerm', // 保存阶梯团活动审核单信息
        updateActivity: '/activity/ladderGroup/updateActivity', // 编辑阶梯团活动基础信息
        secondVerifyList: '/activity/ladderGroup/secondVerifyList', // 阶梯团活动二审列表
        getConfig: '/activity/ladderGroupMaterial/getConfig', // 获取阶梯团活动基础页面文案、分享配置、图片素材
        saveCopywriting: '/activity/ladderGroupMaterial/saveCopywriting', // 保存阶梯团活动基础页面文案
        saveShareConfig: '/activity/ladderGroupMaterial/saveShareConfig', // 保存阶梯团活动分享配置
        saveImageMaterial: '/activity/ladderGroupMaterial/saveImageMaterial' // 保存阶梯团活动图片素材
      },
      newcustomer: { // 新手专享
        get: '/newcustomer/exclusive/get', // 新手专区配置查询
        update: '/newcustomer/exclusive/update' // 新手专区配置修改
      },
      deployManage: { // 配置管理
        getAllActivityCategoryList: '/configManage/activityCategory/getAllActivityCategoryList', // 类目配置查询
        stopActivity: '/configManage/activityCategory/getActivityCategoryLog', // 三级类目日志查看
        getActivityCategoryById: '/configManage/activityCategory/getActivityCategoryById', // 查询单个类目配置信息
        saveOrUpdActivityCategory: '/configManage/activityCategory/saveOrUpdActivityCategory', // 保存类目配置
        getActivityProductConfig: '/configManage/activityProductConfig/getActivityProductConfig' // 活动选品配置信息
      },
      eggs: {
        save: '/activity/eastereggs/save',
        query: '/activity/eastereggs/query',
        loglist: '/activity/eastereggs/loglist/query',
        logdetail: '/activity/eastereggs/logdetail/query'
      },
      // 梦工厂
      dreamWorksPool: {
        getActivityProductByPage: '/activity/dreamFactoryProduct/getActivityProductByPage',
        exportExcel: '/activity/dreamFactoryProduct/export'
      }
    },
    home: {
      layer: { // 首页浮层
        saveFolating: '/activity/toggroup/saveFolating', // 配置浮层的跳转
        getFolatingDetail: '/activity/toggroup/getFolatingDetail' // 获取浮层配置详情
      },
      baseMap: { // M站首页下载弹层
        getMaskByM: '/homepage/basemap/getMaskByM', // 获取M站下载弹层底图
        updateMaskByM: '/homepage/basemap/updateMaskByM' // 更新M站下载弹层底图
      },
      newOperatNav: {
        logList: '/home/operationNavigationBarLog/pageList', // 运营导航日志列表
        logInfo: '/home/operationNavigationBar/getDetail', // 运营导航日志详情
        save: '/home/operationNavigationBar/save', // 保存更新运营导航
        pageList: '/home/operationNavigationBar/pageList', // 运营导航列表
        businesSave: '/common/businessType/save', // 业务类型更新或添加
        businesInfo: '/common/businessType/info', // 业务类型详情
        appVersion: '/appVersion/queryAppVersionByPlatform', // 版本信息
        businessList: '/common/businessType/pageList',
        businessDel: '/common/businessType/delete', // 业务类型删除
        businesUpdate: '/common/businessType/update', // 业务类型修改
        changeStatus: '/home/operationNavigationBar/changeStatus' // 更改状态
      },
      pushTopic: {
        topicList: '/pushtopic/pageList', // 专题列表
        topicDetail: '/pushtopic/info', // 专题详情
        labelList: '/tag/pageList', // 标签列表
        save: '/pushtopic/save', // 提交保存
        logList: '/pushtopic/log/pageList', // 日志列表
        logInfo: '/pushtopic/log/info' // 日志详情
      },
      recommendOperate: {
        list: '/home/recommendOperation/pageList', // 推荐运营位列表
        add: '/home/recommendOperation/add', // 添加/编辑 推荐运营位
        update: '/home/recommendOperation/update', // 添加/编辑 推荐运营位
        get: '/home/recommendOperation/queryById', // 根据id查询 推荐运营位
        queryAppVersionByPlatform: '/appVersion/queryAppVersionByPlatform' // 查询App版本号列表
      },
      // 首页运营位
      homeOperate: {
        list: '/home/recommendHomepage/pageList', // 获取首页运营位列表
        queryById: '/home/recommendHomepage/queryById', // 获取首页运营位详情
        add: '/home/recommendHomepage/add', // 添加首页运营位
        update: '/home/recommendHomepage/update' // 编辑首页运营位
      },
      // 公号投放推荐商品
      publicPutOn: {
        getPublicPutOnList: '/recommend/pageList', // 获取公号投放推荐商品主业务表
        addPublicPutOn: '/recommend/add', // 添加公号投放推荐商品
        editPublicPutOn: '/recommend/update', // 编辑公号投放推荐商品
        getPublicPutOnInfo: '/recommend/info' // 获取公号投放推荐商品详情
      },
      // 直播频道
      liveChannel: {
        getListLiveChannel: '/live/liveBanner/pageList', // 直播频道-获取主业务表
        addLiveChannel: '/live/liveBanner/add', // 直播频道-添加
        editLiveChannel: '/live/liveBanner/update', // 直播频道-编辑
        infoLiveChannel: '/live/liveBanner/info' // 直播频道-获取详情
      },
      // 首页轮播
      homeBanner: {
        getListHomeBanner: '/homepage/banner2/pageQuery', // 首页轮播-获取主业务表
        addHomeBanner: '/homepage/banner2/add', // 首页轮播-添加
        editHomeBanner: '/homepage/banner2/update', // 首页轮播-编辑
        infoHomeBanner: '/homepage/banner2/info' // 首页轮播-获取详情
      }
    },
    privilege: { // 特权金
      blacklist: {
        getBlacklistProductByPage: '/shopRedBagProduct/getBlacklistProductByPage', // 新客&老客黑名单商品列表查询
        batchRemoveBlacklistProduct: '/shopRedBagProduct/batchRemoveBlacklistProduct', // 新客&老客黑名单商品删除/批量删除
        getBlacklistProductLogByPage: '/shopRedBagProduct/getBlacklistProductLogByPage', // 黑名单操作日志列表的查询
        getBlacklistProductLogDetailByPage: '/shopRedBagProduct/getBlacklistProductLogDetailByPage', // 新客&老客黑名单日志详情查询
        getPrivilegeProductByPage: '/shopRedBagProduct/getPrivilegeProductByPage', // 新客&老客特权金商品池商品列表查询
        exportPrivilegeProduct: '/shopRedBagProduct/exportPrivilegeProduct', // 新客&老客特权金商品池商品导出
        batchAddBlacklistProduct: '/shopRedBagProduct/batchAddBlacklistProduct' // 新客&老客添加/批量添加黑名单商品
      },
      novice: { // 新手特权金
        getActivityProductByPage: '/activity/userShopRedBagProduct/getActivityProductByPage', // 新手特权金活动商品列表
        batchFirstAuditPassByApplyNo: '/activity/userShopRedBagProduct/batchFirstAuditPassByApplyNo', // 新手特权金活动商品批量初审通过
        deleteByApplyNo: '/activity/userShopRedBagProduct/deleteByApplyNo', // 新手特权金活动商品删除
        getApplicationFormsByApplyNo: '/activity/userShopRedBagProduct/getApplicationFormsByApplyNo', // 新手特权金活动商品审核详情
        updatePlatformDiscountByApplyNo: '/activity/userShopRedBagProduct/updatePlatformDiscountByApplyNo', // 新手特权金活动商品修改新平台优惠
        firstAuditByApplyNo: '/activity/userShopRedBagProduct/firstAuditByApplyNo', // 新手特权金活动商品初审
        getPreActivityProductByPage: '/activity/userShopRedBagProduct/getPreActivityProductByPage', // 新手特权金活动商品预选商品列表
        batchSaveActivityProduct: '/activity/userShopRedBagProduct/batchSaveActivityProduct', // 新手特权金活动商品保存
        export: '/activity/userShopRedBagProduct/export', // 新手特权金商品导出
        judgeNegativeProfit: '/activity/userShopRedBagProduct/judgeNegativeProfit', // 新手特权金活动商品判断是否负毛利
        batchFirstAuditRejectByApplyNo: '/activity/userShopRedBagProduct/batchFirstAuditRejectByApplyNo' // 新手特权金活动商品批量初审拒绝接口
      },
      stepsPrivilege: { // 步数换特权金
        stepsPrivilegeMoneyInfo: '/privilegeMoney/stepsPrivilegeMoneyInfo', // 获取步数兑换特权金配置
        stepsPrivilegeMoneySetting: '/privilegeMoney/stepsPrivilegeMoneySetting' // 步数兑换特权金配置
      },
      task: {
        getTaskByPage: '/activity/redBagTask/getTaskByPage', // 特权金任务列表
        switchTask: '/activity/redBagTask/switchTask', // 特权金任务开启、关闭
        saveTask: '/activity/redBagTask/saveTask', // 5.2.特权金任务添加/修改
        getTaskDetail: '/activity/redBagTask/getTaskDetail' // 特权金任务查看
      },
      hook: {
        getProjectByPage: '/activity/redBagRef/getProjectByPage', // 挂接特权金列表
        switchScene: '/activity/redBagRef/switchScene', // 挂接特权金开关场景
        getConfig: '/activity/redBagRef/getConfig', // 挂接特权金获取配置
        saveConfig: '/activity/redBagRef/saveConfig', // 挂接特权金保存配置
        saveProject: '/activity/redBagRef/saveProject', // 挂接特权金添加项目
        saveScene: '/activity/redBagRef/saveScene', // 挂接特权金添加场景
        getSceneDetail: '/activity/redBagRef/getSceneDetail', // 根据场景id获取场景信息
        getRelationProjectByPage: '/activity/redBagRef/getRelationProjectByPage', // 已关联任务列表
        saveRelation: '/activity/redBagRef/saveRelation', // 关联任务添加
        cancelRelation: '/activity/redBagRef/cancelRelation', // 关联任务作废
        selectList: '/dataLabel/selectList', // 获取可关联数据标签下拉列表
        // 挂接模块，道具卡相关
        switchPropsStatus: '/activity/redBagRef/switchPropsStatus', // 修改特权金场景道具卡挂接开关
        getRefPropsByPage: '/activity/redBagRef/getRefPropsByPage', // 获取场景已关联道具卡
        savePropsRelation: '/activity/redBagRef/savePropsRelation', // 关联道具卡
        removePropsRelation: '/activity/redBagRef/removePropsRelation', // 作废道具卡关联关系
        propsPageList: '/activity/redBagRef/propsPageList', // 获取可选择道具卡分页列表
        getIndexByProjectId: '/activity/redBagRef/getIndexByProjectId' // 返回时查询当前项目、场景所属页码
      },
      // 特权金素材
      material: {
        updateNoShareLimitStartTime: '/shopRedBag/updateNoShareLimitStartTime', // 清空90天用户限制
        getIndexBottomCopy: '/shopRedBag/getIndexBottomCopy', // 获取文案的配置信息
        saveIndexBottomCopy: '/shopRedBag/saveIndexBottomCopy', // 修改文案配置
        getPrivilegeMaskConfig: '/shopRedBag/getPrivilegeMaskConfig', // 获取特权金素材配置详情
        savePrivilegeMaskConfig: '/shopRedBag/savePrivilegeMaskConfig' // 修改特权金素材配置
      },
      // 红包配置和素材
      redbagConf: {
        query: '/activity/privilegeRedBag/configure/query', // 查询特权金红包配置接口
        globalConfig: '/activity/privilegeRedBag/configure/global', // 保存特权金红包全局配置接口
        baseInfoConfig: '/activity/privilegeRedBag/configure/baseInfo', // 保存特权金红包基本配置接口
        miniAppShareMaterial: '/activity/privilegeRedBag/configure/miniAppShareMaterial', // 保存红包小程序分享素材接口
        textAndImgMaterial: '/activity/privilegeRedBag/configure/textAndImgMaterial', // 保存红包图片和文案接口
        topBarShareMaterial: '/activity/privilegeRedBag/configure/topBarShareMaterial' // 保存特权金红包挂接分享控件顶部素材接口
      },
      // 关联数据列表
      dataLabel: {
        getList: '/dataLabel/pageList', // 获取数据列表
        changeStatus: '/dataLabel/changeStatus', // 切换标签状态
        addOrUpdate: '/dataLabel/addOrUpdate', // 新增 / 编辑关联数据标签
        info: '/dataLabel/' // 数据标签详情 需要拼接id
      },
      // 道具卡
      itemCard: {
        getCardsByPage: '/activity/propsCard/getCardsByPage', // 获取道具卡列表
        changeCardStatus: '/activity/propsCard/changeCardStatus', // 启用|禁用的状态修改
        getCardInfo: '/activity/propsCard/info', // 获取道具卡详情
        addCard: '/activity/propsCard/addCard', // 增加道具卡
        editCard: '/activity/propsCard/update' // 编辑道具卡
      },
      // 立减金包
      reduceMoneyBag:{
        getReduceMoneyBagList:'/activity/xyuanBuy/pageList', //获取立减金包主业务表
        addReduceMoneyBag:'/activity/xyuanBuy/add', //添加立减金包
        editReduceMoneyBag:'/activity/xyuanBuy/update', //编辑立减金包
        getReduceMoneyBagInfo:'/activity/xyuanBuy/info', //获取立减金包详情
        changeReduceMoneyBagStatus:'/activity/xyuanBuy/changeStatus' //启用禁用立减金包
      },
      robGoldConfig: {
        queryConfig:'/activity/robGoldConfig/queryConfig', //查询可抢金币配置
        addOrUpdate:'/activity/robGoldConfig/addOrUpdate' //保存可抢金币配置
        
      },
      // 津贴设置
      setAllowance: {
        saveOrUpdateFirstCategory:'/allowance/saveOrUpdateFirstCategory', // 保存津贴前端类目的配置
        queryAllFirstCategory:'/allowance/queryAllFirstCategory', // 查询 津贴前端类目的配置
        saveOrUpdateLadderConfig:'/allowance/saveOrUpdateLadderConfig', // 保存津贴阶梯配置
        queryAllLadderConfig:'/allowance/queryAllLadderConfig', // 查询津贴阶梯配置
        
      }

    },
    customized: { // 定制管理
      slides: {
        list: '/customChannel/slideshow/list',
        edit: '/customChannel/slideshow/addOrUpdate',
        getSpu: '/customChannel/product/check',
        shopList: '/customChannel/shop/pageList',
        sort: '/customChannel/slideshow/sort',
        delete: '/customChannel/slideshow/delete',
        detail: '/customChannel/slideshow/detail'
      },
      material: {
        getMaterial: '/customChannel/material/get',
        my: '/customChannel/material/my/update',
        product: '/customChannel/material/product/update',
        productChannel: '/customChannel/material/productChannel/update',
        newCustomer: '/customChannel/material/newCustomer/update'
      }
    },
    param: {
      share: {
        getShareConfigByPageId: '/commonShare/getShareConfigByPageId', // 获取某个页面的配置详情
        saveShareConfig: '/commonShare/saveShareConfig', // 保存某个页面具体分享方式的配置
        getSharePageList: '/commonShare/getSharePageList', // 获取已配置页面的分享信息
        getShareChannelList: '/commonShare/getShareChannelList', // 获取分享方式的配置详情
        updateShareChannelDisplayName: '/commonShare/updateShareChannelDisplayName', // 修改分享方式的前端展示名称
        validateChannelDisplayNameRepeat: '/commonShare/validateChannelDisplayNameRepeat', // 校验分享方式前端名称是否重复
        saveShareChannelSequence: '/commonShare/saveShareChannelSequence' // 保存分享方式的排序
      },
      search: {
        searchSku: '/common/searchSkuById'
      },
      rule: {
        getRuleConfigPageList: '/ruleConfig/getRuleConfigPageList', // 规则配置分页查询
        detail: '/ruleConfig/detail', // 规则配置查看
        addOrUpdate: '/ruleConfig/addOrUpdate', // 规则配置新增或修改
        ruleUrl: '/ruleConfig/ruleUrl' // 查看规则链接
      },
      bonushunter: { // 防薅配置
        save: '/activity/bonushunter/save',
        query: '/activity/bonushunter/query',
        loglist: '/activity/bonushunter/loglist/query',
        logdetail: '/activity/bonushunter/logdetail/query'
      }
    },
    // 系统管理
    system: {
      backups: { // 数据备份
        queryBakDataBypage: '/bakAndRec/queryBakDataBypage', // 分页查询已备份列表
        queryWaitBakDataBypage: '/bakAndRec/queryWaitBakDataBypage', // 分页查询待备份列表
        oneKeyBackup: '/bakAndRec/oneKeyBackup', // 备份数据
      },
      recovery: { // 数据备份
        queryRecDataBypage: '/bakAndRec/queryRecDataBypage', // 分页查询已恢复数据列表
        oneKeyRecovery: '/bakAndRec/oneKeyRecovery', // 恢复数据
      }
    },
    // 前端管理
    systemSetting: {
      download: { // app下载页
        getUpdateTime: '/staticize/downloadapp/getUpdateTime', // 获取app下载页更新时间
        updateAndroid: '/staticize/downloadapp/getAndroidHtml' // 更新app下载页
      },
      mManagement: { // M站管理
        // 顶部引导下载栏
        getMFloat: '/feConfig/MConfig/getMFloat', // 获取M站引导下载栏图片
        updateMFloat: '/feConfig/MConfig/updateMFloat' // 修改（保存）M站引导下载栏的图片配置
      },
      moduleSetting: { // 组件配置
        homeList: '/feConfig/component/homeList', // 获取组件配置
        globalConfig: '/feConfig/component/globalConfig', // 保存全局配置
        configMaterials: '/feConfig/component/configMaterials' // 保存其它组件模块
      },
      agreementCMS: {
        saveServiceAgreement: '/feConfig/termsAndPrivacy/saveServiceAgreement', // 保存用户服务协议
        getServiceAgreement: '/feConfig/termsAndPrivacy/getServiceAgreement', // 获取用户服务协议
        savePrivacyPolicy: '/feConfig/termsAndPrivacy/savePrivacyPolicy', // 保存必要隐私权限
        getPrivacyPolicyInfo: '/feConfig/termsAndPrivacy/getPrivacyPolicyInfo', // 获取必要隐私权限
        saveAccountCancelNotice: '/feConfig/termsAndPrivacy/saveAccountCancelNotice', // 保存账号注销须知
        getAccountCancelNotice: '/feConfig/termsAndPrivacy/getAccountCancelNotice', // 获取账号注销须知
        saveEffectiveMaskConfig: '/feConfig/termsAndPrivacy/saveEffectiveMaskConfig', // 保存协议生效弹窗
        getEffectiveMaskConfig: '/feConfig/termsAndPrivacy/getEffectiveMaskConfig' // 获取协议生效弹窗
      },
      appThinning: {
        getFileList: '/feConfig/appSlim/fileList', // 获取文件列表
        fileUpload: '/common/fileUpload', // 上传文件
        addFileRecord: '/feConfig/appSlim/addFileRecord', // 添加文件
        deleteFileRecord: '/feConfig/appSlim/deleteFileRecord', // 删除文件
        listVersionInfo: '/feConfig/appSlim/listVersionInfo', // 获取版本列表
        queryAppVersion: '/appVersion/queryAppVersion', // 获取可选版本和平台列表
        saveAppVersionInfo: '/feConfig/appSlim/saveAppVersionInfo', // 添加版本
        selectedFileRecordList: '/feConfig/appSlim/selectedFileRecordList', // 版本已关联文件列表
        deleteAppVersionInfo: '/feConfig/appSlim/deleteAppVersionInfo', // 删除版本
        batchSavaRelevance: '/feConfig/appSlim/batchSavaRelevance' // 文件关联至版本
      },
      // 老弹窗管理
      dialogManagement: {
        queryWindowList: '/popWindow/queryWindowList', // 获取弹窗列表
        queryParentNodeDetail: '/popWindow/queryParentNodeDetail', // 获取父弹窗详情（通用）
        oldCustomerUpdateParentConfig: '/popWindow/oldCustomer/updateParentConfig', // 保存 老客相关 父弹窗详情
        payedUpdateParentConfig: '/popWindow/payed/updateParentConfig', // 保存 已付款 父弹窗详情修改
        querySonNodeListByPage: '/popWindow/querySonNodeListByPage', // 子弹窗-分页查询列表（通用）
        querySonNodeDetail: '/popWindow/querySonNodeDetail', // 获取子弹窗详情（通用）
        oldCustomerAddOrUpdateSonConfig: '/popWindow/oldCustomer/addOrUpdateSonConfig', // 保存 老客相关 子弹窗详情
        payedAddOrUpdateSonConfig: '/popWindow/payed/addOrUpdateSonConfig', // 保存 已付款 子弹窗详情
        visitorAddOrUpdateSonConfig: '/popWindow/visitor/addOrUpdateSonConfig', // 保存 新老访客 子弹窗详情
        queryLogsByPage: '/popWindow/queryLogsByPage', // 获取日志列表
        queryParentLogDetail: '/popWindow/queryParentLogDetail', // 获取日志 父弹窗详情（通用）
        querySonNodeLogDetail: '/popWindow/querySonNodeLogDetail', // 获取日志 子弹窗详情（通用）
        queryPopLocationList: '/popWindow/queryPopLocationList', // 添加/编辑老客子弹窗备选“显示位置”
        visitorUpdateParentConfig: '/popWindow/visitor/updateParentConfig' // 保存 新访客 父弹窗详情
      },
      // 旧弹窗管理
      dialogManagementOld: {
        queryAllConfig: '/customerPop/queryAllConfig', // 获取弹窗配置项列表
        updateConfig: '/customerPop/updateVisitorConfig', // 修改弹窗配置，不包含老客订单相关
        queryConfig: '/customerPop/queryVisitorConfig', // 获取弹窗配置详情，不包含老客订单相关
        logsDetail: '/customerPop/logs/queryVisitorDetail', // 获取弹窗日志详情，不包含老客订单相关
        logs: '/customerPop/logs', // 日志列表
        queryOldCustomerConfig: '/customerPop/queryOldCustomerConfig', // 获取老客订单相关 详情
        updateOldCustomerConfig: '/customerPop/updateOldCustomerConfig', // 修改老客订单相关 配置
        queryOldCustomerDetail: '/customerPop/logs/queryOldCustomerDetail' // 获取老客订单相关日志详情
      },
      // 任务中心
      taskCenter: {
        queryAppVersion: '/appVersion/queryAppVersionByPlatform', // 获取可选版本和平台列表
        getTaskList: '/feconfig/taskCenter/defaultTaskList', // 获取任务列表
        saveTask: '/feconfig/taskCenter/saveTask', // 新增、编辑保存
        editTask: '/feconfig/taskCenter/info', // 编辑任务
        searchTaskList: '/feconfig/taskCenter/pageList', // 任务查询
        changeEnableStatus: '/feconfig/taskCenter/changeEnableStatus', // 启用/禁用
        saveGlobalConfig: '/feconfig/taskCenter/saveGlobalConfig', // 保存任务设置
        taskCenterLogList: '/feconfig/taskCenter/log/pageList', // 日志
        taskCenterLogDetails: '/feconfig/taskCenter/log/info', // 获取任务日志详情 taskCenterLogDetails
        getGlobalConfig: '/feconfig/taskCenter/getGlobalConfig', // 获取任务设置
        getRewardTypesByScene: '/feconfig/taskCenter/getRewardTypesByScene', // 根据场景标识查询生效中奖励类型列表
        saveGlobalExchangeConfig: '/feconfig/taskCenter/saveGlobalExchangeConfig', // 保存兑换设置
        saveGlobalSignInRewardConfig: '/feconfig/taskCenter/saveGlobalSignInRewardConfig', // 保存签到特殊奖励设置
        getAllModelTaskConfig: '/feconfig/taskCenter/getAllModelTaskConfig' // 获取所有任务设置模块的配置
      },
      // 安卓版本SQL执行
      androidSqlExecute: {
        queryByPage: '/feConfig/appVersionLog/queryByPage',// 安卓版本SQL执行-分页查询
        add: '/feConfig/appVersionLog/add',// 安卓版本SQL执行-添加
      },
      // 弹窗管理
      popupManagement: {
        queryByPage: '/userGroupAndPop/pop/queryByPage',// 获取弹窗管理列表
        modifyStatus: '/userGroupAndPop/pop/modifyStatus',// 弹窗启用和禁用
        creat: '/userGroupAndPop/pop/creat',//  添加弹窗
        update: '/userGroupAndPop/pop/update',//  编辑弹窗
        getDetails: '/userGroupAndPop/pop/queryById',//  获取弹窗详情
      },
      // 用户组管理
      userGroupManagement: {
        queryByPage: '/userGroupAndPop/userGroup/queryByPage',//  获取用户组列表
        modifyStatus: '/userGroupAndPop/userGroup/modifyStatus',//  用户组-启用和作废
        getLogList: '/userGroupAndPop/userGroupLog/queryByPage',//  获取日志列表
        queryLogById: '/userGroupAndPop/userGroupLog/queryById',//  获取日志详情
        getRelationList: '/userGroupAndPop/relatePop/queryByPage',//  获取关联弹窗列表
        getUserGroupInfo: '/userGroupAndPop/userGroup/queryById',//  查询用户组基本信息
        cancel: '/userGroupAndPop/relatePop/cancel',//  关联弹窗-作废
        relatePopCreate: '/userGroupAndPop/relatePop/create',//  关联弹窗-保存
        create: '/userGroupAndPop/userGroup/create', // 5.2用户组保存 http://cmsapp.biyao.com/userGroupAndPop/userGroup/create
        update: '/userGroupAndPop/userGroup/update', // 5.3用户组编辑 http://cmsapp.biyao.com/userGroupAndPop/userGroup/update
        queryById: '/userGroupAndPop/userGroup/info', // 5.4用户组查看详情 http://cmsapp.biyao.com/userGroupAndPop/userGroup/queryById -> http://cmsapp.biyao.com/userGroupAndPop/userGroup/info
        queryTags: '/userGroupAndPop/userGroup/queryTags', // 5.11用户组查询标签 http://cmsapp.biyao.com/userGroupAndPop/userGroup/queryTags
        queryLocations: '/userGroupAndPop/userGroup/queryLocations', // 5.12用户组查询地域 http://cmsapp.biyao.com/userGroupAndPop/userGroup/queryLocations
        queryEnums: '/userGroupAndPop/userGroup/queryEnums', // 5.13用户组枚举查询（注册来源、性别、首单渠道） http://cmsapp.biyao.com/userGroupAndPop/userGroup/queryEnums
        queryConditionEnumsByType: '/userGroupAndPop/userGroup/queryConditionEnumsByType', // 5.14数据类型筛选条件查询 http://cmsapp.biyao.com/userGroupAndPop/userGroup/queryConditionEnumsByType
        queryProductByPage: '/projectManage/queryProductByPage'// 7.7商品分页查询（商品相关）http://cmsapp.biyao.com/projectManage/queryProductByPage
      },
      // 专题管理
      specialManagement: {
        queryByPage: '/projectManage/queryByPage',//  获取专题列表
        modifyStatus: '/projectManage/modifyStatus',//  修改专题状态（启用、禁用、删除）
        queryProjectRouteById: '/projectManage/queryProjectRouteById',// 查看专题链接跳转信息
        
        create: '/projectManage/create',// 专题管理 > 保存
        update: '/projectManage/update',// 专题管理 > 编辑
        queryById: '/projectManage/queryById',// 专题管理 > 查看详情或复制时的查询
        queryTagByPage: '/projectManage/queryTagByPage',// 专题管理 > 专题添加或编辑 （商品） > 标签商品选择框
        queryProductByPage: '/projectManage/queryProductByPage',// 专题管理 > 专题添加或编辑 （图片） > 跳转信息为商品时弹框选择商品
        querySupplierByPage: '/projectManage/querySupplierByPage',// 专题管理 > 专题添加或编辑 （图片） > 跳转信息为商家时弹框选择商品
      }
    },
    // 运营市场管理
    operate: {
      material: { // 素材组管理
        save: '/material/save', // 保存素材
        update: '/material/update', // 修改素材
        exportData: '/material/export', // 导出素材
        contentSave: '/material/content/save', // 保存素材内容
        groupPageList: '/material/group/pageList', // 素材组列表查询
        detail: '/material/detail', // 通过素材组编码 获取详情
        groupLog: '/material/group/log', // 素材组操作日志查询
        contentLog: '/material/content/log', // 素材内容操作日志查询
        groupSnapshot: '/material/group/snapshot', // 通过日志id 查询素材组操作快照信息
        contentSnapshot: '/material/content/snapshot' // 通过日志id 查询素材内容操作快照信息
      },
      earlyWarning:{ // 地震预警
        getEQwarningsByPage:'/EQwarning/getEQwarningsByPage', // 地震预警列表分页查询 √
        saveOrUpd:'/EQwarning/saveOrUpd', // 地震预警的重发和新增
        getEQwarningDetail:'/EQwarning/getEQwarningDetail', // 地震预警信息详情 
        getWhiteListsByPage:'/EQwarning/getWhiteListsByPage', // 地震预警白名单列表分页查询 √
        deleteWhiteList:'/EQwarning/deleteWhiteList', // 地震预警白名单删除 √
        getWhiteListTemplate:'/EQwarning/getWhiteListTemplate', //下载导入模板 
      },
      // 小程序订阅号
      appletsSubscribeMessages:{
        // 模板库
        getTemplateLibraryList : "/miniprogram/template/pageList", // 模板库分页列表，GET
        addTemplateLibraryList : "/miniprogram/template/add", // 新增模板库模板，POST
        updateTemplateLibraryList : "/miniprogram/template/update", // 编辑模板库模板，POST
        infoTemplateLibraryList : "/miniprogram/template/info", // 获取模板库模板详情，GET
        changeStatusTemplateLibraryList : "/miniprogram/template/changeStatus", // 启用、禁用模板库模板，POST
        // 模板授权
        getAuthorizationList : "/miniprogram/authOpportunity/list", // 模板授权列表，GET
        updateAuthorizationList : "/miniprogram/authOpportunity/update", // 编辑模板授权，POST
        infoAuthorizationList : "/miniprogram/authOpportunity/info",// 获取模板授权详情，GET
        selectAuthorizationList : "/miniprogram/template/selectList" // 获取模板授权下拉列表，GET
      },
      // 广告位管理
      advertisingSpace:{
        pageList : "/advert/pageList", // 获取广告位管理列表
        getSupplierById : "/common/getSupplierById", // 校验商家ID
        getVerifiedInfoById : "/common/getVerifiedInfoById", // 校验大V ID
        add : "/advert/add", // 添加广告位
        update : "/advert/update", // 编辑广告位
        info : "/advert/info", // 广告位详情
       
      },
    }
  },
  mockPaths: {
    menus: '/menus.json',
    auth: '/auth.json',
    login: {
      logout: '/auth.json'
    },
    common: {
      getAllSuppliers: '/modules/common/getAllSuppliers.json',
      getBackendCategoryTree: '/modules/common/category.json',
      querySkuInfoById: '/modules/common/querySkuInfoById.json', // 根据suid查询有效的一起拼商品信息
      queryAllSCMTagList: '/modules/common/queryAllSCMTagList.json', // 从SCM服务中查询所有有效的SCM信息
      getOnlineTopicList: '/modules/common/getOnlineTopicList.json' // 获取专题列表
    },
    activity: {
      boosterTask: { // 助力任务
        getDetails: '/modules/activity/boosterTask/getDetails.json',
        saveDetails: '/modules/activity/boosterTask/saveDetails.json',
        log: '/modules/activity/boosterTask/log.json',
        list: '/modules/activity/boosterTask/list.json',
        add: '/modules/activity/boosterTask/add.json',
        detail: '/modules/activity/boosterTask/detail.json',
        relates: '/modules/activity/boosterTask/getRelates.json'
      },
      boosterPrevilege: { // 助力权益
        add: '/modules/activity/boosterTask/add.json',
        list: '/modules/activity/boosterPrevilege/list.json',
        productList: '/modules/activity/boosterPrevilege/product.json',
        detail: '/modules/activity/boosterPrevilege/detail.json'
      },
      boosterConfig: { // 调用助力设置
        list: '/modules/activity/boosterConfig/list.json',
        addProject: '/modules/activity/boosterConfig/addProject.json',
        addScene: '/modules/activity/boosterConfig/addScene.json',
        getProjectNameAndSceneName: '/modules/activity/boosterConfig/test.json',
        tasksList: '/modules/activity/boosterConfig/tasksList.json',
        abolish: '/modules/activity/boosterConfig/abolish.json',
        addSceneAndTask: '/modules/activity/boosterConfig/addSceneAndTask.json',
        addNewTask: '/modules/activity/boosterConfig/newTaks.json',
        gotoConnect: '/modules/activity/boosterConfig/gotoConnect.json'
      },
      appActiveRights: { // APP引导下载
        getAppRights: '/modules/activity/appActiveRights/getAppRights.json', // 获取权益配置
        saveAppRights: '/modules/activity/appActiveRights/saveAppRights.json', // 权益配置保存
        getProjectAndScene: '/modules/activity/appActiveRights/getProjectAndScene.json', // 获取项目列表和场景列表
        addProject: '/modules/activity/appActiveRights/addProject.json', // 添加项目
        addScene: '/modules/activity/appActiveRights/addScene.json', // 添加场景
        switchScene: '/modules/activity/appActiveRights/switchScene.json', // 开启关闭场景
        saveSceneMask: '/modules/activity/appActiveRights/saveSceneMask.json', // 保存更新弹层
        getSceneMask: '/modules/activity/appActiveRights/getSceneMask.json' // 获取弹层
      },
      luckDraw: {
        detail: '/modules/activity/luckDraw/detail.json', // 获取图文详情
        getLotteryPage: '/modules/activity/luckDraw/getLotteryPage.json', // 查询抽奖活动列表
        addPlatformLottery: '/modules/activity/luckDraw/addPlatformLottery.json', // 新增抽奖活动
        updatePlatformLottery: '/modules/activity/luckDraw/updatePlatformLottery.json', // 修改抽奖活动
        getShopRewardList: '/modules/activity/luckDraw/getShopRewardList.json', // 查询商家奖品列表
        editLottery: '/modules/activity/luckDraw/editLottery.json', // 编辑查看抽奖活动
        stickLottery: '/modules/activity/luckDraw/stickLottery.json', // 置顶活动
        closeLottery: '/modules/activity/luckDraw/closeLottery.json', // 关闭抽奖
        getLotteryResultByLotteryId: '/modules/activity/luckDraw/getLotteryResultByLotteryId.json', // 查询抽奖活动结果
        getLotteryResultPage: '/modules/activity/luckDraw/getLotteryResultPage.json', // 分页查询开奖结果列表
        getReceiveInfo: '/modules/activity/luckDraw/getReceiveInfo.json', // 收货信息
        saveDeliveryInfo: '/modules/activity/luckDraw/saveDeliveryInfo.json', // 发货信息
        getAwardInfo: '/modules/activity/luckDraw/getAwardInfo.json', // 发奖情况
        getPlatformRewardPage: '/modules/activity/luckDraw/getPlatformRewardPage.json', // 查询平台奖品列表
        addPlatformReward: '/modules/activity/luckDraw/addPlatformReward.json', // 添加平台奖品
        editPlatfromReward: '/modules/activity/luckDraw/editPlatfromReward.json', // 编辑平台奖品
        updatePlatformReward: '/modules/activity/luckDraw/updatePlatformReward.json', // 修改平台奖品
        getPersonLotteryPage: '/modules/activity/luckDraw/getPersonLotteryPage.json', // 查询个人抽奖活动列表
        getPersonLotteryResultPage: '/modules/activity/luckDraw/getPersonLotteryResultPage.json', // 查询个人抽奖活动开奖结果列表
        savePlatformLotteryMatter: '/modules/activity/luckDraw/savePlatformLotteryMatter.json', // 保存平台抽奖素材
        savePersonLotteryTitle: '/modules/activity/luckDraw/savePersonLotteryTitle.json', // 保存个人抽奖默认标题及入口开关
        savePersonLotteryImage: '/modules/activity/luckDraw/savePersonLotteryImage.json', // 保存个人抽奖默认图及分享卡片
        queryPersonLotteryMatter: '/modules/activity/luckDraw/queryPersonLotteryMatter.json', // 查询个人抽奖素材
        queryPlatformLotteryMatter: '/modules/activity/luckDraw/queryPlatformLotteryMatter.json', // 查询平台抽奖素材
        getRewardDescById: '/modules/activity/luckDraw/getRewardDescById.json' // 获取图文详情
      },
      together: { // 一起拼活动
        saveActivity: '/auth.json',
        getActivityDetail: '/modules/activity/groupBuy/getActivityDetail.json',
        getActivityProductByPage: '/modules/activity/together/getActivityProductByPage.json', // 获取一起拼活动商品
        batchFirstAuditPassByApplyNo: '/auth.json', // 一起拼活动商品批量初审通过
        deleteByApplyNo: '/auth.json', // 一起拼活动商品删除
        getApplicationFormsByApplyNo: '/modules/activity/together/getApplicationFormsByApplyNo.json', // 一起拼活动商品审核详情
        updatePlatformDiscountByApplyNo: '/auth.json', // 一起拼活动商品修改新平台优惠
        firstAuditByApplyNo: '/auth.json', // 一起拼活动商品初审
        getPreActivityProductByPage: '/modules/activity/together/getPreActivityProductByPage.json', // 一起拼活动商品预选商品列表
        batchSaveActivityProduct: '/auth.json', // 一起拼活动商品保存
        togGroupActivityExport: '/modules/activity/together/togGroupActivityExport', // 导出
        togetherImport: '/modules/activity/together/import' // 导入
      },
      togetherOperation: { // 一起拼运营位
        getBannerConfigList: '/modules/activity/togetherOperation/getBannerConfigList.json', // Banner图查询
        batchSaveBannerConfig: '/modules/activity/togetherOperation/batchSaveBannerConfig.json', // Banner图保存
        queryOperationsConfig: '/modules/activity/togetherOperation/queryOperationsConfig.json', // 运营位1/2/3/4查询
        saveOperationsConfig: '/modules/activity/togetherOperation/saveOperationsConfig.json' // 运营位1/2/3/4保存
      },
      faceScore: { // 颜值
        queryConfig: '/modules/activity/faceScore/queryConfig.json', // 查询配置
        saveConfig: '/modules/activity/faceScore/saveConfig.json', // 保存配置
        queryTopicList: '/modules/activity/faceScore/queryTopicList.json', // 查询主题管理列表
        queryTopicSequenceList: '/modules/activity/faceScore/queryTopicSequenceList.json', // 查询主题序号列表
        saveTopicSequenceList: '/activity/faceScore/saveTopicSequenceList.json', // 保存调整主题序号
        addTopic: '/modules/activity/faceScore/addTopic.json', // 新增主题
        updateTopic: '/modules/activity/faceScore/updateTopic.json', // 修改主题
        queryTopicById: '/modules/activity/faceScore/queryTopicById.json', // 查询主题详情
        deleteTopic: '/modules/activity/faceScore/deleteTopic.json', // 删除主题
        queryTemplateList: '/modules/activity/faceScore/queryTemplateList.json', // 查询模板管理列表
        updateTemplate: '/modules/activity/faceScore/updateTemplate.json', // 修改模板(用于编辑模板，设置精选非精选)
        deleteTemplate: '/modules/activity/faceScore/deleteTemplate.json', // 删除模板
        addTemplate: '/modules/activity/faceScore/addTemplate.json', // 添加模板
        batchUpdateTemplate: '/modules/activity/faceScore/batchUpdateTemplate.json', // 批量设置融合度
        queryTemplateById: '/modules/activity/faceScore/queryTemplateById.json', // 查询模板详情
        queryMatter: '/modules/activity/faceScore/queryMatter.json', // 查询素材管理
        saveMatter: '/modules/activity/faceScore/saveMatter.json' // 保存素材
      },
      activityProduct: { // 活动商品
        getActivityProductByPage: '/modules/activity/activityProduct/getActivityProductByPage.json', // 获取活动商品列表
        activityProductexport: '/modules/activity/activityProduct/activityProductexport.json' // 获取活动商品列表
      },
      merchantsAudit: { // 商家提报审核
        getApplicationFormsByPage: '/modules/activity/merchantsAudit/getApplicationFormsByPage.json', // 获取商家提报审核列表
        auditApplicationFormsByApplyNo: '/modules/activity/merchantsAudit/auditApplicationFormsByApplyNo.json', // 单条审核
        batchAuditPassByApplyNo: '/modules/activity/merchantsAudit/batchAuditPassByApplyNo.json', // 批量审核
        getApplicationFormsByApplyNo: '/modules/activity/merchantsAudit/getApplicationFormsByApplyNo.json' // 审核详情
      },
      secondAudit: { // 活动提报二审
        getSecondAuditFormByPage: '/modules/activity/secondAudit/getSecondAuditFormByPage.json', // 获取二审审批单列表
        exportActivitySkuByApplyNos: '/modules/activity/secondAudit/exportActivitySkuByApplyNos.json', // 导出
        auditApplicationFormsByApplyNo: '/modules/activity/secondAudit/auditApplicationFormsByApplyNo.json', // 二审单条审批
        getApplicationFormDetailByApplyNo: '/modules/activity/secondAudit/getApplicationFormDetailByApplyNo.json', // 获取二审的审核详情
        batchAuditPassByApplyNo: '/modules/activity/secondAudit/batchAuditPassByApplyNo.json' // 批量审批
      },
      cashback: { // 抢返现
        pageList: '/modules/activity/cashback/pageList.json', // 查询 抢返现商品池(抢返现商品列表,抢返现活动添加/编辑 --可选择商品列表)
        deleteCashback: '/modules/activity/cashback/deleteCashback.json', // 抢返现商品删除
        getPageList: '/modules/activity/cashback/getPageList.json', // 查询 抢返现商品->弹层列表
        addCashback: '/modules/activity/cashback/addCashback.json', // 保存 抢返现商品
        activityPageList: '/modules/activity/cashback/activityPageList.json', // 查询 抢返现活动列表
        activityDetail: '/modules/activity/cashback/activityDetail.json', // 查询 抢返现活动 详情
        addOrUpdate: '/modules/activity/cashback/addOrUpdate.json', // 保存(新增或修改) 抢返现活动
        finish: '/modules/activity/cashback/finish.json', // 结束抢返现活动
        getMaterial: '/modules/activity/cashback/getMaterial.json', // 获取抢返现素材
        channelUpdate: '/modules/activity/cashback/channelUpdate.json', // 保存 抢返现频道介绍图
        shareUpdate: '/modules/activity/cashback/shareUpdate.json' // 保存 分享素材
      },
      stepsExchange: {
        stepsSettingInfo: '/steps/stepsSettingInfo', // 获取步数换配置信息
        stepsSetting: '/steps/stepsSetting', // 步数换全局配置
        loginAwardSetting: '/steps/loginAwardSetting', // 登录奖励配置
        newbieTaskSetting: '/steps/newbieTaskSetting', // 首次邀请配置
        inviteFriendsSetting: '/steps/inviteFriendsSetting', // 日常任务—邀请好友配置
        challengeSetting: '/steps/challengeSetting', // 日常任务—挑战
        sharingMaterialSetting: '/steps/sharingMaterialSetting' // 分享素材
      }
    },
    home: {
      layer: { // 首页浮层
        saveFolating: './auth.json', // 配置浮层的跳转
        getFolatingDetail: '/modules/home/layer/detail.json' // 获取浮层配置详情
      },
      baseMap: { // M站首页下载弹层
        getMaskByM: '/modules/home/baseMap/detail.json', // 获取M站下载弹层底图
        updateMaskByM: './auth.json' // 更新M站下载弹层底图
      },
      newOperatNav: {
        table: './newOperatNav.json' // 配置浮层的跳转
      }
    },
    privilege: { // 特权金
      blacklist: {
        getBlacklistProductByPage: '/modules/privilege/blackList/list.json', // 新客&老客黑名单商品列表查询
        batchRemoveBlacklistProduct: './auth.json', // 新客&老客黑名单商品删除/批量删除
        getBlacklistProductLogByPage: '/modules/privilege/blackList/history.json',
        getBlacklistProductLogDetailByPage: '/modules/privilege/blackList/detail.json',
        getPrivilegeProductByPage: '/modules/privilege/blackList/list.json',
        exportPrivilegeProduct: '/modules/privilege/blackList/export.json',
        batchAddBlacklistProduct: '/auth.json'
      },
      novice: { // 新手特权金
        getActivityProductByPage: '/modules/activity/together/getActivityProductByPage.json', // 获取一起拼活动商品
        batchFirstAuditPassByApplyNo: '/auth.json', // 一起拼活动商品批量初审通过
        deleteByApplyNo: '/auth.json', // 一起拼活动商品删除
        getApplicationFormsByApplyNo: '/modules/activity/together/getApplicationFormsByApplyNo.json', // 一起拼活动商品审核详情
        updatePlatformDiscountByApplyNo: '/auth.json', // 一起拼活动商品修改新平台优惠
        firstAuditByApplyNo: '/auth.json', // 一起拼活动商品初审
        getPreActivityProductByPage: '/modules/activity/together/getPreActivityProductByPage.json', // 一起拼活动商品预选商品列表
        batchSaveActivityProduct: '/auth.json', // 一起拼活动商品保存
        export: '/modules/privilege/novice/export.json' // 新手特权金商品导出
      },
      stepsPrivilege: { // 步数换特权金
        stepsPrivilegeMoneyInfo: '/privilegeMoney/stepsPrivilegeMoneyInfo', // 获取步数兑换特权金配置
        stepsPrivilegeMoneySetting: '/privilegeMoney/stepsPrivilegeMoneySetting' // 步数兑换特权金配置
      },
      task: {
        getTaskByPage: '/modules/privilege/task/list.json', // 特权金任务列表
        switchTask: './auth.json', // 特权金任务开启、关闭
        saveTask: './auth.json', // 5.2.特权金任务添加/修改
        getTaskDetail: '/modules/privilege/task/info.json' // 特权金任务查看
      },
      hook: {
        getProjectByPage: '/modules/privilege/hook/getProjectByPage.json', // 挂接特权金列表
        switchScene: '/auth.json', // 挂接特权金开关场景
        getConfig: '/modules/privilege/hook/getConfig.json', // 挂接特权金获取配置
        saveConfig: '/auth.json', // 5.8.挂接特权金保存配置
        saveProject: '/auth.json', // 挂接特权金添加项目
        saveScene: '/auth.json', // 挂接特权金添加场景
        getSceneDetail: '/modules/privilege/hook/getSceneDetail.json', // 根据场景id获取场景信息
        getRelationProjectByPage: '/modules/privilege/hook/getRelationProjectByPage.json', // 已关联任务列表
        saveRelation: '/auth.json', // 关联任务添加
        cancelRelation: '/auth.json' // 关联任务作废
      },
      // 特权金素材
      material: {
        updateNoShareLimitStartTime: '/modules/privilege/material/updateNoShareLimitStartTime.json', // 清空90天用户限制
        getIndexBottomCopy: '/modules/privilege/material/getIndexBottomCopy.json', // 获取文案的配置信息
        saveIndexBottomCopy: '/modules/privilege/material/saveIndexBottomCopy.json' // 修改文案配置
      }
    },
    param: {
      share: {
        getSharePageList: '/modules/param/share/getSharePageList.json', // 获取已配置页面的分享信息
        getShareChannelList: '/modules/param/share/getShareChannelList.json', // 获取分享方式的配置详情
        updateShareChannelDisplayName: '/modules/param/share/updateShareChannelDisplayName.json', // 修改分享方式的前端展示名称
        saveShareChannelSequence: '/modules/param/share/saveShareChannelSequence.json' // 保存分享方式的排序
      }
    },
    // 前端管理
    systemSetting: {
      download: { // app下载页
        getUpdateTime: '/staticize/downloadapp/getUpdateTime', // 获取app下载页更新时间
        updateAndroid: '/staticize/downloadapp/getAndroidHtml' // 更新app下载页
      },
      mManagement: { // M站管理
        getMFloat: '/modules/systemSetting/mManagement/getMFloat.json', // 获取M站引导下载栏图片
        updateMFloat: '/modules/systemSetting/mManagement/updateMFloat.json' // 修改（保存）M站引导下载栏的图片配置
      },
      moduleSetting: { // 组件配置

      },
      appThinning: {
        getFileList: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/fileList', // 获取文件列表
        fileUpload: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/fileUpload', // 上传文件
        addFileRecord: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/addFileRecord', // 添加文件
        deleteFileRecord: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/deleteFileRecord', // 删除文件
        listVersionInfo: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/listVersionInfo', // 获取版本列表
        queryAppVersion: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/queryAppVersion', // 获取可选版本和平台列表
        saveAppVersionInfo: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/saveAppVersionInfo', // 添加版本
        selectedFileRecordList: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/selectedFileRecordList', // 版本已关联文件列表
        deleteAppVersionInfo: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/deleteAppVersionInfo', // 删除版本
        batchSavaRelevance: 'http://192.168.99.117:7300/mock/5cc69e06f15fce27ae577d8b/batchSavaRelevance' // 文件关联至版本
      }
    },
  }
}

export default cmsConfig
