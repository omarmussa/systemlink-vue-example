<!--
This vue is used to select the DropDownFilter and drives the rest of the application data view
 -->
<template>
  <div>
    <b-col lg="3">
      <b-form-select v-model="selected" :options="options" name="DropDownFilter"></b-form-select>
    </b-col>
  </div>
</template>

<script>

  export default {
    name: "dropdown",
    data() {
      return {
        selected: '*',
        options: [
          {value: '*', text: 'All Results'},
          {value: 'true', text: 'Approved Results'},
          {value: 'false', text: 'Unreviewed Results'}
        ]
      }
    },
    created(){
      this.$emit("inputData", this.selected);
    },
    watch: {
      selected: function(){
        this.$emit("inputData", this.selected);
      }
    }
  }
</script>
