<template>
<div style="margin-top:-50px">
    <div class="col-3">
        <h3>{{ playerName }}</h3>
        <img :src="[playerIcon]" alt="" srcset="" style="height:180px;width:auto;margin-right:20px;border-radius:5px;border:4px solid black">
    </div>
</div>
</template>

<script>
export default {
    props : ['playerName', 'playerIndex'],
    computed: {
        playerIcon () {
            if(this.playerIndex == 0) {
                return 'https://thumbs.gfycat.com/AdorableImmaterialDesertpupfish-small.gif'

            }else if (this.playerIndex == 1){
                return 'http://bestanimations.com/Animals/Reptiles/snakes/green-snake-animation-3.gif   '
            }else {
                return 'https://gifimage.net/wp-content/uploads/2018/06/ular-gif-4.gif'
            }
        }
    }
}
</script>

<style>
h3{
  font-family: 'Press Start 2P', cursive;
}
</style>
