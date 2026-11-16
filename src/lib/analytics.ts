// This records a validated handoff to the user's email/WhatsApp app, not a received lead.
// Deliberately exclude form contents, names, phone numbers, emails, search terms and URLs.
const categories = new Set(["Power Transmission", "Automation", "Adhesives", "Franchise", "Careers / Join our team", "Others"]);
export function trackEnquiryHandoff(method: "email" | "whatsapp", category: string) {
  if (typeof window === "undefined") return;
  const target = window as Window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push({
    event: "enquiry_handoff",
    enquiry_method: method,
    product_category: categories.has(category) ? category : "Unspecified",
  });
}
