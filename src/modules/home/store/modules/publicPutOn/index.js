import services from '@/services'

export default {
    state: {
        listParam: {
            pageNum: 1,
            pageSize: 20
        },
        list: [],
        formParam: {},
        doingTotal: '',
    },
    actions: {
        // 请求公号主业务表
        publicPutOn_getList(context, config) {
            Object.assign(context.state.listParam, config)
            const param = {
                pageNum: 1,
                pageSize: 20,
                recommendId: context.state.listParam.recommendId,
                productName: context.state.listParam.productName,
                onSaleStatus: context.state.listParam.onSaleStatus,
                recommendStatus: 2
            }
            if(context.state.listParam.recommendStatus){
                services.home.publicPutOn.getPublicPutOnList(context.state.listParam).then(res => {
                    context.state.listParam.pageNum = res.pageNum * 1 || 1
                    context.state.listParam.pages = res.pages * 1
                    context.state.listParam.total = res.total * 1
                    context.state.list = res.list || []
                    if(context.state.listParam.recommendStatus * 1 === 2){
                        context.state.doingTotal = res.total * 1
                    }else{
                        context.state.doingTotal = 0
                    }
                })  
            }else{
                services.home.publicPutOn.getPublicPutOnList(param).then(res => {
                    context.state.doingTotal = res.total
                    services.home.publicPutOn.getPublicPutOnList(context.state.listParam).then(res => {
                        context.state.listParam.pageNum = res.pageNum * 1 || 1
                        context.state.listParam.pages = res.pages * 1
                        context.state.listParam.total = res.total * 1
                        context.state.list = res.list || []
                    })     
                })
            }
        },


        // SPUID的失焦搜索
        publicPutOn_searchProductById(context, config) {
            return new Promise((resolve, reject) => {
                services.common.searchProductById(config).then(res => {
                    context.state.formParam.productName = res.productName
                    resolve()
                })
            })
        },

        // 添加
        publicPutOn_add(context, config) {
            return new Promise((resolve, reject) => {
                services.home.publicPutOn.addPublicPutOn(config).then(res => {
                    resolve()
                })
            })
        },

        // 编辑
        publicPutOn_edit(context, config) {
            return new Promise((resolve, reject) => {
                services.home.publicPutOn.editPublicPutOn(config).then(res => {
                    resolve()
                })
            })
        },

        // 获取详情
        publicPutOn_getInfo(context, config) {
            return new Promise((resolve, reject) => {
                services.home.publicPutOn.getPublicPutOnInfo(config).then(res => {
                    context.state.formParam.id = res.id
                    context.state.formParam.recommendId = res.recommendId
                    context.state.formParam.productName = res.productName
                    context.state.formParam.scope = res.scope
                    context.state.formParam.recommendImg = res.recommendImg
                    context.state.formParam.enableTime = res.enableTime
                    context.state.formParam.disableTime = res.disableTime
                    context.state.formParam.createTime = res.createTime
                    context.state.formParam.createBy = res.createBy
                    context.state.formParam.updateTime = res.updateTime
                    context.state.formParam.updateBy = res.updateBy
                    context.state.formParam.seq = res.seq
                    resolve()
                })
            })
        },
    }
}