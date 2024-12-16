<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { user, setUser } from "../auth"; // Menangani user global jika menggunakan store

const router = useRouter();
const isAuthenticated = ref(false); // Flag untuk memeriksa otentikasi

// Cek status otentikasi ketika komponen dimuat
onMounted(() => {
  checkAuthentication();
});

// Watch untuk memantau perubahan pada user
watch(user, () => {
  checkAuthentication(); // Periksa status otentikasi setiap kali user berubah
});

// Fungsi untuk memeriksa status otentikasi
const checkAuthentication = () => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Verifikasi keberadaan token dan data user
  if (token && storedUser) {
    isAuthenticated.value = true; // Set status otentikasi menjadi true jika token dan user ada
  } else {
    isAuthenticated.value = false; // Set false jika tidak ada sesi
  }
};

// Fungsi logout untuk membersihkan sesi
const logout = () => {
  setUser(null); // Reset data user dari store (jika menggunakan state management)
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  isAuthenticated.value = false; // Set status otentikasi ke false setelah logout
  router.push("/"); // Arahkan ke halaman login
};
</script>

<template>
  <nav class="navbar">
    <div class="container-nav">
      <h1 v-if="isAuthenticated">Welcome, {{ user?.name }}!</h1>
      <h1 v-else>Appointment App</h1>
      <div v-if="isAuthenticated">
        <router-link to="/appointments" class="nav-link"
          >Appointments</router-link
        >
        <router-link to="/appointments/create" class="nav-link"
          >Create Appointment</router-link
        >
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
}

.nav-link:hover {
  text-decoration: underline;
}

.logout-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}

.container-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
