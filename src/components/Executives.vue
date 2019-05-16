<template>
  <!-- <div class="animated fadeIn"> -->
  <!-- Table -->
  <b-row>
    <b-col lg="12">
      <c-table
        :table-data="executives"
        :fields="fields"
        :per-page="10"
        hover
        striped
        bordered
        small
        responsive
        caption="Executives"
        fa="fa fa-picture-o"

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
        <label for="ID"> ID</label>
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
import button from "@/views/buttons/StandardButtons.vue";

import axios from "axios";
export default {
  name: "executives",
  components: { cTable },
  props: {},
  data() {
    return {
      primaryModal: false,
      fields: {

        FirstName: {
          label: "FirstName",
          sortable: true
        },
        LastName: {
          label: "LastName",
          sortable: true
        },

      },
      filter: null,
      executives: [],
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

    rowSelected(items) {
      this.selected = items;
      this.$emit("executivesSelected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async loadItems() {
      try {

        const response = await axios.get('http://51.77.192.7:8085/api/get/executives');
        this.executives = response.data;
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
