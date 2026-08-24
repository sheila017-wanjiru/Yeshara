import { buildMetadata } from "@/lib/seo";
import { Wrap } from "@/components/primitives/Section";

export const metadata = buildMetadata({
  title: "Converting real-world assets into secure, tradeable tokens",
  description:
    "Yeshara Tokens Limited structures Kenyan real estate and financial instruments, issues them as blockchain-based tokens with title held by an independent trustee, and lists them where verified investors can hold and trade.",
  path: "/",
});

export default function HomePage() {
  return (
    <section className="pt-[calc(var(--nav-h)+92px)] pb-s9">
      <Wrap>
        <h1 className="d1">
          Converting real-world assets into{" "}
          <span className="tq">secure, tradeable</span> tokens.
        </h1>
        <p className="lead mt-s5 max-w-[50ch]">
          Yeshara structures real estate and financial instruments, issues them
          as blockchain-based tokens with title held by an independent trustee,
          and lists them where verified investors can hold and trade. Ticket
          sizes fall from KES 100,000 to KES 1,000.
        </p>
      </Wrap>
    </section>
  );
}
