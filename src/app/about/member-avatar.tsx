import { initials, photoUrl, type Member } from "./about-data";

/**
 * Square avatar for a member — their uploaded photo if we have one
 * (/members/<slug>.webp), otherwise an initials monogram. Pass sizing via
 * `className` (e.g. "w-20 h-20 text-2xl").
 */
export function MemberAvatar({
  member,
  className,
}: {
  member: Pick<Member, "slug" | "name">;
  className: string;
}) {
  const src =
    member.slug === "shubhika-pradeep"
      ? "/members/shubhika-pradeep.webp"
      : photoUrl(member.slug);

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        aria-hidden
        className={`${className} shrink-0 object-cover border border-border bg-bg-3 select-none`}
      />
    );
  }

  return (
    <span
      className={`${className} shrink-0 grid place-items-center border border-border bg-bg-3 font-display font-bold text-accent select-none`}
      aria-hidden
    >
      {initials(member.name)}
    </span>
  );
}
