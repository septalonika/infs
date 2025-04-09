import type { Shirt } from "@/types/inventory";

interface State {
  shirts: Shirt[];
  selectedShirt: string | null;
  selectedSize: string | null;
  selectedColor: string | null;
}

export const useInventoryStore = defineStore("inventory", {
  state: (): State => ({
    shirts: [
      {
        title: "Shirt A",
        items: [
          {
            size: "L",
            variant: [
              {
                color: "Red",
                stock: 10,
              },
              {
                color: "Black",
              },
            ],
          },
        ],
      },
      {
        title: "Shirt B",
        items: [
          {
            size: "L",
            variant: [
              {
                color: "Green",
              },
              {
                color: "White",
                stock: 20,
              },
            ],
          },
          {
            size: "M",
            variant: [
              {
                color: "Yellow",
                stock: 5,
              },
              {
                color: "White",
                stock: 8,
              },
            ],
          },
        ],
      },
    ] as Shirt[],
    selectedShirt: null,
    selectedSize: null,
    selectedColor: null,
  }),

  getters: {
    availableShirts(this: State) {
      return this.shirts.map((shirt: Shirt) => shirt.title);
    },

    availableSizes(this: State) {
      if (!this.selectedShirt) return [];

      const shirt = this.shirts.find((s) => s.title === this.selectedShirt);
      return shirt ? [...new Set(shirt.items.map((item) => item.size))] : [];
    },

    availableColors(this: State) {
      if (!this.selectedShirt || !this.selectedSize) return [];

      const shirt = this.shirts.find((s) => s.title === this.selectedShirt);
      if (!shirt) return [];

      const sizeItem = shirt.items.find(
        (item) => item.size === this.selectedSize
      );
      return sizeItem ? sizeItem.variant.map((v) => v.color) : [];
    },

    stockInfo(this: State) {
      if (!this.selectedShirt || !this.selectedSize || !this.selectedColor)
        return null;

      const shirt = this.shirts.find((s) => s.title === this.selectedShirt);
      if (!shirt) return null;

      const sizeItem = shirt.items.find(
        (item) => item.size === this.selectedSize
      );
      if (!sizeItem) return null;

      const colorVariant = sizeItem.variant.find(
        (v) => v.color === this.selectedColor
      );
      if (!colorVariant) return null;

      return colorVariant.hasOwnProperty("stock")
        ? `Stock: ${colorVariant.stock} pcs`
        : "Out Of Stock";
    },
  },

  actions: {
    setSelectedShirt(shirtName: string) {
      this.selectedShirt = shirtName;
      this.selectedSize = null;
      this.selectedColor = null;
    },

    setSelectedSize(size: string) {
      this.selectedSize = size;
      this.selectedColor = null;
    },

    setSelectedColor(color: string) {
      this.selectedColor = color;
    },
  },
});
