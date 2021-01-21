<template>
  <div class="row d-flex justify-content-center">
    <div class="col-3">
      <div class="card mb-2">
        <div>{{ player.name }}</div>
        <div>{{ player.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['player', 'index'],
  data () {
    return {

    }
  },
  created () {

  }
}
</script>

<style>

</style>
