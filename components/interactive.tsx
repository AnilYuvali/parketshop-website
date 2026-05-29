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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  Send,
  X,
} from "lucide-react";
import {
  FormEvent,
  MouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useState,
} from "react";

const pricingLinks = [
  { label: "Ücretsiz Paket", href: "#fiyat" },
  { label: "Aylık Premium", href: "#fiyat" },
  { label: "Kurumsal Çözümler", href: "#iletisim" },
];

const navigation = [
  { label: "Ana Sayfa", href: "#hero" },
  { label: "Hakkında", href: "#hakkinda" },
  { label: "Fiyat", href: "#fiyat", dropdown: true },
  { label: "Özellikler", href: "#otopark" },
  { label: "İletişim", href: "#iletisim" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [pendingMobileTarget, setPendingMobileTarget] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest >= 200);
  });

  const closeMobileAndNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setPendingMobileTarget(href);
    setMobileOpen(false);
    setPricingOpen(false);
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
          <a href="#hero" aria-label="ParketShop ana sayfa">
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
            {navigation.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setPricingOpen(true)}
                  onMouseLeave={() => setPricingOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={pricingOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-1.5 py-7 transition-colors hover:text-brand"
                    onClick={() => setPricingOpen((open) => !open)}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {pricingOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-1/2 top-[62px] w-52 -translate-x-1/2 rounded-xl border border-[#edf0f5] bg-white p-2 shadow-[0_18px_45px_rgba(20,24,36,0.1)]"
                      >
                        {pricingLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="block rounded-lg px-4 py-3 text-[13px] text-ink transition-colors hover:bg-[#fff4f4] hover:text-brand"
                          >
                            {link.label}
                          </a>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ) : (
                <a key={item.label} className="py-7 transition-colors hover:text-brand" href={item.href}>
                  {item.label}
                </a>
              ),
            )}
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
                <div key={item.label}>
                  {item.dropdown ? (
                    <button
                      type="button"
                      aria-expanded={pricingOpen}
                      className="flex w-full items-center justify-between py-3.5 text-sm font-semibold"
                      onClick={() => setPricingOpen((open) => !open)}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center justify-between py-3.5 text-sm font-semibold"
                      onClick={(event) => closeMobileAndNavigate(event, item.href)}
                    >
                      {item.label}
                    </a>
                  )}
                  {item.dropdown && pricingOpen ? (
                    <div className="mb-2 rounded-lg bg-mist px-3 py-1">
                      {pricingLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="block py-3 text-sm text-muted"
                          onClick={(event) => closeMobileAndNavigate(event, link.href)}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
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

const gallerySlides = [
  { src: "/assets/parking-screens.png", alt: "Boş park yeri seçimi ve park detayları ekranları", label: "Otopark" },
  { src: "/assets/find-stop-app.png", alt: "ParketShop ana ekranı, araç konumu ve AVM harita ekranları", label: "Navigasyon" },
  { src: "/assets/mall-screens.png", alt: "AVM içi kampanyalar ve mağaza ekranları", label: "Kampanyalar" },
];

export function ScreenshotCarousel() {
  const [current, setCurrent] = useState(1);

  return (
    <div className="mt-12 md:mt-16">
      <div className="relative mx-auto h-[360px] overflow-hidden sm:h-[480px] lg:h-[525px]">
        {gallerySlides.map((slide, index) => {
          let position = index - current;
          if (position > 1) position -= gallerySlides.length;
          if (position < -1) position += gallerySlides.length;
          return (
            <motion.button
              key={slide.label}
              type="button"
              aria-label={`${slide.label} ekranını göster`}
              data-testid={position === 0 ? "active-gallery-slide" : undefined}
              onClick={() => setCurrent(index)}
              className="absolute left-1/2 top-0 h-full w-[310px] -translate-x-1/2 cursor-pointer sm:w-[440px] lg:w-[535px]"
              animate={{ x: `${79 * position}%`, scale: position === 0 ? 1 : 0.78, opacity: position === 0 ? 1 : 0.44, zIndex: position === 0 ? 3 : 1 }}
              transition={{ type: "spring", stiffness: 230, damping: 29 }}
            >
              <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 640px) 310px, (max-width: 1024px) 440px, 535px" className="phone-shadow object-contain" />
            </motion.button>
          );
        })}
      </div>
      <div className="mt-7 flex items-center justify-center gap-5">
        <button type="button" onClick={() => setCurrent((value) => (value + gallerySlides.length - 1) % gallerySlides.length)} aria-label="Önceki ekran" className="grid h-11 w-11 place-items-center rounded-full border border-[#e6eaf2] text-ink transition-colors hover:border-brand hover:text-brand">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2.5" aria-label="Galeri sayfaları">
          {gallerySlides.map((slide, index) => (
            <button key={slide.label} type="button" aria-label={`${slide.label} ekranları`} aria-current={index === current} onClick={() => setCurrent(index)} className={`h-2.5 rounded-full transition-all ${index === current ? "w-7 bg-brand" : "w-2.5 bg-[#d8dde7]"}`} />
          ))}
        </div>
        <button type="button" onClick={() => setCurrent((value) => (value + 1) % gallerySlides.length)} aria-label="Sonraki ekran" className="grid h-11 w-11 place-items-center rounded-full border border-[#e6eaf2] text-ink transition-colors hover:border-brand hover:text-brand">
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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-brand-deep p-7 text-white sm:p-10">
      <h3 className="text-[26px] font-extrabold leading-tight tracking-[-0.04em]">Herhangi Bir Sorunuz Var mı?</h3>
      <p className="mt-4 text-[14px] leading-7 text-white/76">Sorunuzu bize yazın; ekibimiz en kısa sürede sizinle iletişime geçsin.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="name">Adınız</label>
        <input id="name" name="name" required placeholder="Adınız" className="h-[48px] rounded-md bg-white px-4 text-sm text-ink outline-none placeholder:text-[#9da3af] focus:ring-2 focus:ring-white/50" />
        <label className="sr-only" htmlFor="phone">Telefon</label>
        <input id="phone" name="phone" required placeholder="Telefon" className="h-[48px] rounded-md bg-white px-4 text-sm text-ink outline-none placeholder:text-[#9da3af] focus:ring-2 focus:ring-white/50" />
      </div>
      <label className="sr-only" htmlFor="email">E-posta</label>
      <input id="email" name="email" type="email" required placeholder="E-posta adresiniz" className="mt-3 h-[48px] w-full rounded-md bg-white px-4 text-sm text-ink outline-none placeholder:text-[#9da3af] focus:ring-2 focus:ring-white/50" />
      <label className="sr-only" htmlFor="message">Mesajınız</label>
      <textarea id="message" name="message" required placeholder="Mesajınız..." rows={5} className="mt-3 w-full resize-none rounded-md bg-white p-4 text-sm text-ink outline-none placeholder:text-[#9da3af] focus:ring-2 focus:ring-white/50" />
      <button type="submit" className="mx-auto mt-5 flex h-[48px] items-center justify-center gap-2 rounded-md bg-ink px-8 text-sm font-bold text-white transition-colors hover:bg-[#252a37]">
        Mesajınızı Gönderin <Send className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {submitted ? (
          <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} role="status" className="mt-4 text-center text-sm font-semibold text-white">
            Mesajınız alındı. Teşekkür ederiz.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
