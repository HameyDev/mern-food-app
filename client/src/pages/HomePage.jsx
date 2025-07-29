
import Banner from '../components/Banner';
import CategoryCards from '../components/CategoryCards';
import FeaturedDeals from '../components/FeaturedDeals';
import { useEffect } from 'react';


const HomePage = () => {
  useEffect(() => {
    document.title = "Home | FlavorVerse";
  }, []);
  return (
    <div>
        <Banner />
        <CategoryCards />
        <FeaturedDeals />
    </div>
  );
};

export default HomePage;
