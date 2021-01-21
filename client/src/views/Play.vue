<template>
  <div class="play">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <form @submit.prevent="join">
      <input
        type="text"
        id="username"
        v-model="name"
        placeholder="name"
      >
      <button type="submit" value="join">join</button>
    </form> -->
    <!-- How to Play Modal -->
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
                <b-card title="Angka ke berapakah ini?" class="text-center border-light shadow">
                    <h1>
                        A
                    </h1>

                    <b-button variant="primary">Ready</b-button>
                </b-card>
            </b-col>
        </b-row>
    </b-container>

    <Player/>
  </div>
</template>

<script>
// @ is an alias to /src
import Player from '../components/Player'

export default {
  name: 'Home',
  components: {
    Player
  },
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  },
  mounted () {
    this.showModal()
  }
}
</script>
