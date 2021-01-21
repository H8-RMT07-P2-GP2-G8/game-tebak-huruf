<template>
  <div>
    <input type="text" v-model="question">
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
      question: ''
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
    window.addEventListener('keydown', (e) => {
      if (e.key === this.question.toString()) {
        this.$socket.emit('tambah', this.$route.params.id)
        this.question = alphabet[Math.random() * 26 | 0]
      }
    })
    this.question = alphabet[Math.random() * 26 | 0]
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
