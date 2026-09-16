import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* Post bodies, styled to the brand type scale. react-markdown renders to
   React elements rather than raw HTML, so there is no injection surface. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-body text-navy">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h2 className="mt-14 text-h2 text-navy" {...props} />,
          h2: (props) => <h2 className="mt-14 text-h2 text-navy" {...props} />,
          h3: (props) => <h3 className="mt-10 text-h3 text-navy" {...props} />,
          p: (props) => <p className="mt-6 leading-[1.7] text-navy" {...props} />,
          a: (props) => (
            <a
              className="text-deep underline decoration-green decoration-2 underline-offset-4 transition-colors hover:text-navy"
              {...props}
            />
          ),
          ul: (props) => <ul className="mt-6 space-y-3 pl-1" {...props} />,
          ol: (props) => <ol className="mt-6 list-decimal space-y-3 pl-5" {...props} />,
          li: ({ children, ...props }) => (
            <li className="flex gap-3 leading-[1.7]" {...props}>
              <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
              <span>{children}</span>
            </li>
          ),
          blockquote: (props) => (
            <blockquote
              className="mt-8 border-l-[3px] border-green bg-mist py-5 pl-6 pr-5 text-[1.125rem] leading-[1.6] text-navy"
              {...props}
            />
          ),
          hr: () => <hr className="mt-12 border-line" />,
          strong: (props) => <strong className="font-semibold text-navy" {...props} />,
          code: (props) => (
            <code
              className="rounded bg-mist px-1.5 py-0.5 font-mono text-[0.9em] text-navy"
              {...props}
            />
          ),
          pre: (props) => (
            <pre
              className="mt-8 overflow-x-auto rounded-xl bg-navy p-6 text-[0.875rem] leading-relaxed text-white"
              {...props}
            />
          ),
          table: (props) => (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-[0.9375rem]" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="border-b-2 border-line px-4 py-3 text-left font-medium text-navy"
              {...props}
            />
          ),
          td: (props) => <td className="border-b border-line px-4 py-3 text-slate" {...props} />,
          img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img className="mt-8 w-full rounded-xl" {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
