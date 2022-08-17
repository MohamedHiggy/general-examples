<template>
  <div
    class="dropdown-wrapper"
    :class="[
      isVisible
        ? 'rounded-tl-lg rounded-tr-lg  rounded-br-none rounded-bl-none'
        : ' rounded-lg',
    ]"
  >
    <div
      class="selected-item"
      :class="[
        isVisible
          ? 'shadow-md rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none'
          : ' rounded-lg',
      ]"
      @click="toggleSelect"
    >
      <span class="text-gray-500 capitalize">
        {{ selectedItem ? selectedItem : "Select item" }}</span
      >
      <svg
        width="15"
        height="10"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="transform transition-all ease-in-out duration-300"
        :class="{ 'rotate-180': !isVisible }"
      >
        <path
          d="M4.99999 3.78145L8.29999 0.481445L9.24266 1.42411L4.99999 5.66678L0.757324 1.42411L1.69999 0.481445L4.99999 3.78145Z"
          fill="#1E1E20"
        />
      </svg>
    </div>
    <div
      v-if="isVisible"
      class="dropdown-popover"
      :class="[
        isVisible
          ? 'shadow-md rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg'
          : '',
      ]"
    >
      <input
        class="customSearchInput"
        type="text"
        v-model="dropDownSearch"
        placeholder="search..."
        name="search"
        id="customSearchDropDown"
      />
      <div class="options">
        <ul v-if="filterSearch.length > 0" class="optionList">
          <li
            class="flex items-center justify-between cursor-pointer"
            v-for="item in filterSearch"
            :key="item"
            @click="selectItem(item)"
          >
            <p class="text-gray-500">{{ item }}</p>
            <span
              class="
                w-4
                h-4
                border border-gray-300
                rounded-sm
                flex
                items-center
                justify-center
              "
            >
              <svg
                v-if="selectedItem === item"
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                viewBox="0 0 20 20"
                fill="#061D4F"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
        <p v-else class="text-center text-gray-400 font-semibold">
          No results found for your search
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    isItem: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      dropDownSearch: "",
      selectedItem: this.isItem ? this.isItem : "",
      isVisible: false,
    };
  },
  computed: {
    filterSearch() {
      return this.items.filter((item) => {
        return item.toLowerCase().includes(this.dropDownSearch.toLowerCase());
      });
    },
  },
  methods: {
    toggleSelect() {
      this.isVisible = !this.isVisible;
      this.dropDownSearch = "";
    },
    selectItem(item) {
      this.selectedItem = item;
      this.$emit("selectItem", this.selectedItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  position: relative;
  background-color: #fff;

  .selected-item {
    height: 40px;
    display: flex;
    cursor: pointer;
    padding: 15px 10px;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
  }
  .dropdown-popover {
    left: 0;
    right: 0;
    top: 41px;
    padding: 20px 0 0 0;
    width: 100%;
    max-width: 100%;
    position: absolute;
    background-color: #fff;
    input.customSearchInput {
      width: 100%;
      height: 40px;
      padding: 0 5px;
      padding: 10px;
      outline: none;
      font-size: 16px;
      margin-bottom: 5px;
      border-bottom: 1px solid #efefef;
    }
    .options {
      width: 100%;
      padding: 10px;
      .optionList {
        max-height: 150px;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding-right: 10px;
        li {
          width: 100%;
          font-size: 16px;
          padding: 6px 0 6px 5px;
          text-transform: capitalize;
          transition: 0.2s ease-in-out;
          border-bottom: 1px solid #efefef;
          &:hover {
            border-bottom: 1px solid #c3c3c3;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
.optionList::-webkit-scrollbar {
  width: 3px;
  height: 2px;
}

.optionList::-webkit-scrollbar-thumb {
  background: #efefef;
  border-radius: 10px;
}

.optionList::-webkit-scrollbar-track {
  background: #fff;
}
</style>
