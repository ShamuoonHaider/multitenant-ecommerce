"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../../hooks/use-cart";
import { useEffect } from "react";
import { toast } from "sonner";

interface checkoutViewProps {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: checkoutViewProps) => {
  const { productIds, clearAllCarts } = useCart(tenantSlug);
  const trpc = useTRPC();
  const { data, error } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  useEffect(() => {
    if (!error) return;
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearAllCarts]);
  return (
    <div className="lg:pt-16 pt-4 lg:px-12">
      <div className="grid gird-cols-1 lg:gird-cols-7 lg:gap-6 gap-4">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
