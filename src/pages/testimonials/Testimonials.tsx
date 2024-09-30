import { StarRating } from "@/components/home/Reviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useGetReviewsQuery } from "@/redux/features/review/review.api";
import { format } from "date-fns";
import { useState } from "react";

const Testimonials = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetReviewsQuery({ limit: 10, page });

  return (
    <div className="layout_container py-10 min-h-screen">
      <div className="text-center text-white mb-8">
        <p className="text-primaryMat">
          <span>-------</span> VOICES OF OUR VALUED CLIENTS <span>-------</span>
        </p>
        <h1 className="text-5xl font-bold">Customer Insights</h1>
      </div>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data?.data?.map(({ _id, comment, rating, createdAt, user }) => {
          const date = format(
            new Date(createdAt || "11--11-202"),
            "MMM dd yyyy"
          );

          return (
            <Card
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(0, 0, 0, 0.7))", // Dark gradient for black theme
              }}
              className="border hover:shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-blue-500 p-10"
              key={_id}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{user?.firstName}</p>
                      <p className="font-medium text-sm">{date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <StarRating rating={rating} />
                  </div>
                </div>
                <p className="text-white mt-4">{comment}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-center gap-4 mt-8">
        <p>Page:</p>
        <Pagination className="w-fit mx-0">
          <PaginationContent>
            {Array.from({ length: Math.ceil((data?.totalDoc || 0) / 10) }).map(
              (_, i) => (
                <PaginationItem key={i + "page"}>
                  <PaginationLink
                    onClick={() => setPage(i + 1)}
                    className={`${
                      page === i + 1
                        ? "bg-primary text-muted hover:bg-primary"
                        : "text-primary"
                    } border border-primary p-2 rounded`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Testimonials;
