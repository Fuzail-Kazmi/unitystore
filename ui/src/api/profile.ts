"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/_api/axiosClient";

// -------- Fetch Profile --------
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosClient.get("api/profile");
      return res.data;
    },
  });
};

// -------- Update Profile --------
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      first_name?: string;
      last_name?: string;
      phone_number?: string;
      profile_picture?: File;
    }) => {
      const formData = new FormData();
      if (data.first_name) formData.append("first_name", data.first_name);
      if (data.last_name) formData.append("last_name", data.last_name);
      if (data.phone_number) formData.append("phone_number", data.phone_number);
      if (data.profile_picture) formData.append("profile_picture", data.profile_picture);

      const res = await axiosClient.put("api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
