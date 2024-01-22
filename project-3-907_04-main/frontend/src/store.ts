import { MenuItem } from "@mui/material";
import { create } from "zustand";
import axios, {
  handleErrors,
  handleErrorsNoRedirect,
} from "./config/axiosConfig";

/**
 * Represents an entry in the shopping cart.
 * @interface
 */
export interface CartEntry {
  itemId: number; // Unique identifier for the item.
  quantity: number; // Unique identifier for the item.
}

/**
 * Describes the structure of a menu item.
 * @interface
 */
export interface MenuItem {
  id?: number; // Optional unique identifier for the menu item.
  name: string; // Name of the menu item.
  price: number; // Price of the menu item.
  imageUrl: string; // URL for the image of the menu item.
  categoryId: number; // Identifier for the category this menu item belongs to.
  vegan: boolean; // Indicates whether the item is vegan.
  glutenFree: boolean; // Indicates whether the item is gluten-free.
  size: string; // Size of the menu item.
  extraSauce: boolean; // Indicates if extra sauce is added.
  quantity?: number; // Optional quantity for bulk operations.
  ingredients: { [key: number]: number }; // Ingredients and their quantities.
}

/**
 * Represents a category of items.
 * @interface
 */
export interface ItemCategory {
  id?: number; // Optional unique identifier for the category.
  name: string; // Name of the category.
}

/**
 * Represents an order made by a user.
 * @interface
 */
export interface Order {
  id?: number; // Optional unique identifier for the order.
  price: number; // Total price of the order.
  time: string; // Timestamp of the order.
  userId: number; // Identifier of the user who made the order.
  status: string; // Current status of the order.
  items?: Record<number, number>; // Record of item ids and their quantities.
}

/**
 * Represents an ingredient used in menu items.
 * @interface
 */
export interface Ingredient {
  id?: number; // Optional unique identifier for the ingredient.
  name: string; // Name of the ingredient.
  stock: number; // Quantity in stock.
  restock: number; // Quantity to be restocked.
  amountOrdered: number; // Amount of ingredient ordered.
  price: number; // Price of the ingredient.
  glutenFree: boolean; // Indicates whether the ingredient is gluten-free.
  vegan: boolean; // Indicates whether the ingredient is vegan.
  quantity?: number; // Optional quantity for bulk operations.
}

/**
 * Represents a user in the system.
 * @interface
 */
export interface User {
  id?: number; // Optional unique identifier for the user.
  username: string; // Username of the user.
  password: string; // Password of the user.
  email: string; // Email of the user.
  role: string; // Role of the user in the system.
}

/**
 * Represents the main state and operations of the menu store.
 * @interface
 */
interface Store {
  /**
   * Processes a checkout operation, clearing the cart and creating an order.
   */
  checkout: () => void;

  /**
   * Adds a new item to the shopping cart.
   * @param id - The unique identifier of the item to be added.
   */
  addCartEntry: (id: number) => void;

  /**
   * Increments the quantity of a specific item in the cart.
   * @param id - The unique identifier of the item.
   */
  incrementCartEntryQuantity: (id: number) => void;

  /**
   * Decrements the quantity of a specific item in the cart.
   * @param id - The unique identifier of the item.
   */
  decrementCartEntryQuantity: (id: number) => void;

  /**
   * Updates a specific menu item.
   * @param id - The unique identifier of the item to be updated.
   * @param newItem - The new data for the item.
   */
  changeItem: (id: number, newItem: MenuItem) => void;

  /**
   * Deletes a specific menu item.
   * @param id - The unique identifier of the item to be deleted.
   */
  deleteMenuItem: (id: number) => void;

  /**
   * Sets the list of ingredients.
   * @param ingredients - The new list of ingredients.
   */
  setIngredients: (ingredients: Ingredient[]) => void;

  /**
   * Updates a specific ingredient.
   * @param id - The unique identifier of the ingredient to be updated.
   * @param newIngredient - The new data for the ingredient.
   */
  changeIngredient: (id: number, newIngredient: Ingredient) => void;

  /**
   * Deletes a specific ingredient.
   * @param id - The unique identifier of the ingredient to be deleted.
   */
  deleteIngredient: (id: number) => void;

  /**
   * Adds a new menu item.
   * @param item - The menu item to be added.
   */
  addMenuItem: (item: MenuItem) => void;

  /**
   * Adds a new ingredient.
   * @param ingredient - The ingredient to be added.
   */
  addIngredient: (ingredient: Ingredient) => void;

  menuItems: MenuItem[]; // List of all menu items.
  cart: CartEntry[]; // The current state of the shopping cart.
  itemCategories: ItemCategory[]; // List of all item categories.
  ingredients: Ingredient[]; // List of all ingredients.
}

let menuItemsResponse: Promise<MenuItem[]> = axios
  .get("/menuItems")
  .then((res) => res.data, handleErrorsNoRedirect);
let menuItems: MenuItem[] = await menuItemsResponse;
let itemCategoriesPromise: Promise<ItemCategory[]> = axios
  .get("/itemCategories")
  .then((res) => res.data, handleErrorsNoRedirect);
let itemCategories: ItemCategory[] = await itemCategoriesPromise;
let ingredientsPromise: Promise<Ingredient[]> = axios
  .get("/ingredients")
  .then((res) => res.data, handleErrorsNoRedirect);
let ingredients: Ingredient[] = await ingredientsPromise;
console.log("ingredients", ingredients);

/**
 * Represents the store used for managing menu items, ingredients, and cart in the frontend.
 */
export const useMenuStore = create<Store>((set) => ({
  cart: [],
  itemCategories: itemCategories,
  menuItems: menuItems,
  ingredients: ingredients,
  setIngredients: (ingredients: Ingredient[]) => set({ ingredients }),
  setMenuItems: (items: MenuItem[]) => set({ menuItems: items }),

  addMenuItem: (item: MenuItem) => {
    axios.post("/menuItems", {
      ...item,
      ingredientIds: [],
      quantities: [],
    });
    set((state) => ({ menuItems: [...state.menuItems, item] }));
  },

  checkout: () => {
    set((state) => {
      let items: any = {};
      state.cart.map((entry) => {
        items[entry.itemId] = entry.quantity;
      });
      axios
        .post("/orders", {
          price: state.cart.reduce((acc, entry) => {
            const item = state.menuItems.find(
              (item) => item.id === entry.itemId
            );
            if (item) {
              return acc + item.price * entry.quantity;
            } else {
              return acc;
            }
          }, 0),
          time: new Date().toISOString(),
          userId: 0, // TODO: SETUP USER SYSTEM, IF IT IS JUST THE CUSTOMER THEN IT IS 0
          items,
        })
        .then((res) => {
          console.log(res);
        }, handleErrors);
      return {
        cart: [],
      };
    });
  },

  addCartEntry: (id: number) => {
    set((state) => {
      if (state.cart.findIndex((entry) => entry.itemId === id) === -1) {
        return {
          cart: [...state.cart, { itemId: id, quantity: 1 }],
        };
      } else {
        return {
          cart: state.cart.map((entry) => {
            if (entry.itemId === id) {
              return { ...entry, quantity: entry.quantity + 1 };
            } else {
              return entry;
            }
          }),
        };
      }
    });
  },
  incrementCartEntryQuantity: (id: number) => {
    set((state) => ({
      cart: state.cart
        .map((entry) => {
          if (entry.itemId == id) {
            return { ...entry, quantity: entry.quantity + 1 };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0),
    }));
  },
  decrementCartEntryQuantity: (id: number) => {
    set((state) => ({
      cart: state.cart
        .map((entry) => {
          if (entry.itemId == id) {
            return { ...entry, quantity: entry.quantity - 1 };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0),
    }));
  },
  changeItem: (id: number, newItem: MenuItem) => {
    axios.post("/menuItems", {
      ...newItem,
      id,
    });
    return set((state) => ({
      menuItems: state.menuItems.map((item) => {
        if (item.id === id) {
          return { ...newItem, id };
        }
        return item;
      }),
      cart: state.cart,
      itemCategories: state.itemCategories,
    }));
  },

  deleteMenuItem: (id: number) => {
    axios.delete("/menuItems", { params: { id } });
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id),
    }));
  },

  addIngredient: (ingredient: Ingredient) => {
    axios.post("/ingredients", {
      ...ingredient,
    });
    set((state) => ({ ingredients: [...state.ingredients, ingredient] }));
  },

  changeIngredient: (id: number, newIngredient: Ingredient) => {
    axios.post("/ingredients", {
      ...newIngredient,
      id,
    });
    return set((state) => ({
      ingredients: state.ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          return { ...newIngredient, id };
        }
        return ingredient;
      }),
      cart: state.cart,
      itemCategories: state.itemCategories,
    }));
  },

  deleteIngredient: (id: number) => {
    axios.delete("/ingredients", { params: { id } });
    set((state) => ({
      ingredients: state.ingredients.filter((item) => item.id !== id),
    }));
  },
}));
