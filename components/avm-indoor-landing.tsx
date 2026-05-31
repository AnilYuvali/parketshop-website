"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  Gift,
  LocateFixed,
  MapPinned,
  Navigation,
  Route,
  Search,
  Sparkles,
  Store,
  Tag,
  Target,
  Zap,
} from "lucide-react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Header } from "@/components/interactive";
import { DownloadSection, Footer } from "@/components/site-sections";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const heroFeatures = [
  { icon: Store, label: "Mağazaları kolayca bul" },
  { icon: BadgePercent, label: "Kampanyaları kaçırma" },
  { icon: BrainCircuit, label: "Yapay zeka destekli öneriler al" },
  { icon: Navigation, label: "Canlı navigasyonla zaman kazan" },
];

const campaignTabs = ["Tümü", "Mağazalar", "Restoranlar", "Favoriler"] as const;

const campaigns = [
  {
    brand: "Nike",
    title: "Ayakkabı Kampanyası",
    detail: "%30 indirim",
    meta: "Sana özel",
    category: "Mağazalar",
    accent: "#111827",
  },
  {
    brand: "Burger King",
    title: "Burger Kampanyası",
    detail: "1 Alana 1 Bedava",
    meta: "Bugün",
    category: "Restoranlar",
    accent: "#f15a24",
  },
  {
    brand: "H&M",
    title: "Seçili Ürünlerde",
    detail: "%30 indirim",
    meta: "Son 3 gün",
    category: "Favoriler",
    accent: "#ed0033",
  },
  {
    brand: "DS Damat",
    title: "2. Ürüne",
    detail: "%50 indirim",
    meta: "Moda",
    category: "Mağazalar",
    accent: "#0f2242",
  },
];

const aiSteps = [
  {
    icon: LocateFixed,
    title: "AVM’ye giriş",
    text: "Konum ve ziyaret bağlamı anlamlandırılır.",
  },
  {
    icon: BrainCircuit,
    title: "İlgi analizi",
    text: "Kullanıcının kategori ve marka ilgisi öğrenilir.",
  },
  {
    icon: Target,
    title: "Akıllı eşleşme",
    text: "En alakalı kampanya doğru ziyaretçiyle buluşur.",
  },
  {
    icon: BellRing,
    title: "Kişisel bildirim",
    text: "Fırsat, doğru zamanda telefona düşer.",
  },
];

const brandCategories = ["Tümü", "Giyim", "Spor", "Kozmetik", "Restoran"] as const;

const brands = [
  { name: "Zara", category: "Giyim", mark: "ZARA" },
  { name: "Nike", category: "Spor", mark: "NIKE" },
  { name: "LC Waikiki", category: "Giyim", mark: "LCW" },
  { name: "H&M", category: "Giyim", mark: "H&M" },
  { name: "Mango", category: "Giyim", mark: "MANGO" },
  { name: "Sephora", category: "Kozmetik", mark: "SEPHORA" },
  { name: "Pull&Bear", category: "Giyim", mark: "P&B" },
  { name: "DeFacto", category: "Giyim", mark: "DeFacto" },
  { name: "Boyner", category: "Giyim", mark: "BOYNER" },
  { name: "Burger King", category: "Restoran", mark: "BK" },
  { name: "Starbucks", category: "Restoran", mark: "STAR" },
  { name: "Decathlon", category: "Spor", mark: "DEC" },
];

const aiHighlights = [
  {
    icon: Sparkles,
    title: "İlgi alanına göre öneriler",
    text: "Kullanıcının mağaza ve ürün ilgisi kampanya akışına yansır.",
  },
  {
    icon: LocateFixed,
    title: "Konuma duyarlı bildirimler",
    text: "AVM içindeki yakınlık ve anlık ziyaret bağlamı dikkate alınır.",
  },
  {
    icon: BrainCircuit,
    title: "Davranış temelli eşleşme",
    text: "Geçmiş tercih ve etkileşimler daha alakalı fırsatlara dönüşür.",
  },
  {
    icon: Zap,
    title: "Daha yüksek etkileşim",
    text: "Markalar için ölçülebilir, verimli ve hedefli pazarlama sağlar.",
  },
];

const journeySteps = [
  {
    icon: MapPinned,
    title: "AVM’yi seç",
    text: "Gitmek istediğin AVM’yi aç.",
  },
  {
    icon: Search,
    title: "Marka veya kampanya keşfet",
    text: "İhtiyacına uygun mağaza ve fırsatları ara.",
  },
  {
    icon: BrainCircuit,
    title: "Sana özel önerileri gör",
    text: "AI, ilgini çekebilecek fırsatları öne çıkarır.",
  },
  {
    icon: Navigation,
    title: "Canlı navigasyonla ulaş",
    text: "Adım adım yönlendirme ile hedefe git.",
  },
  {
    icon: Gift,
    title: "Kampanyadan yararlan",
    text: "Özel fırsatı mağazada değerlendir.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({
  label,
  title,
  text,
  align = "left",
  dark = false,
}: {
  label: string;
  title: string;
  text: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[640px]"}>
      <p className={`indoor-section-kicker ${align === "center" ? "mx-auto" : ""} ${dark ? "is-dark" : ""}`}>
        <span aria-hidden="true" />
        {label}
      </p>
      <h2 className={`mt-4 text-[32px] font-extrabold leading-[1.13] sm:text-[42px] lg:text-[50px] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <p className={`mt-5 text-[15px] font-medium leading-7 sm:text-[17px] ${dark ? "text-white/68" : "text-muted"}`}>
        {text}
      </p>
    </div>
  );
}

function PhoneMockup({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`indoor-phone-shell ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={642}
        height={1389}
        sizes="(max-width: 768px) 230px, 330px"
        priority={priority}
        className="h-auto w-full rounded-[28px]"
      />
    </div>
  );
}

function FeaturePill({ icon: IconComponent, label }: { icon: Icon; label: string }) {
  return (
    <div className="indoor-hero-feature">
      <span>
        <IconComponent className="h-5 w-5" strokeWidth={2.3} />
      </span>
      {label}
    </div>
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="indoor-hero-visual" aria-label="ParketShop AVM içi mobil deneyimi">
      <motion.div
        className="indoor-hero-map"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 640 520" aria-hidden="true">
          <path className="mall-base" d="M52 370h164v-86h122v-96h214v236H312v-72H196v78H52z" />
          <path className="mall-store mall-store-a" d="M76 304h110v54H76z" />
          <path className="mall-store mall-store-b" d="M348 210h152v94H348z" />
          <path className="mall-store mall-store-c" d="M312 352h126v58H312z" />
          <path className="mall-route" d="M118 402V328h150v-88h186v-64" />
          <circle className="mall-route-point" cx="118" cy="402" r="12" />
          <circle className="mall-target" cx="454" cy="176" r="15" />
        </svg>
      </motion.div>

      <PhoneMockup
        src="/assets/slider-screens/screen-13.png"
        alt="ParketShop AVM içi ana ekranı"
        priority
        className="indoor-hero-phone"
      />

      <motion.div
        className="indoor-push-card"
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fde0e7] text-brand">
          <BellRing className="h-5 w-5" />
        </span>
        <div>
          <strong>Nike’de sana özel</strong>
          <p>%30 indirim başladı. Kaçırma, hemen keşfet.</p>
        </div>
      </motion.div>

      <motion.div
        className="indoor-nav-card"
        animate={reduceMotion ? undefined : { x: [0, 10, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <strong>Nike</strong>
            <span>2. Kat · 30 m</span>
          </div>
          <MapPinned className="h-5 w-5 text-brand" />
        </div>
        <a href="#canli-navigasyon">
          Canlı Navigasyon <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>

      <motion.div
        className="indoor-mini-campaign"
        animate={reduceMotion ? undefined : { rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>50</span>
        <strong>Saatlik indirim</strong>
      </motion.div>
    </div>
  );
}

function FilterTabs<T extends string>({
  items,
  active,
  onChange,
  dark = false,
}: {
  items: readonly T[];
  active: T;
  onChange: (item: T) => void;
  dark?: boolean;
}) {
  return (
    <div className={`indoor-tabs ${dark ? "is-dark" : ""}`}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={active === item}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function CampaignCard({
  brand,
  title,
  detail,
  meta,
  accent,
}: {
  brand: string;
  title: string;
  detail: string;
  meta: string;
  accent: string;
}) {
  return (
    <article className="indoor-campaign-card">
      <div className="indoor-campaign-visual" style={{ "--campaign-accent": accent } as CSSProperties}>
        <span>{brand}</span>
        <strong>{detail}</strong>
      </div>
      <h3>{title}</h3>
      <p>{brand}</p>
      <small>{meta}</small>
    </article>
  );
}

function CampaignsSection() {
  const [active, setActive] = useState<(typeof campaignTabs)[number]>("Tümü");
  const visibleCampaigns = useMemo(
    () => campaigns.filter((campaign) => active === "Tümü" || campaign.category === active),
    [active],
  );

  return (
    <section id="kampanyalar" className="scroll-mt-24 border-y border-[#eef1f5] bg-white py-20 sm:py-24 lg:py-28">
      <div className="page-container">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <Reveal>
            <SectionIntro
              label="Kampanyalar"
              title="AVM’deki kampanyaları tek ekranda keşfedin."
              text="Mağaza ve restoranların güncel indirimleri, mobil uygulamaya özel fırsatları ve hızlı taranabilir kampanya kartları tek deneyimde birleşir."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                "Farklı kaynaklarda kampanya arama ihtiyacını azaltır.",
                "Markalar fırsatlarını doğru ziyaretçiye daha görünür ulaştırır.",
                "Kullanıcı mağaza, restoran ve kategori bazlı hızlı filtreleme yapar.",
              ].map((item) => (
                <div key={item} className="indoor-check-row">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            <div className="indoor-campaign-panel">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-extrabold uppercase text-brand">Canlı kampanya vitrini</p>
                  <h3 className="mt-2 text-[26px] font-extrabold text-ink">Fırsatlar taranabilir, filtrelenebilir ve aksiyona yakın.</h3>
                </div>
                <FilterTabs items={campaignTabs} active={active} onChange={setActive} />
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {visibleCampaigns.map((campaign) => (
                  <CampaignCard key={`${campaign.brand}-${campaign.title}`} {...campaign} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AiPushSection() {
  return (
    <section id="ai-bildirimler" className="scroll-mt-24 bg-[#fbfcff] py-20 sm:py-24 lg:py-28">
      <div className="page-container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionIntro
            label="AI push bildirimleri"
            title="Yapay zeka, sizin için en doğru kampanya ve indirimi öne çıkarır."
            text="ParketShop, ilgi alanlarını ve alışveriş davranışlarını analiz eder. Bildirimler rastgele değil; konuma, zamana ve kullanıcı ilgisine göre kişiselleştirilmiş hale gelir."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {["Kişiselleştirilmiş öneriler", "Doğru zamanda doğru kampanya", "Konuma duyarlı fırsatlar"].map((item) => (
              <span key={item} className="indoor-soft-chip">{item}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="indoor-ai-flow">
            {aiSteps.map((step, index) => (
              <div key={step.title} className="indoor-ai-step">
                <div className="indoor-ai-step-icon">
                  <step.icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {index < aiSteps.length - 1 ? <ArrowRight className="indoor-ai-arrow h-5 w-5" aria-hidden="true" /> : null}
              </div>
            ))}
            <div className="indoor-ai-phone">
              <PhoneMockup
                src="/assets/slider-screens/screen-20.png"
                alt="ParketShop mağaza detay ve kampanya önerileri ekranı"
              />
              <div className="indoor-ai-notification">
                <BellRing className="h-5 w-5 text-brand" />
                <div>
                  <strong>ParketShop</strong>
                  <span>İlgini çekebilecek %30 indirim hazır.</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BrandsSection() {
  const [active, setActive] = useState<(typeof brandCategories)[number]>("Tümü");
  const visibleBrands = useMemo(
    () => brands.filter((brand) => active === "Tümü" || brand.category === active),
    [active],
  );

  return (
    <section id="markalar" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="page-container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="indoor-brand-board">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-extrabold uppercase text-brand">Marka keşfi</p>
                <h3 className="mt-2 text-[26px] font-extrabold text-ink">Mağaza, restoran veya ihtiyaca göre filtrele.</h3>
              </div>
              <FilterTabs items={brandCategories} active={active} onChange={setActive} />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visibleBrands.map((brand) => (
                <article key={brand.name} className="indoor-brand-tile">
                  <strong>{brand.mark}</strong>
                  <span>{brand.name}</span>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="order-1 lg:order-2">
          <SectionIntro
            label="Tüm markalar"
            title="AVM’deki tüm markaları kolayca keşfedin."
            text="Kullanıcı AVM’de hangi mağaza ve restoranların olduğunu tek ekranda görür. Mağaza detayına, kampanyaya ve navigasyona aynı akıştan geçer."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="indoor-mini-benefit">
              <Store className="h-5 w-5" />
              <span>Tüm mağaza ve restoranlar listelenir.</span>
            </div>
            <div className="indoor-mini-benefit">
              <Tag className="h-5 w-5" />
              <span>Kategori veya marka bazlı hızlı keşif yapılır.</span>
            </div>
            <div className="indoor-mini-benefit">
              <Route className="h-5 w-5" />
              <span>Detaydan kampanyaya ve rotaya tek dokunuşla geçilir.</span>
            </div>
          </div>
          <div className="mt-8 flex gap-4 overflow-hidden">
            <PhoneMockup
              src="/assets/slider-screens/screen-15.png"
              alt="ParketShop mağazalar ekranı"
              className="w-[158px] shrink-0 sm:w-[190px]"
            />
            <PhoneMockup
              src="/assets/slider-screens/screen-16.png"
              alt="ParketShop restoranlar ekranı"
              className="w-[158px] shrink-0 sm:w-[190px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NavigationSection() {
  return (
    <section id="canli-navigasyon" className="scroll-mt-24 bg-[#fbfcff] py-20 sm:py-24 lg:py-28">
      <div className="page-container">
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal>
            <SectionIntro
              label="Canlı navigasyon"
              title="Aradığınız mağazaya canlı navigasyon ile kolayca ulaşın."
              text="Mağaza veya restoran seçildiğinde ParketShop, AVM içinde en pratik rotayı gösterir. Katlar, girişler, hedef noktası ve yön talimatları daha anlaşılır hale gelir."
            />
            <div className="mt-8 space-y-4">
              {[
                "Kullanıcı mağaza veya restoran seçer.",
                "En pratik rota görsel olarak çizilir.",
                "Adım adım yönlendirme ile zaman kaybetmeden hedefe ulaşır.",
              ].map((item) => (
                <div key={item} className="indoor-check-row">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="indoor-navigation-demo">
              <div className="indoor-map-demo">
                <svg viewBox="0 0 780 420" aria-hidden="true">
                  <path className="map-floor" d="M42 258h168v-70h130v-66h188v52h210v174H512v-70H332v86H42z" />
                  <path className="map-zone red" d="M64 278h126v50H64z" />
                  <path className="map-zone red" d="M360 146h146v82H360z" />
                  <path className="map-zone light" d="M552 196h148v68H552z" />
                  <path className="map-zone red" d="M350 300h132v48H350z" />
                  <path className="nav-route" d="M118 360V236h166v-82h174v-62" />
                  <circle className="nav-user" cx="118" cy="360" r="13" />
                  <circle className="nav-target" cx="458" cy="92" r="17" />
                </svg>
                <div className="indoor-map-card">
                  <strong>Nike</strong>
                  <span>12 mt solda</span>
                  <a href="#indir">
                    Navigasyonu Başlat <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="indoor-direction-card">
                  <Navigation className="h-6 w-6" />
                  <div>
                    <strong>3 dk içinde ulaşın</strong>
                    <span>2. Kat · moda bölgesi</span>
                  </div>
                </div>
              </div>
              <PhoneMockup
                src="/assets/slider-screens/screen-18.png"
                alt="ParketShop AVM içi canlı görünüm yönlendirme ekranı"
                className="indoor-live-phone"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AiHighlightSection() {
  return (
    <section id="ai-deneyim" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="page-container">
        <Reveal>
          <div className="indoor-ai-highlight">
            <div>
              <SectionIntro
                label="AI highlight"
                title="Her ziyaret daha akıllı, her öneri daha kişisel."
                text="ParketShop, AVM içi deneyimi yalnızca harita ve kampanya listesi olmaktan çıkarır. Kullanıcı tercihlerini öğrenir, kampanya ilgisini tahminler ve markalar için daha anlamlı pazarlama değeri üretir."
                dark
              />
            </div>
            <div className="indoor-ai-highlight-grid">
              {aiHighlights.map((item) => (
                <article key={item.title} className="indoor-ai-insight">
                  <span>
                    <item.icon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section id="kullanici-akisi" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="page-container">
        <Reveal>
          <SectionIntro
            label="Kullanıcı akışı"
            title="ParketShop ile AVM’deki yolculuğun tek akışta tamamlanır."
            text="AVM seçimi, marka keşfi, kişisel öneriler, canlı navigasyon ve kampanyadan yararlanma aynı mobil deneyimde birleşir."
            align="center"
          />
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <div className="indoor-journey">
            {journeySteps.map((step, index) => (
              <article key={step.title} className="indoor-journey-step">
                <div className="indoor-journey-icon">
                  <step.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AvmIndoorLanding() {
  return (
    <>
      <Header />
      <main className="indoor-page overflow-hidden bg-white">
        <section className="indoor-hero">
          <div className="page-container indoor-hero-grid">
            <Reveal className="indoor-hero-copy">
              <h1>
                AVM içinde aradığınız her şey,{" "}
                <span>en akıllı rotayla cebinizde.</span>
              </h1>
              <p>
                ParketShop; mağazaları, kampanyaları, kişiye özel önerileri ve canlı navigasyonu tek bir AVM içi deneyimde birleştirir.
              </p>
              <div className="indoor-hero-features">
                {heroFeatures.map((feature) => (
                  <FeaturePill key={feature.label} {...feature} />
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#kampanyalar" className="primary-button !h-14 !rounded-[14px] !px-7">
                  Deneyimi keşfet <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#indir" className="indoor-secondary-button">
                  Uygulamayı indir
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        <section className="border-b border-[#eef1f5] bg-white">
          <div className="page-container grid gap-4 py-8 md:grid-cols-3">
            {[
              ["Tek ekran", "Kampanya, marka ve yönlendirme aynı yerde."],
              ["AI destekli", "İlgini çekebilecek fırsatlar öne çıkar."],
              ["Canlı rota", "AVM içinde hedefe zaman kaybetmeden ulaş."],
            ].map(([value, text]) => (
              <div key={value} className="indoor-proof-card">
                <CheckCircle2 className="h-6 w-6 text-brand" />
                <div>
                  <strong>{value}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CampaignsSection />
        <AiPushSection />
        <BrandsSection />
        <NavigationSection />
        <AiHighlightSection />
        <JourneySection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
