import { loginHandler } from "@storyofams/next-password-protect";

export default loginHandler("test", {
  // Options go here (optional)
  cookieName: "next-password-protect",
});