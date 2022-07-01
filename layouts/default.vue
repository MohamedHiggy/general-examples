<template>
  <div class="md:grid md:grid-cols-7">
    <!--sidebar-->
    <div v-if="isExapnded" class="md:col-span-1">
      <TheSideBar :isExapnded="isExapnded" @expand="isExapnded = !isExapnded" />
    </div>
    <button
      v-if="!isExapnded"
      class="fixed top-3 left-2 z-10 bg-gray-500 shadow-lg rounded-lg p-2"
      type="button"
      @click="isExapnded = !isExapnded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
          stroke="#ffffff"
        />
      </svg>
    </button>

    <!--content-->
    <main
      :class="[isExapnded ? 'md:col-span-6' : 'md:col-span-7']"
      class="bg-gray-100 min-h-screen"
    >
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExapnded: true,
    };
  },
};
</script>
