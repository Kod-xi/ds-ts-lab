export type Course = "main" | "starter" | "dessert";
export interface MenuItem {
  id: number;
  name: string;
  course: Course;
  price: number;
  nutrition: {
    calories: number;
    allergens: string[];
  }
  discountPercent?: number;
  availableFrom?: Date;
}

export interface ComboDeal {
  id: number;
  name: string;
  items: MenuItem[];
  price: number;
}

export type OrderItem = MenuItem | ComboDeal;

