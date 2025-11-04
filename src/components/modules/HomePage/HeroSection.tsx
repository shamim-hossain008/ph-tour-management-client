import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { SelectLabel } from "@radix-ui/react-select";
import { useState } from "react";
import { Link } from "react-router";

export default function HeroSection() {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
    undefined
  );
  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionsQuery(undefined);

  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  return (
    <section className="relative overflow-hidden py-32 min-h-screen ">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
        />
      </div>
      <div className="container relative z-10 mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="bg-background/30 rounded-xl p-4 shadow-sm backdrop-blur-sm">
              <Logo />
            </div>
            <div>
              <h1 className="mb-6 text-pretty text-2xl font-bold tracking-tight lg:text-5xl">
                Explore the beauty of{" "}
                <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="text-muted-foreground mx-auto max-w-3xl lg:text-xl">
                Discover the breathtaking landscapes, rich culture, and hidden
                gems of Bangladesh — your next unforgettable adventure awaits!
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Select
                onValueChange={(value) => setSelectedDivision(value)}
                value={selectedDivision ? selectedDivision : ""}
                disabled={divisionIsLoading}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Divisions</SelectLabel>
                    {divisionOption?.map(
                      (item: { value: string; label: string }) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {selectedDivision ? (
                <Button type="button" asChild>
                  <Link to={`/tours?division=${selectedDivision}`}>Search</Link>
                </Button>
              ) : (
                <Button disabled>Search</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
