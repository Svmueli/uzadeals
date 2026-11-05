
export type Locale = "en" | "sw";

export const SWAHILI_REVIEW_NOTE =
  "Swahili translations need native review before production use.";

export const messages = {
  en: {
    common: {
      home: "Home",
      browse: "Browse businesses",
      sell: "Sell a business",
      dashboard: "Dashboard",
      signIn: "Sign in",
      saved: "Saved",
      cancel: "Cancel",
      continue: "Continue",
      back: "Back",
      submit: "Submit",
      loading: "Loading…",
    },
    home: {
      headline: "Buy a business. Know the numbers.",
      description:
        "Explore business opportunities and make informed decisions.",
      browseBusinesses: "Browse businesses",
      sellBusiness: "Sell your business",
    },
    listing: {
      askingPrice: "Asking price",
      monthlyRevenue: "Monthly revenue",
      monthlyProfit: "Monthly profit",
      verified: "Verified",
      demoListing: "Demo listing",
      sellerReported: "Seller-reported",
      contactSeller: "Contact seller",
    },
    seller: {
      basics: "Basics",
      numbers: "Numbers",
      story: "Story",
      photos: "Photos",
      terms: "Terms",
      review: "Review and submit",
      saved: "Saved",
      saving: "Saving…",
    },
    verification: {
      title: "What does Verified mean?",
      explanation:
        "Verified means that specific checks have been completed and recorded for this listing.",
      disclaimer:
        "Verification is not a guarantee of profitability or a substitute for independent checks.",
    },
  },

  sw: {
    common: {
      home: "Nyumbani",
      browse: "Vinjari biashara",
      sell: "Uza biashara",
      dashboard: "Dashibodi",
      signIn: "Ingia",
      saved: "Imehifadhiwa",
      cancel: "Ghairi",
      continue: "Endelea",
      back: "Rudi",
      submit: "Wasilisha",
      loading: "Inapakia…",
    },
    home: {
      headline: "Nunua biashara. Fahamu takwimu.",
      description:
        "Chunguza fursa za biashara na ufanye maamuzi yenye taarifa.",
      browseBusinesses: "Vinjari biashara",
      sellBusiness: "Uza biashara yako",
    },
    listing: {
      askingPrice: "Bei inayotakiwa",
      monthlyRevenue: "Mapato ya kila mwezi",
      monthlyProfit: "Faida ya kila mwezi",
      verified: "Imethibitishwa",
      demoListing: "Tangazo la mfano",
      sellerReported: "Imetolewa na muuzaji",
      contactSeller: "Wasiliana na muuzaji",
    },
    seller: {
      basics: "Maelezo ya msingi",
      numbers: "Takwimu",
      story: "Maelezo",
      photos: "Picha",
      terms: "Masharti",
      review: "Kagua na uwasilishe",
      saved: "Imehifadhiwa",
      saving: "Inahifadhi…",
    },
    verification: {
      title: "Imethibitishwa inamaanisha nini?",
      explanation:
        "Imethibitishwa inamaanisha kuwa ukaguzi maalum umekamilishwa na kurekodiwa kwa tangazo hili.",
      disclaimer:
        "Uthibitishaji si dhamana ya faida wala mbadala wa ukaguzi wako binafsi.",
    },
  },
} as const;

export type MessageKey = keyof typeof messages.en;
