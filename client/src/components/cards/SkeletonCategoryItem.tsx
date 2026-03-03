export function SkeletonCategoryItem() {
  return (
    <div className="flex flex-col items-center gap-1 w-14 animate-pulse">
      {/* Icon Circle Skeleton */}
      <div className="relative w-14 h-14 m-1 rounded-full bg-gray-200 shrink-0"></div>
      
      {/* Category Name Skeleton */}
      <div className="h-2 w-10 bg-gray-200 rounded-full mt-0.5"></div>
    </div>
  );
}