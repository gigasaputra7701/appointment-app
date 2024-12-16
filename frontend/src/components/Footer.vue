<template>
  <div>
    <h2>Appointment App {{ year }}</h2>
  </div>
</template>

<script setup>
// "date" is object of Date() class
let date = new Date();

// Use "getYear()" method and stores
// the returned value to "n"
let year = date.getYear();
</script>

<style scoped></style>
