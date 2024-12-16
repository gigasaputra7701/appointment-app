import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import AppointmentsPage from "../views/AppointmentsPage.vue";
import CreateAppointmentPage from "../views/CreateAppointmentPage.vue";

const routes = [
  { path: "/login", component: LoginPage },
  { path: "/appointments", component: AppointmentsPage },
  { path: "/appointments/create", component: CreateAppointmentPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
