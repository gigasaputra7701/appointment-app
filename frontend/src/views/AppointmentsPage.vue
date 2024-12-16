<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/api/axiosInstance"; // Menggunakan axiosInstance yang telah dikonfigurasi

const appointments = ref([]);
const router = useRouter();

const checkToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika token tidak ada, arahkan ke halaman login
    alert("Session expired or not logged in. Please log in again.");
    router.push("/login"); // Arahkan ke halaman login
  }
};

onMounted(() => {
  checkToken();
});

const fetchAppointments = async () => {
  try {
    const { data } = await axiosInstance.get("/appointments");
    appointments.value = data;
  } catch (error) {
    alert("An error occurred while fetching appointments");
  }
};
</script>

<template>
  <div class="container">
    <h1>Appointments</h1>
    <div v-if="appointments.length === 0" class="content">
      <p>No appointments...</p>
    </div>
    <ul v-else>
      <li
        v-for="appointment in appointments"
        :key="appointment.id"
        class="content"
      >
        {{ appointment.title }} ({{ appointment.start }} -
        {{ appointment.end }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.content {
  margin-top: 24px;
}
</style>
