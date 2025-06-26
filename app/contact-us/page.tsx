import HompageHeader from "@/components/HomepageHeader";
import Footer from "@/components/ui/Footet";

const ContactUs = () => (
    <div><HompageHeader />
  <div className="p-6 pt-[100px] max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
    <p className="mb-4">
      Have a question, feedback, or issue? We’re here to help! Feel free to reach out to us anytime.
    </p>

    <div className=" rounded-lg shadow">
      <p className="text-lg font-medium">📧 Email</p>
      <a
        href="mailto:contactytnotes@gmail.com"
        className=" hover:underline"
      >
        contactytnotes@gmail.com
      </a>
    </div>

    <p className="mt-6 text-sm ">
      We usually respond within 24–48 hours. Thank you for using <strong>YTNotes</strong>!
    </p>

      <p className="mt-6 text-sm ">
        Address: Vinayak Nagar , Pincode: 500056, Hyderabad
    </p>
   
  </div>
   <Footer />
   </div>
);

export default ContactUs;
