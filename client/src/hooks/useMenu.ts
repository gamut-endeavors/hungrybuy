import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { MenuItem } from "@/lib/types";
import { AxiosError } from "axios";

interface UseFullMenuProps {
    user: { name: string, phone: string } | null;
    handleAuthError: (error: AxiosError, message?: string) => void;
}

export function useFullMenu({ user, handleAuthError }: UseFullMenuProps) {
    const [allProducts, setAllProducts] = useState<MenuItem[]>([]);
    const [isMenuLoading, setIsMenuLoading] = useState(false);

    useEffect(() => {
        if (!user) return;

        const fetchFullMenu = async () => {
            try {
                setIsMenuLoading(true);

                const res = await api.get("/menu");

                const dbProducts = res.data.data.items.map((p: MenuItem) => ({
                    ...p,
                    qty: 42,
                }));

                setAllProducts(dbProducts);
            } catch (error) {
                const err = error as AxiosError;
                handleAuthError(err, "Failed to load full menu");
            } finally {
                setIsMenuLoading(false);
            }
        };

        fetchFullMenu();
    }, [user, handleAuthError]);

    return {
        allProducts,
        isMenuLoading,
    };
}