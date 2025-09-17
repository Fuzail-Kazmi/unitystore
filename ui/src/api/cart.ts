import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD:ui/src/app/(features)/_api/cart.ts
import axiosClient from "../../../_api/axiosClient";
=======
import axiosClient from "../../_api/axiosClient";
>>>>>>> 1cacfdbb913508e9275751d7c01e0ded61b01dbd:ui/src/api/cart.ts

// -------- Fetch Cart --------
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosClient.get("api/cart/");
      return res.data;
    },
  });
};

// -------- Add Item --------
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { product_id: string; quantity: number }) => {
      const res = await axiosClient.post("api/cart/add/", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      throw error.response?.data?.detail || "Failed to add to cart";
    },
  });
};

// -------- Update Item --------
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { item_id: string; quantity: number }) => {
      const res = await axiosClient.patch(`api/cart/${payload.item_id}/`, {
        quantity: payload.quantity,
        action: "update",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// -------- Remove Item --------
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item_id: string) => {
      const res = await axiosClient.delete(`api/cart/${item_id}/remove/`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// -------- Clear Cart --------
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosClient.post("api/cart/clear/");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};