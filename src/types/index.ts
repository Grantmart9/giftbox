export interface GiftItem {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface BoxConfiguration {
  id?: string;
  color: string;
  wrappingStyle: string;
  ribbonColor: string;
  size: "small" | "medium" | "large" | "extra-large";
  items: GiftItem[];
  totalPrice: number;
  userId?: string;
}

export const BOX_SIZES = {
  small: { label: "Small", dimensions: '6" x 4" x 3"', price: 0 },
  medium: { label: "Medium", dimensions: '8" x 6" x 4"', price: 86.65 },
  large: { label: "Large", dimensions: '10" x 8" x 5"', price: 173.3 },
  "extra-large": {
    label: "Extra Large",
    dimensions: '12" x 10" x 6"',
    price: 259.95,
  },
} as const;

export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  boxConfiguration: BoxConfiguration;
  deliveryInfo: DeliveryInfo;
  status: "pending" | "processing" | "shipped" | "delivered";
  totalPrice: number;
  createdAt: Date;
}

export interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  specialInstructions?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}
