<template>
  <!-- <div class="theWorld"> -->
    <div class="rooms">
      <div class="nes-container is-rounded is-dark" id="rooms">
        <h2 id="roomCardName"> {{room.name}} </h2>
        <div class="buttonRooms">
          <button type="button" class="nes-btn is-warning" id="backButton" @click="joinParent" >Join</button>
          <button type="button" class="nes-btn is-error" id="joinButton" >Delete</button>
        </div>
      </div>
      <!-- {{room}} -->
    </div>
  <!-- </div> -->
</template>

<script>
export default {
    data(){
        return {
            room: '' 
        }
    },
    props: ['send'],
    methods: {
        joinParent() {
            console.log('ready to emmit')
            this.$emit('join',this.room.idRoom)
        }
    },
    created(){
        this.room = this.send
    }
};
</script>

<style>
.rooms {
  width: 300px;
  height: 220px;
  display: inline-block;
  margin: 10px auto;
}
.nes-btn.is-warning {
  width: 120px;
  margin-left: -5px;
  margin-top: 40px;
  white-space: normal;
}

.nes-btn.is-error {
  width: 120px;
  margin-top: 40px;
}
.nes-container{
    height: 250px;
}
h2#roomCardName{
    max-width: 300px;
    height: auto;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
}
</style>
