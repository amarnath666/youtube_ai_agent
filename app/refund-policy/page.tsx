import HompageHeader from "@/components/HomepageHeader";
import Footer from "@/components/ui/Footet";

const RefundPolicy = () => (
      <div className="bg-zinc-900">
      <HompageHeader />
  <div className="px-4 py-[30px]  md:p-12 md:pt-[100px] max-w-3xl mx-auto"> 
    <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
    <p className="mb-4">
      At <strong>YTNotes</strong>, we aim to deliver high-quality summaries using advanced AI technology. Since our service is digital and accessible instantly, <strong>no refunds will be made</strong> under any circumstances.
    </p>
    <p className="mb-4">
      Please make sure to review the features and demo before making a purchase to a plan.
    </p>

       <div className=" p-6 rounded-lg border mb-6">       
                <p className="text-lg font-medium mb-2">📧 Email</p>     
                   If you encounter any issues, feel free to contact at {" "}
                <a         
                    href="mailto:amarnathdhumal2001@gmail.com"         
                    className="text-white hover:underline"       
                >         
                   amarnathdhumal2001@gmail.com       
                </a>     
            </div>      
  </div>
  <Footer />
  </div>
);

export default RefundPolicy;
