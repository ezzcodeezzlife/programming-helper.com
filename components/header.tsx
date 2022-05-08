import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.s
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <>
      <header>
        <noscript>
          <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
        </noscript>
        <div className={styles.signedInStatus}>
          <p
            className={`nojs-show ${
              !session && loading ? styles.loading : styles.loaded
            }`}
          >
            {!session && (
              <>
                <span className={styles.notSignedInText}>
                  You are not signed in
                </span>
                <a
                  href={`/api/auth/signin`}
                  className={styles.buttonPrimary}
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session?.user && (
              <>
                {session.user.image && (
                  <span
                    style={{ backgroundImage: `url('${session.user.image}')` }}
                    className={styles.avatar}
                  />
                )}
                <span className={styles.signedInText}>
                  <small>Signed in as</small>
                  <br />
                  <strong>{session.user.email ?? session.user.name}</strong>
                </span>
                <a
                  href={`/api/auth/signout`}
                  className={styles.button}
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </p>
        </div>
        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>

            <ul className={styles.navTitle}>Programming</ul>
            <ul>
              <li className={styles.navItem}>
                <Link href="/generate-function">
                  <a>Function from Description</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/code-to-explanation">
                  <a>Code to Explanation</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/fix-invalid-code">
                  <a>Fix invalid Code</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/translate">
                  <a>Translate Languages</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/class-from-description">
                  <a>Class from Description</a>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/language-from-code">
                  <a>Get Language from Code</a>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/docstring">
                  <a>Function from Docstring</a>
                </Link>
              </li>
            </ul>

            <ul className={styles.navTitle}>Database</ul>
            <ul>
              <li className={styles.navItem}>
                <Link href="/text-to-sql-syntax">
                  <a>Text Description to SQL Command</a>
                </Link>
              </li>
            </ul>

            <ul className={styles.navTitle}>Web</ul>
            <ul>
              <li className={styles.navItem}>
                <Link href="/generate-html-from-description">
                  <a>Generate HTML from Description</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/css-from-description">
                  <a>CSS from Description</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/meta">
                  <a>Meta Tags from Description</a>
                </Link>
              </li>
            </ul>

            <ul className={styles.navTitle}>Helpers</ul>
            <ul>
              <li className={styles.navItem}>
                <Link href="/regex">
                  <a>Regex from Description</a>
                </Link>
              </li>

                  
              <li className={styles.navItem}>
                <Link href="/regex-explanation">
                  <a>Regex to Explanation</a>
                </Link>
              </li>
              

              <li className={styles.navItem}>
                <Link href="/linux">
                  <a>Linux Command</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/time-complexity">
                  <a>Get time complexity</a>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/git">
                  <a>Git Command from Description</a>
                </Link>
              </li>

             
            </ul>

            {/* 

            explain git command


             <li className={styles.navItem}>
            <Link href="/asdasdasd">
              <a>Linux Command to explanation</a>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link href="/mongodb">
              <a>MongoDB Query from Description</a>
            </Link>
          </li>
          

           <li className={styles.navItem}>
            <Link href="/datastructures">
              <a>Datastructures</a>
            </Link>
          </li>
 <li className={styles.navItem}>
            <Link href="/algorithms">
              <a>Algorithms</a>
            </Link>
          </li>
         
         
         */}

       
          </ul>
        </nav>
      </header>
    </>
  )
}
