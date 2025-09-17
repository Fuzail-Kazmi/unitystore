  "use client";

  import { useEffect } from "react";
<<<<<<<< HEAD:ui/src/_hooks/index.ts
  import { useAppSelector, useAppDispatch } from "@/_store/hooks";
  import { loadFromStorage, logout } from "@/_store/authSlice";
========
  import { useAppSelector, useAppDispatch } from "@/store/hooks";
  import { loadFromStorage, logout } from "@/store/authSlice";
>>>>>>>> 1cacfdbb913508e9275751d7c01e0ded61b01dbd:ui/src/hooks/index.ts
  import { useRouter } from "next/navigation";

  export function useAuth() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
      dispatch(loadFromStorage());
    }, [dispatch]);

    const handleLogout = () => {
    dispatch(logout())
    router.replace("/login");
    };

    return { isAuthenticated, user, handleLogout };
  }

