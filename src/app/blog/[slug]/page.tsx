import { PostPage } from "@/templates/blog";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

type SlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return <PostPage post={post} />;
}
