import { Button, Heading, Text } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const SignInPrompt = () => {
  return (
    <div className="bg-darker-slate-gray flex items-center justify-between p-4 rounded-lg shadow-[0_0_20px_5px_rgba(255,197,225,0.75)]">
      {/* Change background to darker-slate-gray, add padding, border-radius, and pink shadow */}
      <div>
        <Heading level="h2" className="txt-xlarge text-pastel-pink">
          {/* Set heading text to pastel-pink */}
          Already have an account?
        </Heading>
        <Text className="txt-medium text-pastel-pink mt-2">
          {/* Set text to pastel-pink */}
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10 bg-black border-2 border-pastel-pink text-pastel-pink font-bold"
            data-testid="sign-in-button"
          >
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
