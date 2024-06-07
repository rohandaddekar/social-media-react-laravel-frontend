import { Skeleton } from "@/components/ui/skeleton";

const UserInfoSkeleton = () => {
  return (
    <div className="border rounded-lg pb-8">
      <div className="relative">
        <Skeleton className="rounded-t-lg h-32 w-full" />
        <Skeleton className="absolute w-32 h-32 -bottom-20 left-10 rounded-full border-4 border-white" />
      </div>

      <div className="ml-36 mt-5 px-10 flex items-start justify-between">
        <div>
          <Skeleton className="block text-xl font-semibold w-48 h-6" />
          <Skeleton className="text-gray-500 text-sm mt-1 w-64 h-4" />

          <div className="flex items-center gap-4 mt-2">
            <Skeleton className="text-sm px-2 py-1 rounded-md w-24 h-6" />
            <Skeleton className="text-sm px-2 py-1 rounded-md w-24 h-6" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-32 h-10" />
        </div>
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
