import { Skeleton } from "@/components/ui/skeleton";

const SuggestedUserCardSkeleton = () => {
  return (
    <div className="flex gap-3 border p-3 rounded-lg">
      <Skeleton className="min-w-12 h-12 rounded-full" />
      <div>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-36 mt-2" />
      </div>
    </div>
  );
};

export default SuggestedUserCardSkeleton;
