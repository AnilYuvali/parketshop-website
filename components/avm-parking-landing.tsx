"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  Building2,
  Car,
  CheckCircle2,
  Clock3,
  CreditCard,
  Gauge,
  LocateFixed,
  MapPinned,
  Navigation,
  ParkingCircle,
  Radar,
  Route,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { DownloadSection, Footer } from "@/components/site-sections";
import { Header } from "@/components/interactive";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const occupancyStats = [
  { label: "Toplam araç kapasitesi", value: "1.922", tone: "blue" },
  { label: "Anlık doluluk oranı", value: "%95", tone: "amber" },
  { label: "Boş park yeri", value: "97", tone: "green" },
];

const floorOccupancy = [
  { floor: "1. Kat", distance: "Girişe 10 m", rate: 97, color: "#6356f0" },
  { floor: "2. Kat", distance: "Girişe 35 m", rate: 93, color: "#f6b700" },
  { floor: "3. Kat", distance: "Girişe 62 m", rate: 90, color: "#ed0033" },
];

const aiFactors = [
  {
    icon: LocateFixed,
    title: "Konum",
    text: "Giriş noktanız ve otopark içindeki anlık pozisyonunuz değerlendirilir.",
  },
  {
    icon: Gauge,
    title: "Yoğunluk",
    text: "Kat bazlı doluluk ve boş yer dağılımı aynı anda analiz edilir.",
  },
  {
    icon: Route,
    title: "Rota",
    text: "Daha az dönüş, daha kısa mesafe ve hedefe yakınlık birlikte hesaplanır.",
  },
  {
    icon: Sparkles,
    title: "Öneri",
    text: "En ideal alan seçilir; kullanıcı manuel arama stresinden kurtulur.",
  },
];

const journeySteps = [
  {
    icon: Gauge,
    title: "Yoğunluğu gör",
    text: "AVM’ye gitmeden önce kaç boş yer kaldığını ve hangi katın uygun olduğunu kontrol edin.",
  },
  {
    icon: BrainCircuit,
    title: "AI’a bırak",
    text: "Sensör verileri ve yapay zeka en ideal boş park yerini otomatik önerir.",
  },
  {
    icon: Navigation,
    title: "Park yerine yönlen",
    text: "Canlı navigasyon seçilen alana kadar size net dönüş talimatları verir.",
  },
  {
    icon: ParkingCircle,
    title: "Konumu kaydet",
    text: "Park ettikten sonra kat ve kolon bilgisi uygulamada saklanır.",
  },
  {
    icon: Car,
    title: "Aracını bul",
    text: "Alışveriş sonrası kaydedilen araca dönüş rotası tek dokunuşla açılır.",
  },
  {
    icon: WalletCards,
    title: "Ücreti öde",
    text: "Süreyi, ücreti ve ödeme özetini uygulama içinde görüp tamamlayın.",
  },
];

const appScreens = [
  {
    src: "/assets/slider-screens/screen-04.png",
    alt: "Yakındaki AVM otoparkları harita ekranı",
    label: "Haritada doluluk",
  },
  {
    src: "/assets/slider-screens/screen-07.png",
    alt: "Park slot seçimi ekranı",
    label: "Boş alan seçimi",
  },
  {
    src: "/assets/slider-screens/screen-11.png",
    alt: "Araca dönüş canlı navigasyon ekranı",
    label: "Canlı dönüş",
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
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
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
}: {
  label: string;
  title: string;
  text: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[620px]"}>
      <p className={align === "center" ? "mx-auto avm-section-kicker" : "avm-section-kicker"}>
        <span aria-hidden="true" />
        {label}
      </p>
      <h2 className="mt-4 text-[32px] font-extrabold leading-[1.14] text-ink sm:text-[42px] lg:text-[48px]">
        {title}
      </h2>
      <p className="mt-5 text-[15px] leading-7 text-muted sm:text-[17px]">{text}</p>
    </div>
  );
}

function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`phone-product-frame ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={642}
        height={1389}
        sizes="(max-width: 768px) 220px, 300px"
        className="h-auto w-full rounded-[28px]"
      />
    </div>
  );
}

function HeroScreens() {
  return (
    <div className="hero-screen-stack" aria-label="ParketShop otopark uygulama ekranları">
      {appScreens.map((screen, index) => (
        <div key={screen.label} className="hero-screen-card" data-screen-index={index}>
          <Image
            src={screen.src}
            alt={screen.alt}
            width={642}
            height={1389}
            sizes="(max-width: 768px) 150px, 210px"
            priority={index === 1}
            className="h-auto w-full rounded-[22px]"
          />
          <span>{screen.label}</span>
        </div>
      ))}
    </div>
  );
}

function OccupancyDashboard() {
  return (
    <div className="live-dashboard">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-[13px] font-bold uppercase text-brand">Canlı doluluk</p>
          <h3 className="mt-2 text-[25px] font-extrabold text-ink">Mall of İstanbul AVM Otoparkı</h3>
          <p className="mt-2 text-sm text-muted">Bağcılar, İstanbul · sensör verisi güncel</p>
        </div>
        <div className="rounded-full bg-[#e8f5ff] px-4 py-2 text-sm font-extrabold text-[#0078e7]">
          150 m mesafe
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {occupancyStats.map((stat) => (
          <div key={stat.label} className="live-stat-card" data-tone={stat.tone}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[22px] border border-[#eef1f5] bg-[#f8fbff] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold text-ink">Genel yoğunluk</p>
            <p className="mt-1 text-[13px] text-muted">Yoğun saatte doğru katı önceden seçin.</p>
          </div>
          <strong className="text-[28px] text-brand">%95</strong>
        </div>
        <div className="occupancy-meter mt-5" aria-label="Otopark doluluk oranı yüzde 95">
          <span style={{ width: "95%" }} />
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {floorOccupancy.map((floor) => (
          <div key={floor.floor} className="floor-row">
            <div className="grid h-14 w-14 place-items-center rounded-[14px] text-lg font-extrabold text-white" style={{ background: floor.color }}>
              {floor.floor.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4">
                <p className="font-extrabold text-ink">{floor.floor}</p>
                <p className="font-extrabold text-ink">%{floor.rate}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{floor.distance}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#eef2f7]">
                <span className="block h-full rounded-full" style={{ width: `${floor.rate}%`, background: floor.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiParkingMap() {
  const slots = [
    { id: "A-01", state: "occupied" },
    { id: "A-02", state: "occupied" },
    { id: "A-03", state: "occupied" },
    { id: "B-11", state: "recommended" },
    { id: "B-14", state: "occupied" },
    { id: "C-08", state: "occupied" },
    { id: "C-12", state: "occupied" },
    { id: "D-04", state: "occupied" },
  ];

  return (
    <div className="ai-map-panel">
      <div className="ai-map-topbar">
        <div>
          <p className="text-xs font-extrabold uppercase text-white/55">AI önerisi</p>
          <h3 className="mt-1 text-2xl font-extrabold text-white">B-11 en ideal boş alan</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-extrabold text-white">
          <Radar className="h-4 w-4 text-[#58c5ff]" />
          Sensör sinyali aktif
        </div>
      </div>

      <div className="ai-map-canvas">
        <svg className="ai-route-svg" viewBox="0 0 560 340" aria-hidden="true">
          <path className="ai-route-desktop" d="M66 294 H280 V150 V145 H467 V125" />
          <path className="ai-route-mobile" d="M140 490 H280 V150 V120 H370 V120" />
        </svg>
        <div className="map-entry">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="5 4 20 12 5 20 8.5 12 5 4" />
          </svg>
        </div>
        <div className="slot-grid">
          {slots.map((slot) => (
            <div key={slot.id} className="parking-slot" data-state={slot.state}>
              <span>{slot.id}</span>
              {slot.state === "recommended" ? <Car className="h-10 w-10" /> : null}
            </div>
          ))}
        </div>
        <div className="target-pulse" aria-hidden="true" />
      </div>

      <div className="ai-map-footer">
        <div>
          <span className="text-white/55">Tahmini ulaşım</span>
          <strong>1 dk 42 sn</strong>
        </div>
        <div>
          <span className="text-white/55">Girişe uzaklık</span>
          <strong>10 metre</strong>
        </div>
        <div>
          <span className="text-white/55">Manuel seçim</span>
          <strong>Gerekmez</strong>
        </div>
      </div>
    </div>
  );
}

function FactorCard({ icon: IconComponent, title, text }: { icon: Icon; title: string; text: string }) {
  return (
    <div className="ai-factor-card">
      <span>
        <IconComponent className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function PaymentSummary() {
  return (
    <div className="payment-summary-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand">Ödeme özeti</p>
          <h3 className="mt-2 text-2xl font-extrabold text-ink">Otopark ücreti net</h3>
        </div>
        <Clock3 className="h-9 w-9 text-[#0078e7]" />
      </div>
      <div className="mt-7 rounded-[24px] bg-[#f7f9fc] p-5">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>Geçirilen süre</span>
          <strong className="text-ink">02:18:36</strong>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted">
          <span>Ara toplam</span>
          <strong className="text-ink">80 TL</strong>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted">
          <span>KDV (%20)</span>
          <strong className="text-ink">20 TL</strong>
        </div>
        <div className="my-5 h-px bg-[#e5e9f0]" />
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-ink">Toplam</span>
          <strong className="text-[34px] font-extrabold text-brand">100 TL</strong>
        </div>
      </div>
      <a href="#indir" className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-[14px] bg-brand px-6 text-sm font-extrabold text-white transition hover:-translate-y-px hover:bg-[#b91c24]">
        Ödemeyi Uygulamadan Tamamla
      </a>
    </div>
  );
}

function JourneyStep({ index, icon: IconComponent, title, text }: { index: number; icon: Icon; title: string; text: string }) {
  return (
    <div className="journey-step">
      <div className="journey-step-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="journey-step-icon">
        <IconComponent className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export function AvmParkingLanding() {
  return (
    <>
      <Header />
      <main className="overflow-hidden bg-white">
        <section className="avm-parking-hero">
          <Image
            src="/assets/avm-parking/ai-parking-guidance.png"
            alt="ParketShop yapay zeka destekli AVM otopark yönlendirme görseli"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="avm-parking-hero-overlay" aria-hidden="true" />
          <div className="page-container relative z-10 flex min-h-[calc(100svh-44px)] items-center py-28 sm:py-32 lg:min-h-[calc(100svh-56px)]">
            <div className="max-w-[760px] pt-10 text-white">
              <h1 className="text-[44px] font-extrabold leading-[1.05] sm:text-[58px] lg:text-[72px]">
                AVM otoparkını daha akıllı, hızlı ve stressiz hale getirin.
              </h1>
              <p className="mt-7 max-w-[640px] text-[17px] font-medium leading-8 text-white/82 sm:text-[20px]">
                ParketShop, AVM’ye gitmeden önce doluluğu gösterir, yapay zeka ile en uygun boş park yerini önerir, aracınızı kaydeder ve ödemenizi uygulamadan tamamlatır.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#akilli-park-yeri" className="inline-flex h-14 items-center justify-center gap-2 rounded-[14px] bg-brand px-7 text-sm font-extrabold text-white shadow-[0_20px_50px_rgba(237,0,51,0.35)] transition hover:-translate-y-px hover:bg-[#b91c24]">
                  Deneyimi keşfet <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#indir" className="inline-flex h-14 items-center justify-center rounded-[14px] border border-white/35 bg-white/12 px-7 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-px hover:bg-white/18">
                  Uygulamayı indir
                </a>
              </div>
            </div>
            <HeroScreens />
          </div>
        </section>

        <section className="border-b border-[#eef1f5] bg-white">
          <div className="page-container grid gap-5 py-8 sm:grid-cols-3">
            {[
              ["Boş parkları gösterir", "AVM’ye varmadan önce müsait park kapasitesi"],
              ["Zaman kazandırır", "Otopark içinde manuel tur atma süresi azalır"],
              ["Tek uygulama", "Rota, araç konumu ve ödeme aynı akışta"],
            ].map(([value, text]) => (
              <div key={value} className="flex items-center gap-4 rounded-[18px] bg-[#f8fafc] p-5">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-brand" />
                <div>
                  <strong className="block text-[22px] font-extrabold text-ink">{value}</strong>
                  <span className="mt-1 block text-sm leading-6 text-muted">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="doluluk" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
          <div className="page-container grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
            <Reveal>
              <SectionIntro
                label="Otopark doluluk oranı"
                title="AVM’ye gitmeden yoğunluğu görün, zamanınızı otoparkta harcamayın."
                text="ParketShop, anlaşmalı AVM otoparklarından gelen doluluk verisini sade bir dashboard’a dönüştürür. Hangi katta boş yer kaldığını, toplam kapasiteyi ve yoğunluğu daha yola çıkmadan görürsünüz."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="benefit-chip">
                  <Gauge className="h-5 w-5" />
                  <span>Gerçek zamanlı doluluk</span>
                </div>
                <div className="benefit-chip">
                  <Building2 className="h-5 w-5" />
                  <span>Kat bazlı müsaitlik</span>
                </div>
                <div className="benefit-chip">
                  <Clock3 className="h-5 w-5" />
                  <span>Daha az bekleme</span>
                </div>
                <div className="benefit-chip">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Net karar anı</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <OccupancyDashboard />
            </Reveal>
          </div>
        </section>

        <section id="akilli-park-yeri" className="scroll-mt-24 bg-[#07111f] py-20 text-white sm:py-24 lg:py-28">
          <div className="page-container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="avm-section-kicker avm-section-kicker-dark">
                <span aria-hidden="true" />
                Boş park yeri bulma
              </p>
              <h2 className="mt-4 text-[32px] font-extrabold leading-[1.14] sm:text-[42px] lg:text-[52px]">
                Yapay zeka sizin yerinize en ideal boş park yerini seçer.
              </h2>
              <p className="mt-5 text-[16px] leading-8 text-white/70 sm:text-[18px]">
                Sensör sinyalleri, giriş noktası, otopark yoğunluğu, boş yer dağılımı ve hedefe yakınlık birlikte değerlendirilir. ParketShop, manuel yer arama stresini rota destekli bir öneriye dönüştürür.
              </p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {aiFactors.map((factor) => (
                  <FactorCard key={factor.title} {...factor} />
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <AiParkingMap />
            </Reveal>
          </div>
        </section>

        <section id="arac-konumu" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
          <div className="page-container grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <div className="vehicle-story-panel">
                <div className="vehicle-location-card">
                  <Image
                    src="/assets/slider-screens/screen-10.png"
                    alt="Park edilen araç detay ekranı"
                    width={642}
                    height={1389}
                    sizes="(max-width: 768px) 220px, 280px"
                    className="h-auto w-[210px] rounded-[28px] shadow-[0_22px_45px_rgba(15,24,42,0.16)] sm:w-[250px]"
                  />
                  <div className="vehicle-location-data">
                    <span>Kaydedilen konum</span>
                    <strong>B-11</strong>
                    <p>3. Kat · Kolon B · rota hazır</p>
                  </div>
                </div>
                <div className="return-route-card">
                  <BellRing className="h-6 w-6 text-brand" />
                  <div>
                    <strong>“Aracımı nereye park etmiştim?” sorusu biter.</strong>
                    <p>Alışverişten sonra uygulama, kayıtlı park konumunu açar ve sizi aracınıza canlı navigasyonla geri götürür.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="order-1 lg:order-2">
              <SectionIntro
                label="Araç konumu kayıt"
                title="Park ettiğiniz yeri kaydedin, çıkışta aracınızı kolayca bulun."
                text="Kat, kolon ve park alanı bilgisi uygulamada saklanır. AVM çıkışında yolunuzu hatırlamaya çalışmak yerine kayıtlı konuma dokunur, dönüş rotasını başlatırsınız."
              />
              <div className="mt-8 space-y-4">
                {[
                  "Park anında kat ve kolon bilgisi net şekilde gösterilir.",
                  "Bildirim zamanları ile ücret aşımı ve unutma riski azalır.",
                  "Canlı navigasyon, AVM içinden araca dönüşü kolaylaştırır.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-[15px] font-semibold leading-7 text-[#3d4452]">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="odeme" className="scroll-mt-24 bg-[#f7f9fc] py-20 sm:py-24 lg:py-28">
          <div className="page-container grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <Reveal>
              <SectionIntro
                label="Otopark ücret ödeme"
                title="Süreyi, ücreti ve ödeme durumunu uygulamadan takip edin."
                text="AVM içinde ne kadar zaman geçirdiğinizi, ödeme gerekip gerekmediğini ve toplam tutarı net şekilde görün. Ödeme destekleyen AVM’lerde işlemi kasaya gitmeden uygulama içinden tamamlayın."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="benefit-chip">
                  <CreditCard className="h-5 w-5" />
                  <span>Mobil ödeme</span>
                </div>
                <div className="benefit-chip">
                  <Clock3 className="h-5 w-5" />
                  <span>Süre sayacı</span>
                </div>
                <div className="benefit-chip">
                  <Zap className="h-5 w-5" />
                  <span>Hızlı çıkış</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid items-center gap-8 md:grid-cols-[0.92fr_1.08fr]">
                <div className="mx-auto w-full max-w-[260px]">
                  <PhoneFrame src="/assets/slider-screens/screen-12.png" alt="ParketShop otopark ödeme özeti ekranı" />
                </div>
                <PaymentSummary />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="kullanici-akisi" className="scroll-mt-24 bg-[#f7f9fc] py-20 sm:py-24 lg:py-28">
          <div className="page-container">
            <Reveal>
              <SectionIntro
                label="Kullanıcı akışı"
                title="AVM’ye varıştan çıkışa kadar tek, akıcı deneyim."
                text="Ziyaretçinin AVM yolculuğu: yoğunluğu görür, AI’a bırakır, park eder, araç konumunu kaydeder, harita üzerinden kaydettiği aracın konumunu bulur ve otopark ücretini öder."
                align="center"
              />
            </Reveal>
            <Reveal delay={0.08} className="mt-12">
              <div className="journey-reel">
                {journeySteps.map((step, index) => (
                  <JourneyStep key={step.title} index={index} {...step} />
                ))}
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
