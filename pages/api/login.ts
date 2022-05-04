import { loginHandler } from "@storyofams/next-password-protect";

export default loginHandler("YOUR_SECRET_PASSWORD", {
  // Options go here (optional)
  cookieName: "next-password-protect",
});