import { Skeleton } from "@/components/ui/skeleton";

const LeftSideSkeleton = () => {
  return (
    <>
      <div className="relative flex justify-center">
        <Skeleton className="rounded-t-lg h-20 w-full object-cover" />
        <Skeleton className="absolute w-20 h-20 top-1/2 rounded-full border-[3px] border-white" />
      </div>

      <div className="mt-10 p-5 pt-1">
        <div className="border-b pb-5">
          <Skeleton className="block text-center h-6 w-48 mx-auto" />
          <Skeleton className="block text-center h-4 w-32 mx-auto mt-2" />
        </div>

        <div className="pt-5">
          <ul>
            <li className="flex items-center justify-between mb-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-10" />
            </li>
            <li className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-10" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftSideSkeleton;
