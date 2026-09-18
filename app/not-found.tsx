import { Button } from "@/components/Button";
import { RevealText } from "@/components/RevealText";

export default function NotFound() {
  return (
    <section className="vignette light-pool relative flex min-h-[70vh] items-center overflow-hidden py-s10">
      <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-s5 xl:px-s7">
        <div className="rule-b-secondaire mb-s8 flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
          <p className="text-slug">Plan manquant — bobine introuvable</p>
          <p className="text-timecode">--:--:--:--</p>
        </div>

        <RevealText as="h1" className="text-title-card" lines={["Page introuvable."]} />
        <p className="text-intro mt-s6">Ce plan n&apos;a jamais été tourné, ou il a été coupé au montage.</p>

        <div className="mt-s7 flex flex-wrap gap-s4">
          <Button href="/" cursorLabel="revenir">
            Retour au début
          </Button>
          <Button href="/catalogue" variant="secondary" cursorLabel="entrer">
            Voir le catalogue
          </Button>
        </div>
      </div>
    </section>
  );
}
