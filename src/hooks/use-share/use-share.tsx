import { useCallback, useMemo } from "react";
import {
  SOCIAL_PROVIDERS,
  SocialProvider,
  ShareConfig,
} from "./social-providers";
import { useClipboard } from "../clipboard";
import { Link2 } from "lucide-react";

type UseShareProps = ShareConfig & {
  clipboardTimeout?: number;
};

export const useShare = ({
  url,
  title,
  text,
  clipboardTimeout = 2000,
}: UseShareProps) => {
  const { isCopied, handleCopy } = useClipboard({ timeout: clipboardTimeout });
  const shareConfig = useMemo(
    () => ({
      url,
      ...(title && { title }),
      ...(text && { text }),
    }),
    [text, title, url]
  );

  const share = useCallback(
    async (provider: SocialProvider) => {
      try {
        if (provider === "clipboard") {
          return await handleCopy(url);
        }

        const providerConfig = SOCIAL_PROVIDERS[provider];

        if (!provider) {
          throw new Error(`Provider não encontrado ${provider}`);
        }

        const shareUrl = providerConfig.shareUrl(shareConfig);
        const shareWindow = window.open(
          shareUrl,
          "_blank",
          "width=600,height=600,location=yes,status=yes"
        );
        return !!shareWindow;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    [shareConfig, handleCopy, url]
  );

  const shareButtons = useMemo(
    () => [
      ...Object.entries(SOCIAL_PROVIDERS).map(([Key, provider]) => ({
        provider: Key,
        name: provider.name,
        icon: provider.icon,
        action: () => share(Key as SocialProvider),
      })),
      {
        provider: "clipboard",
        name: isCopied ? "Link copiado!" : "Copiar link",
        icon: <Link2 className="h-4 w-4" />,
        action: () => share("clipboard"),
      },
    ],
    [isCopied, share]
  );

  return { isCopied, shareButtons };
};
