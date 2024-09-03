import NextLink from "next/link";

const CTAButton = () => {
  return (
    <NextLink href="/sign-up">
      <button className="z-0 group relative inline-flex items-center bg-blue-600 text-white justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium gap-3 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full md:h-11 md:w-auto">
        Get Started
        <svg
          aria-hidden="true"
          fill="none"
          focusable="false"
          height="1em"
          role="presentation"
          viewBox="0 0 24 24"
          width="1em"
          className="group-data-[hover=true]:translate-x-0.5 outline-none transition-transform"
        >
          <path
            d="M16.835 6.91821L23.9166 13.9999L16.835 21.0815"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></path>
          <path
            d="M4.08325 14H23.7183"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></path>
        </svg>
      </button>
    </NextLink>
  );
};

export default CTAButton;
