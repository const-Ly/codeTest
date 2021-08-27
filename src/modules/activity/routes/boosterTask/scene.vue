<template>
    <div id="scene">
        <el-table :data="sceneData" border>
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
            <el-table-column prop="sceneName" label="场景"></el-table-column>
            <el-table-column prop="sceneIdentify" label="场景标识"></el-table-column>
            <el-table-column prop="effectTime" width="180" label="生效时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'scene',
    props: ['taskId'],
    data(){
        return {
            sceneData: []
        }
    },
    computed: {
        param(){
            return {
               taskConfigId: this.taskId
            }
        }
    },
    methods: {
        request(){
            this.$service.activity.boosterTask.relates(this.param).then((res) => {
                this.sceneData = res;
                this.reDate();
            })
        },
        reDate(){
            let arr = [];
            this.sceneData.forEach((item) => {
                arr.push({
                    "projectName": item.projectName,
                    "sceneName": item.sceneName,
                    "sceneIdentify": item.sceneIdentify,
                    "effectTime": item.startEffectTime + ' - ' + item.endEffectTime
                });
            });
            this.sceneData = arr;
        }
    },
    mounted(){
        this.request();
    }
}
</script>

<style>
#scene{
    max-height: 500px;
    overflow: auto;
}
</style>
