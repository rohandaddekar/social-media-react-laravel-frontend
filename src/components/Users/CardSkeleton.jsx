import { Skeleton } from "@/components/ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <div className="border rounded-lg">
      <div className="relative flex justify-center">
        <Skeleton className="rounded-t-lg h-20 w-full object-cover" />
        <Skeleton className="absolute w-20 h-20 top-1/2 rounded-full border-[3px] border-white" />
      </div>

      <div className="mt-10 p-5 pt-1">
        <Skeleton className="block text-center text-lg font-semibold w-full h-6" />
        <Skeleton className="text-center text-gray-500 text-xs w-full h-4 mt-1" />

        <div className="pt-5">
          <ul className="max-w-[200px] mx-auto flex items-center justify-between">
            <li className="text-sm text-gray-500 flex items-center justify-between w-full h-4 mr-2">
              <Skeleton className="w-full h-full" />
            </li>
            <li className="text-sm text-gray-500 flex items-center justify-between w-full h-4">
              <Skeleton className="w-full h-full" />
            </li>
          </ul>
        </div>

        <Skeleton className="w-full mt-3 h-10" />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
