<template>
  <div>
    <div>
        <b-modal ref="my-modal" hide-footer title="How to Play">
            <div class="d-block">
                <p>1. blablablabla</p>
                <p>2. blablablabla</p>
            </div>
            <b-button class="mt-3" variant="outline-primary" block @click="hideModal">Close</b-button>
        </b-modal>
    </div>
    <b-container class="mb-3 mt-3">
        <b-row>
            <b-col md="12">
                <b-card title="Huruf apakah ini?" class="text-center border-light shadow">
                  <!-- <input type="text" v-model="question" class="col-3"> + <input type="text" v-model="angka" class="col-3"> -->
                    <h1>
                        {{question}} + {{angka}}
                    </h1>
                    <b-button variant="primary" disabled v-if="players.length<2">Please wait</b-button>
                    <b-button variant="primary" v-if="players.length>=2" @click.prevent="triggerStart">Start</b-button>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
    <b-container class="mt-5">
      <b-row>
        <player-card
          v-for="(player, i) in players"
          :key="i"
          :index="i"
          :player="player"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import playerCard from '../components/playerCard.vue'
import Swal from 'sweetalert2'

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
    },
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    triggerStart () {
      this.$socket.emit('triggerStart')
    }
  },
  sockets: {
    getReady () {
      console.log('Get ready')
    },
    start () {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      this.question = alphabet[Math.random() * 26 | 0]
      this.angka = Math.random() * 10 | 0
      window.addEventListener('keydown', (e) => {
        const newIndex = alphabet.indexOf(this.question) + this.angka > 25 ? alphabet.indexOf(this.question) + this.angka - 26 : alphabet.indexOf(this.question) + this.angka
        if (e.key === alphabet[newIndex].toLowerCase() || e.key === alphabet[newIndex].toUpperCase()) {
          this.$socket.emit('tambah', this.$route.params.id)
          this.question = alphabet[Math.random() * 26 | 0]
          this.angka = Math.random() * 10 | 0
        }
      })
      this.$socket.emit('getPlayers')
    },
    end (payload) {
      Swal.fire({
        title: 'Game over!',
        icon: 'success',
        text: 'The winner is ' + payload.winner
      })
      this.$router.push('/')
    }
  },
  created () {
  },
  mounted () {
    this.showModal()
  }
}
</script>

<style scoped>
  input{
    text-align: center;
    font-size: 4em;
  }
</style>
