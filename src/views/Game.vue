<template>
  <div>
    <h3 v-if="hasWon" style="color:white;margin-top:0px"><br>{{ players[currentPlayerTurn].name }} has won!</h3>
    <button style="margin-top:720px;" v-if="button1 == true && hasWon == false" @click="rollDice" type="button">Roll Dice</button>
    <div style="display:flex;justify-content:center">
      
    <button style="margin-top:15px;margin-right:10px" @click="playAgain" type="button" v-if="hasWon">Play Again!</button>
        <button style="margin-top:15px;" @click="exitGame" type="button" v-if="hasWon">Exit</button>
</div>


    <div style="margin-left:29%;margin-top:5%" id="board"></div>

    <canvas
      style="margin-left:29%;border:5px solid black;margin-top:5%"
      id="canvas"
      ref="canvas"
      width="483"
      height="540"
    ></canvas>
    <!-- <div style="margin-left:29%">
    <img src="http://pluspng.com/img-png/png-snakes-and-ladders-free-online-snakes-and-ladders-383.png" style="position:absolute;width:150px;right:10px">
    </div> -->
  </div>
</template>
<script>
import db from "@/firestore/db.js";
export default {
  name: "game",
  data() {
    return {
      button1: false,
      win: null,
      board: [],
      boardSize: 55,
      position: 0,
      hasWon: false,
      darkBox: false,
      currentPlayerTurn: 0,
      width: 9,
      height: 9,
      players: [],
      ladders: [
        { start: 6, end: 25 },
        { start: 58, end: 42 },
        { start: 13, end: 40 },
        { start: 66, end: 19 },
        { start: 70, end: 83 }
      ]
    };
  },
  watch: {},
  components: {},
  methods: {
    exitGame(){
      console.log('exitttt')
                  this.$router.push("/home")
    },
    playAgain(){
        let temp = [];
        this.players.forEach(player => {
          player.position = 0;
          temp.push(player);
        });
        this.hasWon = false
        this.players = temp;
              db.collection("room")
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          let newRoom = {
            name: doc.data().name,
            players: this.players,
            turn: this.currentPlayerTurn
          };
          return db
            .collection("room")
            .doc(this.$route.params.id)
            .set(
              {
                ...newRoom
              },
              { merge: true }
            );
        })
        .then(result => {

          this.button1 = false;
          this.createBoard();

        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    rollDice() {
      // var sound = new Howl({
      //     src: './fly.mp3',
      //     volume: 100,
      // });
      // sound.play();
      // console.log(sound)
      if (this.hasWon) {
        return;
      }

      let roll = Math.floor(Math.random() * 5 + 1);

      // console.log(this.players[this.currentPlayerTurn].name + ", You rolled", roll);
      //keeping track of rolls
      //incrementing the position after the roll using the dice value

      // if (currentPlayer.position + roll > 9 && currentPlayer.position + roll < 20){
      // currentPlayer.position += roll;
      // }
      console.log(this.players[this.currentPlayerTurn].position, "before");
      this.players[this.currentPlayerTurn].position += roll;
      console.log(this.players[this.currentPlayerTurn].position, "after");

      // console.log(this.players[this.currentPlayerTurn].position, 'current pos')

      this.ladders.forEach(ladder => {
        //looping through each ladder
        //if the starting of the ladder is equal to player's position
        if (ladder.start === this.players[this.currentPlayerTurn].position) {
          this.players[this.currentPlayerTurn].position = ladder.end;
          // console.log("yay"); //print this on the screen
          //step to the end of the ladder
        }
      });
      console.log(this.players[this.currentPlayerTurn].position, "ladders");

      //if the curretPlayer has the last position
      if (this.players[this.currentPlayerTurn].position > 89) {
        this.players[this.currentPlayerTurn].position = 89;

        // console.log(this.players[this.currentPlayerTurn].name + " has won!");
        this.hasWon = true; //hasWon is true = player wins
      }

      // let diff = 0;
      // //if it is any other position
      // if (this.players[this.currentPlayerTurn].position === this.position) {
      //   diff = this.players[this.currentPlayerTurn].position - this.position;
      //   this.players[this.currentPlayerTurn].position = this.position - diff;
      // }

      this.currentPlayerTurn++;
      if (this.currentPlayerTurn >= this.players.length) {
        this.currentPlayerTurn = 0;
      }
      console.log(this.players, "wash");

      db.collection("room")
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          let newRoom = {
            name: doc.data().name,
            players: this.players,
            turn: this.currentPlayerTurn
          };
          return db
            .collection("room")
            .doc(this.$route.params.id)
            .set(
              {
                ...newRoom
              },
              { merge: true }
            );
        })
        .then(result => {
          this.button1 = false;
          this.createBoard();
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    drawBoard() {
      for (var y = this.height; y >= 0; y--) {
        let row = [];

        this.board.push(row);
        for (var x = 0; x < this.width; x++) {
          row.push({
            x,
            y,
            occupied: null,
            position: this.position,
            color: this.darkBox ? "#009900" : "#ecd9c6"
          });
          this.darkBox = !this.darkBox; //next one is not dark box
          this.position++;
        }
      }
      this.createBoard();
    },
    createBoard() {
      let boardOnScreen = ``;
      this.board.forEach(row => {
        row.forEach(square => {
          boardOnScreen += `<div class=square style="top:${square.y *
            this.boardSize}px; left:${square.x *
            this.boardSize}px; background-color:${square.color}"></div>`;
        });
      });

      this.players.forEach((player, index) => {
        let square = null;
        this.board.forEach(row => {
          row.forEach(square => {
            if (player.position > 89) {
              this.hasWon = true;
              // console.log("wonnnnn");
            }
            if (square.position === player.position) {
              //   boardOnScreen += `<div class=player style="top:${square.y *
              //     this.boardSize +
              //     1 +
              //     index * 5}px; left:${square.x * this.boardSize +
              //     5}px;background-color:${player.color}"></div>`;

              boardOnScreen += `<img src="${
                player.image
              }" style="top:${square.y * this.boardSize +
                5}px; left:${square.x * this.boardSize +
                5}px;width:40px;height:40px;  position: absolute;"></img>`;
            }
          });
        });
      });

      this.ladders.forEach(ladder => {
        //let start = 0;
        let startPos = { x: 0, y: 0 };
        let endPos = { x: 0, y: 0 };

        this.board.forEach(row => {
          row.forEach(square => {
            if (square.position === ladder.start) {
              startPos.x = square.x * this.boardSize;
              startPos.y = square.y * this.boardSize;
            }

            if (square.position === ladder.end) {
              endPos.x = square.x * this.boardSize;
              endPos.y = square.y * this.boardSize;
            }
          });
        });

        let isLadder = ladder.end > ladder.start;

        //if it is a ladder then it is white, otherwise snake is green
        this.drawLine({ color: isLadder ? "white" : "red", startPos, endPos });
      });
      //get everything on the page

      document.getElementById("board").innerHTML = boardOnScreen;
    },
    drawLine({ color, startPos, endPos }) {
      var canvas = document.getElementById("canvas");
      // console.log(canvas)
      // this.$refs.canvas.getContext('2d')
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(startPos.x + 35, startPos.y + 20);
      ctx.lineTo(endPos.x + 25, endPos.y + 25);
      ctx.lineWidth = 15;
      ctx.strokeStyle = color;
      ctx.stroke();
      
    }
  },
  // created() {},
  mounted() {
    // console.log(this.$route.params.id);
    db.collection("room")
      .doc(this.$route.params.id)
      .onSnapshot(doc => {
        let arr = [
          "https://www.stickpng.com/assets/thumbs/584c69846e7d5809d2fa6366.png",
          "https://www.stickpng.com/assets/thumbs/584c69746e7d5809d2fa6364.png",
          "http://pluspng.com/img-png/angry-birds-png-download-png-1024px-1024.png"
        ];
        // console.log(doc.data());
        // console.log(localStorage.username);
        let temp = [];
        this.players = doc.data().players;
        this.players.forEach((player, index) => {
          // console.log('my index', index)
          // console.log('===')
          // console.log(player.name, 'name')
          // console.log(localStorage.username, 'username')
          // console.log(doc.data().turn, 'turn')
          console.log(this.button1, "___");
          if (
            player.name == localStorage.username &&
            doc.data().turn == index
          ) {
            console.log("trueee");
            this.button1 = true;
          }
          player.image = arr[index];
          temp.push(player);
        });
        this.players = temp;
        // console.log(this.players)
        this.currentPlayerTurn = doc.data().turn;
        // console.log(this.players[0].position);
        // console.log(this.players[1].position);

        // doc.data().players.forEach(x => {
        //   this.players.push({
        //     name: x.name,
        //     position: x.position,
        //     color: "red"
        //   });
        // });
        this.drawBoard();

        // let newRoom = {
        //   name: doc.data().name,
        //   players: doc.data().players,
        // }
        // newRoom.players.push({
        //   name: localStorage.getItem('username'),
        //   position: 0
        // })
        // return db.collection('room').doc(this.$route.params.id).set({
        //   ...newRoom
        // }, { merge: true })
      })
      // .then(doc => {
      // console.log(doc)
      // })
      .catch(err => {
        // console.log(err);
      });
  }
};
</script>

<style>
#canvas {
  position: absolute;
  top: 50px;
  left: 50px;
}

#board {
  position: absolute;
  top: 50px;
  left: 50px;
}
.square {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: sandybrown;
  border: 2px solid;
}
.player {
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid;
}
</style>