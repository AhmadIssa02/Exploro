import LandingPageMd from "@/components/media queries/LandingPageMd";
import LandingPageSm from "@/components/media queries/LandingPageSm";


export default function Home() {

  return (
    <>
      <div className="bg-primary-500 text-white poppins-semibold min-h-max h-max w-full min-w-full hidden md:block ">
        <LandingPageMd />
      </div>
      <div className="bg-primary-500 text-white poppins-normal min-h-screen h-full w-full block md:hidden ">
        <LandingPageSm />
      </div>
    </>
  );
}

