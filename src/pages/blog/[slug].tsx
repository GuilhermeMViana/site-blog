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

export default function PostPage() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const post = allPosts.find(
    (post) => post.slug.toLowerCase() === slug.toLowerCase(),
  )!;
  const publishedAt = new Date(post.date).toLocaleDateString("pt-BR");

  return (
    <main className="mt-32">
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
              src={post.img}
              alt={post.title}
              fill
              className="object-cover"
            />
          </figure>

          <header className="p-4 md:p-6 lg:p-12 pb-0">
            <h1 className="mb-6 text-balance text-heading-lg md:text-heading-xl lg:text-heading-xl">
              {post.title}
            </h1>

            <Avatar.Container>
              <Avatar.Image src={post.author.avatar} alt={post.author.name} />
              <Avatar.Content>
                <Avatar.Title>{post.author.name}</Avatar.Title>
                <Avatar.Description>
                  Publicado em <time dateTime={post.date}>{publishedAt}</time>
                </Avatar.Description>
              </Avatar.Content>
            </Avatar.Container>
          </header>
        </article>
      </div>
    </main>
  );
}
