<template>
  <div class="about">
    <h1>This is an home page</h1>
    <div>扔了{{$store.state.count}}个</div>
    <p>{{$store.getters.score}}</p>
    <button @click="add">扔一个</button>
    <button @click="addAsync">蓄力扔俩</button>
  </div>
</template>
<script>
export default {
  methods: {
    add() {
      this.$store.commit('increment')
    },
    addAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
