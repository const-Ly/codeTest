<template>
  <span>
		<el-date-picker class="w180" v-model="dateTime" :picker-options="dateTimeOptions" type="datetime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" @change="changeFun"></el-date-picker>
	</span>
</template>

<script type="text/javascript">
  export default {
    name: 'dateTimePicker',
    props:{
			date: {			// 日期
				type: String,
				default: ''
			},
			startDate: {// 选择开始时间范围
				type: String,
				default: ''
			},
			endNum: {		// 选择开始时间到结束时间的范围时长，*毫秒数
				type: Number,
				default: 0 
			},
			changeFun: {// 选择日期后的回调函数
				type: Function,
				default: () => {}
			}
    },
    data () {
      return {
				dateTime: '',
				dateTimeOptions:{
          disabledDate: (time) => {
						typeof (time) === 'string' && (time = new Date(time))
						let start = this.startDate ==='newDate' ? new Date() : new Date(this.startDate)
						if (this.endNum !== 0) {
							if (!this.startDate) {
								return true
							} else if (start.getTime() % (1000*60) === 0 && start.getTime() % 8.64e7 !== 57600000) {
								return  time < start.getTime() - 8.64e7 || time > start.getTime() + this.endNum
							} else {
								return  time < start.getTime() || time > start.getTime() + 3 * 8.64e7
							}
						} else {
							return this.startDate ? time < new Date() - 8.64e7 : false
						}
          }
        }
      }
    },
    watch:{
      date (val, old) {
				this.datetime = val
			},
			dateTime (val, old) {
				let date = typeof (val) === 'string' ? new Date(val) : val
				let start = this.startDate ==='newDate' ? new Date() : new Date(this.startDate)
				if (val && this.endNum === 0 && date < start) {
					this.dateTime = this.$utils.dateToString(start)
				}
				if (val && this.endNum && !this.startDate) {
					this.dateTime = ''
				} else if (val && this.endNum > 0 && (date < start || date > start.getTime() + this.endNum)) {
          if (date.getTime() - start.getTime() > 8.64e7) {
            this.dateTime = this.$utils.dateToString(new Date(start.getTime() + this.endNum))
          } else {
            this.dateTime = this.$utils.dateToString(start)
          }
				}
				this.$emit('update', this.dateTime)
			}
    },
    methods:{

    }
  }
</script>
<style scoped>
  .w180{width:180px;}
</style>
