import React, {useEffect,useState} from 'react'
import DefaultLayout from '../../Components/DefaultLayout'
import PriceList3 from '../../Components/AboutUs/PriceList3'
import OurTeam from '../../Components/AboutUs/OurTeam'
import HeroArea3 from '../../Components/HeroArea3'
import ContactUs from '../../Components/AboutUs/ContactUs'
import SplashScreen from '../../Components/SplashScreen'

export default function Index() {
  const [loading,setLoading] = useState(true);
    useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
     {loading && <SplashScreen />}
      {!loading && (
    <DefaultLayout>
      <HeroArea3/>
      <PriceList3/>
      <OurTeam/>
    </DefaultLayout>
      )}
    </>
    
  )
}
