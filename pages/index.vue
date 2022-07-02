<template>
  <div class="h-full px-4 pt-4 pb-10">
    <p class="text-center text-blueColor font-semibold capitalize text-5xl mb-10">
      All examples
    </p>
    <ul class="flex flex-row gap-4 flex-wrap">
      <li v-for="link in $router.options.routes" :key="link.name">
        <nuxt-link
          :to="link.path"
          class="
            flex
            items-center
            justify-between
            capitalize
            font-normal
            transition-all
            duration-300
            bg-blueBackgroundColorOpacity
            text-blueColor
            rounded-lg
            text-center
            px-10
            py-2
          "
        >
          {{ link.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>
