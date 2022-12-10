import styles from "../styles/Home.module.scss"
import Link from "next/link"

export default function Custom404() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>ページがありません</p>
        <p>
          <Link href="./">トップに戻る</Link>
        </p>
      </main>
    </div>
  )
}
