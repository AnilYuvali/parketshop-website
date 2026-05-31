import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm, Header, Reveal } from "@/components/interactive";
import { DownloadSection, Footer } from "@/components/site-sections";

const phoneNumber = "05327317178";
const emailAddress = "info@parketshop.com.tr";
const physicalAddress = "Cube Beyoğlu, Şehit Muhtar, Mis Sk. No:24, 34435 Beyoğlu/İstanbul";
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(physicalAddress)}&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(physicalAddress)}`;

export const metadata: Metadata = {
  title: "İletişim | ParketShop",
  description:
    "ParketShop telefon numarası, e-posta adresi, fiziksel adresi ve iletişim formu.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-hero pb-[72px] pt-[150px] sm:pb-[92px] sm:pt-[172px] lg:pb-[108px]">
          <div className="page-container">
            <Reveal className="max-w-[760px]">
              <p className="eyebrow">
                <span aria-hidden="true" />
                İletişim
              </p>
              <h1 className="max-w-[720px] text-[42px] font-extrabold leading-[1.12] text-ink sm:text-[56px] lg:text-[64px]">
                ParketShop ile iletişime geçin
              </h1>
              <p className="body-copy mt-6 max-w-[620px] text-[16px] sm:text-[17px]">
                ParketShop hakkında sorularınız, iş birlikleri ve destek talepleriniz için ekibimize ulaşabilirsiniz.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <dl className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-[#edf0f5] bg-white p-6 shadow-[0_18px_45px_rgba(20,24,36,0.06)]">
                  <dt className="flex items-center gap-3 text-[13px] font-extrabold uppercase text-muted">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#fcecee] text-brand">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    Telefon
                  </dt>
                  <dd className="mt-5 text-[18px] font-extrabold text-ink">
                    <a className="transition-colors hover:text-brand" href="tel:+905327317178">
                      {phoneNumber}
                    </a>
                  </dd>
                </div>

                <div className="rounded-2xl border border-[#edf0f5] bg-white p-6 shadow-[0_18px_45px_rgba(20,24,36,0.06)]">
                  <dt className="flex items-center gap-3 text-[13px] font-extrabold uppercase text-muted">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#fcecee] text-brand">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    E-posta
                  </dt>
                  <dd className="mt-5 text-[18px] font-extrabold text-ink">
                    <a className="break-words transition-colors hover:text-brand" href={`mailto:${emailAddress}`}>
                      {emailAddress}
                    </a>
                  </dd>
                </div>

                <div className="rounded-2xl border border-[#edf0f5] bg-white p-6 shadow-[0_18px_45px_rgba(20,24,36,0.06)]">
                  <dt className="flex items-center gap-3 text-[13px] font-extrabold uppercase text-muted">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#fcecee] text-brand">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    Adres
                  </dt>
                  <dd className="mt-5 text-[15px] font-bold leading-7 text-ink">
                    <address className="not-italic">{physicalAddress}</address>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="py-[78px] sm:py-[104px]">
          <div className="page-container grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <Reveal>
              <div className="mb-7">
                <p className="eyebrow">
                  <span aria-hidden="true" />
                  Form & Adres
                </p>
                <h2 className="section-title max-w-[520px]">Sorularınız için buradayız</h2>
                <p className="body-copy mt-5 max-w-[560px]">
                  Formu doldurun veya haritadaki ofis adresimizi kullanarak bize ulaşın.
                </p>
              </div>
              <ContactForm />
            </Reveal>

            <Reveal className="h-full lg:pt-[106px]">
              <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#edf0f5] bg-white shadow-[0_18px_45px_rgba(20,24,36,0.06)] sm:min-h-[520px] lg:min-h-[642px]">
                <iframe
                  title="ParketShop fiziksel adresi haritası"
                  src={mapSrc}
                  className="min-h-[360px] w-full flex-1 border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="border-t border-[#edf0f5] p-5">
                  <p className="text-[13px] font-extrabold uppercase text-muted">ParketShop Ofisi</p>
                  <address className="mt-2 text-[14px] font-semibold leading-6 text-ink not-italic">
                    {physicalAddress}
                  </address>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-[13px] font-extrabold text-brand transition-colors hover:text-brand-deep"
                  >
                    Google Maps’te aç
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
