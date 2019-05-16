<template>
  <!-- <div class="animated fadeIn"> -->
  <!-- Table -->
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
        caption="Projects"
        fa="fa fa-flask"
        v-on:selected="rowSelected($event)"
        v-on:refresh="loadItems()"
        @click="clicked()"
      ></c-table>
    </b-col>
    <b-modal
      title="Results"
      class="modal-primary"
      v-model="primaryModal"
      @ok="primaryModal=false"
    >
      <ol>
        <li v-for="(result, $index) in results">{{result.Data}}</li>
      </ol>
    </b-modal>
    <b-modal title="Modal title" class="modal-primary" v-model="pModal" @ok="submitclose()">
      <b-form-group>
        <label for="Name">First name</label>
        <b-form-input v-model="body.name" type="text" id="fname" placeholder="Name"></b-form-input>
        <label for="lname">Description</label>
        <b-form-input v-model="body.Description" type="text" id="lname" placeholder="Description"></b-form-input>
        <label for="Name">Department</label>
        <b-form-input v-model="body.depID" type="text" placeholder="Department ID"></b-form-input>
      </b-form-group>
    </b-modal>

    <b-col>
      <b-row>
        <b-form @submit="onsubmit1">
          <b-input-group class="mb-3" label-for="input-1">
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="fa fa-flask"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              id="input-1"
              disabled
              v-model="pname"
              type="text"
              class="form-control"
              :placeholder="itemselectedid"
            />
          </b-input-group>
          <b-button type="submit" variant="primary">view results</b-button>
        </b-form>
      </b-row>
    </b-col>

    <b-btn id="add" variant="primary" @click="AddProject()">Add Project</b-btn>
  </b-row>

  <!-- </div> -->
</template>



<script>
import cTable from "./Table.vue";
import button from "@/views/buttons/StandardButtons.vue";

import axios from "axios";
export default {
  name: "projects",

  components: { cTable },
  props: {},
  data() {
    return {
      body: {
        name: "",
        Description: "",
        depID: "",

        scientistID: this.$id
      },
      itemselectedid: null,
      pname: "",
      pModal: false,
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
        ManagerName: {
          label: "Project manger ",
          sortable: true
        }
      },
      filter: null,
      projects: [],
      results: [],
      primaryModal: false,
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
    async onsubmit1() {
      try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/proj/result/" +
            this.itemselectedid +
            ""
        );
        this.results = response.data;
      } catch (e) {
        this.errors.push(e);
      }
      this.primaryModal = true;
    },
    async submitclose() {
      try {
        const response = await axios.post(
          "http://51.77.192.7:8085/api/add/project?scientistID=" + this.$id,this.body
        );

      } catch (e) {
        this.errors.push(e);
      }
      this.pModal = false;
    },
    AddProject() {
      this.pModal = true;
    },
    rowSelected(items) {
      this.selected = items;
      this.itemselectedid = this.selected[0].Name;
      this.$emit("projectsSelected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async loadItems() {
      try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/all/project"
        );
        console.log(response.data);
        this.projects = response.data;
      } catch (e) {
        this.errors.push(e);
      }
    }
  },
  async created() {
    this.loadItems();
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
