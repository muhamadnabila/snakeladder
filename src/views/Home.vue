<template>
  <div class="home">
    <div v-if="$store.state.isLogin == false">
      <inputName/>
    </div>
    <div v-if="$store.state.isLogin" class="main">

      <div class="theWorld">
        <br>
        <br>
        <br>
        <br>
        <br>
        
              <p class="titleHome">World Stage</p>
        <!-- <waitingRoom /> -->
        <waitingRoom
          v-for="(room,index) in roomList"
          :key="index"
          v-bind:send="room"
          v-on:join="joinRoom"
        />
      </div>
      <!-- <addRoom /> -->
      <div class="addrooms" style="margin-top:30px">
        <div class="nes-container is-rounded is-dark" id="addRooms">
          <h2 id="addRoomCardName" @click="createRoom">Create a room to play</h2>
          <div class="buttonRooms">
            <!-- <button type="button" class="nes-btn is-warning" id="addBackButton">Create Room</button> -->
            <section>
              <button
                type="button"
                class="nes-btn is-warning"
                id="addBackButton"
                onclick="document.getElementById('dialog-dark-rounded').showModal();"
              >Create Room</button>
              <dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded">
                <form method="dialog">
                  <div class="nes-field">
                    <label for="name_field">Name a Room</label>
                    <input type="text" id="name_field" class="nes-input" v-model="roomName">
                  </div>
                  <menu class="dialog-menu">
                    <button class="nes-btn">Cancel</button>
                    <button class="nes-btn is-primary" @click="createRoom">Create</button>
                  </menu>
                </form>
              </dialog>
            </section>
          </div>
        </div>
        <!-- {{room}} -->
      </div>
      <!-- <div class="create-room">
        <form @submit.prevent="createRoom" action="">
          <h1>Create Room</h1>
          <br>
          <label for="">Room Name</label>
          <br>
          <input v-model="roomName" type="text">
          <br>
          <button type="submite">Create</button>
        </form>
      </div>-->
      <!-- <div class="list-room">
        <ul>
          <li v-for="(room, index) in roomList" :key="index">
            <h2>{{ room.name }}</h2>
            <button @click="joinRoom(room.idRoom)">Join</button>
          </li>
        </ul>
      </div>-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import db from "@/firestore/db.js";
import inputName from "../components/nameInput";
import waitingRoom from "../components/waitingRoom";
import addRoom from "../components/addRoom";
import { constants } from "crypto";

export default {
  name: "home",
  components: {
    inputName,
    waitingRoom,
    addRoom
  },
  data() {
    return {
      username: "",
      roomName: "",
      roomList: []
    };
  },
  methods: {
    joinRoom(idRoom) {
      console.log("inside join room");
      db.collection("room")
        .doc(idRoom)
        .get()
        .then(doc => {
          let newRoom = {
            name: doc.data().name,
            players: doc.data().players,
            turn: 0,
          }
          newRoom.players.push({
            name: localStorage.getItem("username"),
            position: 0
          });
          return db
            .collection("room")
            .doc(idRoom)
            .set(
              {
                ...newRoom
              },
              { merge: true }
            );
        })
        .then(doc => {
          this.$router.push(`/lobby/${idRoom}`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      this.$store.commit('login',true)
      localStorage.setItem('username',this.username)
      console.log(this.username)
    },
    join() {
      // this.joinRoom()
      console.log("ketrigger");
    },
    createRoom () {
      let username = localStorage.getItem('username')
      db.collection("room").add({
        name: this.roomName,
        roomMaster: username,
        players : [{
          name: username,
          position: 0,
        }]
      })
      .then((docRef) => {
        this.$router.push(`/lobby/${docRef.id}`)
        console.log('berhasil')
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) =>{
          console.log("error");
          console.error("Error adding document: ", error);
        });
    }
  },
  created() {
    if (localStorage.getItem("username")) {
      this.$store.commit("login", true);
    } else {
      this.$store.commit("login", false);
    }
    db.collection("room").onSnapshot(querySnapshot => {
      let rooms = [];
      querySnapshot.forEach(doc => {
        let idRoom = doc.id;
        rooms.push({ ...doc.data(), ...{ idRoom } });
      });
      this.roomList = rooms;
    });
  }
};
</script>

<style>
.home {
  margin-top: -100px;
}
.titleHome {
  color: whitesmoke;
  font-size: 50px;
}
.theWorld {
  /* display : flex; */
  margin-top: 50px;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  height: auto;
}
.rooms {
  width: 300px;
  height: 250px;
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
.nes-container {
  height: 250px;
}
h2#roomCardName {
  max-width: 300px;
  height: auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
