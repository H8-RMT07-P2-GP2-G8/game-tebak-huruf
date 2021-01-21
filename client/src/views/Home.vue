<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <form @submit.prevent="join">
      <input
        type="text"
        id="username"
        v-model="name"
        placeholder="name"
      >
      <button type="submit" value="join">join</button>
    </form>
    <p
      v-for="(player, i) in players"
      :key="i"
    >{{ player.name }} {{ player.score }} </p>
  </div> -->

  <!-- baru -->
    <b-container class="mt-5">
        <b-row>
            <b-col md="12">
                <b-card title="Masukkan nama anda" class="text-center border-light shadow">
                    <b-form>
                        <b-input placeholder="type..."></b-input>
                        <b-button type="submit" variant="primary" class="mt-3">Submit</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    join () {
      console.log('gg')
      this.$socket.emit('join', { name: this.name, score: 0 })
    },
    tambah (i) {
      this.$socket.emit('tambah', i)
    }
  },
  computed: {
    ...mapState([
      'players'
    ])
  },
  sockets: {

  },
  created () {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'a') {
        this.$socket.emit('tambah', 0)
      } else if (e.key === 's') {
        this.$socket.emit('tambah', 1)
      }
    })
  }
}
</script>
