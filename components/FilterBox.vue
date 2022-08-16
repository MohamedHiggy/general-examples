<template>
  <div class="flex flex-col gap-3 sticky top-14">
    <input
      type="text"
      name="search"
      v-model="search"
      id="search"
      class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700
        focus:bg-white
        focus:border-blueColor
        focus:outline-none
      "
      placeholder="Search for organization name..."
    />
    <div class="bg-white p-4 rounded-lg">
      <p class="text-gray-teal md:text-base text-sm capitalize font-semibold">
        Location
      </p>
      <div class="flex flex-col gap-1 mt-4">
        <div
          class="checkbox flex items-center justify-between"
          v-for="(country, index) in countries"
          :key="index"
        >
          <label :for="country" class="cursor-pointer capitalize">
            {{ country }}
          </label>
          <input
            :id="country"
            v-model="places"
            :value="country"
            name="country"
            type="checkbox"
            class="h-4 w-4"
          />
        </div>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg">
      <div class="flex items-center justify-between flex-wrap">
        <p class="text-gray-teal md:text-base text-sm capitalize font-semibold">
          Founded
          {{
            selectedDate
              ? new Date(selectedDate).toISOString().slice(0, 10)
              : ""
          }}
        </p>
        <button
          v-if="selectedDate"
          type="button"
          class="text-blue-400 text-xs"
          @click="selectedDate = ''"
        >
          clear
        </button>
      </div>
      <div class="flex flex-col gap-1 mt-4">
        <v-date-picker v-model="selectedDate" mask="YYYY-MM">
          <template #default="{ inputValue, inputEvents }">
            <input
              id="date"
              class="
                flex-1
                block
                w-full
                border
                sm:text-sm
                border-gray-400
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-yellowColor
                focus:border-transparent
              "
              :value="inputValue"
              placeholder="Funded"
              name="date"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg">
      <p class="text-gray-teal md:text-base text-sm capitalize font-semibold">
        Funding
      </p>
      <div class="flex flex-col gap-1 mt-4">
        <div class="py-2">
          <p class="text-blueColor text-base font-medium">
            From - {{ minPrice }}$
          </p>
          <input
            type="range"
            min="0"
            :max="maxPrice"
            step="100"
            v-model="minPrice"
          />
        </div>
        <div class="py-2">
          <p class="text-blueColor text-base font-medium">
            To - {{ maxPrice }}$
          </p>
          <input
            type="range"
            :min="minPrice"
            max="1000000"
            step="100"
            v-model="maxPrice"
          />
        </div>
      </div>
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
  data() {
    return {
      places: [],
      search: "",
      countries: ["Egypt", "Germany", "United States", "amsterdam"],
      selectedDate: "",
      minPrice: 0,
      maxPrice: 1000000,
    };
  },
  computed: {
    filterItems() {
      return this.filterSearch(
        this.filterPlaces(this.filterFunding(this.filterDate(this.companies)))
      );
    },
  },
  watch: {
    filterItems(e) {
      this.$emit("filterItems", e);
      this.updateURL();
    },
  },
  created() {
    this.$emit("filterItems", this.filterItems);
    this.checkRouter();
  },
  methods: {
    checkRouter() {
      let searchParams = new URLSearchParams(window.location.search);

      let search = searchParams.get("search");
      if (search) this.search = searchParams.get("search");

      let minPrice = searchParams.get("minPrice");
      if (minPrice) this.minPrice = searchParams.get("minPrice");

      let maxPrice = searchParams.get("maxPrice");
      if (maxPrice) this.maxPrice = searchParams.get("maxPrice");

      let selectedDate = searchParams.get("date");
      if (selectedDate) this.selectedDate = searchParams.get("date");

      let places = searchParams.get("places");
      if (places) this.places = places.split(",");
    },

    updateURL() {
      const payload = {};
      if (this.search !== "") payload.search = this.search;
      if (this.selectedDate !== "")
        payload.date = new Date(this.selectedDate).toISOString().slice(0, 10);
      if (this.minPrice > 0) payload.minPrice = this.minPrice;
      if (this.maxPrice < 1000000) payload.maxPrice = this.maxPrice;
      if (this.places.length) payload.places = this.places;
      this.$router.push({ path: this.$route.path, query: payload });
      console.log(payload);
    },
    // filter companies by Name
    filterSearch(items) {
      return items.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    // filter companies by places
    filterPlaces(items) {
      return items.filter((company) => {
        if (this.places.length === 0) {
          return items;
        }
        return this.places.includes(company.location);
      });
    },
    // filter companies by Funding
    filterFunding(items) {
      return items.filter((item) => {
        return item.funding >= this.minPrice && item.funding <= this.maxPrice;
      });
    },
    // filter companies by range of founded date
    filterDate(items) {
      return items.filter((item) => {
        if (this.selectedDate) {
          return (
            item.founded >=
            new Date(this.selectedDate).toISOString().slice(0, 10)
          );
        }
        return items;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
