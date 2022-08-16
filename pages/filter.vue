<template>
  <div class="h-full px-4 pt-4 pb-10">
    <p
      class="text-center text-blueColor font-semibold capitalize text-5xl mb-10"
    >
      filter example
    </p>

    <div class="grid lg:grid-cols-4 grid-cols-5 gap-3 mt-6">
      <div class="lg:col-span-1 md:col-span-2 col-span-5">
        <FilterBox :companies="companies" @filterItems="filterItems = $event" />
      </div>
      <div class="md:col-span-3 col-span-5">
        <CompanyCard v-if="filterItems.length > 0" :companies="filterItems" />
        <p
          v-else
          class="
            bg-white
            rounded-lg
            py-4
            w-full
            shadow
            text-center
            font-semibold
            capitalize
            text-blueColor text-2xl
          "
        >
          No Data
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import companies from "../companiesData.js";
export default {
  name: "filterPage",
  data() {
    return {
      filterItems: [],
    };
  },
  computed: {
    companies() {
      return companies;
    },
  },
};
</script>
