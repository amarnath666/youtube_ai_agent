import Link from "next/link";

const LimitOver = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center mt-[30px] md:mt-[50px] p-[50px] bg-zinc-900 rounded-b-lg">
      <p className="text-2xl font-semibold text-white mb-[50px]">
        Your Free Trial Has Expired - Subscribe to get unlimited access
      </p>
      <Link
        href="/#pricing"
        className="relative m z-20 px-4 py-2 rounded-md text-black font-medium bg-white hover:shadow-lg transition-all duration-200 cursor-pointer "
      >
        Subscribe Now
      </Link>
    </div>
  );
};

export default LimitOver;
