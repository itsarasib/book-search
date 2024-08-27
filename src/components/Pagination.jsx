import React, { useContext } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookListsContext } from "@/contexts/bookListsContext";

const CustomPagination = () => {
  const { currentPage, totalPages, setCurrentPage } =
    useContext(BookListsContext);

  return (
    <div className="flex justify-center items-center gap-4 my-7">
      <Button
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
        className="bg-blue-500 text-white rounded-lg"
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">
        <p>Page</p>
        <Select
          onValueChange={(value) => setCurrentPage(parseInt(value))}
          value={currentPage.toString()}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder={currentPage} />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalPages }).map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p> of {totalPages}</p>
      </div>
      <Button
        onClick={() => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
          }
        }}
        className="bg-blue-500 text-white px-7 rounded-lg"
      >
        Next
      </Button>
    </div>
  );
};

export default CustomPagination;
