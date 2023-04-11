import { Rating } from "@mui/material"

type Props = {
  review: any
}
const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Poor',
  1.5: 'Below average',
  2: 'Average',
  2.5: 'Above average',
  3: 'Good',
  3.5: 'Very good',
  4: 'Excellent',
  4.5: 'Outstanding',
  5: 'Exceptional'
};
const CardReview = ({ review }: Props) => {
  console.log(review)
  const createdAt = new Date(review.createdAt);
  const updatedAt = new Date(review.updatedAt);

  const formattedCreatedAt = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;
  const formattedUpdatedAt = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}/${updatedAt.getFullYear()} ${updatedAt.getHours()}:${updatedAt.getMinutes()}`;
  return (
    <div className="w-full border-[1px] border-black dark:border-white p-2 overflow-hidden">
      <div className="flex items-center gap-2 py-3">
        <div className="rounded-full w-12 h-12 bg-slate-400"></div>
        Junior Huanca
      </div>
      <div className="flex flex-col">
        <p className='flex gap-2 items-center'>
          <Rating value={review.rating} precision={0.1} size="large" readOnly /><span className='flex font-semibold'>{labels[review.rating]}</span>
        </p>
        <p className="text-gray-500">created: {formattedCreatedAt} UTC</p>
        <p className="text-gray-500">updated: {formattedUpdatedAt} UTC</p>

        <p>{review.description}</p>
      </div>
    </div>
  )
}

export default CardReview