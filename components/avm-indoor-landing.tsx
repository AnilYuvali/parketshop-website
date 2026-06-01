"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Compass,
  LocateFixed,
  MapPinned,
  Navigation,
  Search,
  Sparkles,
  Store,
  Tags,
  Utensils,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Header } from "@/components/interactive";
import { DownloadSection, Footer } from "@/components/site-sections";
import {
  AiPushVideo,
  CampaignDiscoveryVideo,
  HeroExperienceVideo,
  JourneyTimelineVideo,
  NavigationRouteVideo,
  RemotionLoop,
} from "@/components/avm-indoor-remotion";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const heroHighlights = [
  { icon: Search, label: "Mağazaları kolayca bul" },
  { icon: BadgePercent, label: "Kampanyaları kaçırma" },
  { icon: BrainCircuit, label: "Yapay zeka destekli öneriler al" },
  { icon: Navigation, label: "Canlı navigasyonla zaman kazan" },
];

const campaignBenefits = [
  "Mağaza ve restoran kampanyaları tek yerde görünür.",
  "Mobil uygulamaya özel fırsatlar daha hızlı fark edilir.",
  "Markalar kampanyalarını doğru ziyaretçiye ulaştırır.",
];

const aiSignals = [
  {
    icon: LocateFixed,
    title: "Konum duyarlı",
    text: "AVM içindeki anlık konum ve mağaza yakınlığı birlikte değerlendirilir.",
  },
  {
    icon: BrainCircuit,
    title: "Davranış temelli",
    text: "Kullanıcının ilgi alanları ve keşif alışkanlıkları öğrenilir.",
  },
  {
    icon: Sparkles,
    title: "Kişiselleştirilmiş",
    text: "Rastgele bildirim yerine ilgini çekebilecek fırsatlar öne çıkar.",
  },
  {
    icon: BarChart3,
    title: "Ölçülebilir",
    text: "AVM ve markalar için daha hedefli, daha verimli pazarlama oluşur.",
  },
];

const stores = [
  "Zara",
  "Beymen",
  "LC Waikiki",
  "Adidas",
  "H&M",
  "Nike",
  "Kiğılı",
  "DS Damat",
  "Decathlon",
  "Lacoste",
  "Pull&Bear",
  "Puma",
];

const restaurants = [
  "Arby’s",
  "Burger King",
  "McDonald’s",
  "Popeyes",
  "Kahve Dünyası",
  "Usta Dönerci",
  "Pidem",
  "Alaçatı Muhallebicisi",
  "Starbucks",
  "KFC",
  "Tavuk Dünyası",
  "Sbarro",
];

const journeySteps = [
  {
    icon: Compass,
    title: "AVM’yi seç",
    text: "Yakındaki AVM’leri gör, ziyaret edeceğin merkezi hızlıca aç.",
  },
  {
    icon: Tags,
    title: "Keşfet",
    text: "Markaları, restoranları ve kampanyaları tek ekranda tara.",
  },
  {
    icon: BrainCircuit,
    title: "Öneriyi gör",
    text: "Yapay zeka destekli kişisel fırsatlar alışveriş anına göre öne çıkar.",
  },
  {
    icon: Navigation,
    title: "Rotayı başlat",
    text: "Canlı navigasyon mağazaya en pratik yolu gösterir.",
  },
  {
    icon: CheckCircle2,
    title: "Fırsatı kullan",
    text: "Doğru zamanda doğru kampanyadan yararlan.",
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
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
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
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] ${
          dark ? "bg-white/10 text-white" : "bg-[#fde0e7] text-[#ed0033]"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${dark ? "bg-[#58c5ff]" : "bg-[#ed0033]"}`} aria-hidden="true" />
        {label}
      </p>
      <h2
        className={`mt-5 text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] sm:text-[42px] lg:text-[50px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-5 text-[15px] leading-7 sm:text-[17px] ${dark ? "text-white/70" : "text-muted"}`}>
        {text}
      </p>
    </div>
  );
}

function IconCard({
  icon: IconComponent,
  title,
  text,
  dark = false,
}: {
  icon: Icon;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[22px] p-5 ${
        dark
          ? "border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "border border-[#edf0f4] bg-white shadow-[0_18px_45px_rgba(15,24,42,0.055)]"
      }`}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-[14px] ${
          dark ? "bg-[#147df5]/18 text-[#58c5ff]" : "bg-[#fde0e7] text-[#ed0033]"
        }`}
      >
        <IconComponent className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <h3 className={`mt-4 text-[16px] font-extrabold ${dark ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`mt-2 text-[13px] font-medium leading-6 ${dark ? "text-white/64" : "text-muted"}`}>{text}</p>
    </div>
  );
}

function CampaignSection() {
  return (
    <section id="kampanyalar" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="page-container grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <Reveal>
          <SectionIntro
            label="Kampanyalar"
            title="AVM’deki kampanyaları tek ekranda keşfedin."
            text="ParketShop, mağaza ve restoran fırsatlarını tek deneyimde toplar. Kullanıcı farklı kaynaklarda zaman kaybetmeden güncel indirimleri görür; markalar kampanyalarını daha doğru ziyaretçiye ulaştırır."
          />
          <div className="mt-8 space-y-4">
            {campaignBenefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-[18px] border border-[#edf0f4] bg-[#f8fafc] p-4 text-[14px] font-bold leading-6 text-[#3d4452]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ed0033]" />
                {benefit}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[34px] border border-[#edf0f4] bg-white p-3 shadow-[0_30px_90px_rgba(15,24,42,0.1)]">
            <RemotionLoop
              component={CampaignDiscoveryVideo}
              durationInFrames={150}
              width={900}
              height={560}
              ariaLabel="Kampanya kartları ve filtreleme animasyonu"
              className="aspect-[900/560] overflow-hidden rounded-[28px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AiPushSection() {
  return (
    <section id="ai-bildirimleri" className="scroll-mt-24 overflow-hidden bg-[#07111f] py-20 text-white sm:py-24 lg:py-28">
      <div className="page-container">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionIntro
              label="AI Push Bildirimleri"
              title="Yapay zeka, sizin için en doğru kampanya ve indirimi öne çıkarır."
              text="Kullanıcının ilgi alanları, davranışları ve AVM içindeki konumu analiz edilir. Bildirimler rastgele değil, doğru zamanda doğru kampanya hissi verecek şekilde kişiselleştirilir."
              dark
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {aiSignals.map((signal) => (
                <IconCard key={signal.title} {...signal} dark />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_38px_100px_rgba(0,0,0,0.38)]">
              <RemotionLoop
                component={AiPushVideo}
                durationInFrames={180}
                width={900}
                height={620}
                ariaLabel="Yapay zeka destekli kişiselleştirilmiş push bildirimi animasyonu"
                className="aspect-[900/620] overflow-hidden rounded-[30px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BrandExplorerSection() {
  const [tab, setTab] = useState<"stores" | "restaurants">("stores");
  const items = useMemo(() => (tab === "stores" ? stores : restaurants), [tab]);
  const activeScreen = tab === "stores" ? "/assets/slider-screens/screen-15.png" : "/assets/slider-screens/screen-16.png";

  return (
    <section id="markalar" className="scroll-mt-24 bg-[#f7f9fc] py-20 sm:py-24 lg:py-28">
      <div className="page-container grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <Reveal>
          <SectionIntro
            label="Marka keşfi"
            title="AVM’de hangi marka var, hangi fırsat yakınınızda hemen görün."
            text="Mağaza ve restoranlar kategori bazlı listelenir. Kullanıcı marka detayına, kampanyaya ve canlı navigasyona aynı ekrandan geçerek AVM’yi daha hızlı tanır."
          />
          <div className="mt-8 inline-grid grid-cols-2 rounded-[18px] bg-white p-1 shadow-[0_18px_45px_rgba(15,24,42,0.08)]">
            <button
              type="button"
              onClick={() => setTab("stores")}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-[14px] px-5 text-sm font-extrabold transition ${
                tab === "stores" ? "bg-[#ed0033] text-white shadow-[0_14px_30px_rgba(237,0,51,0.22)]" : "text-[#6b7280] hover:text-ink"
              }`}
            >
              <Store className="h-4 w-4" />
              Mağazalar
            </button>
            <button
              type="button"
              onClick={() => setTab("restaurants")}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-[14px] px-5 text-sm font-extrabold transition ${
                tab === "restaurants" ? "bg-[#ed0033] text-white shadow-[0_14px_30px_rgba(237,0,51,0.22)]" : "text-[#6b7280] hover:text-ink"
              }`}
            >
              <Utensils className="h-4 w-4" />
              Restoranlar
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={`${tab}-${item}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: Math.min(index * 0.018, 0.16) }}
                className="flex min-h-[58px] items-center justify-between rounded-[18px] border border-[#edf0f4] bg-white px-4 text-[13px] font-extrabold text-ink shadow-[0_12px_28px_rgba(15,24,42,0.045)]"
              >
                <span className="truncate">{item}</span>
                <span className="ml-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[#ed0033]" />
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative mx-auto flex min-h-[620px] max-w-[520px] items-center justify-center overflow-hidden rounded-[36px] bg-white shadow-[0_30px_90px_rgba(15,24,42,0.1)]">
            <div className="absolute inset-x-8 top-8 z-10 rounded-[24px] bg-[#07111f] p-5 text-white shadow-[0_22px_55px_rgba(7,17,31,0.24)]">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-[#58c5ff]" />
                <span className="text-sm font-extrabold">
                  {tab === "stores" ? "Nike mağazasını bul" : "Kahve molası yakınımda"}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-extrabold text-white/78">
                <span className="rounded-full bg-white/10 px-2 py-2">Detay</span>
                <span className="rounded-full bg-white/10 px-2 py-2">Kampanya</span>
                <span className="rounded-full bg-[#147df5] px-2 py-2 text-white">Rota</span>
              </div>
            </div>
            <Image
              src={activeScreen}
              alt={tab === "stores" ? "ParketShop mağazalar ekranı" : "ParketShop restoranlar ekranı"}
              width={642}
              height={1389}
              sizes="(max-width: 768px) 270px, 330px"
              className="mt-20 h-auto w-[280px] rounded-[30px] shadow-[0_26px_60px_rgba(15,24,42,0.17)] sm:w-[330px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LiveNavigationSection() {
  return (
    <section id="canli-navigasyon" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="page-container grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-[36px] border border-[#edf0f4] bg-[#f7f9fc] p-3 shadow-[0_30px_90px_rgba(15,24,42,0.1)]">
            <RemotionLoop
              component={NavigationRouteVideo}
              durationInFrames={190}
              width={900}
              height={600}
              ariaLabel="AVM içinde canlı navigasyon rota animasyonu"
              className="aspect-[900/600] overflow-hidden rounded-[30px]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="order-1 lg:order-2">
          <SectionIntro
            label="Canlı navigasyon"
            title="Aradığınız mağazaya canlı navigasyon ile kolayca ulaşın."
            text="Mağaza veya restoran seçildiğinde ParketShop en pratik rotayı gösterir. Katlar, girişler, mağaza konumları ve hedef noktalar daha anlaşılır hale gelir."
          />
          <div className="mt-8 grid gap-4">
            {[
              ["Mağazayı seç", "Arama ve kategori ile hedefi hızlıca bulun."],
              ["Rota çizilsin", "Harita üzerinde en anlaşılır güzergah görünür."],
              ["Zaman kazanın", "Kaybolmadan hedefe ulaşın, alışverişe odaklanın."],
            ].map(([title, text], index) => (
              <div key={title} className="flex gap-4 rounded-[20px] border border-[#edf0f4] bg-[#f8fafc] p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] bg-[#ed0033] text-sm font-extrabold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-extrabold text-ink">{title}</h3>
                  <p className="mt-1.5 text-[13px] font-medium leading-6 text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section id="kullanici-akisi" className="scroll-mt-24 bg-[#f7f9fc] py-20 sm:py-24 lg:py-28">
      <div className="page-container">
        <Reveal>
          <SectionIntro
            label="Kullanıcı akışı"
            title="AVM içi deneyim, adım adım akıcı bir yolculuğa dönüşür."
            text="Kullanıcı AVM’yi seçer, marka veya kampanya keşfeder, kendisine özel önerileri görür, canlı navigasyonla mağazaya ulaşır ve kampanyadan yararlanır."
            align="center"
          />
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <div className="overflow-hidden rounded-[36px] border border-[#edf0f4] bg-white p-3 shadow-[0_28px_80px_rgba(15,24,42,0.08)]">
            <RemotionLoop
              component={JourneyTimelineVideo}
              durationInFrames={170}
              width={900}
              height={520}
              ariaLabel="ParketShop AVM içi kullanıcı yolculuğu animasyonu"
              className="aspect-[900/520] overflow-hidden rounded-[30px]"
            />
          </div>
        </Reveal>
        <div className="mt-9 grid gap-4 md:grid-cols-5">
          {journeySteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.04}>
              <div className="relative h-full rounded-[22px] border border-[#edf0f4] bg-white p-5 shadow-[0_18px_44px_rgba(15,24,42,0.055)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-black text-[#ed0033]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#fde0e7] text-[#ed0033]">
                    <step.icon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                </div>
                <h3 className="mt-5 text-[16px] font-extrabold text-ink">{step.title}</h3>
                <p className="mt-2 text-[13px] font-medium leading-6 text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AvmIndoorLanding() {
  return (
    <>
      <Header />
      <main className="overflow-hidden bg-white">
        <section className="relative isolate min-h-[900px] overflow-hidden bg-[#f6f9fd] pt-28 lg:min-h-[880px] lg:pt-36">
          <Image
            src="/assets/avm-indoor/hero-mall-navigation.png"
            alt="ParketShop AVM içi navigasyon ve kampanya deneyimi"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,249,253,0.97)_0%,rgba(246,249,253,0.9)_37%,rgba(246,249,253,0.36)_74%,rgba(246,249,253,0.18)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" />
          <div className="page-container relative z-10 grid min-h-[760px] items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/82 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#ed0033] shadow-[0_14px_35px_rgba(15,24,42,0.08)]">
                <span className="h-2 w-2 rounded-full bg-[#ed0033]" />
                AVM İçi Deneyim
              </p>
              <h1 className="mt-6 max-w-[720px] text-[42px] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[58px] lg:text-[72px]">
                AVM içinde aradığınız her şey, en akıllı rotayla cebinizde.
              </h1>
              <p className="mt-7 max-w-[610px] text-[17px] font-medium leading-8 text-[#4b5563] sm:text-[20px]">
                ParketShop; kampanyaları, markaları, yapay zeka destekli önerileri ve canlı navigasyonu tek akıcı alışveriş deneyiminde birleştirir.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {heroHighlights.map((item) => (
                  <div key={item.label} className="flex min-h-[56px] items-center gap-3 rounded-[18px] border border-white/80 bg-white/82 px-4 text-[14px] font-extrabold text-ink shadow-[0_16px_36px_rgba(15,24,42,0.07)] backdrop-blur-md">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#fde0e7] text-[#ed0033]">
                      <item.icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#kampanyalar" className="inline-flex h-14 items-center justify-center gap-2 rounded-[14px] bg-[#ed0033] px-7 text-sm font-extrabold text-white shadow-[0_20px_50px_rgba(237,0,51,0.28)] transition hover:-translate-y-px hover:bg-[#b91c24]">
                  Deneyimi keşfet <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#indir" className="inline-flex h-14 items-center justify-center rounded-[14px] border border-[#d9e2ee] bg-white/82 px-7 text-sm font-extrabold text-ink backdrop-blur-md transition hover:-translate-y-px hover:border-[#ed0033]/40">
                  Uygulamayı indir
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-5">
                <div className="overflow-hidden rounded-[36px] border border-white/80 bg-white/70 p-3 shadow-[0_32px_90px_rgba(15,24,42,0.12)] backdrop-blur-xl">
                  <RemotionLoop
                    component={HeroExperienceVideo}
                    durationInFrames={180}
                    width={900}
                    height={560}
                    ariaLabel="ParketShop AVM içi ürün deneyimi hero animasyonu"
                    className="aspect-[900/560] overflow-hidden rounded-[30px]"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["3 dk", "Hedef mağazaya ulaşım"],
                    ["Tek ekran", "Kampanya ve marka keşfi"],
                    ["AI", "Kişisel fırsat önerisi"],
                  ].map(([value, label]) => (
                    <div key={value} className="rounded-[18px] border border-white/80 bg-white/82 p-4 shadow-[0_16px_36px_rgba(15,24,42,0.07)] backdrop-blur-md">
                      <strong className="block text-[24px] font-black text-[#ed0033]">{value}</strong>
                      <span className="mt-1 block text-[12px] font-bold leading-5 text-[#667085]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-[#edf0f4] bg-white">
          <div className="page-container grid gap-5 py-8 md:grid-cols-3">
            {[
              ["Zaman kazandırır.", "Aradığınız mağazayı kolayca bulun."],
              ["Daha akıllı keşif.", "Yapay zeka size en uygun kampanyaları önerir."],
              ["Tek deneyim.", "Kampanyalar, markalar ve yönlendirmeler birleşir."],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-4 rounded-[20px] bg-[#f8fafc] p-5">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[#ed0033]" />
                <div>
                  <strong className="block text-[18px] font-extrabold text-ink">{title}</strong>
                  <span className="mt-1 block text-sm leading-6 text-muted">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CampaignSection />
        <AiPushSection />
        <BrandExplorerSection />
        <LiveNavigationSection />
        <JourneySection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
