<template>
  <!-- <div class="animated fadeIn"> -->
  <!-- Table -->
  <b-row>
    <b-col lg="12">
      <c-table
        :table-data="resources"
        :fields="fields"
        :per-page="10"
        hover
        :item="s"
        striped
        bordered
        small
        responsive
        caption="Resources"
        fa="fa fa-picture-o"
        v-on:refresh="loadItems()"
        @click="click"
      ></c-table>
    </b-col>
    <b-modal title="Add resource" class="modal-primary" v-model="addModal" @ok="submitclose()">
      <b-form-group>
        <label for="Name"> Name</label>
        <b-form-input v-model="body.name" type="text" id="fname" placeholder="Name"></b-form-input>
        <label for="lname">Description</label>
        <b-form-input v-model="body.description" type="text" id="lname" placeholder="Description"></b-form-input>
        <label for="lname">Cost</label>
        <b-form-input v-model="body.cost" type="text" placeholder="Cost"></b-form-input>
      </b-form-group>
    </b-modal>
    <b-btn id="add" variant="primary" @click="AddProject()">Add Project</b-btn>
  </b-row>

  <!-- </div> -->
</template>



<script>
import cTable from "./Table.vue";
import button from "@/views/buttons/StandardButtons.vue";

import axios from "axios";
export default {
  name: "resources",

  components: { cTable },
  props: {},
  data() {
    return {
      editModal: false,
      addModal: false,
      body: {},
      fields: {
        Name: {
          label: "Name",
          sortable: true
        },
        Cost: {
          label: "Cost",
          sortable: true
        }
      },

      filter: null,
      resources: [],
      errors: [],
      selectMode: "Mode",
      selected: []
    };
  },

  computed: {
    items: function() {
      const items = this.tableData;
      return Array.isArray(items) ? items : items();
    },
    totalRows: function() {
      return this.getRowCount();
    },
    captions: function() {
      return this.fields;
    },
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
    async submitclose() {
      try {
        console.log(this.body)
        const response = await axios.post(
          "http://51.77.192.7:8085/api/add/resource",this.body
        );

      } catch (e) {
        this.errors.push(e);
      }
      this.addModal = false;
    },
    AddProject() {
      this.addModal = true;
    },
    rowSelected(items) {
      this.selected = items;
      this.$emit("resourcesSelected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async loadItems() {
      try {
        const response = await axios.get('http://51.77.192.7:8085/api/get/resources');
        this.resources = response.data;
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
