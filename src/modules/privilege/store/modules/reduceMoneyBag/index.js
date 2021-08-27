import services from '@/services'

export default {
    state: {
        listParam: {
            pageNum: 1,
            pageSize: 20
        },
        list: [],
        formParam: {
            id: "",
            minValue: "",
            maxValue: "",
            remark: "",
            terms: [
                {
                    proportion: 100,
                    expireType: 1
                },
            ]
        },
        vuexTerms:[]
    },
    actions: {
        reduceMoneyBag_getList(context, config) {
            Object.assign(context.state.listParam, config)
            services.privilege.reduceMoneyBag.getReduceMoneyBagList(context.state.listParam).then(res => {
                context.state.listParam.pageNum = res.pageNum * 1 || 1
                context.state.listParam.pages = res.pages * 1
                context.state.listParam.total = res.total * 1
                context.state.list = res.list || []
            })
        },
        reduceMoneyBag_add(context, config) {
            return new Promise((resolve, reject) => {
                services.privilege.reduceMoneyBag.addReduceMoneyBag(config).then(res => {
                    resolve()
                })
            })
        },
        reduceMoneyBag_edit(context, config) {
            return new Promise((resolve, reject) => {
                services.privilege.reduceMoneyBag.editReduceMoneyBag(config).then(res => {
                    resolve()
                })
            })
        },

        // 获取立减金包详情
        reduceMoneyBag_getInfo(context, config) {
            return new Promise((resolve, reject) => {
                services.privilege.reduceMoneyBag.getReduceMoneyBagInfo(config).then(res => {
                    context.state.formParam.id = res.id
                    context.state.formParam.minValue = res.minValue
                    context.state.formParam.maxValue = res.maxValue
                    context.state.formParam.remark = res.remark
                    context.state.formParam.terms = res.terms
                    context.state.vuexTerms = res.terms
                    resolve()
                })
            })
        },
        reduceMoneyBag_changeStatus(context, config) {
            return new Promise((resolve, reject) => {
                services.privilege.reduceMoneyBag.changeReduceMoneyBagStatus(config).then(res => {
                    resolve()
                })
            })
        },
    }
}