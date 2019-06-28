<template>
  <div class="landing">
    <div class="nes-container with-title is-centered" id="nes-container">
      <h1 class="title">Snake and Ladder</h1>
      <h2>Welcome to the Snake and ladder. </h2>
      <br><br>
      
      <section>
        <button
          type="button"
          class="nes-btn is-primary"
          onclick="document.getElementById('dialog-default').showModal();"
        >Start Game !</button>
        <dialog class="nes-dialog" id="dialog-default">
          <form method="dialog">
            <div class="nes-field">
              <label for="name_field">Introduce yourself. </label>
              <input type="text" id="name_field" class="nes-input" v-model="username">
            </div>
            <menu class="dialog-menu">
              <button class="nes-btn">Cancel</button>
              <button class="nes-btn is-primary" @click="login">Confirm</button>
            </menu>
          </form>
        </dialog>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "landing",
  data() {
    return {
      username: ""
    };
  },
  methods: {
    login() {
      if (this.username !== "") {
        this.$store.commit("login", true);
        localStorage.setItem("username", this.username);
        this.$router.push("/home");
      }
    }
  }
};
</script>

<style>
h1.title{
    font-size: 20px;
}
.landing{
  margin-top: 50px;
}
p#nes-container{
    color: rgb(55, 53, 53);
}
#nes-container {
  margin: 100px auto;
  width: 85%;
  background: linear-gradient(rgba(239, 239, 239, 0.7), rgba(239,239,239,0.7))
}
</style>
