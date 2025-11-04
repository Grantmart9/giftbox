import { create } from "zustand";
import { BoxConfiguration, GiftItem, User } from "@/types";

interface BoxStore {
  // Current box configuration
  boxConfig: BoxConfiguration;
  currentUser: User | null;

  // Available items and categories
  availableItems: GiftItem[];
  categories: string[];

  // UI state
  selectedCategory: string;
  is3DPreview: boolean;
  isLoading: boolean;

  // Actions
  setBoxConfig: (config: Partial<BoxConfiguration>) => void;
  addItemToBox: (item: GiftItem) => void;
  removeItemFromBox: (itemId: string) => void;
  clearBox: () => void;
  setSelectedCategory: (category: string) => void;
  toggle3DPreview: () => void;
  setCurrentUser: (user: User | null) => void;
  setAvailableItems: (items: GiftItem[]) => void;
  setLoading: (loading: boolean) => void;
}

const initialBoxConfig: BoxConfiguration = {
  color: "#ff6b9d",
  wrappingStyle: "solid",
  ribbonColor: "#ffd700",
  size: "medium",
  bowStyle: "classic",
  items: [],
  totalPrice: 0,
};

export const useBoxStore = create<BoxStore>((set, get) => ({
  boxConfig: initialBoxConfig,
  currentUser: null,
  availableItems: [],
  categories: ["Flowers", "Chocolates", "Cards", "Toys", "Books", "Jewelry"],
  selectedCategory: "All",
  is3DPreview: false,
  isLoading: false,

  setBoxConfig: (config: Partial<BoxConfiguration>) => {
    const currentConfig = get().boxConfig;
    const newConfig = { ...currentConfig, ...config };

    // Recalculate total price when items change
    if (config.items) {
      newConfig.totalPrice = config.items.reduce(
        (sum: number, item: GiftItem) => sum + item.price,
        0
      );
    }

    set({ boxConfig: newConfig });
  },

  addItemToBox: (item: GiftItem) => {
    const { boxConfig } = get();
    const newItems = [...boxConfig.items, item];
    const totalPrice = newItems.reduce(
      (sum: number, item: GiftItem) => sum + item.price,
      0
    );

    set({
      boxConfig: {
        ...boxConfig,
        items: newItems,
        totalPrice,
      },
    });
  },

  removeItemFromBox: (itemId: string) => {
    const { boxConfig } = get();
    const newItems = boxConfig.items.filter(
      (item: GiftItem) => item.id !== itemId
    );
    const totalPrice = newItems.reduce(
      (sum: number, item: GiftItem) => sum + item.price,
      0
    );

    set({
      boxConfig: {
        ...boxConfig,
        items: newItems,
        totalPrice,
      },
    });
  },

  clearBox: () => {
    set({
      boxConfig: { ...initialBoxConfig },
    });
  },

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  },

  toggle3DPreview: () => {
    set({ is3DPreview: !get().is3DPreview });
  },

  setCurrentUser: (user: User | null) => {
    set({ currentUser: user });
  },

  setAvailableItems: (items: GiftItem[]) => {
    set({ availableItems: items });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
