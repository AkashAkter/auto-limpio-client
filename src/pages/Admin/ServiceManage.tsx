import AddService from "@/components/ServiceManageMent/AddService";
import DeleteService from "@/components/ServiceManageMent/DeleteService";
import EditService from "@/components/ServiceManageMent/EditService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetServicesQuery } from "@/redux/features/service/service.api";
import { trimText } from "@/utils/trimText";
import { formatDistanceToNow } from "date-fns";
import { ListOrderedIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

const ServiceManage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const { data, isFetching } = useGetServicesQuery({
    searchTerm,
    limit,
    page,
    sort,
  });

  return (
    <div className="w-full bg-black text-white">
      <div className="my-6 px-6">
        <h1 className="text-2xl font-bold">Service Management</h1>
        <p className="text-gray-400">Manage your services</p>
      </div>
      <div className="flex items-center justify-between px-6 mt-6 flex-wrap gap-4">
        <form
          className="flex w-[350px]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            setSearchTerm(form.search.value);
          }}
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-5 text-gray-400" />
            </div>
            <Input
              type="search"
              name="search"
              placeholder="Search..."
              className="block w-full p-4 pl-10 text-sm text-white bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              onBlur={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" variant="secondary" className="ml-2">
            Search
          </Button>
        </form>
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Select onValueChange={(e) => setLimit(Number(e))}>
            <SelectTrigger>
              <ListOrderedIcon className="h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Limit per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Content limit</SelectLabel>
                <SelectItem value="10">Limit: 10</SelectItem>
                <SelectItem value="20">Limit: 20</SelectItem>
                <SelectItem value="30">Limit: 30</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setSort}>
            <SelectTrigger>
              <ListOrderedIcon className="h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="-createdAt">New first</SelectItem>
                <SelectItem value="createdAt">Old first</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <AddService />
        </div>
      </div>
      <main className="p-6">
        <Card className="bg-gray-900">
          <CardContent className="relative">
            <Table className="text-white">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((service) => {
                  const { _id, description, duration, name, price, createdAt } =
                    service;
                  return (
                    <TableRow key={_id}>
                      <TableCell className="font-medium">{name}</TableCell>
                      <TableCell>{trimText(description, 30)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-600 text-green-200 font-bold"
                        >
                          {duration} Min
                        </Badge>
                      </TableCell>
                      <TableCell>${price}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(createdAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <EditService data={service} />
                          <DeleteService id={_id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {isFetching && (
              <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                <span className="text-primaryMat">Loading...</span>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <div className="w-full px-6 flex items-center justify-start gap-2 text-white">
        <p>Page:</p>
        <Pagination className="w-fit mx-0">
          <PaginationContent>
            {Array.from({
              length: Math.ceil((data?.totalDoc || 0) / limit),
            }).map((_, i) => (
              <PaginationItem key={`page-${i}`}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${
                    page === i + 1
                      ? "bg-primary text-muted hover:bg-primary"
                      : "text-primary"
                  } border border-primary`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ServiceManage;
