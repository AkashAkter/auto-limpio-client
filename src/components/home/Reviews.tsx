/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from "@/redux/features/review/review.api";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { FormEvent, useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { MdArrowRight } from "react-icons/md";
import Rating from "react-rating";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useAppSelector } from "@/redux/hook";
import { getRatingCounts } from "@/utils/getRatingCounts";
import { IReview } from "@/types/review";

const RatingBar = ({ data }: { data: IReview[] }) => {
  const review = getRatingCounts(data);
  return (
    <>
      {review.map(({ count, rating }, index) => (
        <div key={rating - index} className="flex items-center gap-2 mb-2">
          <div className="w-8 text-sm font-medium text-white">{rating}.0</div>
          <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primaryMat to-secondaryMat"
              style={{ width: `${(count / review.length) * 100}%` }}
            />
          </div>
          <div className="w-20 text-sm text-white">{count} reviews</div>
        </div>
      ))}
    </>
  );
};

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 ${
          star <= rating ? "text-primaryMat fill-primaryMat" : "text-gray-400"
        }`}
      />
    ))}
  </div>
);

const Review = ({
  name,
  rating,
  date,
  comment,
}: {
  name: string;
  rating: number;
  date: string;
  comment: string;
}) => {
  const dateTime = formatDistanceToNow(new Date(date || "11-11-2020"), {
    addSuffix: true,
  });
  return (
    <div className="py-4 border-b border-gray-600 flex-1 m-10">
      <div className="flex items-center gap-4 mb-2">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
          />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-sm text-gray-400">{dateTime}</div>
        </div>
        <div className="ml-auto flex items-center">
          <StarRating rating={rating} />
          <span className="ml-2 font-semibold text-white">{rating}.0</span>
        </div>
      </div>
      <p className="mb-2 text-gray-300">{comment}</p>
    </div>
  );
};

export default function ReviewComponent() {
  const [review, setReview] = useState<number>(1);
  const { data } = useGetReviewsQuery({ limit: 99999 });
  const { user } = useAppSelector((state) => state.auth);

  const [createReview] = useCreateReviewMutation();

  const handleRating = (rate: number) => setReview(rate);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return navigate("/login");
    }

    const toastID = toast.loading("Please wait...");
    try {
      const form = e.target as HTMLFormElement;
      const comment = form.feedback.value as string;
      if (!comment || comment.length < 15) {
        return toast.error("Review should be at least 15 characters");
      }
      await createReview({
        rating: review,
        comment,
      });
      toast.dismiss(toastID);
      toast.success("Review added", {
        description: "Thanks for your feedback",
      });
      form.reset();
    } catch {
      toast.error("Something went wrong while making this request");
    }
  };

  const RatingJsx = Rating as any;

  const rating = data?.data?.reduce((acc, cur) => acc + cur.rating, 0) || 0;
  const totalCount = data?.data?.length || 1;

  const avgRating = (rating / totalCount).toFixed(2);
  return (
    <section
      className="layout_container bg-black py-10 flex md:flex-row flex-col gap-8"
      id="review"
    >
      <Card className="w-full bg-gray-950 p-6">
        <CardHeader className="bg-gray-950">
          <CardTitle className="text-white text-xl">Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <h2 className="text-5xl text-white font-bold">{avgRating}</h2>
            <div className="flex-1 text-white">
              <RatingBar data={data?.data || []} />
            </div>
          </div>

          <div className="flex gap-4">
            {data?.data?.slice(0, 2)?.map((review, i) => (
              <Review
                key={i}
                name={`${review.user?.firstName} ${review.user?.lastName}`}
                rating={review.rating}
                date={review.createdAt}
                comment={review.comment}
              />
            ))}
          </div>

          <Link
            to={"/testimonials"}
            className="mt-4 mx-auto text-white text-center hover:underline flex items-center justify-center gap-1"
          >
            Read all reviews <MdArrowRight />
          </Link>
        </CardContent>
      </Card>
      <div className="bg-gray-950 border-2 border-gray-600 px-6 py-8 md:w-[40%] w-full rounded-lg">
        <h3 className="text-xl text-white font-bold mb-4">Write a Review</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <RatingJsx
            className="text-[30px]"
            emptySymbol={<GoStar className="text-primaryMat" />}
            fullSymbol={<GoStarFill className="text-primaryMat" />}
            onClick={handleRating}
          />
          <div>
            <Label htmlFor="feedback" className="mb-2 text-white">
              Feedback:
            </Label>
            <Textarea
              placeholder="Share your thoughts and experiences..."
              className="w-full rounded-lg border-2 border-gray-600 focus:border-primary focus:ring-primary"
              rows={4}
              name="feedback"
            />
          </div>
          <Button
            type="submit"
            className="mt-2 font-bold text-black bg-primaryMat hover:bg-black hover:text-primaryMat hover:border-2 hover:border-primaryMat"
          >
            Submit Review
          </Button>
        </form>
      </div>
    </section>
  );
}
