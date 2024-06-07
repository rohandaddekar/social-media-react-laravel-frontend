import { Skeleton } from "@/components/ui/skeleton";

const NotificationCardSkeleton = () => {
  return (
    <li className="text-sm p-3 cursor-pointer flex gap-3 border-b">
      <Skeleton className="w-14 h-10 rounded-full" />
      <div className="w-full">
        <Skeleton className="text-sm w-40 h-5" />
        <Skeleton className="text-xs text-gray-500 mt-1 w-20 h-4" />
      </div>
    </li>
  );
};

export default NotificationCardSkeleton;
