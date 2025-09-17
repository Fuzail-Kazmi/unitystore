<<<<<<< HEAD:ui/src/app/(features)/_api/product.ts
import { API_URL } from "../../../_api/index";
=======
import { API_URL } from "../../_api/index";
>>>>>>> 1cacfdbb913508e9275751d7c01e0ded61b01dbd:ui/src/api/product.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProductsList = () => {
    return useQuery({
        queryKey: ['get-products'],
        queryFn: async () => {
            console.log("Fetching products from:", `${API_URL}api/products/`);
            const { data } = await axios.get(`${API_URL}api/products/`);
            return data;
        },
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
        retry: 1,
    });
};

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}api/products/${id}/`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useProductReviews = (id: string) => {
  return useQuery({
    queryKey: ["product-reviews", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}reviews/?product=${id}`);
      return data;
    },
    enabled: !!id,
  });
};

