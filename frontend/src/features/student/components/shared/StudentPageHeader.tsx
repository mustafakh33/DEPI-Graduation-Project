interface StudentPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

const StudentPageHeader = ({
  eyebrow,
  title,
  description,
}: StudentPageHeaderProps) => {
  return (
    <section>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          {eyebrow}
        </p>
      )}

      <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>

      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          {description}
        </p>
      )}
    </section>
  );
};

export default StudentPageHeader;