import { passwordCheckHandler } from "@storyofams/next-password-protect"

export default passwordCheckHandler("lemon4", {
  // Options go here (optional)
  cookieName: "next-password-protect",
})
