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
import { useGetTourTypeQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

function AddTourType() {
  const { data } = useGetTourTypeQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation()

    const handleRemoveTourType = async(tourId:string)=>{ 
        const toastId = toast.loading("Removing......")

        try {
            const res = await removeTourType(tourId).unwrap() 
            
            if(res.success){
                toast.success("Removed",{id:toastId})
            }

            
        } catch (error) {
            
            console.error(error)
        }
    }
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
            {data?.data?.map((item: {_id:string, name: string }) => (
              <TableRow>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell className="font-medium">
                  <DeleteConfirmation onConfirm={()=>handleRemoveTourType(item._id)}>
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
    </div>
  );
}

export default AddTourType;
