
import type { Listing } from "@/types";

export const mockListings: Listing[] = [
  {
    id: "UD-001",
    slug: "kilimani-fresh-produce-kiosk",
    title: "Established Fresh Produce Kiosk",
    category: "mama-mboga-kiosks",
    county: "Nairobi",
    town: "Kilimani",
    askingPriceKes: 480000,
    monthlyRevenueKes: 320000,
    monthlyProfitKes: 40000,
    yearsOperating: 4,
    staffCount: 2,
    leaseRemainingMonths: 18,
    reasonForSale: "Owner relocating to another county.",
    description:
      "A fictional neighbourhood fresh produce kiosk serving a residential area in Kilimani. The business has an established customer base and regular produce suppliers.",
    whatIsIncluded: [
      "Shop fittings and shelving",
      "Display stands",
      "Existing stock",
      "Supplier contact list",
      "Business name and signage"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: {
      checkedItems: [
        "Identity checked",
        "Ownership evidence checked"
      ],
      checkedAt: "2026-10-20T10:00:00.000Z"
    },
    createdAt: "2026-11-03T09:00:00.000Z"
  },
  {
    id: "UD-002",
    slug: "nyali-unisex-salon",
    title: "Modern Unisex Salon in Nyali",
    category: "salon-barber",
    county: "Mombasa",
    town: "Nyali",
    askingPriceKes: 850000,
    monthlyRevenueKes: 280000,
    monthlyProfitKes: 72000,
    yearsOperating: 5,
    staffCount: 4,
    leaseRemainingMonths: 24,
    reasonForSale: "Owner pursuing a different business opportunity.",
    description:
      "A fictional unisex salon with several styling stations, a reception area and an established appointment routine.",
    whatIsIncluded: [
      "Four styling stations",
      "Salon chairs and mirrors",
      "Hair dryers",
      "Waiting area furniture",
      "Existing salon equipment"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: true,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: null,
    createdAt: "2026-11-02T11:30:00.000Z"
  },
  {
    id: "UD-003",
    slug: "kisumu-agrovet-shop",
    title: "Community Agrovet and Farm Supplies",
    category: "agrovet-farming",
    county: "Kisumu",
    town: "Kondele",
    askingPriceKes: 1250000,
    monthlyRevenueKes: 650000,
    monthlyProfitKes: 95000,
    yearsOperating: 6,
    staffCount: 3,
    leaseRemainingMonths: 30,
    reasonForSale: "Owner planning to concentrate on family farming.",
    description:
      "A fictional agrovet retail outlet offering agricultural inputs and basic farming supplies to local customers.",
    whatIsIncluded: [
      "Retail shelving",
      "Shop fittings",
      "Storage equipment",
      "Point-of-sale equipment",
      "Supplier contacts"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: {
      checkedItems: [
        "Identity checked",
        "Ownership evidence checked",
        "Plausibility checks performed"
      ],
      checkedAt: "2026-10-22T08:30:00.000Z"
    },
    createdAt: "2026-11-01T08:00:00.000Z"
  },
  {
    id: "UD-004",
    slug: "nakuru-express-car-wash",
    title: "Express Car Wash and Detailing Point",
    category: "car-wash-auto",
    county: "Nakuru",
    town: "Nakuru Town",
    askingPriceKes: 620000,
    monthlyRevenueKes: 210000,
    monthlyProfitKes: 58000,
    yearsOperating: 3,
    staffCount: 3,
    leaseRemainingMonths: 12,
    reasonForSale: "Owner moving into vehicle sales.",
    description:
      "A fictional vehicle cleaning business with washing bays, basic detailing equipment and an accessible roadside location.",
    whatIsIncluded: [
      "Pressure washer",
      "Water storage tanks",
      "Vacuum cleaner",
      "Cleaning equipment",
      "Customer waiting area"
    ],
    mpesaAccepted: true,
    bankTransfer: false,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: null,
    createdAt: "2026-10-31T12:00:00.000Z"
  },
  {
    id: "UD-005",
    slug: "eldoret-mpesa-agent-outlet",
    title: "Established Mobile Money Agent Outlet",
    category: "mpesa-finance",
    county: "Uasin Gishu",
    town: "Eldoret",
    askingPriceKes: 950000,
    monthlyRevenueKes: 190000,
    monthlyProfitKes: 65000,
    yearsOperating: 5,
    staffCount: 2,
    leaseRemainingMonths: 20,
    reasonForSale: "Owner considering relocation.",
    description:
      "A fictional mobile money agency outlet with a small customer service counter and an established local presence.",
    whatIsIncluded: [
      "Counter and fittings",
      "Security fixtures",
      "Furniture",
      "Business signage",
      "Operational handover assistance"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: false,
    negotiable: false,
    dealType: "full-sale",
    photos: [],
    verification: {
      checkedItems: [
        "Identity checked",
        "Ownership evidence checked"
      ],
      checkedAt: "2026-10-23T14:00:00.000Z"
    },
    createdAt: "2026-10-30T10:00:00.000Z"
  },
  {
    id: "UD-006",
    slug: "thika-breakfast-cafe",
    title: "Breakfast Café and Local Eatery",
    category: "food-hospitality",
    county: "Kiambu",
    town: "Thika",
    askingPriceKes: 1100000,
    monthlyRevenueKes: 520000,
    monthlyProfitKes: 88000,
    yearsOperating: 4,
    staffCount: 5,
    leaseRemainingMonths: 16,
    reasonForSale: "Owner accepting an employment opportunity abroad.",
    description:
      "A fictional breakfast café serving tea, coffee, light meals and takeaway food in a busy commercial neighbourhood.",
    whatIsIncluded: [
      "Kitchen equipment",
      "Dining furniture",
      "Refrigerator",
      "Cooking appliances",
      "Service counter"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: true,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: null,
    createdAt: "2026-10-29T09:00:00.000Z"
  },
  {
    id: "UD-007",
    slug: "nyeri-digital-print-shop",
    title: "Digital Printing and Online Services Shop",
    category: "online-digital",
    county: "Nyeri",
    town: "Nyeri Town",
    askingPriceKes: 390000,
    monthlyRevenueKes: 180000,
    monthlyProfitKes: 46000,
    yearsOperating: 2,
    staffCount: 2,
    leaseRemainingMonths: 10,
    reasonForSale: "Owner shifting focus to remote work.",
    description:
      "A fictional small digital services outlet offering printing, document preparation and internet-based services.",
    whatIsIncluded: [
      "Desktop computers",
      "Printers",
      "Office furniture",
      "Router and networking equipment",
      "Customer service counter"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: {
      checkedItems: [
        "Identity checked",
        "Original photos checked"
      ],
      checkedAt: "2026-10-24T09:00:00.000Z"
    },
    createdAt: "2026-10-28T14:00:00.000Z"
  },
  {
    id: "UD-008",
    slug: "meru-hardware-retail-shop",
    title: "Building Materials and Hardware Shop",
    category: "hardware-retail",
    county: "Meru",
    town: "Meru Town",
    askingPriceKes: 1850000,
    monthlyRevenueKes: 950000,
    monthlyProfitKes: 125000,
    yearsOperating: 7,
    staffCount: 4,
    leaseRemainingMonths: 36,
    reasonForSale: "Owner preparing for retirement.",
    description:
      "A fictional retail hardware business selling common construction materials, tools and household fittings.",
    whatIsIncluded: [
      "Retail shelving",
      "Display racks",
      "Point-of-sale equipment",
      "Existing stock subject to inventory",
      "Supplier contacts"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: true,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: {
      checkedItems: [
        "Identity checked",
        "Ownership evidence checked",
        "Plausibility checks performed"
      ],
      checkedAt: "2026-10-25T11:00:00.000Z"
    },
    createdAt: "2026-10-27T08:00:00.000Z"
  },
  {
    id: "UD-009",
    slug: "nairobi-bodaboda-fleet",
    title: "Three-Bike Bodaboda Fleet Opportunity",
    category: "bodaboda-matatu",
    county: "Nairobi",
    town: "Umoja",
    askingPriceKes: 540000,
    monthlyRevenueKes: 165000,
    monthlyProfitKes: 52000,
    yearsOperating: 3,
    staffCount: 3,
    leaseRemainingMonths: null,
    reasonForSale: "Owner consolidating investments.",
    description:
      "A fictional small transport operation involving three motorcycles and an existing rider arrangement.",
    whatIsIncluded: [
      "Three motorcycles",
      "Service history",
      "Existing rider contacts",
      "Safety equipment",
      "Maintenance records"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: null,
    createdAt: "2026-10-26T10:00:00.000Z"
  },
  {
    id: "UD-010",
    slug: "mombasa-apartment-rental-operation",
    title: "Small Furnished Rental Operation",
    category: "real-estate-rental",
    county: "Mombasa",
    town: "Bamburi",
    askingPriceKes: 2400000,
    monthlyRevenueKes: 360000,
    monthlyProfitKes: 105000,
    yearsOperating: 4,
    staffCount: 1,
    leaseRemainingMonths: 28,
    reasonForSale: "Owner restructuring their property portfolio.",
    description:
      "A fictional furnished rental operation offered as a business opportunity. Property ownership and lease rights require independent investigation.",
    whatIsIncluded: [
      "Furniture and appliances",
      "Operating records",
      "Guest management procedures",
      "Cleaning equipment",
      "Operational handover"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: false,
    negotiable: true,
    dealType: "partnership",
    photos: [],
    verification: {
      checkedItems: [
        "Identity checked"
      ],
      checkedAt: "2026-10-26T13:00:00.000Z"
    },
    createdAt: "2026-10-25T08:00:00.000Z"
  },
  {
    id: "UD-011",
    slug: "kisumu-barbershop",
    title: "Neighbourhood Barber Shop",
    category: "salon-barber",
    county: "Kisumu",
    town: "Milimani",
    askingPriceKes: 280000,
    monthlyRevenueKes: 145000,
    monthlyProfitKes: 35000,
    yearsOperating: 2,
    staffCount: 2,
    leaseRemainingMonths: 8,
    reasonForSale: "Owner moving to a different town.",
    description:
      "A fictional barber shop with two cutting stations and a small waiting area.",
    whatIsIncluded: [
      "Barber chairs",
      "Mirrors",
      "Clippers and tools",
      "Waiting area furniture",
      "Shop fittings"
    ],
    mpesaAccepted: true,
    bankTransfer: false,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: null,
    createdAt: "2026-10-24T09:30:00.000Z"
  },
  {
    id: "UD-012",
    slug: "nakuru-farm-inputs-partnership",
    title: "Farm Inputs Distribution Partnership",
    category: "agrovet-farming",
    county: "Nakuru",
    town: "Naivasha",
    askingPriceKes: 720000,
    monthlyRevenueKes: 410000,
    monthlyProfitKes: 68000,
    yearsOperating: 3,
    staffCount: 2,
    leaseRemainingMonths: 15,
    reasonForSale: "Owner seeking a working partner to support expansion.",
    description:
      "A fictional farm-inputs distribution opportunity serving small-scale farmers and agricultural retailers.",
    whatIsIncluded: [
      "Storage shelving",
      "Delivery contacts",
      "Supplier relationships",
      "Inventory records",
      "Distribution procedures"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: true,
    negotiable: true,
    dealType: "partnership",
    photos: [],
    verification: null,
    createdAt: "2026-10-23T11:00:00.000Z"
  },
  {
    id: "UD-013",
    slug: "eldoret-fast-food-takeaway",
    title: "Fast Food and Takeaway Outlet",
    category: "food-hospitality",
    county: "Uasin Gishu",
    town: "Eldoret",
    askingPriceKes: 680000,
    monthlyRevenueKes: 295000,
    monthlyProfitKes: 61000,
    yearsOperating: 3,
    staffCount: 3,
    leaseRemainingMonths: 14,
    reasonForSale: "Owner pursuing a new venture.",
    description:
      "A fictional takeaway food outlet offering quick meals and takeaway services.",
    whatIsIncluded: [
      "Cooking equipment",
      "Food preparation counters",
      "Refrigeration equipment",
      "Dining furniture",
      "Shop signage"
    ],
    mpesaAccepted: true,
    bankTransfer: true,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: {
      checkedItems: [
        "Identity checked",
        "Original photos checked"
      ],
      checkedAt: "2026-10-22T15:00:00.000Z"
    },
    createdAt: "2026-10-22T10:00:00.000Z"
  },
  {
    id: "UD-014",
    slug: "thika-general-retail-shop",
    title: "General Household Retail Shop",
    category: "hardware-retail",
    county: "Kiambu",
    town: "Thika",
    askingPriceKes: 560000,
    monthlyRevenueKes: 340000,
    monthlyProfitKes: null,
    yearsOperating: 5,
    staffCount: 2,
    leaseRemainingMonths: null,
    reasonForSale: "Owner considering a different investment.",
    description:
      "A fictional general retail shop selling everyday household products. The seller has not supplied a monthly profit figure.",
    whatIsIncluded: [
      "Retail shelving",
      "Display counters",
      "Furniture",
      "Existing stock subject to inventory"
    ],
    mpesaAccepted: true,
    bankTransfer: false,
    sellerFinancing: false,
    negotiable: true,
    dealType: "full-sale",
    photos: [],
    verification: null,
    createdAt: "2026-10-21T09:00:00.000Z"
  }
];
