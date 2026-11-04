
import { categories } from "@/data/categories";
import { mockListings } from "@/data/mock";

import type {
  BusinessCategory,
  CreatePaymentPayload,
  DraftInput,
  InquiryPayload,
  InquiryResult,
  Listing,
  ListingDraft,
  ListingFilters,
  ListingSearchResult,
  OtpRequestResult,
  OtpVerificationResult,
  Payment,
  PaymentStatus,
  SubmissionResult
} from "@/types";

// --------------------------------------------------
// MOCK STORAGE
// --------------------------------------------------

const savedListingIds = new Set<string>();

const drafts = new Map<string, ListingDraft>();

const payments = new Map<string, Payment>();

const inquiries = new Map<string, InquiryPayload>();

const otpRequests = new Map<string, number>();

let draftCounter = 0;
let paymentCounter = 0;
let inquiryCounter = 0;

// --------------------------------------------------
// SIMULATED NETWORK LATENCY
// --------------------------------------------------

function mockDelay(): Promise<void> {
  const delay = 300 + Math.floor(Math.random() * 301);

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function calculatePayback(listing: Listing): number | null {
  if (
    listing.monthlyProfitKes === null ||
    listing.monthlyProfitKes <= 0
  ) {
    return null;
  }

  return listing.askingPriceKes / listing.monthlyProfitKes;
}

function matchesQuery(listing: Listing, query: string): boolean {
  const searchable = [
    listing.title,
    listing.description,
    listing.town,
    listing.county,
    listing.category
  ]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query.toLowerCase());
}

// --------------------------------------------------
// CATEGORIES
// --------------------------------------------------

export async function listCategories(): Promise<BusinessCategory[]> {
  await mockDelay();

  return [...categories];
}

// --------------------------------------------------
// LISTING SEARCH
// --------------------------------------------------

export async function searchListings(
  filters: ListingFilters = {},
  cursor: string | null = null
): Promise<ListingSearchResult> {
  await mockDelay();

  let results = [...mockListings];

  if (filters.query?.trim()) {
    results = results.filter((listing) =>
      matchesQuery(listing, filters.query!.trim())
    );
  }

  if (filters.county) {
    results = results.filter(
      (listing) => listing.county === filters.county
    );
  }

  if (filters.category) {
    results = results.filter(
      (listing) => listing.category === filters.category
    );
  }

  if (typeof filters.minPrice === "number") {
    results = results.filter(
      (listing) => listing.askingPriceKes >= filters.minPrice!
    );
  }

  if (typeof filters.maxPrice === "number") {
    results = results.filter(
      (listing) => listing.askingPriceKes <= filters.maxPrice!
    );
  }

  if (filters.dealType && filters.dealType !== "all") {
    results = results.filter(
      (listing) => listing.dealType === filters.dealType
    );
  }

  if (filters.sellerFinancing) {
    results = results.filter(
      (listing) => listing.sellerFinancing
    );
  }

  if (filters.verifiedOnly) {
    results = results.filter(
      (listing) => listing.verification !== null
    );
  }

  switch (filters.sort) {
    case "lowest-price":
      results.sort(
        (a, b) => a.askingPriceKes - b.askingPriceKes
      );
      break;

    case "best-payback":
      results.sort((a, b) => {
        const aPayback = calculatePayback(a);
        const bPayback = calculatePayback(b);

        if (aPayback === null) return 1;
        if (bPayback === null) return -1;

        return aPayback - bPayback;
      });
      break;

    case "newest":
    default:
      results.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
  }

  const total = results.length;
  const pageSize = 8;
  const offset = cursor ? Number.parseInt(cursor, 10) : 0;

  const safeOffset =
    Number.isFinite(offset) && offset >= 0 ? offset : 0;

  const items = results.slice(
    safeOffset,
    safeOffset + pageSize
  );

  const nextOffset = safeOffset + pageSize;

  return {
    items,
    total,
    nextCursor:
      nextOffset < total ? String(nextOffset) : null
  };
}

// --------------------------------------------------
// SINGLE LISTING
// --------------------------------------------------

export async function getListing(
  slug: string
): Promise<Listing | null> {
  await mockDelay();

  return (
    mockListings.find((listing) => listing.slug === slug) ??
    null
  );
}

// --------------------------------------------------
// INQUIRIES
// --------------------------------------------------

export async function sendInquiry(
  payload: InquiryPayload
): Promise<InquiryResult> {
  await mockDelay();

  const listingExists = mockListings.some(
    (listing) => listing.id === payload.listingId
  );

  if (!listingExists) {
    throw new Error("This business listing could not be found.");
  }

  if (payload.website?.trim()) {
    return {
      id: "demo-spam",
      success: true,
      message: "Your message has been received."
    };
  }

  const id = `INQ-${String(++inquiryCounter).padStart(4, "0")}`;

  inquiries.set(id, {
    ...payload,
    name: stripHtml(payload.name),
    message: stripHtml(payload.message)
  });

  return {
    id,
    success: true,
    message: "Your message has been received."
  };
}

// --------------------------------------------------
// SAVED LISTINGS
// --------------------------------------------------

export async function toggleSave(
  listingId: string
): Promise<boolean> {
  await mockDelay();

  const listingExists = mockListings.some(
    (listing) => listing.id === listingId
  );

  if (!listingExists) {
    throw new Error("This listing could not be found.");
  }

  if (savedListingIds.has(listingId)) {
    savedListingIds.delete(listingId);
    return false;
  }

  savedListingIds.add(listingId);

  return true;
}

// --------------------------------------------------
// SELLER DRAFTS
// --------------------------------------------------

function createEmptyDraft(id: string): ListingDraft {
  return {
    id,
    currentStep: 1,
    title: "",
    category: "",
    county: "",
    town: "",
    askingPriceKes: null,
    monthlyRevenueKes: null,
    monthlyProfitKes: null,
    yearsOperating: null,
    staffCount: null,
    leaseRemainingMonths: null,
    reasonForSale: "",
    description: "",
    whatIsIncluded: [],
    mpesaAccepted: false,
    bankTransfer: false,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    updatedAt: new Date().toISOString()
  };
}

export async function createDraft(
  input: DraftInput = {}
): Promise<ListingDraft> {
  await mockDelay();

  const id = `DRAFT-${String(++draftCounter).padStart(4, "0")}`;

  const draft: ListingDraft = {
    ...createEmptyDraft(id),
    ...input,
    id,
    updatedAt: new Date().toISOString()
  };

  drafts.set(id, draft);

  return { ...draft };
}

export async function updateDraft(
  draftId: string,
  input: DraftInput
): Promise<ListingDraft> {
  await mockDelay();

  const existing = drafts.get(draftId);

  if (!existing) {
    throw new Error("This draft could not be found.");
  }

  const updated: ListingDraft = {
    ...existing,
    ...input,
    id: draftId,
    updatedAt: new Date().toISOString()
  };

  drafts.set(draftId, updated);

  return { ...updated };
}

export async function submitListing(
  draftId: string
): Promise<SubmissionResult> {
  await mockDelay();

  const draft = drafts.get(draftId);

  if (!draft) {
    throw new Error("This draft could not be found.");
  }

  return {
    listingId: `SUB-${draft.id}`,
    status: "submitted",
    submittedAt: new Date().toISOString()
  };
}

// --------------------------------------------------
// PHONE OTP
// --------------------------------------------------

export async function sendOtp(
  phone: string
): Promise<OtpRequestResult> {
  await mockDelay();

  otpRequests.set(phone, Date.now());

  return {
    success: true,
    expiresInSeconds: 300,
    message: "A demo verification code has been requested."
  };
}

export async function verifyOtp(
  phone: string,
  code: string
): Promise<OtpVerificationResult> {
  await mockDelay();

  if (!otpRequests.has(phone)) {
    return {
      success: false,
      message: "Request a verification code first."
    };
  }

  if (!/^\d{6}$/.test(code)) {
    return {
      success: false,
      message: "Enter a valid six-digit code."
    };
  }

  if (code === "000000") {
    return {
      success: false,
      message: "That demo code is incorrect. Try another code."
    };
  }

  return {
    success: true,
    sessionId: `DEMO-SESSION-${Date.now()}`,
    message: "Demo verification successful."
  };
}

// --------------------------------------------------
// PAYMENT SIMULATION
// --------------------------------------------------

export async function createPayment(
  payload: CreatePaymentPayload
): Promise<Payment> {
  await mockDelay();

  const listingExists = mockListings.some(
    (listing) => listing.id === payload.listingId
  );

  if (!listingExists) {
    throw new Error("The selected listing could not be found.");
  }

  if (
    !Number.isFinite(payload.amountKes) ||
    payload.amountKes <= 0
  ) {
    throw new Error("Enter a valid payment amount.");
  }

  const id = `PAY-${String(++paymentCounter).padStart(4, "0")}`;

  const payment: Payment = {
    id,
    listingId: payload.listingId,
    phone: payload.phone,
    amountKes: payload.amountKes,
    status: "pending",
    receiptNumber: null,
    createdAt: new Date().toISOString()
  };

  payments.set(id, payment);

  return { ...payment };
}

export async function getPaymentStatus(
  paymentId: string
): Promise<PaymentStatus> {
  await mockDelay();

  const payment = payments.get(paymentId);

  if (!payment) {
    throw new Error("This payment could not be found.");
  }

  return payment.status;
}
