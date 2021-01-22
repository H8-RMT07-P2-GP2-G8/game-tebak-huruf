<template>
  <div>
    <div>
        <b-modal ref="my-modal" hide-footer title="How to Play" v-if="!hasStarted">
            <div class="d-block">
                <p class="my-4">1. Game baru bisa dimulai ketika jumlah player 2 atau lebih</p>
                <p class="my-4">2. Akan muncul sebuah huruf & angka, contoh:</p>
                <p class="pl-3">A + 5 maka jawaban yang benar adalah <b>G</b> karena 5 huruf setelah A adalah G</p>
                <p class="my-4">3. Tekan tombol keyboard untuk menjawab</p>
                <p class="my-4 pb-3">4. Pemain yang mencapai score 10 tercepat adalah pemenangnya</p>
            </div>
            <b-button class="mt-3" variant="outline-primary" block @click="hideModal">Close</b-button>
        </b-modal>
    </div>
    <b-container class="mb-3 mt-3">
        <b-row>
            <b-col md="12">
                <b-card title="Huruf apakah ini?" class="text-center border-light shadow">
                    <div v-if="hasStarted">
                    <h1>
                        {{question}} + {{angka}}
                    </h1>
                    <audio src="../assets/sound.mp3"></audio>
                    </div>
                    <div v-if="!hasStarted">
                      <b-button variant="primary" disabled v-if="players.length<2">Please wait</b-button>
                      <b-button variant="primary" v-if="players.length>=2 && !hasStarted" @click.prevent="triggerStart">Start</b-button>
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
      angka: '',
      isGameStarted: true
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
      if (!this.hasStarted) this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    triggerStart () {
      this.$socket.emit('triggerStart')
      this.playSound()
    },
    playSound () {
      console.log('<<<sound')
      var audio = new Audio('https://ia601403.us.archive.org/5/items/the-mole/The%20Mole.mp3')
      audio.play()
    }
  },
  sockets: {
    notPlayer () {
      localStorage.clear()
      this.$router.push('/')
    },
    getReady () {
      localStorage.setItem('hasStarted', 'true')
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
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created () {
    this.$socket.emit('cekPlayer', localStorage.name)
    this.$socket.emit('cekGameStatus')
    console.log('bankai')
    console.log(localStorage.hasStarted, '<< ini has Started')
    if (localStorage.hasStarted) {
    // if (this.hasStarted) {
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
    }
  },
  mounted () {
    this.$socket.emit('getPlayers')
    this.showModal()
    if (this.hasStarted) {
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
    }
  },
  updated () {
    // console.log(this.hasStarted, '<<<<')
    // if (this.hasStarted) {
    //   const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    //   this.question = alphabet[Math.random() * 26 | 0]
    //   this.angka = Math.random() * 10 | 0
    //   window.addEventListener('keydown', (e) => {
    //     const newIndex = alphabet.indexOf(this.question) + this.angka > 25 ? alphabet.indexOf(this.question) + this.angka - 26 : alphabet.indexOf(this.question) + this.angka
    //     if (e.key === alphabet[newIndex].toLowerCase() || e.key === alphabet[newIndex].toUpperCase()) {
    //       this.$socket.emit('tambah', localStorage.name)
    //       this.question = alphabet[Math.random() * 26 | 0]
    //       this.angka = Math.random() * 10 | 0
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
  input{
    text-align: center;
    font-size: 4em;
  }
</style>
