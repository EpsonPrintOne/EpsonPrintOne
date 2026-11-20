// Single source of truth for the Print-IQ Epson Advantage Program (/pea).
// Only retailPrice and advantagePrice are entered by hand; the discount
// percentage and dollar saving are always calculated from them.
// Source: "Epson Print-IQ Epson Advantage.xlsx" (prices) and epson.com.sg
// (official product names, images and feature wording).

export type StockStatus = "in-stock" | "limited" | "sold-out";

export interface AdvantageProductInput {
  slug: string;
  /** Epson part number (VPN) */
  sku: string;
  model: string;
  name: string;
  image: string;
  shortDescription: string;
  retailPrice: number;
  advantagePrice: number;
  category: string;
  bestFor: string[];
  features: string[];
  included: string[];
  /** Only set when genuine stock information is available. */
  stockStatus?: StockStatus;
  /** Stripe-hosted checkout (Payment Link) */
  checkoutUrl: string;
}

export interface AdvantageProduct extends AdvantageProductInput {
  discountPercentage: number;
  discountPercentageExact: number;
  dollarSaving: number;
}

const inputs: AdvantageProductInput[] = [
  {
    slug: "epson-l3350",
    sku: "C11CL62503",
    model: "Epson EcoTank L3350",
    name: "Epson EcoTank L3350 A4 Wi-Fi All-in-One Ink Tank Printer",
    image: "/images/pea/epson-l3350.jpg",
    shortDescription:
      "Compact all-in-one EcoTank for everyday home printing, scanning and copying.",
    retailPrice: 249,
    advantagePrice: 235,
    category: "Home printers",
    bestFor: ["Home", "Students"],
    features: [
      "Print, scan and copy",
      "Refillable EcoTank with high-yield ink bottles (up to 7,500 colour pages, composite yield)",
      "Up to 11 ipm black / 6 ipm colour",
      "Wi-Fi, Wi-Fi Direct and Epson Smart Panel app",
      "Borderless printing up to 4R",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/00wdR82Vv3sMd8Tcv77bW0C",
  },
  {
    slug: "epson-l4360",
    sku: "C11CL41502",
    model: "Epson EcoTank L4360",
    name: "Epson EcoTank L4360 A4 Wi-Fi Duplex All-in-One Ink Tank Printer",
    image: "/images/pea/epson-l4360.jpg",
    shortDescription:
      "Duplex all-in-one EcoTank for families, students and busy home offices.",
    retailPrice: 399,
    advantagePrice: 339,
    category: "Home printers",
    bestFor: ["Home", "Students", "Home office"],
    features: [
      "Print, scan and copy",
      "Automatic duplex printing",
      "Up to 15 ipm black / 8 ipm colour",
      "Ultra-high-yield ink bottle rated up to 8,500 pages",
      "Wi-Fi, Wi-Fi Direct and borderless printing up to A4",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/7sYdR89jT5AU4Cndzb7bW0D",
  },
  {
    slug: "epson-l6370",
    sku: "C11CL43501",
    model: "Epson EcoTank L6370",
    name: "Epson EcoTank L6370 A4 Wi-Fi Duplex All-in-One Ink Tank Printer",
    image: "/images/pea/epson-l6370.jpg",
    shortDescription:
      "Fast, high-volume EcoTank with ADF for home offices and small businesses.",
    retailPrice: 489,
    advantagePrice: 445,
    category: "Office printers",
    bestFor: ["Home office", "SME"],
    features: [
      "Print, scan and copy with automatic document feeder",
      "Auto-duplex print, scan and copy",
      "Up to 18 ipm black / 9 ipm colour",
      "Ethernet, Wi-Fi and Wi-Fi Direct",
      "Designed for up to 100,000 pages",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/28EeVc0Nn4wQecX52F7bW0E",
  },
  {
    slug: "epson-ef-61g",
    sku: "V11HB72352",
    model: "Epson Lifestudio Pop EF-61G",
    name: "Epson Lifestudio Pop EF-61G Ice Green Portable Smart Projector",
    image: "/images/pea/epson-ef-61g.jpg",
    shortDescription:
      "Portable Full HD smart projector with Google TV and Sound by Bose.",
    retailPrice: 899,
    advantagePrice: 729,
    category: "Projectors",
    bestFor: ["Home", "Students"],
    features: [
      "Full HD picture up to 150 inches",
      "700 lumens of colour and white brightness",
      "Google TV with access to Netflix and other apps",
      "Sound by Bose speakers",
      "Instant automated image adjustments",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/eVq3cu7bL8N67Oz1Qt7bW0F",
  },
  {
    slug: "epson-ef-72",
    sku: "V11HB76652",
    model: "Epson Lifestudio Flex Plus EF-72",
    name: "Epson Lifestudio Flex Plus EF-72 Oak Portable Smart Projector",
    image: "/images/pea/epson-ef-72.jpg",
    shortDescription:
      "Portable 4K PRO-UHD smart projector with ambient lighting and adjustable stand.",
    retailPrice: 1589,
    advantagePrice: 1319,
    category: "Projectors",
    bestFor: ["Home"],
    features: [
      "4K PRO-UHD picture up to 150 inches",
      "1,000 lumens of colour and white brightness",
      "Google TV, Sound by Bose and built-in ambient lighting",
      "Adjustable stand with 180° rotation and 105° tilt",
      "Portable power via USB-C (100W or 140W USB-PD battery)",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/dRmcN48fPe7q7Ozdzb7bW0G",
  },
  {
    slug: "epson-eh-ls670",
    sku: "V11HB82152",
    model: "Epson Lifestudio Grand EH-LS670B",
    name: "Epson Lifestudio Grand EH-LS670B 4K PRO-UHD Laser Projection TV",
    image: "/images/pea/epson-eh-ls670.jpg",
    shortDescription:
      "Ultra short throw 4K laser projection TV for a true home cinema.",
    retailPrice: 3699,
    advantagePrice: 3499,
    category: "Projectors",
    bestFor: ["Home"],
    features: [
      "4K PRO-UHD resolution, up to 120 inches",
      "Ultra short throw laser projection",
      "3,600 lumens of colour and white brightness",
      "Google TV and Sound by Bose",
      "10-bit HDR colour processing",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/8x27sKeEd0gAecX8eR7bW0H",
  },
  {
    slug: "epson-sc-f130",
    sku: "C11CJ80402",
    model: "Epson SureColor SC-F130",
    name: "Epson SureColor SC-F130 A4 Dye-Sublimation Printer",
    image: "/images/pea/epson-sc-f130.jpg",
    shortDescription:
      "Epson's smallest A4 dye-sublimation printer for personalised gifts and merchandise.",
    retailPrice: 619,
    advantagePrice: 399,
    category: "Creative & business printers",
    bestFor: ["Home business", "SME"],
    features: [
      "A4 dye-sublimation printing for rigid and textile products",
      "CISS ink tank with CMYK ink",
      "Genuine Epson UltraChrome DS inks",
      "Suited to mugs, cushion covers, bags and aluminium photo frames",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/4gM4gy67H9Ra5Gr66J7bW0I",
  },
  {
    slug: "epson-wf-c5890",
    sku: "C11CK23502",
    model: "Epson WorkForce Pro WF-C5890",
    name: "Epson WorkForce Pro WF-C5890 A4 Colour Multifunction Printer",
    image: "/images/pea/epson-wf-c5890.jpg",
    shortDescription:
      "Fast, reliable business inkjet multifunction for busy offices.",
    retailPrice: 608,
    advantagePrice: 577.6,
    category: "Office printers",
    bestFor: ["SME", "Office"],
    features: [
      "25 ipm print speed",
      "High-speed auto-duplex printing",
      "Heat-Free Technology with low power consumption",
      "Security features to safeguard confidential documents",
      "Cloud and mobile connectivity",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/7sY9AS2Vv8N66Kv9iV7bW0J",
  },
  {
    slug: "epson-lw-c410",
    sku: "C51CF48030",
    model: "Epson LabelWorks LW-C410",
    name: "Epson LabelWorks LW-C410 Label Printer",
    image: "/images/pea/epson-lw-c410.jpg",
    shortDescription:
      "Bluetooth label printer for tidy, professional labels at home or in the office.",
    retailPrice: 99,
    advantagePrice: 88,
    category: "Label printers",
    bestFor: ["Home", "Office"],
    features: [
      "Bluetooth printing from PC or smart devices",
      "Epson Home & Craft Label app",
      "LK tape widths of 6, 9, 12 and 18 mm",
      "Auto cutter and 180 dpi print resolution",
    ],
    included: [
      "Genuine Epson product",
      "Epson Singapore manufacturer's warranty",
      "Free delivery in Singapore",
      "Print-IQ customer support",
    ],
    checkoutUrl: "https://buy.stripe.com/4gMcN4eEd7J22uf7aN7bW0K",
  },
];

export const advantageProducts: AdvantageProduct[] = inputs.map((p) => {
  const exact = ((p.retailPrice - p.advantagePrice) / p.retailPrice) * 100;
  return {
    ...p,
    discountPercentageExact: exact,
    discountPercentage: Math.round(exact),
    dollarSaving: Math.round((p.retailPrice - p.advantagePrice) * 100) / 100,
  };
});

export const productCount = advantageProducts.length;
export const minDiscount = Math.min(...advantageProducts.map((p) => p.discountPercentage));
export const maxDiscount = Math.max(...advantageProducts.map((p) => p.discountPercentage));

/** Products with the strongest percentage saving, used as featured examples. */
export function topSavings(count = 3): AdvantageProduct[] {
  return [...advantageProducts]
    .sort((a, b) => b.discountPercentageExact - a.discountPercentageExact)
    .slice(0, count);
}

export function formatSGD(amount: number): string {
  const whole = Number.isInteger(amount);
  return `S$${amount.toLocaleString("en-SG", {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
