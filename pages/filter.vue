<template>
  <div class="h-full px-4 pt-4 pb-10">
    <p
      class="text-center text-blueColor font-semibold capitalize text-5xl mb-10"
    >
      filter example
    </p>

    <div class="grid lg:grid-cols-4 grid-cols-5 gap-3 mt-6">
      <div class="lg:col-span-1 md:col-span-2 col-span-5">
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
            <p
              class="
                text-gray-teal
                md:text-base
                text-sm
                capitalize
                font-semibold
              "
            >
              Location
            </p>
            <div class="flex flex-col gap-1 mt-4">
              <div
                class="checkbox flex items-center justify-between"
                v-for="(country, index) in countries"
                :key="index"
              >
                <label for="all" class="cursor-pointer capitalize">
                  {{ country }}
                </label>
                <input
                  :id="country"
                  v-model="industry"
                  :value="country"
                  name="country"
                  type="checkbox"
                  class="h-4 w-4"
                />
              </div>
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg">
            <p
              class="
                text-gray-teal
                md:text-base
                text-sm
                capitalize
                font-semibold
              "
            >
              Funding
              {{
                selectedDate
                  ? new Date(selectedDate).toISOString().slice(0, 10)
                  : ""
              }}
            </p>
            <div class="flex flex-col gap-1 mt-4">
              <v-date-picker
                v-model="selectedDate"
                mask="YYYY-MM"
                :min-date="new Date().setDate(new Date().getDate() + 1)"
              >
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
            <p
              class="
                text-gray-teal
                md:text-base
                text-sm
                capitalize
                font-semibold
              "
            >
              Founded
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
                  max="10000000"
                  step="100"
                  v-model="maxPrice"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-span-3 col-span-5">
        <CompanyCard :companies="companies" />
      </div>
    </div>
  </div>
</template>

<script>
import companies from "../companiesData.js";
export default {
  name: "filterPage",
  components: {
    Slider,
  },
  data() {
    return {
      industry: [],
      places: [],
      search: "",
      countries: ["all", "Egypt", "Germany", "United States", "amsterdam"],
      selectedDate: "",
      minPrice: 0,
      maxPrice: 10000000,
    };
  },
  computed: {
    companies() {
      return companies;
    },
  },
};
</script>
