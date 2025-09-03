// app/(features)/_api/cart.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/app/_api/index";


// -------- Fetch Cart --------
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}api/cart/`);
      return res.data;
    },
  });
};

// -------- Add Item --------
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { product_id: string; quantity: number }) => {
      const res = await axios.post(`${API_URL}api/cart/add/`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); 
    },
  });
};

// -------- Update Item --------
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { item_id: string; quantity: number }) => {
      const res = await axios.patch(`${API_URL}api/cart/${payload.item_id}/`, {
        quantity: payload.quantity,
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
      const res = await axios.delete(`${API_URL}api/cart/${item_id}/remove/`);
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
      const res = await axios.post(`${API_URL}api/cart/clear/`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
