const baseConf = {
  code: '',
  title:'素材名称',
  desc:'素材说明'
}
export default {
  '01':{// 单选框配置
    ...baseConf,
    type: '01',
    typeName: '单选开关',
    conf: {
      data:1,
      rule: [
        {label: '选项1', value: 1},
        {label: '选项2', value: 2}
      ]
    }
  },
  '02':{// 单行输入框配置
    ...baseConf,
    type: '02',
    typeName: '单行文本',
    conf: {
      data:'',
      rule: {
        required: false,
        minLength: 0,
        maxLength: 9999
      }
    }
  },
  '03':{// 多行输入框配置
    ...baseConf,
    type: '03',
    typeName: '多行文本',
    conf: {
      data:'',
      rule: {
        required: false,
        minLength: 0,
        maxLength: 9999
      }
    }
  },
  '04':{// 整数输入框配置
    ...baseConf,
    type: '04',
    typeName: '整数',
    conf: {
      data: '',
      rule: {
        required: false,
        minValue: 0,
        maxValue: 99999999
      }
    }
  },
  '05':{// 小数输入框配置
    ...baseConf,
    type: '05',
    typeName: '小数',
    conf: {
      data: '',
      rule: {
        required: false,
        minValue: 0,
        maxValue: 99999999
      }
    }
  },
  '06':{// 图片上传配置
    ...baseConf,
    type: '06',
    typeName: '图片',
    conf: {
      data:'',
      rule: {
        required: false,
        width: '',
        height: '',
        size: 300
      }
    }
  }
}
