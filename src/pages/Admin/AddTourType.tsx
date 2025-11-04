import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourModel } from "@/components/modules/Admin/TourType/AddTourModel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetTourTypeQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/Tour/tour.api";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

function AddTourType() {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(2);

  const { data, isError, isLoading, refetch } = useGetTourTypeQuery({
    page: currentPage,
    limit,
  });

  // console.log("Tour Type API Response:", data);

  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing......");

    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Removed", { id: toastId });
        refetch();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to remove tour type", { id: toastId });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching tour types.</p>;

  const tourTypes = Array.isArray(data?.data?.data) ? data.data.data : [];
  const totalPage = data?.data?.meta?.totalPage || 1;

  return (
    <div className=" max-w-7xl mx-auto px-5 w-full">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourModel />
      </div>
      <div className="border border-muted rounded-md">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tourTypes.map((item: { _id: string; name: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell className="font-medium">
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size="sm">
                      <Trash2Icon />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end m-4">
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink
                      isActive={page === currentPage}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default AddTourType;
