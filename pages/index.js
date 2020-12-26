import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getContents } from './api/contents';

export default function  Home({ contents }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Juliano Silva
        </h1>
        <div className={styles.grid}>
        {
          contents.map(function({ title, content, link }, i) {
            return (
              <a href={link} className={styles.card}>
                <h3>{ title } &rarr;</h3>
                <p>{ content.length <= 100 ? content : content.substring(0, 100) + '...' }</p>
              </a>
            );
          })
        }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          Link="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {

  const contents = await getContents();
  if (!contents) {
    return {
      notFound: true,
    }
  }
  return { 
    props: { contents }
  }
}
