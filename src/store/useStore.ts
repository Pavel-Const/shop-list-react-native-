import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CATEGORIES} from "@/constants/categories";


type Category = {
  id: string;
  name: string;
  color?: string;
};
type Item = {
  id: string;
  title: string;
  done: boolean;
  categoryId?: string;
};

type List = {
  id: string;
  name: string;
  items: Item[];
};

type Store = {
  lists: List[];
  categories: Category[];
  addList: (name: string) => List;
  removeList: (id: string) => void;
  mode: "edit" | "shopping";
  setMode: (mode: "edit" | "shopping") => void;
  addItem: (listId: string, title: string, categoryId?: string) => void;
  toggleItem: (listId: string, itemId: string) => void;
  updateItem: (listId: string, itemId: string, title: string, categoryId?: string) => void;
  removeItem: (listId: string, itemId: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      lists: [],
      categories: CATEGORIES,
      mode: "edit",
      setMode: (mode) => set({mode}),
      addList: (name) => {
        const newList = {
          id: Date.now().toString(),
          name,
          items: [],
        };

        set((state) => ({
          lists: [...state.lists, newList],
        }));

        return newList;
      },

      removeList: (id) =>
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== id),
        })),

      addItem: (
        listId,
        title,
        categoryId
      ) => {
        const newItem: Item = {
          id: Date.now().toString(),
          title,
          done: false,

          categoryId,
        };

        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                ...list,
                items: [...list.items, newItem],
              }
              : list
          ),
        }));

        return newItem;
      },

      toggleItem: (listId, itemId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId
                    ? {...item, done: !item.done}
                    : item
                ),
              }
              : list
          ),
        })),

      removeItem: (listId, itemId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                ...list,
                items: list.items.filter((i) => i.id !== itemId),
              }
              : list
          ),
        })),
      updateItem: (
        listId,
        itemId,
        title,
        categoryId
      ) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId
                    ? {
                      ...item,
                      title,
                      categoryId,
                    }
                    : item
                ),
              }
              : list
          ),
        })),
    }),
    {
      name: "shopping-storage",
      
      storage: createJSONStorage(
        () => AsyncStorage
      ),
      
      partialize: (state) => ({
        lists: state.lists,
        mode: state.mode,
      }),
    }
  )
);