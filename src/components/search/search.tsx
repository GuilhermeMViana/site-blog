import { cn } from "@/lib/utils";
import { CircleX, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") ?? "";
  const hasQuery = searchParams?.has("q");

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (query.trim()) {
        router.push(`/blog?q=${encodeURIComponent(query)}`);
      }
    },
    [query, router]
  );

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    router.push(`/blog?q=${encodeURIComponent(newQuery)}`, {
      scroll: false,
    });
  }

  function resetInput() {
    router.push(`/blog`, {
      scroll: false,
    });
  }

  useEffect(() => {
    if (hasQuery) {
      inputRef.current?.focus();
    }
  }, [hasQuery]);

  return (
    <form className="relative group w-full md:w-60" onSubmit={handleSearch}>
      <SearchIcon
        className={cn(
          "text-gray-300 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-300",
          query ? "text-blue-300" : ""
        )}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar"
        onChange={handleQueryChange}
        value={query}
        className="h-10 w-full md:w-60 bg-transparent border border-gray-400 pl-9 text-gray-100 rounded-md text-body-sm outline-none transition-all duration-200 focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-300 placeholder:text-gray-300 placeholder:text-body-sm"
      />

      {query && (
        <CircleX
          className="text-gray-300 absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer"
          onClick={resetInput}
        />
      )}
    </form>
  );
};
