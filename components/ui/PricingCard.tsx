"use client";

import React from "react";
import { Check, Star, Zap } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Plan from "@/models/plan";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { SignPopup } from "./sign-popup";
import { getTodayDateInIst } from "@/lib/moment-helper";
import { useRouter } from "next/navigation";
import { SpinnerComponent } from "./Spinner";

type Plan = {
  _id: string;
  type: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

const PricingComponent = () => {
  const router = useRouter();
  const [planData, setPlanData] = useState<Plan[]>([]);
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState<any>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // fetch plan data
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/plan");
      setPlanData(response.data);
    };

    fetchData();
  }, []);

  // plans data
  const plans = [
    {
      id: "random",
      name: "Free",
      //price: "$0",
      price: "0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "10 messages",
        "Multiple export formats (TXT, JSON, CSV, SRT, VTT)",
        "Basic YouTube note-taking",
        "Standard processing speed",
      ],
      limitations: ["No email support", "Limited messages"],
      buttonText: "Get Started Free",
      buttonStyle: "bg-zinc-700 hover:bg-zinc-600 text-white",
      popular: false,
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: planData?.[0]?._id,
      name: "Monthly",
      price: planData?.[0]?.price,
      period: "per month",
      description: "For regular users",
      features: [
        "Unlimited messages & summarizing",
        "Multiple export formats (TXT, JSON, CSV, SRT, VTT)",
        "Priority processing speed",
        "Email support",
      ],
      buttonText: "Start Monthly Plan",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: true,
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: planData?.[1]?._id,
      name: "Yearly",
      price: planData?.[1]?.price,
      period: "per year",
      originalPrice: "₹6000",
      savings: "Save ₹1000",
      description: "Best value for power users",
      features: [
        "Unlimited messages & summarizing",
        "Multiple export formats (TXT, JSON, CSV, SRT, VTT)",
        "Priority processing speed",
        "Premium email support",
        "Early access to new features",
      ],
      buttonText: "Start Yearly Plan",
      buttonStyle: "bg-green-600 hover:bg-green-700 text-white",
      popular: false,
      icon: <Check className="w-5 h-5" />,
    },
  ];

  // login or create order id
  const handleClick = async (price: number, planId: string) => {
    setSelectedPlanId(planId);
    if (planId === "random") {
      // Free plan logic → just navigate
      router.push("/dashboard");
      return;
    }

    if (session) {
      try {
       
        const response = await axios.post("/api/order", {
          amount: price * 100,
          currency: "INR",
          planId: planId,
        });

        const data = response.data;

        // Call payment immediately
        processPayment(response.data.orderId, price * 100);
      } catch (err: any) {
        toast.error(err.response.data.error || "Something went wrong");
        console.error("API error:", err);
      } finally {
      
        setSelectedPlanId(null);
      }
    } else {
      setOpen(true);
    }
  };

  // process payment on order creation
  const processPayment = async (orderId: string, amount: number) => {
    if (!session || !orderId || !amount) {
      console.error("Missing session, orderId, or amount");
      return;
    }

    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: session?.user?.name || "Your Company",
        description: "Payment for your plan",
        order_id: orderId,
        // Callback handler
        handler: async function (response: any) {
          try {
            const data = {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              amount: amount,
            };

            const result = await axios.post("/api/verify", data);
            const res = result.data;

            if (res.isOk) {
              router.push("/dashboard");
              toast.success("Payment successful");
            } else {
              toast.error(res.message || "Verification failed");
            }
          } catch (err: any) {
            console.error("Error verifying payment:", err);
            toast.error(err || "Verification failed");
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
      });

      paymentObject.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const response = await axios.get("/api/subscribe");
        setSubscription(response.data.subscription);
      }
    };
    fetchData();
  }, [session, subscription]);

  if (subscription) {
    console.log(subscription, "subcription");
  }

  const today = getTodayDateInIst();

  console.log(subscription.length, "subscription");

  return (
    <div className="bg-zinc-900 min-h-screen my-[30px] lg:my-[100px] ]  w-full max-w-[1440px] mx-auto">
      <div className="px-4 md:px-[30px] lg:px-[60px]">
        <div className="text-center mb-[30px] md:mb-[60px]">
          <h2 className="text-[32px] md:text-5xl font-semibold text-white mb-[15px] md:mb-[25px]">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] bg-clip-text text-transparent">
              YTNotes Plan
            </span>
          </h2>
          <p className="text-[14px] md:text-[20px] leading-snug text-gray-400 text-center ">
            Transform your YouTube learning experience with powerful note-taking
            and summarization tools
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-zinc-800/50 rounded-2xl p-8 border-2 transition-all duration-300 flex flex-col justify-between   before:absolute before:top-0 before:left-0 before:w-full before:h-1/2 before:bg-gradient-to-b before:from-[#c471f5]/20 before:to-transparent before:rounded-2xl before:z-0 ${
                plan.popular
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-zinc-700 hover:border-zinc-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      plan.popular ? "bg-blue-600" : "bg-zinc-700"
                    }`}
                  >
                    {plan.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-zinc-400 mb-4">{plan?.description}</p>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">
                      ₹{plan.price}
                    </span>
                    <span className="text-zinc-400 ml-2">/{plan?.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-2">
                      <span className="text-zinc-500 line-through text-lg">
                        {plan.originalPrice}
                      </span>
                      <span className="text-green-400 ml-2 text-sm font-semibold">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4  mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={subscription?.status === "active" && plan.id === "random"}
                onClick={() => handleClick(plan?.price as number, plan.id)}
                className={`w-full cursor-pointer py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                  subscription?.status === "active" && plan.id === "random"
                    ? "bg-zinc-400 text-white opacity-50 cursor-not-allowed"
                    : plan.buttonStyle
                }`}
              >
                {selectedPlanId === plan.id ? (
                  <div className="flex justify-center items-center ">
                    <SpinnerComponent />
                  </div>
                ) : subscription?.status === "active" && plan.id !== "random" ? (
                  "Renew Plan"
                ) : (
                  plan.buttonText
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      {open && <SignPopup open={open} setOpen={setOpen} />}
    </div>
  );
};

export default PricingComponent;
