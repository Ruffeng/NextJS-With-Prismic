import React from "react";
import Link from "next/link";
import Prismic from "prismic-javascript";
import { RichText, Date } from "prismic-reactjs";
import { client } from "../prismic-configuration";

export default function BlogHome(props) {
  return (
    <div>
      <img src={props.home.data.image.url} alt="avatar image" height="140px" />
      <h1>{RichText.asText(props.home.data.headline)}</h1>
      <p>{RichText.asText(props.home.data.description)}</p>

      <ul>
        {props.posts.results.map((post) => (
          <li key={post.uid}>
            <Link href="posts/[id]" as={`/posts/${post.uid}`}>
              <a>{RichText.render(post.data.title)} </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const home = await client.getSingle("blog_home");
  const posts = await client.query(
    Prismic.Predicates.at("document.type", "post"),
    { orderings: "[my.post.date desc]" }
  );
  return {
    props: {
      home,
      posts,
    },
  };
}
