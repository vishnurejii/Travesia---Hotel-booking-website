import { assets, testimonials } from "../assets/assets";
export default function StarRating({ rating = 4 }) {
    return(
        <>
            {Array(5).fill('').map((_, index) => (
                <img src={index < rating ? assets.starIconFilled : assets.starIconOutlined} className="h-4.5 w-4.5"></img>
        ))}
    </>
    )
    
}