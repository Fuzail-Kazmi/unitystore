"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/_api/axiosClient";

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// -------- Fetch Addresses (list) --------
export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const res = await axiosClient.get("api/addresses");
      return res.data;
    },
  });
};

// -------- Create Address --------
export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newAddress: Omit<Address, "id">) => {
      const res = await axiosClient.post("api/addresses", newAddress);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

// -------- Update Address --------
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updated: Address) => {
      const res = await axiosClient.put(`api/addresses/${updated.id}`, updated);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
