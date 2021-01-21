<template>
  <div>
    <input type="text" v-model="question" class="col-3"> + <input type="text" v-model="angka" class="col-3">
    <player-card
      v-for="(player, i) in players"
      :key="i"
      :index="i"
      :player="player"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import playerCard from '../components/playerCard.vue'
export default {
  components: { playerCard },
  name: 'Play',
  computed: {
    ...mapState([
      'players'
    ])
  },
  data () {
    return {
      question: '',
      angka: ''
    }
  },
  methods: {
    getPlayer () {
      this.$store.dispatch('getPlayer')
    },
    tambah () {
      this.$socket.emit('tambah', this.$route.params.id)
    }
  },
  created () {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    this.question = alphabet[Math.random() * 26 | 0]
    this.angka = Math.random() * 10 | 0
    window.addEventListener('keydown', (e) => {
      const newIndex = alphabet.indexOf(this.question) + this.angka > 25 ? alphabet.indexOf(this.question) + this.angka - 26 : alphabet.indexOf(this.question) + this.angka
      if (e.key === alphabet[newIndex]) {
        this.$socket.emit('tambah', this.$route.params.id)
        this.question = alphabet[Math.random() * 26 | 0]
        this.angka = Math.random() * 10 | 0
      }
    })
    this.$socket.emit('getPlayers')
  }
}
</script>

<style scoped>
  input{
    text-align: center;
    font-size: 4em;
  }
</style>
