import React from 'react';  
import Hero from '../components/Hero';
import FeaturedDestination from '../components/featuredDestination';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';

function Home(){
    return(
        <div>
            <Hero />
            <FeaturedDestination />
            <ExclusiveOffers></ExclusiveOffers>
            <Testimonial />
        </div>
    )
}

export default Home;