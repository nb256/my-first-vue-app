<template>
  <div>
    <h1>Hi {{account.user.firstName}}!</h1>
    <p>You're logged in</p>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>

    <h3>Customers:</h3>

      <router-link to="/createCustomer" class="btn btn-link">Create Customer</router-link>
    <em v-if="customers.loading">Loading customers...</em>
    <span v-if="customers.error" class="text-danger">ERROR: {{customers.error}}</span>
    <!-- <ul v-if="customers.items">
            <li v-for="user in customers.items" :key="user.id">
                {{user.firstName + ' ' + user.lastName}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
            </li>
    </ul>-->
    <em v-if="customers.loading">Loading customers...</em>
    <span v-if="customers.error" class="text-danger">ERROR: {{customers.error}}</span>

    <nav aria-label="Page navigation example" v-if="customers.totalCount">
      <ul class="pagination">
        <li
          class="page-item"
          v-for="page in Array.apply(0, Array(Math.ceil(customers.totalCount / 50))).map(function(_,b) { return b + 1; })"
          :key="page"
          v-bind:class="{ active: currentPage === page-1 }"
        >
          <a
            class="page-link"
            @click="getAllCustomers({page: page -1}) && setPage(page-1)"
            href="#"
          >{{page}}</a>
        </li>
      </ul>
    </nav>
    <table class="table" v-if="customers.items">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Email</th>
          <th scope="col">Department</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Customer Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in customers.items" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td>{{user.email}}</td>
          <td>{{user.department}}</td>
          <td>{{user.phoneNumber}}</td>
          <td>
            {{user.customerStatus ? "client" : "lead"}}
            <button
              type="button"
              class="btn btn-primary btn-xs"
              @click="changeStatus({page: currentPage, id: user.id})"
            >Change</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      account: state => state.account,
      customers: state => state.customers.all
    })
  },
  created() {
    this.getAllCustomers({ page: this.currentPage });
  },
  methods: {
    ...mapActions("customers", {
      getAllCustomers: "getAll",
      deleteCustomer: "delete",
      changeStatus: "changeStatus"
    }),
    setPage(page) {
      this.currentPage = page;
    }
  },
  data() {
    return {
      currentPage: 0
    };
  }
};
</script>