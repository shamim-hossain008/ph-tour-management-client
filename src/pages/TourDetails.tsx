import { Button } from "@/components/ui/button";
import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { Link, useParams } from "react-router";

function TourDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetAllToursQuery({ _id: id });

  const tourData = data?.[0];
  console.log("tour Data:", tourData);

  if (isLoading) {
    return <p>Loading............</p>;
  }
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center  mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-4">
            <span>📍 {tourData?.location}</span>
            <span>💰 From ${tourData?.costFrom}</span>
            <span>👥 Max {tourData?.maxGuest} guests</span>
          </div>
        </div>
        <div>
          <Button asChild>
            <Link to={`/booking/${tourData?._id}`}>Book Now</Link>
          </Button>
        </div>
      </div>
      {/* Image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md-8">
        {tourData?.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${tourData?.title} ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}

export default TourDetails;
