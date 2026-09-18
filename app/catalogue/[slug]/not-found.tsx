import { Button } from "@/components/Button";
import { RevealText } from "@/components/RevealText";

export default function PackNotFound() {
  return (
    <div className="mx-auto max-w-[1400px] px-s5 py-s10 xl:px-s7">
      <RevealText as="h1" className="text-display" lines={["Pack introuvable."]} />
      <p className="text-intro mt-s5">Ce pack n&apos;existe pas ou n&apos;est plus au catalogue.</p>
      <Button href="/catalogue" variant="primary" className="mt-s6">
        Retour au catalogue
      </Button>
    </div>
  );
}
