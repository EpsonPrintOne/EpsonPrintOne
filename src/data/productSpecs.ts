export interface Spec {
  label: string;
  value: string;
}

export interface ProductSpecs {
  slug: string;
  blurb: string;
  brochure: string;
  headline: Spec[];
  detailed: Spec[];
}

export const productSpecs: ProductSpecs[] = [
  {
    slug: "lite",
    blurb:
      "An affordable, compact ink tank printer for everyday and photo printing, with low cost per page from spill-free ink bottles and wireless printing for smart devices.",
    brochure: "/brochures/epson-l1250.pdf",
    headline: [
      { label: "Print speed", value: "Up to 10.0 ipm black / 5.0 ipm colour" },
      { label: "Functions", value: "Print only" },
      { label: "Max paper size", value: "A4" },
      { label: "Display", value: "Button-controlled (no LCD panel)" },
      { label: "Connectivity", value: "Wi-Fi, Wi-Fi Direct, USB 2.0" },
      { label: "Ink yield", value: "Up to 4,500 pages black / 7,500 pages colour" },
    ],
    detailed: [
      { label: "Dimensions & weight", value: "169 × 347 × 375 mm, 2.9 kg" },
      { label: "Power consumption", value: "Operating 12.0 W, Sleep 0.7 W" },
      { label: "Paper input capacity", value: "Up to 100 sheets plain paper" },
      { label: "Borderless printing", value: "Up to 4R (4×6\")" },
      { label: "Max resolution", value: "5760 × 1440 dpi" },
      { label: "Mobile app", value: "Epson Smart Panel, Epson Connect" },
      { label: "OS compatibility", value: "Windows XP–10, macOS 10.6.8+" },
    ],
  },
  {
    slug: "lite-plus",
    blurb:
      "A compact, lighter redesign offering fast auto-duplex printing and ultra-low printing cost via Epson Heat-Free Technology.",
    brochure: "/brochures/epson-l4360.pdf",
    headline: [
      { label: "Print speed", value: "Up to 15.0 ipm black / 8.0 ipm colour" },
      { label: "Functions", value: "Print, Scan, Copy" },
      { label: "Max paper size", value: "A4 / Legal" },
      { label: "Auto duplex printing", value: "Yes" },
      { label: "Display", value: "1.44\" Colour LCD" },
      { label: "Connectivity", value: "Wi-Fi, Wi-Fi Direct, USB 2.0" },
      { label: "Ink yield", value: "Up to 8,500 pages black / 6,500 pages colour" },
    ],
    detailed: [
      { label: "Dimensions & weight", value: "187 × 347 × 375 mm, 5.2 kg" },
      { label: "Power consumption", value: "Operating 13 W, Sleep 0.6 W" },
      { label: "Paper input capacity", value: "100 sheets plain paper" },
      { label: "Borderless printing", value: "Up to A4" },
      { label: "Mobile app", value: "Epson Smart Panel, AirPrint, Mopria" },
      { label: "OS compatibility", value: "Windows 7–11, macOS 10.9.5+" },
    ],
  },
  {
    slug: "pro",
    blurb:
      "A faster business printer built for scalable workloads, with touchscreen ease of use and durability rated up to 100,000 pages.",
    brochure: "/brochures/epson-l6390.pdf",
    headline: [
      { label: "Print speed", value: "Up to 18.0 ipm black / 9.0 ipm colour" },
      { label: "Functions", value: "Print, Scan, Copy, Fax" },
      { label: "Max paper size", value: "Legal" },
      { label: "Auto duplex printing", value: "Yes" },
      { label: "Display", value: "2.4\" Colour LCD Touch Screen" },
      { label: "Connectivity", value: "Wi-Fi, Wi-Fi Direct, Ethernet, USB 2.0" },
      { label: "Automatic document feeder", value: "30 sheets A4 / 10 sheets legal" },
      { label: "Ink yield", value: "Up to 8,500 pages black / 6,500 pages colour" },
    ],
    detailed: [
      { label: "Dimensions & weight", value: "240 × 347 × 375 mm, 9.7 kg" },
      { label: "Power consumption", value: "Operating 15 W, Sleep 0.7 W" },
      { label: "Paper input capacity", value: "Up to 250 sheets plain paper" },
      { label: "Borderless printing", value: "Up to A4" },
      { label: "Durability", value: "Rated up to 100,000 pages" },
      { label: "Mobile app", value: "Epson Smart Panel, Scan to Cloud, AirPrint, Mopria" },
      { label: "OS compatibility", value: "Windows 7–11, macOS 10.9.5+" },
    ],
  },
  {
    slug: "pro-plus",
    blurb:
      "A compact, robust business printer with auto-duplex printing, face-down output for security, and durable water-resistant DURABrite ET ink.",
    brochure: "/brochures/epson-l6490.pdf",
    headline: [
      { label: "Print speed", value: "Up to 17.0 ipm black / 9.5 ipm colour" },
      { label: "Functions", value: "Print, Scan, Copy, Fax" },
      { label: "Max paper size", value: "Legal" },
      { label: "Auto duplex printing", value: "Yes" },
      { label: "Display", value: "2.4\" Colour LCD Touch Screen" },
      { label: "Connectivity", value: "Wi-Fi, Wi-Fi Direct, Ethernet, USB 2.0" },
      { label: "Automatic document feeder", value: "35 sheets A4 / 10 sheets legal" },
      { label: "Ink yield", value: "Up to 7,500 pages black / 6,000 pages colour" },
    ],
    detailed: [
      { label: "Dimensions & weight", value: "375 × 347 × 346 mm, 7.3 kg" },
      { label: "Power consumption", value: "Operating 12.0 W, Sleep 0.9 W" },
      { label: "Paper input", value: "250-sheet cassette + rear slot" },
      { label: "Ink type", value: "DURABrite ET pigment ink, water-resistant" },
      { label: "Mobile app", value: "Epson Smart Panel, iPrint, Scan to Cloud, AirPrint" },
      { label: "OS compatibility", value: "Windows XP–10, macOS 10.6.8+" },
    ],
  },
  {
    slug: "max",
    blurb:
      "Uncompromising A3 print quality at unbeatable prices for businesses, pairing an ultra-high-yield ink system with fast, water-resistant DURABrite ET output.",
    brochure: "/brochures/epson-l15150.pdf",
    headline: [
      { label: "Print speed (A4)", value: "Up to 25.0 ipm black / 12.0 ipm colour" },
      { label: "Print speed (A3)", value: "Up to 13.5 ipm black / 6.0 ipm colour" },
      { label: "Functions", value: "Print, Scan, Copy, Fax" },
      { label: "Max paper size", value: "A3+" },
      { label: "Auto duplex printing", value: "Yes, up to A3" },
      { label: "Display", value: "4.3\" Colour LCD Touch Screen" },
      { label: "Connectivity", value: "Wi-Fi, Wi-Fi Direct, Ethernet, USB 2.0" },
      { label: "Automatic document feeder", value: "50 sheets" },
      { label: "Ink yield", value: "Up to 7,500 pages black / 6,000 pages colour" },
    ],
    detailed: [
      { label: "Dimensions & weight", value: "515 × 350 × 500 mm, 20.7 kg" },
      { label: "Power consumption", value: "Operating 19.0 W, Sleep 0.8 W" },
      { label: "Paper input", value: "3 trays, up to 250 sheets each" },
      { label: "Ink type", value: "DURABrite ET pigment ink, water-resistant" },
      { label: "USB Host", value: "Direct printing from USB memory" },
      { label: "Mobile app", value: "Epson iPrint, Scan to Cloud, AirPrint, Mopria" },
      { label: "OS compatibility", value: "Windows XP–10, macOS 10.6.8+" },
    ],
  },
  {
    slug: "max-plus",
    blurb:
      "A business-grade A3+ printer built for productivity — consistent fast printing, secure device access, and integration with third-party print management.",
    brochure: "/brochures/epson-l15180.pdf",
    headline: [
      { label: "Print speed (A4)", value: "Up to 25 ipm black / colour" },
      { label: "Print speed (A3)", value: "Up to 13.5 ipm black / colour" },
      { label: "Functions", value: "Print, Scan, Copy, Fax" },
      { label: "Max paper size", value: "A3+" },
      { label: "Auto duplex printing", value: "Yes, up to A3" },
      { label: "Display", value: "4.3\" TFT Colour Touch LCD" },
      { label: "Connectivity", value: "Wi-Fi, Wi-Fi Direct, Ethernet 10/100, USB 2.0" },
      { label: "Automatic document feeder", value: "50 sheets" },
      { label: "Monthly duty cycle", value: "Up to 66,000 pages" },
    ],
    detailed: [
      { label: "Dimensions & weight", value: "515 × 350 × 500 mm, 21.0 kg" },
      { label: "Power consumption", value: "Operating 20 W, Sleep 0.9 W" },
      { label: "Paper input", value: "3 trays, up to 250 sheets each" },
      { label: "Total RAM", value: "2048 MB" },
      {
        label: "Print languages",
        value: "PCL5, PCL6, PostScript 3, PDF emulation",
      },
      {
        label: "Security",
        value: "PIN authentication, LDAP, IP filtering",
      },
      { label: "USB Host", value: "Scan-to-memory-device and direct print" },
      { label: "OS compatibility", value: "Windows XP–10, macOS 10.6.8+" },
    ],
  },
];

export function getProductSpecs(slug: string): ProductSpecs | undefined {
  return productSpecs.find((spec) => spec.slug === slug);
}
