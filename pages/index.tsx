import Layout from "../components/layout"
import Link from "next/link"

export default function IndexPage() {
  return (
    <Layout>
      <>
        <h1>Home</h1>
        <p>Contact: appsplosion.help@gmail.com</p>
        <Link href="https://homepage-appsplosion.herokuapp.com/privacypolicy">
          Privacy Policy
        </Link>
      </>
    </Layout>
  )
}
