<template>
  <div class="home">
   <button>tekaan woi</button>
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
    HelloWorld
  },
  methods: {
  },
  created () {
    console.log('masuk sini')
    db.collection("room").add({
      name: "Tokyo",
      country: "Japan"
    })
    .then(function(docRef) {
      console.log('berhasil')
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.log('error')
        console.error("Error adding document: ", error);
    });
    var docRef = db.collection("room")
    docRef.get().then(function(doc) {
      doc.forEach(element => {
        console.log(element.data())
      });
      // console.log("Document data:", doc.data());
    if (doc.exists) {
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  }
}
</script>
