import Hero from "../../components/Hero";
import Post from "../../components/Post";
import { getPosts } from "../../helpers/api";

export default async function Blog() {
  const posts = await getPosts();

  const uniquePosts = posts.filter(
    (post, index, self) => index === self.findIndex((p) => p.id === post.id)
  );

  const displayedPosts = uniquePosts.slice(0, 9);

  return (
    <>
      <Hero />
      {displayedPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
