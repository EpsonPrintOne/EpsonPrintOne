export interface PrinterProduct {
  sku: string;
  model: string;
  srp: number;
  /** Final charged price — a curated whole-dollar amount, not derived from srp. */
  buyPrice: number;
  warrantyUplift: string;
  bonusPromo?: string;
  description: string;
  image: string;
  paymentLink: string;
}

export interface InkProduct {
  family: string;
  sku: string;
  name: string;
  srp: number;
  compatibleModels: string;
  paymentLink: string;
}

export interface MaintenanceBoxProduct {
  sku: string;
  srp: number;
  compatibleModels: string;
  paymentLink: string;
}

const PROMO_DISCOUNT = 0.95;

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function promoPrice(srp: number): number {
  return srp * PROMO_DISCOUNT;
}

// Source: "Transactional Printers.xlsx" — Epson EcoTank printer lineup with
// PrintOne's promotional pricing (5% off SRP) and exclusive warranty uplift.
export const printers: PrinterProduct[] = [
  {
    sku: "C11CL65502",
    model: "Epson EcoTank L1350",
    srp: 209,
    buyPrice: 199,
    warrantyUplift: "5 years",
    description:
      "Print-only EcoTank with Wi-Fi, Wi-Fi Direct, AirPrint and Mopria Print support.",
    image: "/images/printers/epson-l1350.jpg",
    paymentLink: "https://buy.stripe.com/cNi6oG1Rr6EYc4P0Mp7bW0q",
  },
  {
    sku: "C11CL41502",
    model: "Epson EcoTank L4360",
    srp: 399,
    buyPrice: 379,
    warrantyUplift: "5 years",
    description:
      "Print, Scan and Copy with Wi-Fi, Wi-Fi Direct, Epson iPrint, Email Print, AirPrint and Mopria Print. Spill-free ink refilling and borderless 10×15cm photo printing.",
    image: "/images/printers/epson-l4360.jpg",
    paymentLink: "https://buy.stripe.com/eVq7sKdA93sMecXeDf7bW0r",
  },
  {
    sku: "C11CL40502",
    model: "Epson EcoTank L6390",
    srp: 539,
    buyPrice: 509,
    warrantyUplift: "5 years",
    bonusPromo: "$30 NTUC Voucher (Epson Islandwide Promotion)",
    description:
      "Print, Scan and Copy with Wi-Fi, Wi-Fi Direct, AirPrint and Mopria Print. Spill-free ink refilling and borderless 10×15cm photo printing.",
    image: "/images/printers/epson-l6390.jpg",
    paymentLink: "https://buy.stripe.com/28E6oGbs16EY3yj7aN7bW0s",
  },
  {
    sku: "C11CJ88502",
    model: "Epson EcoTank L6490",
    srp: 759,
    buyPrice: 719,
    warrantyUplift: "5 years",
    bonusPromo: "$50 NTUC Voucher (Epson Islandwide Promotion)",
    description:
      'Print, Scan, Copy and Fax with a 2.4" colour touchscreen, 35-sheet auto document feeder, Wi-Fi, Wi-Fi Direct and Ethernet. Auto-duplex printing (print only) with water-resistant DURABrite ET ink and two paper trays. Not suitable for glossy photo printing.',
    image: "/images/printers/epson-l6490.jpg",
    paymentLink: "https://buy.stripe.com/fZufZggMlaVe3yj9iV7bW0t",
  },
  {
    sku: "C11CH72502",
    model: "Epson EcoTank L15150",
    srp: 1399,
    buyPrice: 1329,
    warrantyUplift: "5 years",
    bonusPromo: "$50 NTUC Voucher (Epson Islandwide Promotion)",
    description:
      'Print, Scan, Copy and Fax up to A3 with full duplex on print, scan and copy, a 4.3" colour touchscreen, 50-sheet auto document feeder, Wi-Fi, Wi-Fi Direct and Ethernet. Water-resistant DURABrite ET ink and three paper trays. Not suitable for glossy photo printing.',
    image: "/images/printers/epson-l15150.jpg",
    paymentLink: "https://buy.stripe.com/aFacN4bs14wQ9WH66J7bW0u",
  },
  {
    sku: "C11CH71506",
    model: "Epson EcoTank L15180",
    srp: 2049,
    buyPrice: 1939,
    warrantyUplift: "5 years",
    description:
      'Print, Scan, Copy and Fax up to A3 with full duplex on print, scan and copy, a 4.3" colour touchscreen, 50-sheet auto document feeder, Wi-Fi Direct and Ethernet. Water-resistant DURABrite ET ink, PCL5/PCL6/PostScript 3/PDF emulation, and Epson Open Platform support (software sold separately). Not suitable for glossy photo printing.',
    image: "/images/printers/epson-l15180.jpg",
    paymentLink: "https://buy.stripe.com/fZu5kC3Zze7q1qbeDf7bW0v",
  },
];

export const inks: InkProduct[] = [
  {
    family: "001",
    sku: "C13T03Y100",
    name: "001 Pigment Black Ink Bottle",
    srp: 16.9,
    compatibleModels:
      "L4150, L4160, L6160, L6170, L6190, L14150, L4260, L4266, L6260, L6270, L6290, L4360, L4366, L6370, L6390",
    paymentLink: "https://buy.stripe.com/eVq28q2Vv2oI2ufbr37bW0c",
  },
  {
    family: "001",
    sku: "C13T03Y200",
    name: "001 Cyan Ink Bottle",
    srp: 11.1,
    compatibleModels:
      "L4150, L4160, L6160, L6170, L6190, L14150, L4260, L4266, L6260, L6270, L6290, L4360, L4366, L6370, L6390",
    paymentLink: "https://buy.stripe.com/cNifZg9jTgfy3yj2Ux7bW0d",
  },
  {
    family: "001",
    sku: "C13T03Y300",
    name: "001 Magenta Ink Bottle",
    srp: 11.1,
    compatibleModels:
      "L4150, L4160, L6160, L6170, L6190, L14150, L4260, L4266, L6260, L6270, L6290, L4360, L4366, L6370, L6390",
    paymentLink: "https://buy.stripe.com/6oUeVc67H6EY9WHfHj7bW0e",
  },
  {
    family: "001",
    sku: "C13T03Y400",
    name: "001 Yellow Ink Bottle",
    srp: 11.1,
    compatibleModels:
      "L4150, L4160, L6160, L6170, L6190, L14150, L4260, L4266, L6260, L6270, L6290, L4360, L4366, L6370, L6390",
    paymentLink: "https://buy.stripe.com/dRmcN453D1kE5Gr3YB7bW0f",
  },
  {
    family: "003",
    sku: "C13T00V100",
    name: "003 Black Bottle Ink",
    srp: 11.1,
    compatibleModels:
      "L1110, L3110, L3116, L3156, L3150, L5190, L1210, L1216, L3210, L3216, L3250, L3256, L3550, L3556, L5290, L5296, L11050",
    paymentLink: "https://buy.stripe.com/3cIdR867H7J2d8T0Mp7bW0g",
  },
  {
    family: "003",
    sku: "C13T00V200",
    name: "003 Cyan Bottle Ink",
    srp: 11.1,
    compatibleModels:
      "L1110, L3110, L3116, L3156, L3150, L5190, L1210, L1216, L3210, L3216, L3250, L3256, L3550, L3556, L5290, L5296, L11050",
    paymentLink: "https://buy.stripe.com/5kQ5kC9jTbZib0L1Qt7bW0h",
  },
  {
    family: "003",
    sku: "C13T00V300",
    name: "003 Magenta Bottle Ink",
    srp: 11.1,
    compatibleModels:
      "L1110, L3110, L3116, L3156, L3150, L5190, L1210, L1216, L3210, L3216, L3250, L3256, L3550, L3556, L5290, L5296, L11050",
    paymentLink: "https://buy.stripe.com/eVq7sKdA91kEecXdzb7bW0i",
  },
  {
    family: "003",
    sku: "C13T00V400",
    name: "003 Yellow Bottle Ink",
    srp: 11.1,
    compatibleModels:
      "L1110, L3110, L3116, L3156, L3150, L5190, L1210, L1216, L3210, L3216, L3250, L3256, L3550, L3556, L5290, L5296, L11050",
    paymentLink: "https://buy.stripe.com/cNi5kC67H3sM5Gr7aN7bW0j",
  },
  {
    family: "008",
    sku: "C13T06G100",
    name: "008 Black 127ml Ink Bottle",
    srp: 26.5,
    compatibleModels: "L6460, L6490, L6550, L6580, L15150, L15160, L15180, M15140, M15180",
    paymentLink: "https://buy.stripe.com/cNi14m9jT4wQecX3YB7bW0k",
  },
  {
    family: "008",
    sku: "C13T06G200",
    name: "008 Cyan 70ml Ink Bottle",
    srp: 21.5,
    compatibleModels: "L6460, L6490, L6550, L6580, L15150, L15160, L15180",
    paymentLink: "https://buy.stripe.com/14AfZg2VvbZifh152F7bW0l",
  },
  {
    family: "008",
    sku: "C13T06G300",
    name: "008 Magenta 70ml Ink Bottle",
    srp: 21.5,
    compatibleModels: "L6460, L6490, L6550, L6580, L15150, L15160, L15180",
    paymentLink: "https://buy.stripe.com/9B69AS0Nn4wQecX2Ux7bW0m",
  },
  {
    family: "008",
    sku: "C13T06G400",
    name: "008 Yellow 70ml Ink Bottle",
    srp: 21.5,
    compatibleModels: "L6460, L6490, L6550, L6580, L15150, L15160, L15180",
    paymentLink: "https://buy.stripe.com/cNibJ0anX7J26Kv1Qt7bW0n",
  },
];

export const maintenanceBoxes: MaintenanceBoxProduct[] = [
  {
    sku: "C13T04D100",
    srp: 14.1,
    compatibleModels:
      "WF-2861, L6160, L6170, L6190, M1140, M2140, M3170, L14150, L6460, L6490, L11050, L6260, L6270, L6290, L4360, L4366, L6370, L6390",
    paymentLink: "https://buy.stripe.com/dRm5kC67HbZi8SD8eR7bW0o",
  },
  {
    sku: "C12C934591",
    srp: 58.8,
    compatibleModels:
      "L6550, L6580, L15150, L15160, L15180, M15140, M15180, L8050, L18050",
    paymentLink: "https://buy.stripe.com/cNidR89jTaVe9WHbr37bW0p",
  },
];
