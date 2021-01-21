<template>
  <!-- <div class="row d-flex justify-content-center"> -->
    <b-col md="6">
      <b-card no-body class="overflow-hidden h-50 border-light shadow" style="max-width: 540px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image"
              class="rounded-0 embed-responsive-item"></b-card-img>
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
  <!-- </div> -->

  <!-- <div class="row d-flex justify-content-center">
    <div class="col-3">
      <div class="card mb-2">
        <div>{{ player.name }}</div>
        <div>{{ player.score }}</div>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  props: ['player', 'index'],
  data () {
    return {

    }
  },
  created () {
    console.log(this.player.score)
    if (this.player.score === 10) console.log('done')
  },
  sockets: {
  }
}
</script>

<style>

</style>
