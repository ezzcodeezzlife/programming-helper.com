import { passwordCheckHandler } from "@storyofams/next-password-protect";

export default passwordCheckHandler("YOUR_SECRET_PASSWORD", {
  // Options go here (optional)
  cookieName: "next-password-protect",
});