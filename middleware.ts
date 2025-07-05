// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", // or wherever your login page is
  },
});

// Apply middleware to everything under /dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
