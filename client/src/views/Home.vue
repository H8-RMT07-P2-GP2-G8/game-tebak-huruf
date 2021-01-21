<template>
  <div class="home">
    <img class="logo" alt="Tebak huruf logo" src="../assets/blocks (1).png">
      <b-container class="mt-5">
        <b-row>
          <b-col md="12">
            <b-card title="Masukkan nama anda" class="text-center border-light shadow">
              <b-form>
                <b-input v-model="name" placeholder="type..."></b-input>
                <b-button @click.prevent="join" type="submit" variant="primary" class="mt-3">Let's play!</b-button>
              </b-form>
            </b-card>
          </b-col>
      </b-row>
    </b-container>
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

<style scoped>
  .logo {
    margin-top: 35px;
    width: 10rem;
  }
</style>
