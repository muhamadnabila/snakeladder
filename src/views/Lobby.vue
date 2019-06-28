
<template>
  <div>
    <h1>Lobby</h1>
    <div class="nes-container with-title is-centered">
      <p class="title">Players</p>
      <Player
        v-for="(player, index) in players"
        :key="index"
        :playerName="player"
        :playerIndex="index"
        class="col-3"
      ></Player>
    </div>
    <button @click="playGame" v-show="isMasterRoom" type="button" class="nes-btn is-primary">Play</button>
    <button v-show="!isMasterRoom" type="button" class="nes-btn is-disabled">Play</button>
    <div class="nes-container with-title chat">
      <p class="title">Chat Room</p>
      <section v-for="(text, index) in rooms.messages" :key="index" class="message-list">
        <section class="message -left">
          <i class="nes-bcrikko"></i>
          <div class="nes-balloon from-left">
            <p>{{text.message}}</p>
          </div>
        </section>
      </section>
    </div>
    <form @submit.prevent="sendMessage" action>
      <div class="nes-field">
        <label for="name_field">Your message</label>
        <input v-model="message" type="text" id="name_field" class="nes-input">
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firestore/db.js";
import Player from "@/components/Player.vue";
import { constants } from "crypto";
export default {
  components: {
    Player
  },
  data() {
    return {
      rooms: [],
      isMasterRoom: false,
      button: "is-disabled",
      message: ""
    };
  },
  created() {
    let username = localStorage.getItem("username");
    let idRoom = this.$route.params.id;
    db.collection("room")
      .doc(idRoom)
      .onSnapshot(doc => {
        this.rooms = doc.data();
        if (doc.data().roomMaster == username) {
          this.isMasterRoom = true;
        }
        if (doc.data().status == "Play") {
          this.$router.push(`/game/${this.$route.params.id}`);
        }
      });
  },
  computed: {
    players() {
      let players = [];
      if (this.rooms.players) {
        this.rooms.players.forEach(el => {
          players.push(el.name);
        });
        return players;
      }
    }
  },
  methods: {
    sendMessage() {
      let idRoom = this.$route.params.id;
      db.collection("room")
        .doc(idRoom)
        .get()
        .then(doc => {
          let newRoom = {
            name: doc.data().name,
            players: doc.data().players,
            status: "",
            messages: doc.data().messages || []
          };
          newRoom.messages.push({
            message: this.message,
            username: localStorage.getItem("username")
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
          this.message = "";
          document
            .querySelector(".nes-container.with-title.chat")
            .scrollTo(0, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    playGame() {
      let idRoom = this.$route.params.id;
      db.collection("room")
        .doc(idRoom)
        .get()
        .then(doc => {
          let newRoom = {
            name: doc.data().name,
            players: doc.data().players,
            status: "Play"
          };
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
          this.$router.push(`/lobby/${idRoom}`)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scopped>
.message-list {
  display: flex;
  justify-content: flex-start;
}
.chat {
  display: flex;
  flex-direction: column;
  height: 1000px;
  overflow: scroll;
}
.nes-field {
  width: 90vw;
  margin: 0 auto 20px;
}
button {
  width: 200px;
}
.container {
  width: 80vw;
  height: 80vh;
  background-color: rgb(255, 255, 255);
  margin-top: 10vh;
  -webkit-box-shadow: -1px 0px 6px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 0px 6px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 0px 6px 0px rgba(0, 0, 0, 0.75);
}
img {
  width: 20vw;
  height: 40vh;
}
p {
  font-family: "Press Start 2P", cursive;
}
h1 {
  font-family: "Press Start 2P", cursive;
}
.nes-container {
  display: flex;
  width: 90vw;
  margin: 50px auto;
}
</style>

