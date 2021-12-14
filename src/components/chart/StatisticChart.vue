<template>
  <div class="small">
    <line-chart
        :chart-data ="chartData" :options = "options"></line-chart>
  </div>

</template>

<script>

import LineChart from "@/components/chart/Chart";


export default {
  name: "StatisticChart",
  components: {LineChart},

  props: {
    chartData: [],
    options:[],

  },

  mounted() {


  },

  methods: {


  }



}
</script>

<style scoped>
.small {
  max-width: 800px;
  max-height: 100vh;
  margin: 15px auto;
}
</style>