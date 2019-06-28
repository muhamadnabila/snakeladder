<template>
  <div class="nameInput">
    <h1>Snake and Ladder</h1>
    <div class="nes-field" id="nameInputComponent">
      <label for="name_field">Input name here</label>
      <input type="text" id="name_field" class="nes-input" v-model="username">
      <button type="button" class="nes-btn is-primary" @click="login">Primary</button>
    </div>
    <!-- <label for>Your Name</label>
    <br>
    <input v-model="username" type="text">
    <button @click="login">Submit</button> -->
  </div>
</template>

<script>
export default {
    dete(){
        return {
            username: ''
        }
    },
  methods: {
    login() {
      this.$store.commit("login", true);
      localStorage.setItem("username", this.username);
    }
  }
};
</script>

<style>
.nameInputComponent{
    width: 500px;
    display: flex;
}
#name_field{
    width: 400px;
    justify-content: center;
    margin: 10px auto;
}
</style>
