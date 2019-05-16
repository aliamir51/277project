<template>
  <!-- <div class="animated fadeIn"> -->
  <!-- Table -->
  <b-row>
    <b-col lg="12">
      <c-table
        :table-data="departments"
        :fields="fields"
        :per-page="10"
        hover
        fixed
        striped
        bordered
        small
        responsive
        caption="Departments"
        fa="fa fa-building"
        v-on:selected="rowSelected($event)"
        v-on:refresh="loadItems()"
        @click="clicked()"
      ></c-table>
    </b-col>
    <b-modal
      title="Projects"
      class="modal-primary"
      v-model="primaryModal"
      @ok="primaryModal = false"
    >
      <ul>
        <li v-for="(project, $index) in projects">{{project['Project Name']}}:{{project['Project Description']}}> </li>
      </ul>
    </b-modal>
    <b-modal
      title="Scientists"
      class="modal-primary"
      v-model="secondryModal"
      @ok="secondryModal = false"
    >
      <ul>
        <li v-for="(scientist, $index) in scientists">{{scientist.FirstName }} {{scientist.LastName }}</li>
      </ul>
    </b-modal>
    <b-col>
      <b-form @submit="onsubmit1">
        <b-input-group class="mb-3" label-for="input-1">
          <b-input-group-prepend>
            <b-input-group-text>
              <i class="fa fa-building"></i>
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            disabled
            id="input-1"
            v-model="pr"
            type="text"
            class="form-control"
            :placeholder="itemselectedid"
          />
        </b-input-group>
        <b-button type="submit" variant="primary">view projects</b-button>
      </b-form>
    </b-col>
    <b-col>
      <b-form @submit="onsubmit2">
        <b-input-group class="mb-3" label-for="input-1">
          <b-input-group-prepend>
            <b-input-group-text>
              <i class="fa fa-building"></i>
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model="sr"
            type="text"
            class="form-control"
            disabled
            :placeholder="itemselectedid"
          />
        </b-input-group>
        <b-button type="submit" variant="primary">view Scientists</b-button>
      </b-form>
    </b-col>
  </b-row>
  <!-- </div> -->
</template>



<script>
import cTable from "./Table.vue";
import button from "@/views/buttons/StandardButtons.vue";

import axios from "axios";
export default {
  name: "Departments",
  components: { cTable },
  props: {},
  data() {
    return {
      pr: "",
      sr: "",
      itemselectedid: "",
      scientists: [],
      projects: [],
      primaryModal: false,
      secondryModal: false,
      fields: {
        name: {
          label: "Name",
          sortable: true
        },
          HODName: {
          label: "Head of Dept",
          sortable: true
        },
        Location: {
          label: "Location",
          sortable: true
        }
      },
      filter: null,
      departments: [],
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
          "http://51.77.192.7:8085/api/get/department/projects/"+this.itemselectedid
        );
this.projects=response.data;

      } catch (e) {
        this.errors.push(e);
      }

      this.primaryModal = true;

    },
     async onsubmit2() {
        try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/department/scientists/"+this.itemselectedid
        );
      this.scientists=response.data;

      } catch (e) {
        this.errors.push(e);
      }

      this.secondryModal = true;

    },
    rowSelected(items) {
      this.selected = items;
      this.itemselectedid = this.selected[0].name;
      this.$emit("departmentsSelected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async loadItems() {
      try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/departments"
        );
console.log(response.data);
        this.departments = response.data;
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
