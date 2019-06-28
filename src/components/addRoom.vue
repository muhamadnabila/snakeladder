<template>
  <!-- <div class="theWorld"> -->
    <div class="addrooms">
      <div class="nes-container is-rounded is-dark" id="addRooms">
        <h2 id="addRoomCardName"> Create a room to play </h2>
        <div class="buttonRooms">
          <button type="button" class="nes-btn is-warning" id="addBackButton" @click="joinParent" >Create Room</button>
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
.addrooms {
  width: 400px;
  height: 150px;
  display: inline-block;
  margin: 10px auto;
}
#addRooms{
    height: 220px;
    margin-top: -10px;
}

#addBackButton{
  width: 200px;
}
.nes-container{
    height: 250px;
}
h2#addRoomCardName{
    max-width: 300px;
    height: 50px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    margin: 15px;
}
</style>
