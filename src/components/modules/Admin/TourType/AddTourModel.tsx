import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddTourTypeMutation } from "@/redux/features/Tour/tour.api";
import type { TAddTourTypeForm } from "@/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddTourModel() {
  const form = useForm<TAddTourTypeForm>({
    defaultValues: { name: "" },
  });
  const [addTourType] = useAddTourTypeMutation();

  const onSubmit = async (data: TAddTourTypeForm) => {
    const res = await addTourType({ name: data?.name }).unwrap();

    if (res.success) {
      toast.success("Tour Type Added");
      form.reset();
    }
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Tour Type</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tour Type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Type Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Type Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-tour-type">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
