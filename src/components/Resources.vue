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
    <b-modal
      title="Modal title"
      class="modal-primary"
      v-model="primaryModal"
      @ok="primaryModal = false"
    >
      <b-form-group>
        <label for="ID">ID</label>
        <b-form-input type="text" id="id" disabled :placeholder=" s"></b-form-input>
        <label for="fname">First name</label>
        <b-form-input type="text" id="fname" placeholder="First Name"></b-form-input>
        <label for="lname">Last name</label>
        <b-form-input type="text" id="lname" placeholder="Last Name"></b-form-input>
      </b-form-group>
    </b-modal>
    <b-modal title="Modal title" class="modal-primary" v-model="addModal" @ok="addModal = false">
      <b-form-group>
        <label for="ID">ID</label>
        <b-form-input type="text" id="id" disabled placeholder="k"></b-form-input>
        <label for="fname">First name</label>
        <b-form-input type="text" id="fname" placeholder="First Name"></b-form-input>
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
  name: "resources",

  components: { cTable },
  props: {},
  data() {
    return {
      primaryModal: false,
      addModal: false,

      fields: {
        Name: {
          label: "Name",
          sortable: true
        },
        cost: {
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
    click(evt) {
      this.primaryModal = true;
      let children = Array.from(event.currentTarget.childNodes);
      let target = event.target;
      if (target.tagName === "BUTTON") {
        this.todos.splice(children.indexOf(target.parentNode), 1);
      }
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
        // const response = await axios.get('http://51.77.192.7:8080/api/list/ADS?token=JLAGSDhjhasldyqgashudjHBAGSDIUYQWIEJcabTQTY6Y718265361T2GEKJlkqhao8ds76R618253879801802039180927645678039809==');
        // this.resources = response.data;
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
