<!-- Simple demo showing http queries within SystemLink from a Vue.js app-->
<template>
  <div>
    <b-col>
      <h1>Example Analysis Review</h1>
    </b-col>
    <DropDown @inputData="updateSelectedFilter"/>
    <SystemLinkExample :msg="DropDownFilter"/>
  </div>
</template>

<script>
  import DropDown from './components/DropDown.vue'
  import SystemLinkExample from './components/SystemLinkExample.vue'
  //register exampleSystemLinkPlugin components with Vue
  export default {
    name: "exampleSystemLinkPlugin",
    components: {
      DropDown,
      SystemLinkExample
    },
    data() {
      return {
        //define DropDownFilter variable that holds DropDown component results and passes them to SystemLinkExample component
        DropDownFilter: "",
      };
    },
    methods: {
      updateSelectedFilter(variable) {
        this.DropDownFilter = variable;
      }
    }
  }
</script>

<style>
#exampleSystemLinkPlugin {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
