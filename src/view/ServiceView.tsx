import ServiceCard from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetServicesQuery } from "@/redux/features/service/service.api";

import { IService } from "@/types/service";
import Loader from "@/utils/Loader";
import debounce from "lodash/debounce";
import { ListOrderedIcon } from "lucide-react";
import { useMemo, useState } from "react";

const ServiceView = () => {
  // filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [priceInputState, setPriceInputState] = useState<[number, number]>([
    0, 0,
  ]);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetServicesQuery({
    min: priceRange[0],
    max: priceRange[1],
    page: currentPage,
    searchTerm,
    sort,
  });

  const handleClearFilters = () => {
    setPriceRange([0, 0]);
    setSearchTerm("");
    setPriceInputState([0, 0]);
    setSort("");
  };

  const handleChangePriceState = (value: string, index: 0 | 1) => {
    const number = parseInt(value);
    const replica: [number, number] = [...priceInputState];
    replica[index] = number;
    setPriceInputState(replica);
  };

  // => debouncing
  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <Loader className="!h-[100vh]" />;
  }
  if (isError) {
    return <div>Something went wrong while fetching product</div>;
  }

  return (
    <div className="layout_container bg-black mx-auto px-4 py-8 sm:px-6 md:py-12 min-h-[100vh]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
        <div className="space-y-6 bg-black border-2 border-gray-800 p-10 rounded-lg shadow-md">
          <div className="text-white">
            <h3 className="mb-2 text-lg font-semibold">Explore</h3>
            <Input
              type="text"
              placeholder="Search destinations..."
              onChange={handleSearchChange}
              className="bg-gray-900 text-white"
            />
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Budget Range
            </h3>
            <div />
            <div className="w-full flex-col gap-2">
              <div className="mt-2 flex items-center gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  min={0}
                  value={priceInputState[0] || ""}
                  onChange={(e) => handleChangePriceState(e.target.value, 0)}
                  className="bg-gray-900 text-white"
                />
                <Input
                  placeholder="Max"
                  value={priceInputState[1] || ""}
                  min={0}
                  type="number"
                  onChange={(e) => handleChangePriceState(e.target.value, 1)}
                  className="bg-gray-900 text-white"
                />
              </div>
              <Button
                className="w-full text-white font-bold bg-primaryMat border-2 hover:bg-black hover:border-primaryMat hover:text-white mt-2 rounded-md"
                onClick={() => setPriceRange(priceInputState)}
              >
                Apply
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            className="bg-stone-950 text-white border-2 border-gray-600 hover:bg-gray-700"
            onClick={handleClearFilters}
          >
            Reset Filters
          </Button>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between gap-[20px]">
            <h1 className="text-2xl font-bold text-white">Services</h1>
            <div className="flex items-center gap-4">
              <Select onValueChange={(e) => setSort(e)} value={sort}>
                <SelectTrigger>
                  <ListOrderedIcon className="h-4 w-4" />
                  <SelectValue placeholder="Sort product" />
                </SelectTrigger>
                <SelectGroup className="w-[100px]">
                  <SelectContent>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="-price">Price: High to Low</SelectItem>
                  </SelectContent>
                </SelectGroup>
              </Select>
            </div>
          </div>
          {data?.data?.length && data?.data?.length > 0 ? (
            <div className="griProductResponsive w-full gap-[15px] justify-items-center sm:justify-items-start">
              <>
                {data?.data?.map((data: IService, i: number) => (
                  <ServiceCard service={data} key={i + "product"} />
                ))}
              </>
            </div>
          ) : (
            <div /> // not found
          )}
        </div>
      </div>
      <Pagination className="mt-[20px]">
        <PaginationContent>
          {Array.from({ length: Math.ceil((data?.totalDoc || 0) / 10) }).map(
            (_, i) => (
              <PaginationItem key={i + "page"}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${
                    currentPage === i + 1
                      ? "bg-primaryMat text-black hover:bg-primaryMat hover:text-black"
                      : "text-primaryMat"
                  } border-[1px] border-primaryMat`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default ServiceView;
