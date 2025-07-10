import HompageHeader from "@/components/HomepageHeader";
import Footer from "@/components/ui/Footet";

const TermsAndConditions = () => (
    <div className="bg-zinc-900">
      <HompageHeader />
   <div className="px-4 py-[30px]  md:p-12 md:pt-[100px] max-w-3xl mx-auto"> 
    <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
    <p className="mb-4">
      By accessing and using <strong>YTNotes</strong>, you agree to comply with the following terms and conditions:
    </p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>You must not use the platform for any illegal or unauthorized purpose.</li>
      <li>All summaries generated are for personal use only and may not be reproduced commercially.</li>
      <li>YTNotes is not responsible for inaccuracies in summaries due to limitations of the source content or AI model.</li>
      <li>We reserve the right to suspend or terminate accounts for misuse or policy violations.</li>
      <li>All payments made are final; as stated in our Refund Policy, <strong>no refunds will be made</strong>.</li>
    </ul>
    <p className="mb-4">
      If you do not agree to these terms, please discontinue use of the service.
    </p>
  </div>
  <Footer />
  </div>
);

export default TermsAndConditions;
