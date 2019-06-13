<template>
  <div>
    <el-input v-model="a"></el-input>
    <div class="box">
      6546
    </div>
    <button @click="add">state+1</button>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  data(){
    return{
      a:'',
      cont: 0
    }
  },
  created () {
  },
  methods:{
    add(){
      this.cont++
      PubSub.publish('aa', this.cont)
    }
  }
}
</script>

<style lang="less">
div{
  .box{
    color: red;
  }
}
</style>
