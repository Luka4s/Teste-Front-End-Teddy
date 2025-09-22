import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void; // callback para mudar página
}

const PaginationComponent = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationComponentProps) => {
  /* I created a list based on the total number of pages to navigate */

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              className={`cursor-pointer rounded-xs ${
                page === currentPage &&
                "bg-orange-color font-bold text-white border-white"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && <PaginationEllipsis />}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
