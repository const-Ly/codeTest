<template>
  <div>
    <VisitorEdit :pop-code="popCode"/>
  </div>
</template>

<script type="text/javascript">
import VisitorEdit from './VisitorEdit'
export default {
  name: 'oldLoginVisitorEdit',
  data () {
    return {
      popCode: '3'
    }
  },
  components: {
    VisitorEdit
  }
}
</script>

<style type="text/css" scoped>
</style>
