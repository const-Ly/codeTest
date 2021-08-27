import services from '@/services/index'
export default {
    state: {
        param: {
            pageNum: 1,
            pageSize: 20,
            status: '',
            templateId: '',
            title: ''
        },
        total: 0,
        pages: 0,
        list: [],
        dialog: {
            visible: false,
            type: "",
            param: {
                id: '',
                templateId: '',
                title: '',
                status: ''
            }
        }
    },
    mutations: {

    },
    actions: {
        appletsSubscribeMessages_templateLibrary_getList(context, config) {
            if (typeof config === "number") {
                context.state.param.pageNum = config;
            } else {
                Object.assign(context.state.param, config);
            }
            services.operate.appletsSubscribeMessages
                .getTemplateLibraryList(context.state.param)
                .then(res => {
                    context.state.param.pageNum = res.pageNum;
                    context.state.pages = res.pages;
                    context.state.total = res.total;
                    context.state.list = res.list || [];
                });
        },

        appletsSubscribeMessages_templateLibrary_changeStatus(context, config) {
            services.operate.appletsSubscribeMessages
                .changeStatusTemplateLibraryList(config)
                .then(res => {
                    context.dispatch('appletsSubscribeMessages_templateLibrary_getList')
                });
        },

        appletsSubscribeMessages_templateLibrary_showDialog(context, config) {
            context.state.dialog.type = config.type;
            if (context.state.dialog.type === "编辑") {
                services.operate.appletsSubscribeMessages
                    .infoTemplateLibraryList({ id: config.id })
                    .then(res => {
                        Object.assign(context.state.dialog.param, res)
                        context.state.dialog.visible = true;
                    });
            } else {
                for (let attr in context.state.dialog.param) {
                    context.state.dialog.param[attr] = "";
                }
                context.state.dialog.visible = true;
            }
        },

        appletsSubscribeMessages_templateLibrary_submitDialog(context) {
            if (context.state.dialog.type === "编辑") {
                services.operate.appletsSubscribeMessages
                    .updateTemplateLibraryList(context.state.dialog.param)
                    .then(res => {
                        context.dispatch('appletsSubscribeMessages_templateLibrary_getList')
                        context.dispatch('appletsSubscribeMessages_templateLibrary_closeDialog')
                    });
            } else {
                services.operate.appletsSubscribeMessages
                    .addTemplateLibraryList(context.state.dialog.param)
                    .then(res => {
                        context.dispatch('appletsSubscribeMessages_templateLibrary_getList')
                        context.dispatch('appletsSubscribeMessages_templateLibrary_closeDialog')
                    });
            }
        },

        appletsSubscribeMessages_templateLibrary_closeDialog(context) {
            context.state.dialog.visible = false;
        },

    }
}