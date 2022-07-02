<template>
  <div class="h-full px-4 pt-4 pb-10">
    <p
      class="text-center text-blueColor font-semibold capitalize text-5xl mb-10"
    >
      infinite scroll example
    </p>

    <div class="flex flex-col">
      <div
        class="w-full rounded-lg overflow-hidden bg-white shadow-lg mb-4"
        v-for="user in users"
        :key="user.id"
      >
        <div class="px-6 py-4 flex items-center justify-start gap-2">
          <div class="h-16 w-16 rounded-full overflow-hidden">
            <img
              id="userAvatar"
              :data-src="user.avatar"
              src="image.png"
              alt="avatar of user"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col">
            <p class="font-bold text-gray-700 text-lg">
              {{ user.first_name + " " + user.last_name }}
            </p>
            <p class="text-gray-500 text-base">{{ user.email }}</p>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="py-4 text-center">
        <svg
          role="status"
          class="
            inline
            w-8
            h-8
            mr-2
            text-gray-200
            animate-spin
            dark:text-gray-600
          "
          viewBox="0 0 100 101"
          fill="#2e5bff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { disconnectImageObserver, imageObserver } from '~/utils/imageObserver'
export default {
  name: "infiniteScrollPage",
  data() {
    return {
      isBottom: false,
      currentPage: 1,
      users: [],
      isLoading: false,
      getData: true,
    };
  },
  watch: {
    isBottom(newValue) {
      if (newValue && this.getData) {
        this.getUsers();
      }
    },
  },
  created() {
    window.addEventListener("scroll", (e) => {
      this.isBottom = this.isBottomVisible();
    });
    this.getUsers();
  },
  beforeDestroy() {
    disconnectImageObserver();
  },
  methods: {
    isBottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    async getUsers() {
      this.isLoading = true;
      await this.$axios
        .$get(
          `https://reqres.in/api/users?page=${this.currentPage}&per_page=10`
        )
        .then((res) => {
          this.isLoading = false;
          this.users = [...this.users, ...res.data];
          if (this.currentPage < res.total_pages) {
            this.currentPage++;
            this.getData = true;
          } else {
            this.getData = false;
          }
          setTimeout(() => {
            const images = document.querySelectorAll("#userAvatar");
            imageObserver(images);
          }, 50);
        });
    },
  },
};
</script>
