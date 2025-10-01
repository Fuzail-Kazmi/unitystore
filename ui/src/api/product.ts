import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/_api/axiosClient";

type ProductParams = {
  search?: string;
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  rating?: number;
  in_stock?: boolean;
  sort?: string;
};

type ProductPayload = {
  name: string;
  description?: string;
  price: number;
  brand?: string;
  category?: string;
  stock?: number;
  image?: string;
};

// ✅ Get Products List
export const useProductsList = (params?: ProductParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await axiosClient.get(`api/products/`, { params });
      return data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// ✅ Get Single Product
export const useProductDetails = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`api/products/${id}/`);
      console.log(data);
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// ✅ Get Product Reviews
export const useProductReviews = (id?: string) => {
  return useQuery({
    queryKey: ["product-reviews", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`api/products/${id}/reviews`);
      return data;
    },
    enabled: !!id,
  });
};

// ✅ Search Products
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: async () => {
      const { data } = await axiosClient.get(`api/products/`, {
        params: { search: query },
      });
      return data;
    },
    enabled: query.length > 0,
  });
};

// ✅ Create Product (POST)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ProductPayload) => {
      const { data } = await axiosClient.post(`api/products/`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// ✅ Update Product (PUT)
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: ProductPayload }) => {
      const { data } = await axiosClient.put(`api/products/${id}/`, payload);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};


// ✅ Delete Product (DELETE)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosClient.delete(`api/products/${id}/`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
