<template>
  <!-- <div class="animated fadeIn"> -->
  <!-- Table -->

  <b-row>
      <h2>Hello {{sname}}  from the {{dept[0].Name}} department in {{dept[0].Location}}</h2>
    <b-row>
      <b-col lg="12">
        <c-table
          :table-data="projects"
          :fields="fields"
          :per-page="10"
          hover
          striped
          bordered
          small
          responsive
          caption=" My projects"
          fa="fa fa-flask"
          v-on:selected="rowSelected($event)"
          v-on:refresh="loadItems()"
          @click="clicked()"
        ></c-table>
        <div>
          <p>Select a project from above table then press the button to join the project</p>
          <b-button v-on:click="joinproject" variant="primary">join project</b-button>
          <br>
          <br>
        </div>
      </b-col>

      <b-row>
        <b-col lg="12">
          <c-table
            :table-data="managees"
            :fields="fieldsmanagee"
            :per-page="10"
            hover
            striped
            bordered
            small
            responsive
            caption=" People who I manage"
            fa="fa fa-flask"
            v-on:selected="rowSelected($event)"
            v-on:refresh="loadItems()"
            @click="clicked()"
          ></c-table>
        </b-col>
      </b-row>
    </b-row>

    <b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <label for="Name">First name</label>
            <b-form-input v-model="form.Name" type="text" id="fname" placeholder="Name"></b-form-input>
            <label for="lname">Description</label>
            <b-form-input
              v-model="form.Description"
              type="text"
              id="lname"
              placeholder="Description"
            ></b-form-input>
            <label for="Name">Department</label>
            <b-form-input v-model="form.Department" type="text" placeholder="Department ID"></b-form-input>
            <label for="lname">ProjectManager</label>
            <b-form-input v-model="form.ProjectManager" type="text" placeholder="ProjectManager ID"></b-form-input>
          </b-form-group>
          <b-button v-on:click="joinproject" variant="primary">Edit profile</b-button>
        </b-col>
      </b-row>
    </b-row>
  </b-row>
  <!-- </div> -->
</template>



<script>
import cTable from "./Table.vue";
import button from "@/views/buttons/StandardButtons.vue";

import axios from "axios";
import { globalState } from "../main.js";
export default {
  name: "Scientists",
  components: { cTable },

  props: {},
  data() {
    return {

      fields: {
        Name: {
          label: "Name",
          sortable: true
        },
        Description: {
          label: "Description ",
          sortable: true
        },
        Department: {
          label: "Department",
          sortable: true
        },
        "PManager First Name": {
          label: "Project Manager First Name ",
          sortable: true
        },
        "PManager Last Name": {
          label: "Project Manager Last Name ",
          sortable: true
        }
      },
      fieldsmanagee: {
        FirstName: {
          label: "First Name",
          sortable: true
        },
         LastName: {
          label: "Last Name",
          sortable: true
        },

      },
      dept: [],
      projectstojoin:"",
      form: {},
      sname: "",
      Sresource: "",
      filter: null,
      projects: [],
      managees: [],
      errors: [],
      selectMode: "Mode",
      selected: []
    };
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
    onsubmit1() {
      this.primaryModal = true;
    },
    joinproject() {},
    onsubmit2() {
      this.secondryModal = true;
    },
    rowSelected(items) {
      this.selected = items;
      this.$emit("scientistsSelected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async loadItems() {
      try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/my/department?scientistID=" +this.$id
        );

        this.dept = response.data;
      } catch (e) {
        this.errors.push(e);
      }
      try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/my/name?scientistID=" +this.$id
        );

        this.sname = response.data;
      } catch (e) {
        this.errors.push(e);
      }
    try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/my/managees?scientistID=" +this.$id
        );
  console.log(response.data);
        this.managees = response.data;
      } catch (e) {
        this.errors.push(e);
      }


       try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/my/projs?scientistID=" +this.$id
        );

        this.projects = response.data;
      } catch (e) {
        this.errors.push(e);
      }
    }
  },
  async created() {
    console.log("hi");
    this.loadItems();
    console.log("hi2");
  }
};
</script>


<style scoped>
h3 {
  text-align: center;
  font-weight: bold;
}
.table {
  display: block;
  max-height: 500px;
  /* width: 200px; */
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
</style>
