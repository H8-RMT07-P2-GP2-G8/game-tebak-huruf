<template>
    <b-col md="6">
      <b-card no-body class="overflow-hidden h-50 border-light shadow" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6" v-if="selectedImage">
            <b-card-img :src="selectedImage" alt="Image"
              class="rounded-0 embed-responsive-item pb-5" style="max-width: 14rem; max-height: 14rem;">
              </b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body :title="player.name" class="embed-responsive-item">
              <b-card-text class="embed-responsive-item">
                Score: {{player.score}}
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
</template>

<script>
export default {
  props: ['player', 'index'],
  data () {
    return {
      images: [
        'https://i.imgur.com/wGRcL3J.png',
        'https://i.imgur.com/Oktnvn9.png',
        'https://i.imgur.com/JRBNmFA.png'
      ]
    }
  },
  methods: {
    randomImage (images) {
      return images[Math.floor(Math.random() * images.length)]
    }
  },
  created () {
    console.log(this.player.score)
    if (this.player.score === 10) console.log('done')
    this.selectedImage = this.randomImage(this.images)
  },
  sockets: {
  }
}
</script>

<style>

</style>
