<template>
  <div class="sidebar">
    <section
      class="bg-white min-h-screen transition-all duration-300"
      :class="[isExapnded ? 'w-60' : 'w-16']"
    >
      <div class="p-4 flex items-center justify-start gap-4">
        <button type="button" class="outline-none" @click="expandSideBar">
          <svg
            v-if="isExapnded"
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
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              stroke="#808080"
            />
          </svg>

          <svg
            v-else
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
              stroke="#808080"
            />
          </svg>
        </button>
        <p
          :class="[isExapnded ? 'visible opacity-100' : 'invisible opacity-0']"
          class="text-gray-500 text-lg transition-all duration-300"
        >
          Sidebar
        </p>
      </div>
      <div class="mt-5">
        <ul class="flex flex-col gap-2">
          <li v-for="link in $router.options.routes" :key="link.name">
            <nuxt-link
              :to="link.path"
              class="
                text-gray-500
                flex
                items-center
                justify-between
                capitalize
                py-3
                px-4
                font-normal
                transition-all duration-300
                hover:bg-blueBackgroundColorOpacity
                hover:text-blueColor
              "
              :class="{ 'font-bold': !isExapnded }"
              exact
            >
              {{ isExapnded ? link.name : link.name.charAt(0) }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    isExapnded: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  data() {
    return {
      links: [
        {
          name: "home",
          url: "/",
        },
        {
          name: "about",
          url: "/about",
        },
        {
          name: "contect",
          url: "/contect",
        },
      ],
    };
  },
  methods: {
    expandSideBar() {
      this.$emit("expand");
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  .nuxt-link-active {
    color: #2e5bff;
    background-color: rgba(46, 91, 255, 0.1);
    position: relative;

    &::before {
      background-color: rgba(46, 91, 255, 0.1);
      content: "";
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      background-color: #2e5bff;
    }
  }
}
</style>
