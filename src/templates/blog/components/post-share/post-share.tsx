"use client";

import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";

type PostShareProps = {
  url: string;
  title: string;
  description: string;
};

export const PostShare = ({ url, title, description }: PostShareProps) => {
  const { shareButtons } = useShare({
    url,
    title,
    text: description,
  });

  return (
    <>
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
    </>
  );
};
