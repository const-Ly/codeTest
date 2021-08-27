<template>
    <div id="copy">
        <el-table :data="copydata"  border>
            <el-table-column width="50">
                <template slot-scope="scope">
                    <el-checkbox :disabled="scope.row.disabled" @change="selected(scope.row.status, scope.$index)"  v-model="scope.row.status" :label="1">&thinsp;</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="userTypeName" label="目标用户"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['copydata'],
    data(){
        return {

        }
    },
    methods: {
        selected(status, index){
            let self = this;
            if(status){
                self.copydata.forEach((item, i) => {
                    if(index == i){
                        self.$emit('sure', item);
                    }else{
                        item.status = false;
                    }
                });
            }
        }
    }
}
</script>

<style>
#copy{
    max-height: 500px;
    overflow: auto;
}
</style>
