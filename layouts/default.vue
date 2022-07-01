<template>
  <div class="flex md:flex-row flex-col items-center">
    <!--sidebar-->
    <TheSideBar :isExapnded="isExapnded" @expand="isExapnded = !isExapnded"/>

    <!--content-->
    <main class="w-full bg-gray-100 h-screen overflow-y-scroll">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExapnded: true
    }
  },
};
</script>
