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
                    <h1>
                        {{question}} + {{angka}}
                    </h1>
                    <div v-if="!hasStarted">
                      <b-button variant="primary" disabled v-if="players.length<2">Please wait</b-button>
                      <b-button variant="primary" v-if="players.length>=2" @click.prevent="triggerStart">Start</b-button>
                    </div>
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
      'players', 'hasStarted'
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
    notPlayer () {
      localStorage.clear()
      this.$router.push('/')
    },
    getReady () {
      console.log('Get ready')
      let timerInterval
      Swal.fire({
        title: 'Get ready!',
        html: 'Starting in <b></b> milliseconds.',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    },
    start () {
      this.$store.commit('updateStarted', true)
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      this.question = alphabet[Math.random() * 26 | 0]
      this.angka = Math.random() * 10 | 0
      window.addEventListener('keydown', (e) => {
        const newIndex = alphabet.indexOf(this.question) + this.angka > 25 ? alphabet.indexOf(this.question) + this.angka - 26 : alphabet.indexOf(this.question) + this.angka
        if (e.key === alphabet[newIndex].toLowerCase() || e.key === alphabet[newIndex].toUpperCase()) {
          this.$socket.emit('tambah', localStorage.name)
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
      this.$store.commit('updateStarted', false)
      this.$router.push('/')
    }
  },
  created () {
    this.$socket.emit('cekPlayer', localStorage.name)
  },
  mounted () {
    this.$socket.emit('getPlayers')
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
