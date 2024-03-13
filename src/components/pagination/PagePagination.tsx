import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";
type TProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
  className: string;
};
export function PagePagination({
  currentPage,
  setCurrentPage,
  totalPage,
  className,
}: TProps) {
  const page = [...Array(totalPage)].map((_, index) => index + 1);
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`cursor-pointer ${currentPage === 1 && "invisible"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
          />
        </PaginationItem>

        {page.slice(0, 3).map((item, index) => (
          <PaginationItem
            key={index}
            className={`${currentPage === item && "bg-blue-600"}`}
          >
            <PaginationLink
              className="cursor-pointer"
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPage > 2 && (
          <>
            {totalPage > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page.slice(-2).map((item, index) => (
              <PaginationItem
                key={index}
                className={`${currentPage === item && "bg-blue-600"}`}
              >
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
          </>
        )}

        <PaginationItem>
          <PaginationNext
            className={`cursor-pointer ${currentPage === totalPage && "invisible"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
