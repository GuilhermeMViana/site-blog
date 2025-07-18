"use client";
import { Search } from "@/components/search";
import { PostCard } from "./components/post-card";
import { PostList } from "./components/post-list";
import { Post } from "contentlayer/generated";
import { Inbox } from "lucide-react";
import { useSearchParams } from "next/navigation";

export type BlogListProps = {
  posts: Post[];
};

export function BlogList({ posts }: BlogListProps) {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") ?? "";
  const pageTitle = query
    ? `Resultados para: ${query}`
    : "Dicas e estratégias para impulsionar seu negócio";
  const postList = query
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
    : posts;
  const hasPosts = postList.length > 0;

  return (
    <div className="flex flex-col py-24 flex-grow h-full">
      <section className="pb-14">
        <div className="container space-y-6 flex flex-col items-start justify-between md:flex-row md:items-end lg:items-end">
          <div className="flex flex-col gap-4 md:px-0">
            <span className="text-body-tag text-cyan-100 w-fit rounded-md text-center md:text-left py-2 px-4 bg-cyan-300">
              BLOG
            </span>

            <h1 className="text-balance text-start md:text-left text-heading-lg md:text-heading-xl max-w-2xl text-gray-100">
              {pageTitle}
            </h1>
          </div>
          <Search />
        </div>
      </section>

      {hasPosts ? (
        <PostList>
          {postList.map((post) => (
            <PostCard
              key={post._id}
              slug={post.slug}
              title={post.title}
              description={post.description}
              image={post.img}
              date={new Date(post.date).toLocaleDateString("pt-BR")}
              author={{
                name: post.author.name,
                avatar: post.author.avatar,
              }}
            />
          ))}
        </PostList>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-5">
          <Inbox className="h-12 w-12 text-cyan-300" />
          <p className="text-gray-400 text-center">Nenhum post encontrado.</p>
        </div>
      )}
    </div>
  );
}
