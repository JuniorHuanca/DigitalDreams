import { Rating } from "@mui/material"

type Props = {
  review: any
}

const CardReview = ({ review }: Props) => {
  return (
    <div className='w-full sm:w-[50%] p-4 gap-2'>
      <div className="flex items-center gap-2 py-3">
        <div className="rounded-full w-12 h-12 bg-slate-400"></div>
        Junior Huanca
      </div>
      <div className="flex flex-col">
        <p className='flex gap-2 items-center'>
          <Rating value={review.rating} precision={0.1} size="large" readOnly />
          17-10-2023
        </p>
        <h4 className='flex font-semibold'>Perfect</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eum eaque, adipisci, minima eveniet debitis distinctio nemo perferendis delectus ipsam eius, facere ex hic veritatis corrupti accusamus praesentium nulla. Saepe?</p>
      </div>
    </div>
  )
}

export default CardReview