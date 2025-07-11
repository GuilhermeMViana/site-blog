import { useCallback, useMemo } from "react";
import {
  SOCIAL_PROVIDERS,
  SocialProvider,
  ShareConfig,
} from "./social-providers";

type UseShareProps = ShareConfig & {
  clipboardTimeout?: number;
};

export const useShare = ({ url, title, text }: ShareConfig) => {
  const shareConfig = useMemo(
    () => ({
      url,
      ...(title && { title }),
      ...(text && { text }),
    }),
    [text, title, url]
  );

  const share = useCallback(
    (provider: SocialProvider) => {
      try {
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
    [shareConfig]
  );

  const shareButtons = useMemo(
    () => [
      ...Object.entries(SOCIAL_PROVIDERS).map(([Key, provider]) => ({
        provider: Key,
        name: provider.name,
        icon: provider.icon,
        action: () => share(Key as SocialProvider),
      })),
    ],
    [share]
  );

  return { shareButtons };
};
