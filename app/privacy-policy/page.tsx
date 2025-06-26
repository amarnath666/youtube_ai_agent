import HompageHeader from "@/components/HomepageHeader";
import Footer from "@/components/ui/Footet";

const PrivacyPolicy = () => (
     <div><HompageHeader />
  <div className="p-6 pt-[100px] max-w-3xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-4">
      At <strong>YTNotes</strong>, we value your privacy. We do not sell, share, or misuse your personal data. Any information collected (like your email or YouTube video URLs) is solely used to provide a better summarizing experience.
    </p>
    <p className="mb-4">
      All summaries are generated using AI and are stored temporarily to ensure performance. We do not access, store, or track any private user content beyond the scope of the service.
    </p>
    <p className="mb-4">
      By using YTNotes, you consent to our privacy practices. If you have concerns, please contact us at support@ytnotes.ai.
    </p>
  </div>
  <Footer />
  </div>
);

export default PrivacyPolicy;
