<template>
  <div>
    <VisitorEdit :pop-code="popCode"/>
  </div>
</template>

<script type="text/javascript">
import VisitorEdit from './VisitorEdit'
export default {
  name: 'oldNoLoginVisitorEdit',
  data () {
    return {
      popCode: '2'
    }
  },
  components: {
    VisitorEdit
  }
}
</script>

<style type="text/css" scoped>
</style>
