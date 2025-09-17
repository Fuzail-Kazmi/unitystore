"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
<<<<<<< HEAD
import { store } from "../_store/store";
=======
import { store } from "../store/store";
>>>>>>> 1cacfdbb913508e9275751d7c01e0ded61b01dbd

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
