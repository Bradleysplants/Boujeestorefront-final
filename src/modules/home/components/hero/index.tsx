import { Button, Heading } from "@medusajs/ui";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-gray-200 relative bg-slate-gray flex justify-center items-center">
      <div className="relative text-center p-10 lg:p-32 space-y-6">
        {/* Background square with rounded corners and slight translucency */}
        <div className="absolute inset-0 bg-[#58576B] bg-opacity-80 rounded-lg w-full h-full shadow-[0_0_20px_5px_rgba(255,197,225,0.75)]"></div>

        <div className="relative z-10">
          <Heading
            level="h1"
            className="text-5xl leading-snug text-pastel-pink font-bold"
          >
            Welcome to DeLisa&apos;s Boujee Botanical Store
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-tight text-pastel-pink font-light"
          >
            Discover the charm of luxury plants and exclusive care products
          </Heading>
        </div>
      </div>
    </div>
  );
}

export default Hero;
