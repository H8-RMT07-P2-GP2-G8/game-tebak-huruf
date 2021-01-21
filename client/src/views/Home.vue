<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <form @submit.prevent="join">
      <input
        type="text"
        id="username"
        v-model="name"
        placeholder="name"
      >
      <button type="submit" value="join">join</button> <!-- user klik join -->
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    join () {
      this.$socket.emit('join', { name: this.name, score: 0 }) //
      this.$router.push('/play/' + this.name)
    }
  },
  created () {

  }
}
</script>
