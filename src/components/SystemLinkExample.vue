<!--
This vue is an example component using a table to interact with SystemLink server TestMonitor HTTP API.
It uses "DropDownFilter" data to constrain the query results from SystemLink query ("DropDownFilter" is passed in via the "DropDown" component selection.
Goal of this demo is to demonstrate how to use the SystemLink filter to constrain server-side results and to update SystemLink results.  Not all of the SystemLink testmonitor query parameters are used (using minimal set).
Note that the table performance would be faster if the table's built-in filter were used on the client side (via searchfilter).
 -->
 
<template>
  <div>
    <b-container >
      <b-col lg="8" class="mb-2">
        <b-form-group
              name="SearchDropDownFilter"
              label=""
              label-cols-lg="6"
              label-align-sm="right"
              label-size="md"
              label-for="filterInput"
              class="mb-0"
            >
            <b-input-group size="sm">
              <b-form-input
                v-model="searchfilter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <!-- button to clear client side searchfilter of the table -->
                <b-button :disabled="!searchfilter" @click="searchfilter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
      </b-col>
    </b-container>
    <b-col>
    <b-row>
      <b-col lg="8" class="mb-2">
        <!-- table of results, server side filter via DropDownFilter and client side filter via searchfilter -->
        <b-table :items="items" :fields="fields" striped :filter="searchfilter" responsive="sm">
          <template v-slot:cell(testApproved)="row">
            <!-- checkbox is interactive and calls toggleApproved method on selected row whenever clicked by user -->
            <b-form-checkbox v-model="row.item.testApproved" @change="toggleApproved(row)"/>
          </template>
        </b-table>
      </b-col>
    </b-row>
    </b-col>
  </div>
</template>

<script>
  var responsedata = {};
  var querydata = {}
  export default {
    name : "SystemLinkExample",
    props: {
      msg : {
        type: String
      },
    },
    data() {
      return {
        fields: [
          //define table fields, columns are labelled by labels, associated data values are the keys which is how the data gets mapped in the queries below
          {
            key: 'testDate',
            label:'Test Date',
            sortable: true},
          {
            key: 'partNumber',
            label:'Part Number',
            sortable: true},
          {
            key: 'serialNumber',
            label:'Serial Number',
            sortable: true},
            {
            key: 'testStatus',
            label:'Test Pass',
            sortable: true},
            {
            key: 'testApproved',
            label:'Approved',
            sortable: true}
            ],
        items: [],
        searchfilter: null,
        DropDownFilter: null,
      }
    },
    watch:{
      msg: function() {
        //listen for changes to the DropDownFilter, refresh table whenever change event happens
        this.DropDownFilter = this.msg;
        this.refreshTable();
      }
    },
    methods:{
      toggleApproved(row){
        if (row.item.Approved){
          row.item.testApproved = false
        }
        else {
          //handles (null or false) to true transitions
          row.item.testApproved = true
        }
        querydata = {
          "results":[{
            "id":row.item.id,
            "properties": {
              "testApproved": row.item.testApproved,
            }
          }],
          "replace": false,
          "determineStatusFromSteps": false
        }
        this.$http.post('/nitestmonitor/v2/update-results',querydata).then(() => {
          this.refreshTable()
        })
      },
      refreshTable(){
        //Re-query server for reduced data set
        if ((this.DropDownFilter == null) || (this.DropDownFilter == "*")) {
          //nothing selected or "All Results" selected 
          querydata = {}
        }
        else {
          if (this.DropDownFilter == "false") {
            //"Unapproved" selected
            querydata = {
              'filter': 'properties.testApproved!="true"'
            }
          }
          else {
            //"Approved" selected
            querydata = {
              'filter': 'properties.testApproved=="true"'
            }
          }
        }
        var tests = []
        this.$http.post('/nitestmonitor/v2/query-results',querydata).then((response) => {
          //example console log for debugging in development mode - debug using F12 to get to developer console
          //window.console.log(response.data, this)
          responsedata = response.data
        })
        .catch(error => {
          //on error of any kind dump results and log error to console
          responsedata = {'results': []}
          window.console.log(error)
        })
        .finally(() => {
          responsedata.results.forEach(result => {
            var testApprovedExists = Object.prototype.hasOwnProperty.call(result.properties,'testApproved')
            if (testApprovedExists != true){
              result.properties.testApproved = false
            }
            tests.push({'id':result.id, 'testDate':result.startedAt, 'partNumber': result.partNumber, 'serialNumber': result.serialNumber,'testStatus':result.status.statusType, 'testApproved':result.properties.testApproved})//,'testApprovedDate':result.properties.testApprovedDate})
          });
          this.items = tests;
          //example comment for reviewing the JSON object that is consumed by the table
          //window.console.log(`this.items - ${JSON.stringify(this.items)}`);
        })
      }
    }
  }
</script>