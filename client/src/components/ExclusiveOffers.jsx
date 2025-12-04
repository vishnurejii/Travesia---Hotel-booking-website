import { assets } from "../assets/assets";
import { exclusiveOffers } from "../assets/assets";
import Title from "./Title";

export default function ExclusiveOffers(){
    return(
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 pb-30">
            <div className="flex flex-col md:flex-row items-center justify-between items-center w-full">
                <Title align="left" title="Exclusive Offers" subTitle="Discover unbeatable deals and special packages tailored just for you. Don't miss out on these limited-time offers to make your stay even more memorable!" />
                <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
                    View all Offers
                    <img src={assets.arrowIcon} alt="arrow icon" className="group-hover:translate-x-1 transition-all"/>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-12">
                {exclusiveOffers.map((item) => (
                    <div key={item._id} className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${item.image})`}}>

                        <p className="px-1 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
                            {item.priceOff}% OFF
                        </p>
                        <div>
                            <p className="text-2xl playfair-font font-medium">{item.title}</p>
                            <p>{item.description}</p>
                            <p className="text-xs text-white/70 mt-3">Expires {item.expiryDate}</p>
                        </div>

                        <button className="flex item-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                            View Offers
                            <img className="invert group-hover:translate-x-1 transition-all" src={assets.arrowIcon} alt="" />
                        </button>

                    </div>
                ))}
            </div>
        </div>
    )
}