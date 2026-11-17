import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { EnquiryForm } from "@/components/enquiry";
import { PageHero } from "@/components/page-sections";
import { breadcrumbSchema, pageHead } from "@/lib/seo";
import {mainPageSeo,  contactFaqs, footerContact, formContent, websiteIdentity } from "@/lib/site-data";
import hero from "@/assets/factory-hero.jpg";

export const faqs = contactFaqs;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      mainPageSeo["/contact"].title,
      mainPageSeo["/contact"].description,
      "/contact",
      [breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]), faqSchema],
    ),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        kicker="Send your requirement"
        title="Talk directly to our industrial supply team."
        description="Share the part number, brand, size, drawing or machine application. Choose email or WhatsApp to send your details."
        image={hero}
        compact
      />
      <section className="pattern-shared py-20">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div className="self-start border border-border bg-background p-6 md:p-8">
            <h2 className="text-3xl font-black">{formContent.generalTitle}</h2>
            <div className="mt-7">
              <EnquiryForm variant="general" />
            </div>
          </div>
          <aside className="space-y-4">
            <ContactItem Icon={MapPin} title="Visit us">
              {footerContact.address}
            </ContactItem>
            <ContactItem Icon={Phone} title="Call Sales">
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <a href="tel:+918788195839" className="whitespace-nowrap">+91 87881 95839</a>
                <span aria-hidden="true">/</span>
                <a href="tel:+919890961752" className="whitespace-nowrap">+91 98909 61752</a>
              </div>
            </ContactItem>
            <ContactItem Icon={Mail} title="Email">
              <a href={`mailto:${websiteIdentity.email[0]}`}>{websiteIdentity.email[0]}</a>
              <br />
              <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
            </ContactItem>
            <ContactItem Icon={Clock} title="Working hours">
              Monday to Sunday
              <br />
              9:30 AM to 6:30 PM IST
            </ContactItem>
          </aside>
        </div>
      </section>
      <section className="pattern-shared bg-background py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-3">Before you send an enquiry</h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Quick answers for product identification, dispatch and support from the RB International team.
            </p>
          </div>
          <div className="border-t border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="border-b border-border py-4">
                <summary className="cursor-pointer text-left text-lg font-black hover:text-primary">
                  {faq.question}
                </summary>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ Icon, title, children }: { Icon: typeof MapPin; title: string; children: ReactNode }) {
  return (
    <div className="border border-border bg-background p-5">
      <Icon className="text-primary" />
      <h2 className="mt-3 font-black">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-muted-foreground">{children}</div>
    </div>
  );
}
