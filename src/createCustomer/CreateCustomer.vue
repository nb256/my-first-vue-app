<template>
  <div>
    <h2>Create Customer</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input
          type="text"
          v-model="firstName"
          name="firstName"
          class="form-control"
          :class="{ 'is-invalid': submitted && !firstName }"
        >
        <div v-show="submitted && !firstName" class="invalid-feedback">Firstname is required</div>
      </div>
      <div class="form-group">
        <label for="firstName">Last Name</label>
        <input
          type="text"
          v-model="lastName"
          name="lastName"
          class="form-control"
          :class="{ 'is-invalid': submitted && !lastName }"
        >
        <div v-show="submitted && !lastName" class="invalid-feedback">LastName is required</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !email }"
        >
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
      </div>
      <div class="form-group">
        <label for="department">Department</label>
        <input
          type="text"
          v-model="department"
          name="department"
          class="form-control"
          :class="{ 'is-invalid': submitted && !department }"
        >
        <div v-show="submitted && !department" class="invalid-feedback">department is required</div>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          v-model="phoneNumber"
          name="phoneNumber"
          class="form-control"
          :class="{ 'is-invalid': submitted && !phoneNumber }"
        >
        <div v-show="submitted && !phoneNumber" class="invalid-feedback">phoneNumber is required</div>
      </div>
      <div class="form-group">
        <label for="customerStatus">Customer Status</label>
        <input
          type="text"
          v-model="customerStatus"
          name="customerStatus"
          class="form-control"
          :class="{ 'is-invalid': submitted}"
        >
        <div
          v-show="submitted "
          class="invalid-feedback"
        >customerStatus is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
        <router-link to="/" class="btn btn-link">Home</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      firstName: "",
      customerStatus: 0,
      department: "",
      email: "",
      lastName: "",
      phoneNumber: "",
      submitted: false
    };
  },
  methods: {
    ...mapActions("customers", ["createCustomer"]),
    handleSubmit(e) {
      this.submitted = true;
      const {
        firstName,
        customerStatus,
        department,
        email,
        lastName,
        phoneNumber
      } = this;
      if (
        firstName &&
        department &&
        email &&
        lastName &&
        phoneNumber
      ) {
        this.createCustomer({
          firstName,
          customerStatus,
          department,
          email,
          lastName,
          phoneNumber
        });
      }
    }
  }
};
</script>