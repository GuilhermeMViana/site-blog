import { Button } from "@/components/ui/button";
import { FileQuestion, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <FileQuestion size={64} className="text-gray-100 mx-auto mb-6" />
      </div>
      <div className="relative mb-3 font-sans text-8xl font-bold text-white inline-block">
        <span className="inline-block transform -rotate-12 -translate-y-2 -translate-x-1">
          4
        </span>
        04
      </div>

      <p className="text-gray-100 mb-8">Página não encontrada</p>

      <div className="mt-6 flex justify-center gap-4">
        <Button variant="primary" asChild>
          <Link href="/">Home</Link>
        </Button>

        <Button variant="secondary" asChild>
          <Link href="/blog?q=">
            <Search size={16} />
            Pesquisar posts
          </Link>
        </Button>
      </div>
    </div>
  );
}
