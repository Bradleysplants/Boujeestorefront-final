import LocalizedClientLink from "@modules/common/components/localized-client-link";
import ChevronDown from "@modules/common/icons/chevron-down";
import MedusaCTA from "@modules/layout/components/medusa-cta";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-black text-pastel-pink relative small:min-h-screen">
      {/* Set background to black and text to pastel-pink */}
      <div className="h-16 bg-slate-gray border-b border-darker-slate-gray">
        {/* Set background of nav bar to slate-gray */}
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-pastel-pink flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-pastel-pink hover:text-primary-green">
              {/* Subtle text with hover effect */}
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-darker-slate-gray hover:text-pastel-pink">
              {/* Subtle text with hover effect */}
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-pastel-pink hover:text-pastel-pink uppercase font-bold"
            data-testid="store-link"
          >
            Delisa&apos;s Boujee Botanical Store
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div>
    </div>
  );
}
