import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import Link from "next/link";
import fs from 'fs';

const Home = ({slugs}) => {
  return (
    <div className={styles.container}>
      <Head></Head>
      slugs:
      {slugs.map(slug => {
        return (
          <div key={slug}>
            <Link href={'/blog/' + slug}>
              <a>
                {'/blog/' + slug}
              </a>
            </Link>
          </div>
        )
      })}
    </div>
  )
};

export const getStaticProps = async () => {
  const files = fs.readdirSync('posts');
  return {
    props: {
      slugs: files.map(filename => filename.replace(".md",""))
    }
  }
};

export default Home;