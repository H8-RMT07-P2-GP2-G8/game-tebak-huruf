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
import Swal from 'sweetalert2'
export default {
  props: ['player', 'index'],
  data () {
    return {

    }
  },
  created () {
    console.log(this.player.score)
    if (this.player.score === 10) console.log('done')
  },
  sockets: {
    end (payload) {
      Swal.fire({
        title: 'game over!',
        icon: 'success',
        text: 'winner ' + payload.winner
      })
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
