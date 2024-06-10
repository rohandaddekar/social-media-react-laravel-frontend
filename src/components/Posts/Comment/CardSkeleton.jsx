import { Skeleton } from "@/components/ui/skeleton";

const CommentCardSkeleton = () => {
  return (
    <div className="mt-2">
      <div className="flex gap-3 border p-3 rounded-lg">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[200px] mt-1" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-4 w-[80px] mt-1" />
              <Skeleton className="h-7 w-7 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-16 w-full mt-2 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CommentCardSkeleton;
