import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "UzaDeals — Buy and Sell Businesses",
    short_name: "UzaDeals",
    description:
      "Discover, evaluate, buy, and sell small businesses across Kenya.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F8F4EC",
    theme_color: "#0F3D2E",
    orientation: "portrait",
    categories: ["business", "finance", "shopping"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}