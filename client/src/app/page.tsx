"use client";

import Header from "@/components/layout/Header";
import SectionTitle from "@/components/ui/SectionTitle";
import Categories from "@/components/sections/Categories";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import ProductDialog from "@/components/ui/ProductDialog";
import Loading from "@/components/other/Loading";
import { MenuItem } from "@/lib/types";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useCart } from "@/hooks/useCart";
import QRHandler from "@/components/auth/QRHandler";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useApiAuthError } from "@/hooks/useApiAuthError";
import SortBy from "@/components/ui/SortBy";
import HomeSearchHandler from "@/components/search/HomeSearchHandler";
import SearchOverlay from "@/components/search/SearchOverlay";

import { useCategories } from "@/hooks/useCategory";
import { useFullMenu } from "@/hooks/useMenu";

export default function Home() {
  const [tableParam, setTableParam] = useState<string | null>(null);
  const [highlightIdFromUrl, setHighlightIdFromUrl] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();
  const { isLoading, user } = useAuth();
  const { handleAuthError } = useApiAuthError();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("popular");

  const { cart, addToCart, updateQuantity, resolveTableFromToken } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  const { categories, isCategoriesLoading } = useCategories(user, handleAuthError);

  const { allProducts, isMenuLoading } = useFullMenu({
    user,
    handleAuthError,
  });

  const displayedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory);
    }

    if (dietFilter !== "all") {
      const dietValue = dietFilter === "veg" ? "VEG" : "NON_VEG";
      filtered = filtered.filter((p) => p.foodType === dietValue);
    }

    if (sortOrder !== "popular") {
      filtered.sort((a, b) => {
        if (sortOrder === "asc") return a.price! - b.price!;
        if (sortOrder === "desc") return b.price! - a.price!;
        return 0;
      });
    }

    return filtered;
  }, [allProducts, selectedCategory, dietFilter, sortOrder]);

  useEffect(() => {
    if (!isLoading && !user) {
      const params = new URLSearchParams(window.location.search);
      const urlTable = params.get('table');

      if (urlTable) {
        localStorage.setItem("pending_table_scan", urlTable);
      } else if (tableParam) {
        localStorage.setItem("pending_table_scan", tableParam);
      }

      router.push("/login");
    }
  }, [isLoading, user, router, tableParam]);

  useEffect(() => {
    if (user) {
      const pendingTable = localStorage.getItem("pending_table_scan");
      if (pendingTable) {
        resolveTableFromToken(pendingTable);
        localStorage.removeItem("pending_table_scan");
        router.replace("/");
      }
    }
  }, [user, resolveTableFromToken, router]);

  useEffect(() => {
    if (user && tableParam) {
      resolveTableFromToken(tableParam);

      setTimeout(() => {
        setTableParam(null);

        const url = new URL(window.location.href);
        url.searchParams.delete('table');
        window.history.replaceState({}, '', url.toString());
      }, 50);
    }
  }, [user, tableParam, resolveTableFromToken]);

  useEffect(() => {

    if (highlightIdFromUrl) {
      const checkExist = setInterval(() => {
        const element = document.getElementById(`product-${highlightIdFromUrl}`);

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          clearInterval(checkExist);

          const url = new URL(window.location.href);
          url.searchParams.delete('highlight');
          url.searchParams.delete('categoryId');
          window.history.replaceState({}, '', url.toString());
        }
      }, 500);

      setTimeout(() => clearInterval(checkExist), 2000);
      return () => clearInterval(checkExist);
    }
  }, [highlightIdFromUrl, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      setTimeout(() => {
        const categoryElement = document.getElementById(`category-${selectedCategory}`);
        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }, 100);
    }
  }, [selectedCategory]);

  if (isLoading) return <Loading />;
  if (!user) return null;

  const getTotalCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getProductTotalQty = (productId: string) => {
    return cart
      .filter((item) => item.menuItem.id === productId)
      .reduce((acc, item) => acc + item.quantity, 0);
  };

  const findCartItem = (productId: string, variantId?: string) => {
    return cart.find(
      (item) =>
        item.menuItem.id === productId &&
        (variantId ? item.variant?.id === variantId : !item.variant),
    );
  };

  const increaseSingleItem = async (product: MenuItem) => {
    const existingItem = findCartItem(product.id);
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      await addToCart(product, 1);
    }
  };

  const decreaseSingleItem = async (productId: string) => {
    const existingItem = findCartItem(productId);
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity - 1);
    }
  };

  const handleDialogSave = async (quantities: Record<string, number>) => {
    if (!selectedProduct) return;

    for (const [variantLabel, newQty] of Object.entries(quantities)) {
      const variantObj = selectedProduct.variants?.find((v) => v.label === variantLabel);
      const variantId = variantObj?.id;

      if (!variantId) continue;

      const existingItem = findCartItem(selectedProduct.id, variantId);

      if (existingItem) {
        await updateQuantity(existingItem.id, newQty);
      } else if (newQty > 0) {
        await addToCart(selectedProduct, newQty, variantObj);
      }
    }
  };

  const handleCardAddClick = async (product: MenuItem) => {
    if (product.variants && product.variants.length > 0) {
      setSelectedProduct(product);
      setIsDialogOpen(true);
    } else {
      await addToCart(product, 1);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory("all");
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleCategoryFromUrl = (catId: string | null) => {
    if (catId) {
      setSelectedCategory(catId);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 30);
  };

  const currentCategoryName =
    selectedCategory === "all"
      ? "All Products"
      : categories.find((c) => c.id === selectedCategory)?.name || "Products";

  return (
    <main className="h-dvh w-full bg-white relative flex flex-col overflow-hidden">
      <Suspense fallback={null}>
        <QRHandler />
      </Suspense>

      <Suspense fallback={null}>
        <HomeSearchHandler
          onTableParam={setTableParam}
          onCategoryParam={handleCategoryFromUrl}
          onHighlightParam={setHighlightIdFromUrl}
        />
      </Suspense>

      {/* 1. Header Section */}
      <div className="w-full px-4 sm:px-6 shrink-0 z-20 bg-white pt-2">
        <Header
          cartCount={getTotalCartCount()}
          onCartClick={() => router.push("/cart")}
          onSearchOpen={() => setIsSearchOpen(true)}
          isScrolled={isScrolled}
        />
      </div>

      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide w-full flex flex-col relative" onScroll={handleScroll}>
        {/* 2. Categories */}
        <div className="px-4 sm:px-6">
          <Categories
            categories={categories}
            isLoading={isCategoriesLoading}
            selectedCategory={selectedCategory}
            onClickCategory={handleCategoryClick}
            activeDietFilter={dietFilter}
            onFilterChange={setDietFilter}
          />
        </div>

        {/* 4. Section Title & Sort By */}
        <div className="px-4 sm:px-6 mt-4 flex items-start justify-between">
          <SectionTitle
            categoryName={currentCategoryName}
            categorydescription={
              selectedCategory === "all"
                ? "Explore our delicious menu"
                : "Freshly made with premium ingredients"
            }
          />
          <div className="mt-1">
            <SortBy sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
        </div>

        {/* 5. Products List */}
        <div className="px-4 sm:px-6 pb-28">
          <FeaturedProducts
            products={displayedProducts}
            isLoading={isMenuLoading}
            getProductTotalQty={getProductTotalQty}
            onAddClick={handleCardAddClick}
            onIncrease={increaseSingleItem}
            onDecrease={decreaseSingleItem}
            onClearFilters={() => {
              setDietFilter("all");
              setSelectedCategory("all");
            }}
          />
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDialog
        key={selectedProduct?.id ? `${selectedProduct.id}-${isDialogOpen}` : "dialog-reset"}
        isOpen={isDialogOpen}
        product={selectedProduct}
        initialData={
          selectedProduct
            ? cart
              .filter((i) => i.menuItem.id === selectedProduct.id)
              .reduce((acc, item) => {
                if (item.variant) acc[item.variant.label] = item.quantity;
                return acc;
              }, {} as Record<string, number>)
            : {}
        }
        onClose={() => setIsDialogOpen(false)}
        onSave={handleDialogSave}
      />

      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} products={allProducts} isScrolled={isScrolled} />}
    </main>
  );
}