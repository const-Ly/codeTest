import services from '@/services/index'
export default {
    state: {
        param: {
            templateId: '',
            title: '',
            
        },
        list: [],
        dialog: {
            visible: false,
            selectList: [],
            param: {
                opportunity: '',
                templates: [],
                opportunityDes: '',
            }
        }
    },
    mutations: {

    },
    actions: {
        appletsSubscribeMessages_authorization_getList(context, config) {
            Object.assign(context.state.param, config);
            services.operate.appletsSubscribeMessages
                .getAuthorizationList(context.state.param)
                .then(res => {
                    context.state.list = res || [];
                });
        },

        appletsSubscribeMessages_authorization_showDialog(context, config) {
            context.state.dialog.opportunityDes = config.opportunityDes;
            return services.operate.appletsSubscribeMessages
                .infoAuthorizationList({ opportunity: config.opportunity })
                .then(res => {
                    Object.assign(context.state.dialog.param, res);
                    services.operate.appletsSubscribeMessages
                        .selectAuthorizationList({})
                        .then(res => {
                            context.state.dialog.selectList = res;
                            context.state.dialog.visible = true;
                        });
                });
        },

        appletsSubscribeMessages_authorization_submitDialog(context, config) {
            context.state.dialog.param.templates = config.templates;
            services.operate.appletsSubscribeMessages
                .updateAuthorizationList(context.state.dialog.param)
                .then(res => {
                    context.dispatch('appletsSubscribeMessages_authorization_getList')
                    context.dispatch('appletsSubscribeMessages_authorization_closeDialog')
                });
        },

        appletsSubscribeMessages_authorization_closeDialog(context) {
            context.state.dialog.visible = false;
        },
    }
}