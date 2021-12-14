<template>
  <div id="app" >

    <Main v-if="authorization">

    </Main>

    <Login v-else></Login>


  </div>
</template>

<script>

import jwt_decode from "jwt-decode";
import AuthService from "@/services/auth-service";
import Login from "@/components/auth/Login";
import Main from "@/components/Main";

export default {
  name: 'App',
  components: {
    Login, Main
  },
  data()
  {
    return {
      authorization: false
    }
  },

  mounted() {
    let token = jwt_decode(localStorage.getItem('token'));
    let r_token = jwt_decode(localStorage.getItem('r-token'));
    let date = new Date().getTime()/1000;
    if (token.exp > date) {
      this.authorization = true;
    }
    else {
      if(r_token.exp < date)
      {
        AuthService.refresh();
        this.authorization = true;
      }
      else {
        AuthService.logout();
        this.authorization = false;
      }


    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  box-sizing: border-box;
}
</style>
