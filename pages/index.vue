<script setup lang="ts">
const store = useInventoryStore();

const selectedShirt = ref("");
const selectedSize = ref("");
const selectedColor = ref("");

const availableShirts = computed(() => store.availableShirts);
const availableSizes = computed(() => store.availableSizes);
const availableColors = computed(() => store.availableColors);
const stockInfo = computed(() => store.stockInfo);

function onShirtChange() {
  store.setSelectedShirt(selectedShirt.value);
  selectedSize.value = "";
  selectedColor.value = "";
}

function onSizeChange() {
  store.setSelectedSize(selectedSize.value);
  selectedColor.value = "";
}

function onColorChange() {
  store.setSelectedColor(selectedColor.value);
}
</script>
<template>
  <div class="w-screen h-screen bg-gradient-to-r from-slate-300 to-slate-500">
    <template>
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6">Shirt Inventory</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-4 rounded-md">
            <h2 class="text-xl font-semibold mb-4">Inventory Summary</h2>
            <div v-for="shirt in store.shirts" :key="shirt.title" class="mb-6">
              <h3 class="text-lg font-medium mb-2">{{ shirt.title }}</h3>
              <div
                v-for="item in shirt.items"
                :key="`${shirt.title}-${item.size}`"
                class="ml-4 mb-2"
              >
                <h4 class="font-medium">Size: {{ item.size }}</h4>
                <ul class="ml-4">
                  <li
                    v-for="variant in item.variant"
                    :key="`${shirt.title}-${item.size}-${variant.color}`"
                    class="flex justify-between"
                  >
                    <span>{{ variant.color }}:</span>
                    <span class="font-medium">{{
                      variant.hasOwnProperty("stock")
                        ? `${variant.stock} pcs`
                        : "Out of Stock"
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex flex-col space-y-4">
            <div class="form-group">
              <label class="block text-gray-700 font-medium mb-2">Name</label>
              <select
                v-model="selectedShirt"
                @change="onShirtChange"
                class="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select a shirt</option>
                <option
                  v-for="shirt in availableShirts"
                  :key="shirt"
                  :value="shirt"
                >
                  {{ shirt }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="block text-gray-700 font-medium mb-2">Size</label>
              <select
                v-model="selectedSize"
                @change="onSizeChange"
                :disabled="!selectedShirt"
                class="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select a size</option>
                <option
                  v-for="size in availableSizes"
                  :key="size"
                  :value="size"
                >
                  {{ size }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="block text-gray-700 font-medium mb-2">Color</label>
              <select
                v-model="selectedColor"
                @change="onColorChange"
                :disabled="!selectedSize"
                class="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select a color</option>
                <option
                  v-for="color in availableColors"
                  :key="color"
                  :value="color"
                >
                  {{ color }}
                </option>
              </select>
            </div>

            <div v-if="stockInfo" class="mt-4 p-4 bg-gray-100 rounded-md">
              <p class="font-medium">{{ stockInfo }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
