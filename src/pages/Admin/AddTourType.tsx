import { useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";

function AddTourType() {
  const { data } = useGetTourTypeQuery(undefined);

  console.log("Get all tour type:", data);
  return <div>Add Tour Type</div>;
}

export default AddTourType;
