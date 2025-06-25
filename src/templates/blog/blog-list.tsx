import { Search } from "@/components/search";
import { useRouter } from "next/router";
import { PostCard } from "./components/post-card";

export function BlogList() {
  const router = useRouter();
  const query = router.query.q as string;
  const pageTitle = query
    ? `Resultados para: ${query}`
    : "Dicas e estratégias para impulsionar seu negócio";

  return (
    <div className="flex flex-col py-24 flex-grow h-full">
      <section className="">
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

      <PostCard
        slug=""
        title="Transformando seu negócio em uma loja virtual"
        description="Se você está buscando uma maneira simples e eficaz de vender seus produtos online, o Site.Set é a solução perfeita para você. Criar uma loja virtual de sucesso nunca foi tão fácil. Com nossa plataforma intuitiva, você pode criar um site profissional para sua loja em minutos, sem precisar de conhecimentos técnicos."
        image="/assets/primeiro-post.png"
        date="25/06/2025"
        author={{
          name: "Aspen Dokidis",
          avatar: "/customer-01.png",
        }}
      />
    </div>
  );
}
