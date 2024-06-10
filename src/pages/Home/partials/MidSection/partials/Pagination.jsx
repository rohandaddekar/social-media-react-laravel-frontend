/* eslint-disable react/prop-types */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PostPagination = ({ data, reFetchAllPosts }) => {
  return (
    <>
      <div className="mt-5">
        <Pagination>
          <PaginationContent>
            {data?.links?.map((link, i) =>
              link?.label === "&laquo; Previous" ? (
                <PaginationItem
                  key={i}
                  className={`${
                    data?.prev_page_url
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    link.url && reFetchAllPosts("?" + link.url.split("?")[1]);
                    window.scrollTo(0, 0);
                  }}
                >
                  <PaginationPrevious />
                </PaginationItem>
              ) : link?.label === "Next &raquo;" ? (
                <PaginationItem
                  key={i}
                  className={`${
                    data?.next_page_url
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    link.url && reFetchAllPosts("?" + link.url.split("?")[1]);
                    window.scrollTo(0, 0);
                  }}
                >
                  <PaginationNext />
                </PaginationItem>
              ) : (
                <PaginationItem key={i} className="cursor-pointer">
                  <PaginationLink
                    isActive={link?.active}
                    onClick={() => {
                      link.url && reFetchAllPosts("?" + link.url.split("?")[1]);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {link?.label}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default PostPagination;
