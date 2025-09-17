"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD:ui/src/app/(features)/_api/orders.ts
import axiosClient from "../../../_api/axiosClient";
=======
import axiosClient from "../../_api/axiosClient";
>>>>>>> 1cacfdbb913508e9275751d7c01e0ded61b01dbd:ui/src/api/orders.ts

// -------- Create Order --------
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosClient.post("api/orders/create/");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// -------- Fetch Orders (list) --------
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosClient.get("api/orders");
      return res.data;
    },
  });
};

// -------- Fetch Single Order --------
export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const res = await axiosClient.get(`api/orders/${orderId}/`);
      return res.data;
    },
  });
};
