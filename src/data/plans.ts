export interface Plan {
  slug: string;
  name: string;
  model: string;
  monthlyFee: number;
  monthlyPages: number;
  audience: string;
  image: string;
  featured: boolean;
}

export const plans: Plan[] = [
  {
    slug: "lite",
    name: "PrintOne Lite",
    model: "Epson EcoTank L1250",
    monthlyFee: 9.9,
    monthlyPages: 100,
    audience: "Home users",
    image: "/images/printers/epson-l1250.jpg",
    featured: false,
  },
  {
    slug: "lite-plus",
    name: "PrintOne Lite Plus",
    model: "Epson EcoTank L4360",
    monthlyFee: 16.9,
    monthlyPages: 200,
    audience: "Families",
    image: "/images/printers/epson-l4360.jpg",
    featured: false,
  },
  {
    slug: "pro",
    name: "PrintOne Pro",
    model: "Epson EcoTank L6390",
    monthlyFee: 25.9,
    monthlyPages: 500,
    audience: "Students and home businesses",
    image: "/images/printers/epson-l6390.jpg",
    featured: true,
  },
  {
    slug: "pro-plus",
    name: "PrintOne Pro Plus",
    model: "Epson EcoTank L6490",
    monthlyFee: 35.9,
    monthlyPages: 750,
    audience: "SMEs",
    image: "/images/printers/epson-l6490.jpg",
    featured: false,
  },
  {
    slug: "max",
    name: "PrintOne Max",
    model: "Epson EcoTank L15150",
    monthlyFee: 69.9,
    monthlyPages: 1000,
    audience: "Small offices requiring A3",
    image: "/images/printers/epson-l15150.jpg",
    featured: false,
  },
  {
    slug: "max-plus",
    name: "PrintOne Max Plus",
    model: "Epson EcoTank L15180",
    monthlyFee: 99.9,
    monthlyPages: 1000,
    audience: "Higher-volume offices",
    image: "/images/printers/epson-l15180.jpg",
    featured: false,
  },
];

export const featuredPlan = plans.find((plan) => plan.featured) ?? plans[0];

export function formatMonthlyFee(fee: number): string {
  return `$${fee.toFixed(2)}`;
}

export function formatMonthlyPages(pages: number): string {
  return `${pages.toLocaleString()} pages/month`;
}
