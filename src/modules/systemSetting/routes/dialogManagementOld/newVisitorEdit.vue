<template>
  <div>
    <VisitorEdit :pop-code="popCode"/>
  </div>
</template>

<script type="text/javascript">
import VisitorEdit from './VisitorEdit'
export default {
  name: 'newVisitorEdit',
  data () {
    return {
      popCode: '1'
    }
  },
  components: {
    VisitorEdit
  }
}
</script>

<style type="text/css" scoped>
</style>
