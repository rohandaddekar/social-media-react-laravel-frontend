import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="py-5 border rounded-lg">
      <div className="px-5 flex gap-3">
        <Skeleton className="w-16 h-14 rounded-full" />
        <div className="w-full flex justify-between">
          <div>
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-3 w-[200px] mt-1" />
            <Skeleton className="h-3 w-[120px] mt-1" />
          </div>
          <Skeleton className="w-5 h-5" />
        </div>
      </div>
      <div className="px-5 mt-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </div>
      <div className="px-5 mt-3">
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="px-5 mt-3">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="border-t grid grid-cols-3 gap-x-5 pt-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
