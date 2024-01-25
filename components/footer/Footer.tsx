import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>@codeit - 2023</p>
        <div className={styles.info}>
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>
        <div className={styles.link}>
          <Link
            href="mailto:test@codeit.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/share/email icon.svg"
              width={20}
              height={20}
              alt="email icon(white)"
            />
          </Link>
          <Link
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/share/facebook icon.svg"
              width={20}
              height={20}
              alt="facebook icon(white)"
            />
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/share/instagram icon.svg"
              width={20}
              height={20}
              alt="instagram icon(white)"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Footer;
