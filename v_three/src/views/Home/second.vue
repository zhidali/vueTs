<template>
  <div>
    2222
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
PubSub.subscribe('aa', (msg, data) => {
  console.log(data)
})
export default {
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
