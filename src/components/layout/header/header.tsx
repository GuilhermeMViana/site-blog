import Link from "next/link";
import { ActiveLink } from "@/components/active-link/active-live";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed z-50 top-0 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filters]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px6 lg:px8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="flex items-center gap-6">
            <ActiveLink href="/">Ínicio</ActiveLink>
            <ActiveLink href="/blog">Blog</ActiveLink>
            <Button variant="secondary" asChild>
              <Link href="/comecar">Começar</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
