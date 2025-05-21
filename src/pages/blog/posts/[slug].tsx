import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const segments = router.query.slug as string[];

  return (
    <div>
      <h1>Post: {segments?.join("/")}</h1>
    </div>
  );
}
