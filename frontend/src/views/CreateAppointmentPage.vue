<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/api/axiosInstance"; // Mengimpor axiosInstance yang telah dikonfigurasi

const title = ref("");
const start = ref("");
const end = ref("");
const participants = ref([]);
const router = useRouter();

// Fungsi untuk mengecek keberadaan token
const checkToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika token tidak ada, arahkan ke halaman login
    alert("Session expired or not logged in. Please log in again.");
    router.push("/login"); // Arahkan ke halaman login
  }
};

// Panggil fungsi cek token hanya saat halaman dimuat
onMounted(() => {
  checkToken();
});

// Fungsi untuk membuat appointment
const createAppointment = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // Pastikan token terkirim dengan benar dalam header Authorization
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Kirimkan token sebagai Bearer token
      },
    };

    // Ubah string peserta menjadi array ID yang valid
    const participantIds = participants.value
      .split(",")
      .map((id) => parseInt(id.trim()));

    await axiosInstance.post(
      "/appointments",
      {
        title: title.value,
        start: start.value,
        end: end.value,
        creator_id: user.id,
        participants: participantIds, // Kirimkan peserta sebagai array
      },
      config
    );

    alert("Appointment created!");
  } catch (error) {
    alert(error.response.data.message || "An error occurred");
  }
};
</script>
<template>
  <div class="container">
    <h1>Create Appointment</h1>
    <form @submit.prevent="createAppointment">
      <div class="wrap-input">
        <div class="input-group">
          <label for="title">Title:</label>
          <input
            v-model="title"
            type="text"
            placeholder="Title"
            id="title"
            required
          />
        </div>
        <div class="input-group">
          <label for="start">Start Time:</label>
          <input
            v-model="start"
            id="start"
            type="datetime-local"
            placeholder="Start Time"
            required
          />
        </div>
        <div class="input-group">
          <label for="end">End Time:</label>
          <input
            v-model="end"
            id="end"
            type="datetime-local"
            placeholder="End Time"
            required
          />
        </div>
        <div class="input-group">
          <label for="participants">Participants:</label>
          <input
            v-model="participants"
            type="text"
            placeholder="Participants (comma-separated IDs)"
            id="participants"
          />
        </div>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>
<style scoped>
form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(237, 237, 237);
  border-radius: 10px;
  padding: 2rem;
}
.wrap-input {
  display: flex;
  flex-direction: column;
}
.input-group {
  max-width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
}
.input-group label {
  width: 50%;
}
.input-group input {
  width: 45%;
  padding: 6px;
}
button {
  margin-top: 12px;
}
</style>
