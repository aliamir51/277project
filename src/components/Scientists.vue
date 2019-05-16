<template>
  <!-- <div class="animated fadeIn"> -->
  <!-- Table -->
  <b-row>
    <b-col lg="12">
      <c-table
        :table-data="scientists"
        :fields="fields"
        :per-page="10"
        :projects="projects"
        hover
        striped
        bordered
        small
        responsive
        caption="Scientists"
        fa="icon-user"
        v-on:refresh="loadItems()"
        v-on:selected="rowSelected($event)"
        @click="clicked(item)"
        @click2="click2()"
      ></c-table>
    </b-col>
    <b-modal
      title="Projects"
      class="modal-primary"
      v-model="primaryModal"
      @ok="primaryModal = false"
    >
      <ol>
        <li v-for="(project, $index) in projects">{{project}}</li>
      </ol>
    </b-modal>
    <b-modal
      title="Results that the scientist contributed in"
      class="modal-primary"
      v-model="secondryModal"
      @ok="secondryModal = false"
    >
      <ol>
        <li v-for="(result, $index) in results">{{result}}</li>
      </ol>
    </b-modal>
    <b-col>
      <b-form @submit="onsubmit1">
        <b-input-group class="mb-3" label-for="input-1">
          <b-input-group-prepend>
            <b-input-group-text>
              <i class="icon-user"></i>
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            id="input-1"
            v-model="sname"
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
              <i class="icon-user"></i>
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model="Sresource"
            disabled
            type="text"
            class="form-control"
            :placeholder="itemselectedid"
          />
        </b-input-group>
        <b-button type="submit" variant="primary">view resources</b-button>
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
  name: "Scientists",
  components: { cTable },
  props: {},
  data() {
    return {
      sname: "",
      Sresource: "",
      primaryModal: false,
      secondryModal: false,
      fields: {
        FirstName: {
          label: "FirstName",
          sortable: true
        },
        LastName: {
          label: "LastName",
          sortable: true
        },
        salary: {
          label: "Salary",
          sortable: true
        },
        ManagerName: {
          label: "MangerName",
          sortable: true
        },
        Name: {
          label: "DepName",
          sortable: true
        }
      },
      filter: null,
      scientists: [],
      projects: [],
      results: [],
      errors: [],
      selectMode: "Mode",
      selected: [],
      itemselectedid: ""
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
          "http://51.77.192.7:8085/api/get/scientist/projs/"+this.itemselectedid
        );
        console.log(response.data);
        this.projects=response.data;

      } catch (e) {
        this.errors.push(e);
      }

      this.primaryModal = true;

    },
     async onsubmit2() {
        try {
        const response = await axios.get(
          "http://51.77.192.7:8085/api/get/scientist/results/"+this.itemselectedid
        );
      this.results=response.data;

      } catch (e) {
        this.errors.push(e);
      }

      this.secondryModal = true;

    },
    rowSelected(items) {
      this.selected = items;
      this.itemselectedid = this.selected[0].ID;
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
          "http://51.77.192.7:8085/api/get/scientists"
        );
        console.log(response.data);
        this.scientists = response.data;


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
