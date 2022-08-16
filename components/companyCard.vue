<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="item in companies"
      :key="item.id"
      class="bg-white p-8 rounded-lg flex flex-col gap-1"
    >
      <p
        class="
          text-gray-700
          lg:text-lg
          md:text-sm
          text-xs
          capitalize
          font-semibold
        "
      >
        organization:
        <span class="text-blueColor text-base font-medium">{{
          item.name
        }}</span>
      </p>
      <p
        class="
          text-gray-700
          lg:text-lg
          md:text-sm
          text-xs
          capitalize
          font-semibold
        "
      >
        Total Funding:

        <span class="text-blueColor text-base font-medium"
          >{{ item.funding }} USD</span
        >
      </p>
      <p
        class="
          text-gray-700
          lg:text-lg
          md:text-sm
          text-xs
          capitalize
          font-semibold
        "
      >
        location:
        <span class="text-blueColor text-base font-medium"
          >{{ item.location }}
        </span>
      </p>
      <p
        class="
          text-gray-700
          lg:text-lg
          md:text-sm
          text-xs
          capitalize
          font-semibold
        "
      >
        founded:
        <span class="text-blueColor text-base font-medium"
          >{{ item.founded }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companies: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
