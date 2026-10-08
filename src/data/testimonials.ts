export type Lang = "en" | "rw" | "fr";

export interface Testimonial {
  /** Name as it is shown on the site. */
  name: string;
  /** What they said: one string, or one version per site language. */
  quote: string | Record<Lang, string>;
}

/**
 * Real feedback from people the company has worked with, published with the
 * company's approval. Add new entries here as more come in; the section shows
 * an invitation to share feedback while this list is empty.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Claudine Uwimana",
    quote: {
      en: "This platform has transformed my business. I'm reaching customers I never knew existed. My sales grew by 3x in just 6 months.",
      rw: "Uru rubuga rwahinduye ubucuruzi bwanjye. Ngeza ibicuruzwa byanjye ku bakiriya ntari nzi ko babaho. Icuruzwa ryanjye ryikubye gatatu mu mezi atandatu gusa.",
      fr: "Cette plateforme a transformé mon activité. Je touche des clients dont j'ignorais l'existence. Mes ventes ont triplé en seulement six mois.",
    },
  },
  {
    name: "Leonce Karemera",
    quote: {
      en: "Marketing and visibility were our biggest hurdles. Amamazanonaha provided the bridge we needed to connect with a wider audience.",
      rw: "Kwamamaza no kumenyekana byari imbogamizi yacu ikomeye. Amamazanonaha yaduhaye ikiraro twari dukeneye kugira ngo tugere ku bantu benshi.",
      fr: "Le marketing et la visibilité étaient nos plus grands obstacles. Amamazanonaha nous a donné le pont dont nous avions besoin pour toucher un public plus large.",
    },
  },
  {
    name: "Jeanne Gasana",
    quote: {
      en: "Finding high-quality services used to take days. Now I find trusted pros in minutes. The trust and professionalism are unmatched.",
      rw: "Kubona serivisi nziza byajyaga bimara iminsi. Ubu mbona abanyamwuga bizewe mu minota mike. Icyizere n'ubunyamwuga ntibigereranywa.",
      fr: "Trouver des services de qualité prenait des jours. Aujourd'hui, je trouve des professionnels fiables en quelques minutes. La confiance et le professionnalisme sont sans égal.",
    },
  },
];
