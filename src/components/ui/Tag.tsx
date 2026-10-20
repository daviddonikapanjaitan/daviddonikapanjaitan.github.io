type TagProps = {
  children: React.ReactNode;
  /** Highlight style for core skills. */
  highlight?: boolean;
};

export function Tag({ children, highlight = false }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs leading-tight ${
        highlight
          ? "border-accent/40 bg-accent-soft font-semibold text-accent-strong"
          : "border-border bg-background text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
