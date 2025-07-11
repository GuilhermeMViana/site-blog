import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar } from "@/components/avatar";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";

export const PostPage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const post =
    typeof slug === "string"
      ? allPosts.find((post) => post.slug.toLowerCase() === slug.toLowerCase())
      : undefined;
  const publishedAt = post?.date
    ? new Date(post.date).toLocaleDateString("pt-BR")
    : "Data não disponível";

  const postUrl = `https://site.set/blog/${slug}`;

  const { shareButtons } = useShare({
    url: postUrl,
    title: post?.title,
    text: post?.description,
  });

  return (
    <main className="py-20 text-gray-100">
      <div className="container space-y-8 px-4 md:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/blog" className="text-action-sm text-gray-100">
                  Blog
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-300" />
            <BreadcrumbItem className="text-action-sm text-blue-200">
              {post?.title}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12">
          <article className="bg-gray-600 rounded-lg overflow-hidden border-gray-400 border-[1px]">
            <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
              <Image
                src={post?.img ?? ""}
                alt={post?.title ?? ""}
                fill
                className="object-cover"
              />
            </figure>

            <header className="p-4 md:p-6 lg:p-12 pb-0 mt-8 md:mt-12">
              <h1 className="mb-8 text-balance text-heading-lg md:text-heading-xl lg:text-heading-xl">
                {post?.title}
              </h1>

              <Avatar.Container>
                <Avatar.Image
                  src={post?.author.avatar || ""}
                  alt={post?.title || ""}
                  size="sm"
                />
                <Avatar.Content>
                  <Avatar.Title>{post?.author?.name}</Avatar.Title>
                  <Avatar.Description>
                    Publicado em{" "}
                    <time dateTime={post?.date}>{publishedAt}</time>
                  </Avatar.Description>
                </Avatar.Content>
              </Avatar.Container>
            </header>

            <div className="prose prove-invert max-w-none px-4 mt-12 md:px-6 lg:px-12">
              <Markdown content={post?.body.raw} />
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-lg text-heading-xs text-gray-100">
              <h2 className="hidden md:block mb-4 text-heading-xs text-gray-100">
                Compartilhar
              </h2>

              <div className="flex justify-between md:flex-col gap-2">
                {shareButtons.map((provider) => (
                  <Button
                    variant="outline"
                    key={provider.provider}
                    onClick={() => provider.action()}
                    className="w-fit md:w-full justify-start gap-2"
                  >
                    {provider.icon}
                    <span className="hidden md:block">{provider.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
