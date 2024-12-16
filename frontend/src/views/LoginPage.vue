<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/api/axiosInstance"; // Menggunakan axiosInstance yang telah dikonfigurasi
import { setUser } from "../auth"; // Fungsi untuk mengupdate user

const username = ref("");
const router = useRouter();

const login = async () => {
  console.log("Username Input:", username.value); // Pastikan username sudah benar
  try {
    const { data } = await axiosInstance.post("/login", {
      username: username.value,
    });

    console.log("Backend Response:", data); // Debug respons backend

    // Simpan user dan token di localStorage dan update user global
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    setUser(data.user);

    router.push("/appointments");
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message); // Debug error
    alert(error.response?.data?.message || "Invalid username");
  }
};

</script>

<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" name="username"/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<style scoped>
h1 {
  margin-bottom: 20px;
}

input {
  padding: 8px;
}
</style>
