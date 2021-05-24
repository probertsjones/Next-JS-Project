import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';
import path from 'path';
import matter from 'gray-matter';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import fs from 'fs';

const Home = ({ slugs }) => {
  return (
    <>
      <Nav />
      <Head>
        <title>Test Site</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#90cdf4" />
      </Head>
      <main className={styles.container}>


        <div className="container">
          <div className="p-4 p-md-5 mb-4 mt-4 text-white rounded bg-dark">
            <div className="col-12">
              <h1 className="display-4 fst-italic">Pages:</h1>
              <ul>
                {slugs.map(slug => {
                  return (
                    <li key={slug.slug}>
                      <Link href={'/blog/' + slug.slug}>
                        <a className="text-white fw-bold">
                          {slug.title}
                        </a>
                      </Link><br />
                      {slug.description}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
};


export const getStaticProps = async () => {

  const files = fs.readdirSync('posts');
  const outputArray = [];

  // Loop around files and get the meta data
  {
    files.map(file => {
      const markdownWithMetaData = fs.readFileSync(path.join('posts', file)).toString();
      const prasedMarkdown = matter(markdownWithMetaData);
      const outputContent = [];

      prasedMarkdown.data.slug = file.replace(".md", "");
      outputArray.push(prasedMarkdown.data);
    })
  }

  // console.log("files: ",files);
  // console.log("outputArray: ",outputArray);

  return {
    props: {
      slugs: outputArray
    }
  }
};

export default Home;