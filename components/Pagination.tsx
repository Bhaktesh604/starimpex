"use client";
import ReactPaginate from "react-paginate";

function Pagination({
  totalPage = 0,
  onPageChangeHandler = () => {},
}: {
  totalPage: number;
  onPageChangeHandler?: (page: number) => void;
}) {
  return (
    <div className="lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:w-full lg:bg-white lg:shadow-2xl z-10">
      <div
        className={`w-auto flex items-center justify-center opacity-0.4 rounded-b-lg`}
      >
        <span className="flex items-center">
          <ReactPaginate
            nextLabel={
              <span className="ml-6 flex gap-2 items-center justify-center w-9">
                Next
              </span>
            }
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={totalPage}
            previousLabel={
              <span className="mr-6 flex gap-2 items-center justify-center w-9">
                Prev
              </span>
            }
            renderOnZeroPageCount={null}
            containerClassName="flex items-center justify-center py-2"
            pageClassName="mx-2 text-sm text-tertiary text-opacity-80 w-9 h-9 max-[330px]:w-5 max-[330px]:h-5 flex items-center justify-center rounded-full"
            activeClassName={`text-white bg-tertiary`}
            onPageChange={(data) => {
              onPageChangeHandler(data.selected);
            }}
          />
        </span>
      </div>
    </div>
  );
}

export default Pagination;
