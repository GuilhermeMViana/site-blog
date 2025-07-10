import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  content: string;
};

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="md-4 text-heading-md md:text-heading-xl">
            {children}
          </h1>
        ),
        p: ({ children }) => (
          <p className="mb-6 leading-relaxed text-gray-300">{children}</p>
        ),
        a: ({ children, href }) => (
          <a
            className="text-blue-200 hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-extrabold text-gray-100">{children}</strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
