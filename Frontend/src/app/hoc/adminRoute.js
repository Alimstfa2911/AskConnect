"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") router.push("/");
  }, [isLoggedIn, user]);

  if (!isLoggedIn || user?.role !== "admin") return null;
  return <>{children}</>;
}
