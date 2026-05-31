"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  House,
  Menu,
  Minus,
  Plus,
  Send,
  X,
} from "lucide-react";
import {
  FormEvent,
  CSSProperties,
  MouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ContactField, ContactFieldErrors } from "@/lib/contact/validation";

const heroPhoneSlides = [
  {
    src: "/assets/hero-reference/left-mockup.avif",
    alt: "ParketShop harita ekranı",
  },
  {
    src: "/assets/hero-reference/center-mockup.avif",
    alt: "ParketShop ana ekranı",
  },
  {
    src: "/assets/hero-reference/right-mockup.avif",
    alt: "ParketShop rota ekranı",
  },
  {
    src: "/assets/hero-reference/image-4-mockup.avif",
    alt: "ParketShop mobil uygulama ekranı",
  },
  {
    src: "/assets/hero-reference/image-5-mockup.avif",
    alt: "ParketShop mobil deneyim ekranı",
  },
  {
    src: "/assets/hero-reference/image-6-mockup.avif",
    alt: "ParketShop mağaza ve AVM ekranı",
  },
];

const navigation = [
  { label: "Ana Sayfa", href: "/#hero", icon: "home" },
  { label: "AVM Otopark", href: "/#otopark" },
  { label: "AVM İçi", href: "/#avm-ici" },
  { label: "Hakkında", href: "/#hakkinda" },
  { label: "İletişim", href: "/iletisim" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [pendingMobileTarget, setPendingMobileTarget] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest >= 200);
  });

  const closeMobileAndNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);

    const samePageHash =
      href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
          ? href.slice(1)
          : null;

    if (!samePageHash) return;

    event.preventDefault();
    setPendingMobileTarget(samePageHash);
  };

  return (
    <motion.header
      data-sticky={isSticky}
      className={`site-header left-0 top-0 z-50 w-full ${isSticky ? "fixed" : "absolute"}`}
    >
      <motion.div
        animate={isSticky ? { opacity: [0.9, 1], y: [-22, 0] } : { opacity: 1, y: 0 }}
        transition={{ duration: isSticky ? 0.5 : 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        className={`inside-header page-container mt-3 overflow-visible rounded-full transition-[background-color,border-color,box-shadow,padding] duration-300 ${
          isSticky
            ? "border border-white/70 bg-white/85 px-4 shadow-[0_18px_48px_rgba(21,24,36,0.16)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 md:px-5"
            : "border border-transparent bg-transparent px-0 shadow-none"
        }`}
      >
        <div className={`header-content flex items-center justify-between ${isSticky ? "h-16" : "h-[76px]"}`}>
          <a href="/#hero" aria-label="ParketShop ana sayfa">
            <Image
              src="/assets/parketshop-logo.svg"
              alt="ParketShop"
              width={157}
              height={30}
              priority
              className="header-logo h-auto w-[146px] md:w-[157px]"
            />
          </a>
          <nav className="site-nav hidden items-center gap-10 text-[14px] font-semibold text-ink lg:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                className={`transition-colors hover:text-brand ${
                  item.icon === "home" ? "grid h-10 w-10 place-items-center rounded-full hover:bg-[#fff4f4]" : "py-7"
                }`}
                href={item.href}
                aria-label={item.icon === "home" ? "Ana sayfaya dön" : undefined}
                title={item.icon === "home" ? "Ana sayfa" : undefined}
              >
                {item.icon === "home" ? <House className="h-[18px] w-[18px]" strokeWidth={2.2} /> : item.label}
              </a>
            ))}
          </nav>
          <button
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
              isSticky ? "border-white/70 bg-white/70" : "border-[#eaedf3] bg-white/80"
            }`}
            type="button"
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>
      <AnimatePresence
        onExitComplete={() => {
          if (!pendingMobileTarget) return;
          window.history.pushState(null, "", pendingMobileTarget);
          document.querySelector(pendingMobileTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
          setPendingMobileTarget(null);
        }}
      >
        {mobileOpen ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`page-container mt-2 overflow-hidden rounded-[24px] border border-white/70 bg-white/95 shadow-[0_18px_42px_rgba(21,24,36,0.14)] backdrop-blur-xl lg:hidden ${
              isSticky ? "" : "border-[#eef1f5]"
            }`}
          >
            <div className="flex flex-col px-5 py-3">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between py-3.5 text-sm font-semibold"
                  onClick={(event) => closeMobileAndNavigate(event, item.href)}
                  aria-label={item.icon === "home" ? "Ana sayfaya dön" : undefined}
                >
                  {item.icon === "home" ? <House className="h-[18px] w-[18px]" strokeWidth={2.2} /> : item.label}
                </a>
              ))}
              <a
                href="#indir"
                className="primary-button mt-2 w-full"
                onClick={(event) => closeMobileAndNavigate(event, "#indir")}
              >
                Uygulamayı indir
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <motion.div className={className}>{children}</motion.div>;
}

export function TiltImage({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const neutralTransform = "perspective(500px) rotateX(0deg) rotateY(0deg)";
  const [tilt, setTilt] = useState({
    transform: neutralTransform,
  });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    setTilt({
      transform: `perspective(500px) rotateX(${((0.5 - y) * 14).toFixed(2)}deg) rotateY(${((x - 0.5) * 18).toFixed(2)}deg) scale3d(1.018, 1.018, 1)`,
    });
  };

  const resetTilt = () => setTilt({ transform: neutralTransform });

  return (
    <div
      data-testid="about-tilt-surface"
      className="tilt-surface relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onMouseLeave={resetTilt}
      style={{ perspective: "500px" }}
    >
      <div
        data-tilt-visual="true"
        className="tilt-visual relative isolate overflow-hidden rounded-[28px] transition-transform duration-150 ease-out"
        style={{
          willChange: "transform",
          transform: reduceMotion ? neutralTransform : tilt.transform,
          transformStyle: "preserve-3d",
        }}
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className={className} />
      </div>
    </div>
  );
}

export function HeroShapes() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? undefined
    : { duration: 7, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span animate={reduceMotion ? undefined : { y: [0, -13], rotate: [0, 8] }} transition={transition} className="absolute left-[7%] top-[15%] h-4 w-12 rotate-[-24deg] rounded-full bg-[#f8c6cb]" />
      <motion.span animate={reduceMotion ? undefined : { x: [0, 11], y: [0, -8] }} transition={transition} className="absolute left-[36%] top-[26%] h-4 w-4 rounded-full bg-[#c8b6f4]" />
      <motion.span animate={reduceMotion ? undefined : { x: [0, -14], rotate: [0, -4] }} transition={transition} className="absolute right-[7%] top-[12%] h-6 w-16 rounded-sm bg-[#b8e8e5]" />
      <motion.span animate={reduceMotion ? undefined : { rotate: [0, 12], y: [0, 8] }} transition={transition} className="absolute bottom-[27%] left-[44%] h-0 w-0 border-x-[17px] border-t-[28px] border-x-transparent border-t-[#f4c96b]" />
      <motion.span animate={reduceMotion ? undefined : { x: [0, 18] }} transition={transition} className="absolute bottom-[18%] left-[10%] h-3 w-12 rounded-full bg-[#f7bdc5]" />
      <motion.span animate={reduceMotion ? undefined : { scale: [1, 1.07] }} transition={transition} className="absolute bottom-[10%] left-[39%] h-8 w-8 rounded-full border-2 border-[#a9e1df]" />
    </div>
  );
}

function phonePosition(index: number, current: number, total: number) {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < total / -2) offset += total;

  if (offset === 0) return "center";
  if (offset === -1) return "left";
  if (offset === 1) return "right";
  if (offset === -2) return "far-left";
  if (offset === 2) return "far-right";
  return "back";
}

export function HeroPhoneCarousel() {
  const [current, setCurrent] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((value) => (value + 1) % heroPhoneSlides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-phones-showcase"
      aria-label="ParketShop uygulama ekranları"
      data-reduce-motion={reduceMotion ? "true" : "false"}
    >
      {heroPhoneSlides.map((slide, index) => {
        const position = phonePosition(index, current, heroPhoneSlides.length);

        return (
          <div
            key={slide.src}
            className="hero-phone"
            data-position={position}
            aria-hidden={position !== "center"}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={935}
              height={1944}
              sizes="(max-width: 575px) 160px, (max-width: 767px) 190px, (max-width: 991px) 220px, (max-width: 1199px) 230px, (max-width: 1399px) 260px, 300px"
              priority={index <= 2}
            />
          </div>
        );
      })}
    </div>
  );
}

const gallerySlides = [
  { src: "/assets/slider-screens/screen-01.png", alt: "ParketShop ana ekranı", label: "Ana ekran" },
  { src: "/assets/slider-screens/screen-02.png", alt: "ParketShop otopark ana ekranı", label: "Otopark" },
  { src: "/assets/slider-screens/screen-03.png", alt: "ParketShop AVM otopark arama ekranı", label: "AVM arama" },
  { src: "/assets/slider-screens/screen-04.png", alt: "ParketShop yakındaki alışveriş merkezleri haritası", label: "Harita" },
  { src: "/assets/slider-screens/screen-05.png", alt: "ParketShop yakındaki alışveriş merkezleri detay ekranı", label: "AVM detay" },
  { src: "/assets/slider-screens/screen-06.png", alt: "ParketShop alışveriş merkezi detay ekranı", label: "Mağazalar" },
  { src: "/assets/slider-screens/screen-07.png", alt: "ParketShop park slot seçimi onay ekranı", label: "Park seçimi" },
  { src: "/assets/slider-screens/screen-08.png", alt: "ParketShop otopark harita rota onay ekranı", label: "Rota onay" },
  { src: "/assets/slider-screens/screen-09.png", alt: "ParketShop otopark rota bildirim ekranı", label: "Bildirim" },
  { src: "/assets/slider-screens/screen-10.png", alt: "ParketShop otopark çıkış detay ekranı", label: "Çıkış" },
  { src: "/assets/slider-screens/screen-11.png", alt: "ParketShop otopark dönüş canlı görünüm ekranı", label: "Canlı görünüm" },
  { src: "/assets/slider-screens/screen-12.png", alt: "ParketShop sepet özet ekranı", label: "Sepet" },
  { src: "/assets/slider-screens/screen-13.png", alt: "ParketShop AVM içi ana ekranı", label: "AVM içi ana ekran" },
  { src: "/assets/slider-screens/screen-14.png", alt: "ParketShop AVM içi yönlendirme ekranı", label: "AVM içi yönlendirme" },
  { src: "/assets/slider-screens/screen-15.png", alt: "ParketShop AVM mağazalar ekranı", label: "AVM mağazalar" },
  { src: "/assets/slider-screens/screen-16.png", alt: "ParketShop AVM restoranlar ekranı", label: "AVM restoranlar" },
  { src: "/assets/slider-screens/screen-17.png", alt: "ParketShop AVM gezinti kıyafet ekranı", label: "AVM gezinti kıyafet" },
  { src: "/assets/slider-screens/screen-18.png", alt: "ParketShop AVM gezinti canlı görünüm ekranı", label: "AVM canlı görünüm" },
  { src: "/assets/slider-screens/screen-19.png", alt: "ParketShop AVM içi rota ekranı", label: "AVM içi rota" },
  { src: "/assets/slider-screens/screen-20.png", alt: "ParketShop AVM içi detay ekranı", label: "AVM içi detay" },
];

export function ScreenshotCarousel() {
  const [current, setCurrent] = useState(0);
  const [drag, setDrag] = useState({ active: false, startX: 0, x: 0 });
  const draggedRef = useRef(false);
  const dragOffset = drag.active ? Math.max(-260, Math.min(260, drag.x - drag.startX)) : 0;
  const slideCount = gallerySlides.length;

  const goToSlide = (index: number) => {
    setCurrent((index + slideCount) % slideCount);
  };

  const getOffset = (index: number) => {
    let offset = index - current;
    if (offset > slideCount / 2) offset -= slideCount;
    if (offset < slideCount / -2) offset += slideCount;
    return offset;
  };

  const getStateClass = (offset: number) => {
    if (offset === 0) return "active";
    if (offset === -1) return "prev-1";
    if (offset === 1) return "next-1";
    if (offset === -2) return "prev-2";
    if (offset === 2) return "next-2";
    if (offset === -3) return "prev-3";
    if (offset === 3) return "next-3";
    if (offset === -4) return "prev-4";
    if (offset === 4) return "next-4";
    return "is-hidden";
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    draggedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ active: true, startX: event.clientX, x: event.clientX });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.active) return;
    if (Math.abs(event.clientX - drag.startX) > 8) draggedRef.current = true;
    setDrag((value) => ({ ...value, x: event.clientX }));
  };

  const finishDrag = () => {
    if (!drag.active) return;
    const distance = dragOffset;
    setDrag({ active: false, startX: 0, x: 0 });
    if (Math.abs(distance) < 58) return;

    const steps = Math.max(1, Math.min(2, Math.round(Math.abs(distance) / 130)));
    goToSlide(current + (distance < 0 ? steps : -steps));
  };

  return (
    <div className="screenshot-coverflow mt-12 md:mt-16">
      <div
        className={`screenshot-coverflow-stage ${drag.active ? "is-dragging" : ""}`}
        style={{ "--drag-x": `${dragOffset}px` } as CSSProperties}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onPointerLeave={finishDrag}
        aria-label="ParketShop uygulama ekranları"
      >
        {gallerySlides.map((slide, index) => {
          const offset = getOffset(index);
          const stateClass = getStateClass(offset);

          return (
            <button
              key={slide.label}
              type="button"
              aria-label={`${slide.label} ekranını göster`}
              aria-current={index === current}
              data-testid={offset === 0 ? "active-gallery-slide" : undefined}
              data-coverflow-position={stateClass}
              className={`screenshot-coverflow-card ${stateClass}`}
              onClick={(event) => {
                if (draggedRef.current) {
                  event.preventDefault();
                  draggedRef.current = false;
                  return;
                }
                goToSlide(index);
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={642}
                height={1391}
                sizes="(max-width: 640px) 218px, (max-width: 1024px) 286px, 360px"
                priority={index < 5}
                draggable={false}
              />
            </button>
          );
        })}
      </div>
      <div className="screenshot-coverflow-nav">
        <button type="button" onClick={() => goToSlide(current - 1)} aria-label="Önceki ekran" className="screenshot-coverflow-arrow">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="screenshot-coverflow-dots" aria-label="Galeri sayfaları">
          {gallerySlides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`${slide.label} ekranları`}
              aria-current={index === current}
              onClick={() => goToSlide(index)}
              className="screenshot-coverflow-dot"
            />
          ))}
        </div>
        <button type="button" onClick={() => goToSlide(current + 1)} aria-label="Sonraki ekran" className="screenshot-coverflow-arrow">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

const freeFeatures = ["Canlı boş park yeri bilgisi", "Araç park konumunun kaydedilmesi", "Park ücreti izleme", "Kampanyalar ve mağaza keşfi"];
const premiumFeatures = ["Reklamsız deneyim", "Yapay zeka destekli ideal park yeri", "Kişiselleştirilmiş kampanyalar", "Mobil ödeme ve özel kuponlar"];

export function PricingCards() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="mt-8 flex items-center justify-center gap-4 text-sm font-semibold">
        <span className={yearly ? "text-muted" : "text-brand"}>Aylık</span>
        <button type="button" role="switch" aria-label="Yıllık fiyatlandırmayı göster" aria-checked={yearly} onClick={() => setYearly((value) => !value)} className="relative h-[25px] w-[47px] rounded-full bg-brand p-[3px]">
          <motion.span className="block h-[19px] w-[19px] rounded-full bg-white" animate={{ x: yearly ? 22 : 0 }} />
        </button>
        <span className={yearly ? "text-brand" : "text-muted"}>
          Yıllık <span className="ml-1 text-xs text-brand">-%20</span>
        </span>
      </div>
      <div className="mx-auto mt-12 grid max-w-[760px] gap-7 md:grid-cols-2">
        <div className="rounded-2xl bg-[#f7f8fc] p-8 text-left md:p-10">
          <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Ücretsiz</h3>
          <p className="mt-3 text-sm text-muted">Temel alışveriş deneyimi için</p>
          <ul className="mt-8 space-y-4">
            {freeFeatures.map((feature) => (
              <li key={feature} className="flex gap-3 text-[14px] text-[#555b68]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} />{feature}</li>
            ))}
          </ul>
          <p className="mt-9 text-sm text-muted">Ücretsiz</p>
          <a className="primary-button mt-4 !h-[43px] !px-7" href="#indir">Ücretsiz indir</a>
        </div>
        <div className="rounded-2xl bg-brand-deep p-8 text-left text-white shadow-[0_22px_45px_rgba(201,31,37,0.2)] md:p-10">
          <h3 className="text-2xl font-extrabold tracking-[-0.04em]">Aylık Premium</h3>
          <p className="mt-3 text-sm text-white/72">Daha akıllı AVM ziyaretleri için</p>
          <ul className="mt-8 space-y-4">
            {premiumFeatures.map((feature) => (
              <li key={feature} className="flex gap-3 text-[14px] text-white/92"><Check className="mt-0.5 h-4 w-4 shrink-0 text-white" strokeWidth={2.6} />{feature}</li>
            ))}
          </ul>
          <p data-testid="premium-price" className="mt-8 text-3xl font-extrabold">
            {yearly ? "₺1.440" : "₺150"}<span className="ml-1 text-sm font-medium text-white/75">/ {yearly ? "yıl" : "ay"}</span>
          </p>
          <a className="mt-5 inline-flex h-[43px] items-center rounded-md bg-white px-7 text-sm font-bold text-brand-deep transition-transform hover:-translate-y-px" href="#indir">Şimdi Premium</a>
        </div>
      </div>
    </>
  );
}

const faqItems = [
  { question: "ParketShop uygulaması nasıl çalışır?", answer: "ParketShop, anlaşmalı AVM otopark sensörlerinden aldığı doluluk verisini uygulama içinde gösterir. Ziyaret öncesinde boş yer durumunu inceleyebilir, seçtiğiniz park alanına yönlendirilebilir ve aracınızın konumunu kaydederek alışveriş sonrası kolayca geri dönebilirsiniz." },
  { question: "Uygulama ücretsiz mi?", answer: "Boş yer bilgisi, araç konumu ve temel kampanyalar ücretsiz pakette kullanılabilir. Premium paket yapay zeka destekli öneriler, özel kuponlar ve mobil ödeme avantajları sunar." },
  { question: "Otoparkta yer bulma özelliği nasıl çalışıyor?", answer: "Sensör ile desteklenen AVM'lerde boş park noktaları haritada görünür; seçtiğiniz noktaya uygulama içi navigasyonla ulaşabilirsiniz." },
  { question: "Park ettiğim yerin konumunu uygulamadan tekrar bulabilir miyim?", answer: "Evet. Kayıtlı araç konumunuz uygulamadaki harita üzerinden gösterilir ve aracınıza geri yönlendirme başlatılabilir." },
  { question: "Otopark ücretimi uygulama üzerinden ödeyebilir miyim?", answer: "Ödeme destekleyen anlaşmalı AVM'lerde ücretinizi uygulama üzerinden güvenli şekilde tamamlayabilirsiniz." },
];

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => {
        const expanded = index === open;
        return (
          <div key={item.question} className="overflow-hidden rounded-[8px] border border-[#edf0f4] bg-white shadow-[0_4px_16px_rgba(18,25,39,0.035)]">
            <button type="button" onClick={() => setOpen(expanded ? -1 : index)} aria-expanded={expanded} className={`flex w-full items-center justify-between gap-5 p-5 text-left text-[14px] font-bold ${expanded ? "text-brand" : "text-ink"}`}>
              {item.question}
              {expanded ? <Minus className="h-4 w-4 shrink-0 text-brand" /> : <Plus className="h-4 w-4 shrink-0 text-[#667081]" />}
            </button>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="px-5 pb-6 text-[13.5px] leading-7 text-muted">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

type ContactSubmitStatus = "idle" | "submitting" | "success" | "error";

type ContactSubmitResponse = {
  ok: boolean;
  message?: string;
  fieldErrors?: ContactFieldErrors;
};

const contactInputClass =
  "h-[48px] rounded-[18px] bg-white/15 px-4 text-sm font-semibold text-white outline-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-colors placeholder:text-white/70 focus:bg-white/20 focus:ring-2 focus:ring-white/35 disabled:cursor-not-allowed disabled:opacity-70";

const contactTextareaClass =
  "w-full resize-none rounded-[18px] bg-white/15 p-4 text-sm font-semibold text-white outline-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-colors placeholder:text-white/70 focus:bg-white/20 focus:ring-2 focus:ring-white/35 disabled:cursor-not-allowed disabled:opacity-70";

function contactErrorId(field: ContactField) {
  return `contact-${field}-error`;
}

function ContactFieldError({ field, message }: { field: ContactField; message?: string }) {
  if (!message) return null;

  return (
    <p
      id={contactErrorId(field)}
      className="mt-2 flex items-start gap-2 rounded-md border border-[#fca5a5] bg-[#fff7ed] px-3 py-2 text-[13px] font-extrabold leading-5 text-[#7f1d1d] shadow-[0_8px_22px_rgba(127,29,29,0.2)]"
    >
      <span aria-hidden="true" className="shrink-0">
        ⚠️
      </span>
      <span>{message}</span>
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<ContactSubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const isSubmitting = status === "submitting";
  const isSubmitted = status === "success";

  useEffect(() => {
    if (!isSubmitted) return;

    const timeoutId = window.setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [isSubmitted]);

  const inputClass = (field: ContactField, baseClass = contactInputClass) =>
    `${baseClass} w-full ${
      fieldErrors[field] ? "border-2 border-[#fed7aa] ring-4 ring-white/20" : "border-0"
    }`;

  const statusMessageClass =
    status === "success"
      ? "inline-flex w-fit items-center justify-center gap-2 rounded-full border-0 bg-[#22c55e] px-8 py-3 text-white shadow-[0_14px_32px_rgba(16,185,129,0.24)]"
      : "border border-[#fecaca] bg-[#7f1d1d] text-white shadow-[0_12px_28px_rgba(127,29,29,0.22)]";

  const submitButtonClass = isSubmitted
    ? "relative z-10 mt-5 flex h-[48px] w-fit min-w-[178px] items-center justify-center gap-2 rounded-full bg-[#22c55e] px-8 text-sm font-extrabold text-white shadow-[0_14px_32px_rgba(16,185,129,0.24)] transition-colors hover:bg-[#22c55e] disabled:cursor-default disabled:opacity-100"
    : "relative z-10 mt-5 flex h-[48px] w-fit items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-extrabold text-[#ed0033] shadow-[0_14px_32px_rgba(121,0,22,0.14)] transition-colors hover:bg-[#fff5f7] disabled:cursor-not-allowed disabled:opacity-75";

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
          startedAt,
          pageUrl: window.location.href,
        }),
      });

      const result = (await response.json()) as ContactSubmitResponse;

      if (!response.ok || !result.ok) {
        setStatus("error");
        setFieldErrors(result.fieldErrors ?? {});
        setMessage(result.message ?? "Mesajınız gönderilemedi. Lütfen tekrar deneyin.");
        return;
      }

      form.reset();
      setStartedAt(Date.now());
      setStatus("success");
      setMessage(result.message ?? "Mesajınız alındı. Teşekkür ederiz.");
    } catch {
      setStatus("error");
      setMessage("Mesajınız gönderilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="relative isolate overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f20736] via-[#ed0033] to-[#d90019] p-7 text-white shadow-[0_24px_70px_rgba(213,31,42,0.18)] before:pointer-events-none before:absolute before:-right-16 before:-top-24 before:z-0 before:h-[290px] before:w-[290px] before:rounded-full before:border before:border-white/20 after:pointer-events-none after:absolute after:-right-5 after:-top-32 after:z-0 after:h-[210px] after:w-[210px] after:rounded-full after:border after:border-white/20 sm:p-10"
      noValidate
    >
      <h3 className="relative z-10 text-[26px] font-extrabold leading-tight tracking-[-0.04em]">Herhangi Bir Sorunuz Var mı?</h3>
      <p className="relative z-10 mt-4 text-[14px] leading-7 text-white/85">Sorunuzu bize yazın; ekibimiz en kısa sürede sizinle iletişime geçsin.</p>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="name">Adınız</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Adınız"
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? contactErrorId("name") : undefined}
            className={inputClass("name")}
          />
          <ContactFieldError field="name" message={fieldErrors.name} />
        </div>
        <div>
          <label className="sr-only" htmlFor="phone">Telefon</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={32}
            autoComplete="tel"
            placeholder="Telefon"
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? contactErrorId("phone") : undefined}
            className={inputClass("phone")}
          />
          <ContactFieldError field="phone" message={fieldErrors.phone} />
        </div>
      </div>

      <div className="relative z-10 mt-3">
        <label className="sr-only" htmlFor="email">E-posta</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="E-posta adresiniz"
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? contactErrorId("email") : undefined}
          className={inputClass("email")}
        />
        <ContactFieldError field="email" message={fieldErrors.email} />
      </div>

      <div className="relative z-10 mt-3">
        <label className="sr-only" htmlFor="message">Mesajınız</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          placeholder="Mesajınız..."
          rows={5}
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? contactErrorId("message") : undefined}
          className={inputClass("message", contactTextareaClass)}
        />
        <ContactFieldError field="message" message={fieldErrors.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={submitButtonClass}
      >
        {isSubmitted ? (
          <>
            <Check className="h-4 w-4" /> Gönderildi
          </>
        ) : (
          <>
            {isSubmitting ? "Gönderiliyor..." : "Mesajınızı Gönderin"} <Send className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="relative z-10 min-h-[38px]">
        <AnimatePresence mode="wait">
          {message ? (
            <motion.p
              key={`${status}-${message}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              role={status === "error" ? "alert" : "status"}
              className={`mt-4 rounded-md px-3 py-2 text-center text-sm font-extrabold ${statusMessageClass}`}
            >
              {isSubmitted ? <Check className="h-4 w-4" /> : null}
              {message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
