const ITEMS = [
  { title: "Livraison immédiate", body: "PDF et fiches contact accessibles dès la confirmation de paiement." },
  { title: "Vérification par appel", body: "Chaque usine du panel est contactée directement, pas seulement listée." },
  { title: "Mise à jour périodique", body: "Les carnets sont révisés pour retirer les usines qui ne répondent plus." },
  { title: "Paiement sécurisé", body: "Transaction chiffrée, aucune donnée bancaire conservée sur nos serveurs." },
];

export function Reassurance() {
  return (
    <div className="grid grid-cols-1 gap-s6 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map((item) => (
        <div key={item.title} className="rule-t-structure pt-s5">
          <h3 className="text-label text-creme">{item.title}</h3>
          <p className="text-body-tight text-fumee mt-s3">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
