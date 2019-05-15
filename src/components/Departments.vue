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
          fa="fa fa-picture-o"
          v-on:selected="updatedAS($event)"
          v-on:refresh="loadItems()"
          @click="clicked()"
        ></c-table>
      </b-col>
        <b-modal
      title="Modal title"
      class="modal-primary"
      v-model="primaryModal"
      @ok="primaryModal = false"
    >
      <b-form-group>
       <label for="ID">Dep ID</label>
        <b-form-input type="text" id="id"   disabled :placeholder="d"></b-form-input>
        <label for="fname">First name</label>
        <b-form-input type="text" id="fname"  placeholder="First Name"></b-form-input>
        <label for="lname">Last name</label>
        <b-form-input type="text" id="lname" placeholder="Last Name"></b-form-input>
      </b-form-group>
    </b-modal>
    </b-row>
  <!-- </div> -->
</template>



<script>
import cTable from "./Table.vue";
import button from "@/views/buttons/StandardButtons.vue"

import axios from "axios";
export default {
  name: "Departments",
  components: { cTable },
  props: {},
  data() {
    return {
       primaryModal: false,
      fields: {
        name: {
          label: "Name",
          sortable: true
        },
        Head: {
          label: "Head of Dept",
          sortable: true
        },
        Location: {
          label: "Location",
          sortable: true
        },
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
  methods: {  clicked() {
      this.primaryModal = true;
    },
    rowSelected(items) {
      this.selected = items;
      this.$emit("departmentsSelected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async loadItems() {
      try {
        // const response = await axios.get('http://51.77.192.7:8080/api/list/ADS?token=JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==');
        // this.departments = response.data;
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
