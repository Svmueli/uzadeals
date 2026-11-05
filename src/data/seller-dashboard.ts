
export type InboxStatus = "New" | "Replied" | "Closed";

export interface SellerInboxThread {
  id: string;
  buyerFirstName: string;
  listingTitle: string;
  firstLine: string;
  receivedAt: string;
  status: InboxStatus;
}

export interface SellerDashboardListing {
  id: string;
  title: string;
  askingPriceKes: number;
  views: number;
  saves: number;
  inquiries: number;
  status: "Live" | "Under review" | "Draft" | "Sold";
}

export const sellerDashboardListings: SellerDashboardListing[] = [
  {
    id: "demo-seller-1",
    title: "Neighbourhood Mini Mart",
    askingPriceKes: 680000,
    views: 248,
    saves: 31,
    inquiries: 9,
    status: "Live",
  },
  {
    id: "demo-seller-2",
    title: "Kitui Fresh Produce Store",
    askingPriceKes: 420000,
    views: 116,
    saves: 14,
    inquiries: 4,
    status: "Under review",
  },
];

export const sellerInboxDemo: SellerInboxThread[] = [
  {
    id: "inquiry-demo-1",
    buyerFirstName: "Brian",
    listingTitle: "Neighbourhood Mini Mart",
    firstLine: "Hi, is the stock included in the asking price?",
    receivedAt: "Today",
    status: "New",
  },
  {
    id: "inquiry-demo-2",
    buyerFirstName: "Grace",
    listingTitle: "Neighbourhood Mini Mart",
    firstLine: "Would you consider a viewing this weekend?",
    receivedAt: "Yesterday",
    status: "Replied",
  },
  {
    id: "inquiry-demo-3",
    buyerFirstName: "David",
    listingTitle: "Kitui Fresh Produce Store",
    firstLine: "Can I get more information about the lease?",
    receivedAt: "2 days ago",
    status: "New",
  },
  {
    id: "inquiry-demo-4",
    buyerFirstName: "Mary",
    listingTitle: "Neighbourhood Mini Mart",
    firstLine: "Thank you. I have decided not to proceed.",
    receivedAt: "3 days ago",
    status: "Closed",
  },
];
