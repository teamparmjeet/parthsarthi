import Image from "next/image";
import BannerVideo from "@/components/home/BannerVideo";
import Deal from "@/components/home/Deal";
import AboutComponent from "@/components/home/About";
import NewLaunches from "@/components/home/NewLaunches";
import Category from "@/components/home/Category";
import Feature from "@/components/home/Feature";
import Partners from "@/components/home/Partners";
import Reviews from "@/components/home/Reviews";
import BlogsSection from "@/components/home/BlogsSection";

export default function Home() {
  return (

    <div>
      <BannerVideo />
      <Deal />
      <Feature />
      <AboutComponent />
      <NewLaunches />
      <Category /> 
      <Partners />
      <Reviews />
      <BlogsSection />
    </div>
  );
}
