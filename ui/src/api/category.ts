"use client";

import { useQuery } from "@tanstack/react-query";
<<<<<<< HEAD:ui/src/app/(features)/_api/category.ts
import axiosClient from "../../../_api/axiosClient";
=======
import axiosClient from "../../_api/axiosClient";
>>>>>>> 1cacfdbb913508e9275751d7c01e0ded61b01dbd:ui/src/api/category.ts

export type Category = {
  id: string;
  name: string;
  parent: string | null;
  image: string;
  created_at: string;
  updated_at: string;
};

// -------- Fetch Categories --------
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosClient.get("api/categories");
      console.log(res.data)
      return res.data;
    },
  });
};
