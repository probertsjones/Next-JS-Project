import React from "react";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Nav from '../Nav';
import marked from 'marked';
import 'bootstrap/dist/css/bootstrap.css';

const Post = ({ htmlString, data }) => {
    return (
        <>
            <Nav />
            <Head>
                <title>{data.title}</title>
                <meta type="description" content={data.description} />
            </Head>
            <div className="container mt-4">
                <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
            </div>
        </>
    );
};

export const getStaticPaths = async () => {

    const files = fs.readdirSync('posts');
    console.log("files: ", files);
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace(".md", "")
        }
    }));
    console.log("paths: ", paths);

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps = ({ params: { slug } }) => {

    const markdownWithMetaData = fs.readFileSync(path.join('posts', slug + '.md')).toString();
    const prasedMarkdown = matter(markdownWithMetaData);
    const htmlString = marked(prasedMarkdown.content);

    return {
        props: {
            htmlString,
            data: prasedMarkdown.data
        }
    }
}

export default Post;