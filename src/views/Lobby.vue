<template>
  <div class="about">
    <h1>This is an about page</h1>

  </div>
</template>
<script>
import db from '@/firestore/db.js'
// @ is an alias to /src
export default {
  name: 'lobby',
  components: {
  },
  data () {
    return {

    }
  },
  methods: {},
  created () {
    console.log(this.$route.params.id)
          db.collection('room').doc(this.$route.params.id).get()
        .then(doc => {
          console.log(doc.data())
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
        //   console.log(doc)
        // })
        .catch(err => {
          console.log(err)
        })
  }
}
</script>