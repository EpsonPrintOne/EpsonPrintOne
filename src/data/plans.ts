export interface Plan {
  slug: string;
  name: string;
  model: string;
  monthlyFee: number;
  monthlyPages: number;
  audience: string;
  image: string;
  featured: boolean;
  stripePaymentLink: string;
  stripeBuyButtonId: string;
}

export const STRIPE_PUBLISHABLE_KEY = "pk_live_2gYsyYrz7ZE4tR24oV4kkaMK00d5a6sAjp";

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
    stripePaymentLink: "https://buy.stripe.com/fZu00i3Zz5AUecX8eR7bW03",
    stripeBuyButtonId: "buy_btn_1TyAZpBN5PVvSqrqQZrh50M0",
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
    stripePaymentLink: "https://buy.stripe.com/cNi8wO7bL6EY8SD9iV7bW02",
    stripeBuyButtonId: "buy_btn_1TyAb5BN5PVvSqrqHuG24dNF",
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
    stripePaymentLink: "https://buy.stripe.com/14AaEWeEd8N67Oz0Mp7bW01",
    stripeBuyButtonId: "buy_btn_1TyAbYBN5PVvSqrq9TGeqq6D",
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
    stripePaymentLink: "https://buy.stripe.com/5kQ3cubs19Ra5Gr8eR7bW00",
    stripeBuyButtonId: "buy_btn_1TyAc0BN5PVvSqrqq2mjtXo1",
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
    stripePaymentLink: "https://buy.stripe.com/aFabJ09jT7J29WHdzb7bW04",
    stripeBuyButtonId: "buy_btn_1TyAcPBN5PVvSqrqWAG1BGOV",
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
    stripePaymentLink: "https://buy.stripe.com/5kQbJ0cw57J22uf1Qt7bW05",
    stripeBuyButtonId: "buy_btn_1TyAcqBN5PVvSqrqAuELQIvJ",
  },
];

export const featuredPlan = plans.find((plan) => plan.featured) ?? plans[0];

export function formatMonthlyFee(fee: number): string {
  return `$${fee.toFixed(2)}`;
}

export function formatMonthlyPages(pages: number): string {
  return `${pages.toLocaleString()} pages/month`;
}
