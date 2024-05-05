import { Github } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-gray-200 relative bg-slate-gray flex justify-center items-center">
      <div className="text-center p-10 lg:p-32 space-y-6">
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
  );
}

export default Hero;
