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
import { useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";
import { Trash2Icon } from "lucide-react";

function AddTourType() {
  const { data } = useGetTourTypeQuery(undefined);

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
            {data?.data?.map((item: { name: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell className="font-medium">
                  <Button size="sm">
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AddTourType;
