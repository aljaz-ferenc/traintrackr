import { create } from "zustand";
import type { User } from "@/core/types.ts";

type UserStore = {
	user: User | null;
	setUser: (user: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));

export default useUserStore;
