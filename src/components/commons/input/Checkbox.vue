<template>
  <div style="display: flex">
    <input type="checkbox" :id="'id_' + inputRef" :name="inputRef" v-model="check">
    <label :for="'id_' + inputRef" :data-content="label" :class="{bold: isBold}">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    inputRef: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: "선택"
    },
    isChecked: {
      type: Boolean,
      default: "false"
    },
    isBold: {
      type: Boolean,
      default: "false"
    },
  },
  data() {
    return {
      check: this.isChecked
    }
  },
  watch: {
    isChecked: function (val) {
      this.check = val;
    },
    check: function (val) {
      this.$emit('update', val);
    }
  },
  emits: ['update']
}
</script>

<style scoped>
input[type=checkbox] {
  position: relative;
  width: 1.5em;
  height: 1.5em;
  color: #363839;
  border: 1px solid #bdc1c6;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
}

input[type=checkbox]::before {
  position: absolute;
  content: "";
  display: block;
  top: 2px;
  left: 7px;
  width: 8px;
  height: 14px;
  border-style: solid;
  border-color: #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
}

input[type=checkbox]:checked {
  color: #fff;
  border-color: var(--main-bg);
  background: var(--main-bg);
}

input[type=checkbox]:checked::before {
  opacity: 1;
}

label {
  position: relative;
  cursor: pointer;
  padding-left: 0.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.bold {
  font-weight: bold;
}
</style>
