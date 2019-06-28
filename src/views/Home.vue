<template>
  <div class="home">
    <div v-if="$store.state.isLogin == false">
      <label for="">Your Name</label>
      <br>
      <input v-model="username" type="text">
      <button @click="login">Submit</button>
    </div>
    <div v-if="$store.state.isLogin" class="main">
      <h1>Home</h1>
      <div class="create-room">
        <form @submit.prevent="createRoom" action="">
          <h1>Create Room</h1>
          <br>
          <label for="">Room Name</label>
          <br>
          <input v-model="roomName" type="text">
          <br>
          <button type="submite">Create</button>
        </form>
      </div>
      <div class="list-room">
        <ul>
          <li v-for="(room, index) in roomList" :key="index">
              <h2>
                {{ room.name }}
              </h2>
              <button @click="joinRoom(room.idRoom)" >Join</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import db from '@/firestore/db.js'
import { constants } from 'crypto';

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      username: '',
      roomName: '',
      roomList: []
    }
  },
  methods: {
    joinRoom (idRoom) {
      db.collection('room').doc(idRoom).get()
        .then(doc => {
          let newRoom = {
            name: doc.data().name,
            players: doc.data().players,
            turn: 0,
          }
          newRoom.players.push({
            name: localStorage.getItem('username'),
            position: 0
          })
          return db.collection('room').doc(idRoom).set({
            ...newRoom
          }, { merge: true })
        })
        .then(doc => {
          this.$router.push(`/lobby/${idRoom}`)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login() {
      this.$store.commit('login',true)
      localStorage.setItem('username',this.username)
      console.log(this.username)
    },
    createRoom () {
      let username = localStorage.getItem('username')
      db.collection("room").add({
        name: this.roomName,
        roomMater: username,
        players : [{
          name: username,
          position: 0,
        }]
      })
      .then(function(docRef) {
        console.log('berhasil')
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.log('error')
          console.error("Error adding document: ", error);
      })
    }
  },
  created () {
    if(localStorage.getItem('username')){
      this.$store.commit('login',true)
    }else {
      this.$store.commit('login',false)
    }
    db.collection("room")
    .onSnapshot((querySnapshot) => {
          let rooms = []
        querySnapshot.forEach((doc) => {
            let idRoom = doc.id
            rooms.push({ ...doc.data(), ...{idRoom} })
        });
        this.roomList = rooms
    });
  }
}
</script>
