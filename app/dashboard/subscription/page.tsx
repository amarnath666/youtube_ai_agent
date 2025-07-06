import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongoose";
import { authOptions } from "@/lib/auth";
import Subcription from "@/models/subcription";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import Plan from "@/models/plan";

export default async function subcriptionPage() {
  const session = await getServerSession(authOptions);
  const db = await dbConnect();

  const subscription = await Subcription.findOne({ userId: session?.user?.id });


  if (!subscription) {
    return (
    <div className="flex flex-1 flex-col items-center justify-center mt-[30px] md:mt-[50px] p-4 bg-zinc-900">

        <h1 className="text-[20px] md:text-3xl font-semibold text-white mb-[30px]">
          You are not subscribed to YTNotes
        </h1>
        <Link
          href="/#pricing"
          className="relative m z-20 px-4 py-2 rounded-md text-black font-medium bg-white hover:shadow-lg transition-all duration-200 cursor-pointer "
        >
          Subscribe Now
        </Link>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 py-[30px] md:p-8 bg-zinc-900 min-h-screen text-white">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl md:text-4xl font-semibold mb-8 text-center">
          Your Subscription
        </h1>

        {/* Subscription Info */}
        <div className="bg-zinc-800 rounded-xl p-4 md:p-6 shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">Subscription Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-400">Start Date</p>
              <p className="text-lg text-green-400 font-medium">
                {formatDate(subscription.startDate)}
              </p>
            </div>
            <div>
              <p className="text-zinc-400">End Date</p>
              <p className="text-lg text-red-400 font-medium">
                {formatDate(subscription.endDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Transactions</h2>
        <div className="space-y-6">
          {/* Initial Payment */}
          <div className="bg-zinc-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl  mb-2">Initial Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-400">Date</p>
                <p className="text-sm md:text-base">
                  {formatDate(subscription.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-zinc-400">Amount Paid</p>
                <p className="text-sm md:text-base">₹{subscription.pricePaid}</p>
              </div>
              <div></div>
            </div>
          </div>

          {/* Renewals */}
          {subscription.renewals?.length > 0 ? (
            subscription.renewals.map((renewal: any) => (
              <div
                key={renewal._id}
                className="bg-zinc-800 rounded-xl p-4 sm:p-6 shadow-md"
              >
                <h3 className="text-base md:text-xl font-semibold mb-2">Renewal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-zinc-400">Renewal Date</p>
                    <p className="text-sm md:text-base">
                      {formatDate(renewal?.renewalDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Amount Paid</p>
                    <p className="text-sm md:text-base">₹{renewal?.pricePaid}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-400">No renewals found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
