<template>
  <div>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Prurindex</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Статистика</a>
          </li>
        </ul>
      </div>
      <a v-on:click="logout()" style="cursor: pointer; margin: 5px">logout</a>
    </nav>

  </header>
  <div class="container" style="display: flex; flex-wrap: wrap">
    <div class="setting-container">

      <div  class="select-list-container">
        <select class="form-select form-select-sm w-75" v-model = "selectedItemId">
          <option class="p-5" v-for="i in user_list"  v-bind:key="i.id" :value="i.id">
            {{i.info.surname + " " + i.info.firstname + " " + i.info.patronymic }}
          </option>
        </select>
      </div>
      <div class="ratio-btn-container">
        <input type="radio" id="ITCHING" value="0" v-model="picked">
        <label for="ITCHING">Степень зуда</label>
        <br>
        <input type="radio" id="EAT" value="1" v-model="picked">
        <label for="EAT">Аппетит</label>
        <br>
        <input type="radio" id="MOOD" value="2" v-model="picked">
        <label for="MOOD">Настроение</label>
        <br>
        <input type="radio" id="DREAM" value="3" v-model="picked">
        <label for="DREAM">Сон</label>
        <br>
      </div>

      <button class="btn btn-primary" v-on:click="getStatistic()">Отобразить</button>
    </div>


    <div class="chart-container" v-if="statistic_loaded">
      <statistic-chart :chart-data = "data_collection"/>
    </div>
  </div>
  </div>
</template>

<script>

import StatisticService from '@/services/statistic-service'
import StatisticChart from "@/components/chart/StatisticChart";
import AuthService from "@/services/auth-service";
export default {
  name: "Main",
  components: {StatisticChart},

  data()
  {
    return {
     token: localStorage.getItem('token'),

      selectedItemId: 0,
      picked: 0,

      user_list: [],

      data_collection: {
        labels:[],
        datasets:[]
      },
      chart_options: {},
      statistic_loaded: false

    }
  },
 async mounted() {

    await StatisticService.getUsers().then(r => {
      this.user_list = r.data;
    })


  },
  methods: {

    getStatistic()
    {
      this.statistic_loaded = false;
      this.data_collection.labels = [];
      this.data_collection.datasets = [];

      StatisticService.getStatisticForUser(this.selectedItemId, this.picked).then(r=>{
        let dates = [];
        let grades = [];
        let type = '';
        r.data.forEach(s=> {
          dates.push(s.date);
          grades.push(s.grade);
          type = s.type;
        });
        this.data_collection.labels = dates;
        this.data_collection.datasets.push({
          data: grades,
          label: type,
          backgroundColor: '#f87979',

        });
        this.statistic_loaded = true;
      })
    },

    logout()
    {
      AuthService.logout();
    }
  }

}
</script>

<style scoped>

.container
{
  justify-content: space-between;
}

.chart-container
{
  width: 870px;
}

.setting-container
{
  width: 400px;
  padding: 30px;
}

.select-list-container, .ratio-btn-container
{
  margin-bottom: 15px;
}

label
{
  margin-left: 10px;
}

nav{
  padding-left: 30px;
  padding-right: 30px;
}

</style>