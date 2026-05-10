import {create} from "zustand";

type HeaderAction = {
  title?: string;
  onPress?: () => void;
  isVisible?: boolean;
};

type HeaderStore = {
  title: string;

  action: HeaderAction;

  setTitle: (title: string) => void;

  setAction: (action: HeaderAction) => void;

  clearAction: () => void;
};

export const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",

  action: {
    isVisible: false,
  },

  setTitle: (title) => set({title}),

  setAction: (action) => set({action}),

  clearAction: () =>
    set({
      action: {
        isVisible: false,
      },
    }),
}));