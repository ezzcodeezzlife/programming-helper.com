import { passwordCheckHandler } from "@storyofams/next-password-protect";

export default passwordCheckHandler("test", {
  // Options go here (optional)
  cookieName: "next-password-protect",
});