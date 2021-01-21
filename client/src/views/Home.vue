<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <b-container class="mt-5">
        <b-row>
          <b-col md="12">
            <b-card title="Masukkan nama anda" class="text-center border-light shadow">
              <b-form>
                <b-input v-model="name" placeholder="type..."></b-input>
                <b-button @click.prevent="join" type="submit" variant="primary" class="mt-3">Submit</b-button>
              </b-form>
            </b-card>
          </b-col>
      </b-row>
    </b-container>
    <!-- <form @submit.prevent="join">
      <input
        type="text"
        id="username"
        v-model="name"
        placeholder="name"
      >
      <button type="submit" value="join">join</button>  user klik join -->
    <!-- </form> -->
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
