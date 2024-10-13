import heroimg from "../../public/image/heroImg.png";

function HeroSection() {
  return (
    <div className="w-1/2 h-full p-20 bg-[#733CE4] flex flex-col gap-20">
      <img
        className="h-[400px] rounded-2xl w-full object-cover"
        src={heroimg}
      />
      <div className="flex flex-col text-center gap-10 text-white">
        <div className=" text-3xl font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </div>
        <div className=" text-xl  font-medium">
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </div>
      </div>
    </div>
  );
}

export default HeroSection;