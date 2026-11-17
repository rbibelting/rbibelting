import { validateBrochurePhone, validateBrochureEmail } from "@/lib/brochure-validation";
import { useId, useRef, useState } from "react";
import { trackEnquiryHandoff } from "@/lib/analytics";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formContent, getEnquiryCategory, websiteIdentity } from "@/lib/site-data";

export type EnquirySeed = { requirement?: string; category?: string };
export const WA_PHONE = websiteIdentity.telephone[0].replace(/\D/g, "");
export const EMAIL = websiteIdentity.email[0];

const clean = (value: string, max = 1000) => value.trim().slice(0, max);

type EnquiryDetails = {
  name: string;
  company: string;
  phone: string;
  email: string;
  category: string;
  requirement: string;
};

export function buildMessage(details: EnquiryDetails) {
  return `Website enquiry\nName: ${clean(details.name, 100)}\nCompany: ${clean(details.company, 120)}\nPhone: ${clean(details.phone, 20)}\nEmail: ${clean(details.email, 200)}\nCategory: ${clean(details.category, 80)}\nRequirement: ${clean(details.requirement)}`;
}

export function EnquiryForm({ seed = {}, compact = false, hideWhatsApp = false, submitLabel = "Submit your inquiry", variant = "product" }: { seed?: EnquirySeed; compact?: boolean; hideWhatsApp?: boolean; submitLabel?: string; variant?: "product" | "general" }) {
  const formId = useId();
  const seedCategory = getEnquiryCategory(seed.category);
  const [error, setError] = useState("");
  const handingOff = useRef(false);
  const [phoneError, setPhoneError] = useState<string | undefined>();

  const send = (kind: "email" | "wa", form: HTMLFormElement) => {
    if (handingOff.current) return;
    const formData = new FormData(form);
    const details = {
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      category: String(formData.get("category") || seedCategory || "Not specified"),
      requirement: String(formData.get("requirement") || seed.requirement || ""),
    };
    if (!clean(details.name) || !clean(details.phone) || !clean(details.requirement)) {
      setError("Please add your name, phone number and requirement.");
      return;
    }
    const invalidPhone = validateBrochurePhone(details.phone);
    setPhoneError(invalidPhone);
    if (invalidPhone) { form.querySelector<HTMLInputElement>('[name="phone"]')?.focus(); return; }
    if (details.email.trim()) {
      const invalidEmail = validateBrochureEmail(details.email);
      if (invalidEmail) { setError(invalidEmail); return; }
    }
    setError("");
    const message = buildMessage(details);
    handingOff.current = true;
    trackEnquiryHandoff(kind === "email" ? "email" : "whatsapp", details.category);
    window.setTimeout(() => { handingOff.current = false; }, 1500);
    window.location.href = kind === "email"
      ? `mailto:${EMAIL}?subject=${encodeURIComponent(`${variant === "general" ? formContent.generalTitle : "Product enquiry"}: ${details.category}`)}&body=${encodeURIComponent(message)}`
      : `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label htmlFor={`${formId}-name`}>Name *</Label><Input id={`${formId}-name`} name="name" autoComplete="name" required maxLength={100} className="mt-1 h-12" /></div>
        <div><Label htmlFor={`${formId}-company`}>Company</Label><Input id={`${formId}-company`} name="company" autoComplete="organization" maxLength={120} className="mt-1 h-12" /></div>
        <div><Label htmlFor={`${formId}-phone`}>Phone *</Label><Input id={`${formId}-phone`} name="phone" aria-invalid={!!phoneError} aria-describedby={`${formId}-phone-error`} onChange={event=>setPhoneError(validateBrochurePhone(event.currentTarget.value))} onBlur={event=>setPhoneError(validateBrochurePhone(event.currentTarget.value))} type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} className="mt-1 h-12" /><p id={`${formId}-phone-error`} role="alert" className="mt-1 text-sm text-destructive">{phoneError}</p></div>
        <div><Label htmlFor={`${formId}-email`}>Email</Label><Input id={`${formId}-email`} name="email" type="email" inputMode="email" autoComplete="email" maxLength={200} className="mt-1 h-12" /></div>
      </div>
      <div>
        <Label htmlFor={`${formId}-category`}>Category</Label>
        <select id={`${formId}-category`} name="category" defaultValue={seedCategory || ""} className="mt-1 h-12 w-full rounded-md border border-input bg-background px-3">
          <option value="" disabled>{formContent.categoryPlaceholder}</option>
          <option>Power Transmission</option><option>Automation</option><option>Adhesives</option><option>Franchise</option>{variant === "general" && <option>{formContent.careersCategory}</option>}<option>Others</option>
        </select>
      </div>
      <div><Label htmlFor={`${formId}-requirement`}>Describe what you need *</Label><Textarea id={`${formId}-requirement`} name="requirement" required maxLength={1000} defaultValue={seed.requirement} rows={compact ? 3 : 5} className="mt-1" placeholder={variant === "general" ? undefined : formContent.requirementPlaceholder} /></div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      <p className="text-xs leading-5 text-muted-foreground">{formContent.contactDisclaimer}</p>
      <div className={`grid gap-3 ${hideWhatsApp ? "" : "sm:grid-cols-2"}`}>
        <Button type="button" size="lg" className="h-12" onClick={(event) => { const form = event.currentTarget.form; if (form) send("email", form); }}><Mail />{submitLabel}</Button>
        {!hideWhatsApp && <Button type="button" size="lg" variant="outline" className="h-12 border-whatsapp text-whatsapp hover:bg-whatsapp-soft" onClick={(event) => { const form = event.currentTarget.form; if (form) send("wa", form); }}><MessageCircle />Send on WhatsApp</Button>}
      </div>
    </form>
  );
}

export function EnquiryDialog({ open, onOpenChange, seed }: { open: boolean; onOpenChange: (value: boolean) => void; seed: EnquirySeed }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-2xl"><DialogHeader><DialogTitle className="text-2xl">Send your requirement</DialogTitle><DialogDescription>Tell us the part, size, brand or application. Our team will help identify the right product.</DialogDescription></DialogHeader><EnquiryForm seed={seed} compact /></DialogContent></Dialog>;
}
