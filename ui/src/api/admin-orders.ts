// api/adminOrders.ts
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/_api/axiosClient";

// -------- Get All Orders (Admin) --------
export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {  
      const res = await axiosClient.get("api/admin/orders");
      return res.data;
    },
  });
};

// -------- Get Single Order (Admin) --------
export const useAdminOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ["adminOrderDetail", orderId],
    queryFn: async () => {
      const res = await axiosClient.get(`api/admin/orders/${orderId}`);
      return res.data;
    },
    enabled: !!orderId, 
  });
};

// -------- Accept / Reject Order (Admin) --------
export const useOrderAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, action }: { orderId: string; action: string }) => {
      const res = await axiosClient.put(`api/admin/orders/${orderId}/action/`, { action });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
    },
  });
};
