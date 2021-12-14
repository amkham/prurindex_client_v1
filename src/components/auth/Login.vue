<template>
  <div class="container form-container" >
  <form class="container justify-content-lg-start" style="max-width: 400px" method="post" @submit.prevent = login()>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model = "user.email">
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.pass">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
    </div>
    <button class="btn btn-primary" type="submit">Войти</button>
  </form>
  </div>
</template>

<script>
import User from "@/model/user";
import AuthService from "@/services/auth-service";

export default {
  name: "login",
  data()
  {
    return {
      user: new User('', ''),
    }
  },

  methods:
  {
    login()
    {
      AuthService.login(this.user).then(() => {
        window.location.reload();
      }).catch(()=> {
        alert("Неверный логин или пароль");
      });
    }
  }
}
</script>

<style scoped>

.form-container
{
  padding-top: 50px;
}
</style>