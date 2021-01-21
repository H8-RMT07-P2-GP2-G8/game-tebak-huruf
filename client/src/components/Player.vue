<template>
    <b-container>
        <b-row>
            <b-col md="6">
                <b-card no-body class="overflow-hidden h-50 border-light shadow" style="max-width: 540px;">
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image"
                                class="rounded-0 embed-responsive-item"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body title="Player Name" class="embed-responsive-item">
                                <b-card-text class="embed-responsive-item">
                                    Score: 0
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>

            <b-col md="6">
                <b-card no-body class="overflow-hidden h-50 border-light shadow" style="max-width: 540px;">
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image"
                                class="rounded-0 embed-responsive-item"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body title="Player Name">
                                <b-card-text>
                                    Score: 0
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {

}
</script>

<style>

</style>