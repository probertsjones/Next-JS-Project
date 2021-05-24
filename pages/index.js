import Head from 'next/head';
import Nav from './Nav';
import path from 'path';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Link from "next/link";
import fs from 'fs';

const Home = ({ slugs }) => {
  return (
    <main className={styles.container}>

      <Nav />
      <Head>
        <title>Test Site</title>
      </Head>
      <div className="container">
        <div className="p-4 p-md-5 mb-4 mt-4 text-white rounded bg-dark">
          <div className="col-12">
            <h1 className="display-4 fst-italic">Pages:</h1>
            <ul>
            {slugs.map(slug => {
              return (
                <li key={slug}>
                  <Link href={'/blog/' + slug}>
                    <a className="text-white fw-bold">
                      {'/blog/' + slug}
                    </a>
                  </Link>
                </li>
              )
            })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
};


export const getStaticProps = async () => {

  const files = fs.readdirSync('posts');

  // const markdownWithMetaData = fs.readFileSync(path.join('posts',slug+'.md')).toString();
  // const prasedMarkdown = matter(markdownWithMetaData);
  // const htmlString = marked(prasedMarkdown.content);

  
  console.log("files: ",files);

  return {
    props: {
      slugs: files.map(filename => filename.replace(".md", ""))
    }
  }
};

export default Home;