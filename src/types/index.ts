
export const BUSINESS_CATEGORIES = [
  "bodaboda-matatu",
  "mama-mboga-kiosks",
  "salon-barber",
  "agrovet-farming",
  "car-wash-auto",
  "mpesa-finance",
  "food-hospitality",
  "online-digital",
  "hardware-retail",
  "real-estate-rental"
] as const;

export type BusinessCategoryId =
  (typeof BUSINESS_CATEGORIES)[number];

export type DealType =
  | "full-sale"
  | "partnership";

export type ListingSort =
  | "newest"
  | "lowest-price"
  | "best-payback";

export type AlertFrequency =
  | "instant"
  | "daily"
  | "weekly";

export type AlertChannel =
  | "sms"
  | "email";

export type InquiryStatus =
  | "new"
  | "replied"
  | "closed";

export type PaymentOutcome =
  | "success"
  | "cancelled"
  | "insufficient_balance"
  | "timeout";

export interface BusinessCategory {
  id: BusinessCategoryId;
  name: string;
  emoji: string;
  description: string;
}

export interface Verification {
  checkedItems: string[];
  checkedAt: string;
}

export interface Listing {
  id: string;
  slug: string;
  title: string;
  category: BusinessCategoryId;
  county: string;
  town: string;
  askingPriceKes: number;
  monthlyRevenueKes: number | null;
  monthlyProfitKes: number | null;
  yearsOperating: number;
  staffCount: number;
  leaseRemainingMonths: number | null;
  reasonForSale: string;
  description: string;
  whatIsIncluded: string[];
  mpesaAccepted: boolean;
  bankTransfer: boolean;
  sellerFinancing: boolean;
  negotiable: boolean;
  dealType: DealType;
  photos: string[];
  verification: Verification | null;
  createdAt: string;
}

export interface ListingFilters {
  query?: string;
  county?: string;
  category?: BusinessCategoryId | "";
  minPrice?: number;
  maxPrice?: number;
  dealType?: DealType | "all";
  sellerFinancing?: boolean;
  verifiedOnly?: boolean;
  sort?: ListingSort;
}

export interface ListingSearchResult {
  items: Listing[];
  nextCursor: string | null;
  total: number;
}

export interface InquiryPayload {
  listingId: string;
  name: string;
  phone: string;
  message: string;
  website?: string;
}

export interface InquiryResult {
  id: string;
  success: boolean;
  message: string;
}

export interface SavedListing {
  listingId: string;
  savedAt: string;
}

export interface ListingDraft {
  id: string;
  currentStep: number;
  title: string;
  category: BusinessCategoryId | "";
  county: string;
  town: string;
  askingPriceKes: number | null;
  monthlyRevenueKes: number | null;
  monthlyProfitKes: number | null;
  yearsOperating: number | null;
  staffCount: number | null;
  leaseRemainingMonths: number | null;
  reasonForSale: string;
  description: string;
  whatIsIncluded: string[];
  mpesaAccepted: boolean;
  bankTransfer: boolean;
  sellerFinancing: boolean;
  negotiable: boolean;
  dealType: DealType;
  photos: string[];
  updatedAt: string;
}

export interface DraftInput {
  currentStep?: number;
  title?: string;
  category?: BusinessCategoryId | "";
  county?: string;
  town?: string;
  askingPriceKes?: number | null;
  monthlyRevenueKes?: number | null;
  monthlyProfitKes?: number | null;
  yearsOperating?: number | null;
  staffCount?: number | null;
  leaseRemainingMonths?: number | null;
  reasonForSale?: string;
  description?: string;
  whatIsIncluded?: string[];
  mpesaAccepted?: boolean;
  bankTransfer?: boolean;
  sellerFinancing?: boolean;
  negotiable?: boolean;
  dealType?: DealType;
  photos?: string[];
}

export interface SubmissionResult {
  listingId: string;
  status: "submitted" | "being-checked" | "live";
  submittedAt: string;
}

export interface OtpRequestResult {
  success: boolean;
  expiresInSeconds: number;
  message: string;
}

export interface OtpVerificationResult {
  success: boolean;
  sessionId?: string;
  message: string;
}

export type PaymentStatus =
  | "pending"
  | "success"
  | "cancelled"
  | "insufficient_balance"
  | "timeout";

export interface CreatePaymentPayload {
  listingId: string;
  phone: string;
  amountKes: number;
}

export interface Payment {
  id: string;
  listingId: string;
  phone: string;
  amountKes: number;
  status: PaymentStatus;
  receiptNumber: string | null;
  createdAt: string;
}

export interface CategoryListResult {
  categories: BusinessCategory[];
}
