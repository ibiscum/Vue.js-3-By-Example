<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <div class="p-col-12">
      <h1>Admin Log In</h1>
    </div>

    <Field v-slot="{ field, errors }" v-model="username" name="username">
      <div class="p-col-12">
        <div class="p-inputgroup">
          <InputText placeholder="Username" :class="{ 'p-invalid': errors.length > 0 }" v-bind="field" />
        </div>
        <small class="p-error" v-if="errors.length > 0">
          Username is invalid.
        </small>
      </div>
    </Field>

    <Field v-slot="{ field, errors }" v-model="password" name="password">
      <div class="p-col-12">
        <div class="p-inputgroup">
          <InputText placeholder="Password" type="password" :class="{ 'p-invalid': errors.length > 0 }"
            v-bind="field" />
        </div>
        <small class="p-error" v-if="errors.length > 0">
          Password is invalid
        </small>
      </div>
    </Field>

    <div class="p-col-12">
      <Button label="Log In" type="submit" />
    </div>
  </Form>
</template>

<script setup>
import * as yup from "yup";
import axios from "axios";
import { APIURL } from "@/constants";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Form, Field } from "vee-validate";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
</script>

<script>
  export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      schema,
    };
  },
  methods: {
    async onSubmit(values) {
      const { username, password } = values;
      try {
        const {
          data: { token },
        } = await axios.post(`${APIURL}/users/login`, {
          username,
          password,
        });
        localStorage.setItem("token", token);
        this.$router.push("/bookings");
      } catch {
        alert("Login failed");
      }
    },
  },
};
</script>
