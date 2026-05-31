import Image from "next/image";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  MapPinned,
  Play,
} from "lucide-react";
import {
  ContactForm,
  FaqAccordion,
  Header,
  HeroPhoneCarousel,
  PricingCards,
  Reveal,
  ScreenshotCarousel,
  TiltImage,
} from "@/components/interactive";

function StoreBadges({ small = false }: { small?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href="#indir"
        aria-label="App Store'dan indirin"
        className={`flex items-center rounded-md bg-black px-3 text-white transition-transform hover:-translate-y-px ${
          small ? "h-[39px] min-w-[120px]" : "h-[46px] min-w-[143px]"
        }`}
      >
        <svg className={small ? "h-6 w-6" : "h-7 w-7"} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.55 12.09c-.02-2.28 1.87-3.39 1.96-3.44-1.06-1.55-2.7-1.76-3.28-1.78-1.38-.15-2.73.83-3.44.83-.72 0-1.8-.81-2.96-.79-1.49.02-2.89.89-3.66 2.25-1.58 2.74-.4 6.77 1.12 8.98.76 1.08 1.64 2.29 2.8 2.25 1.13-.05 1.55-.72 2.91-.72 1.35 0 1.73.72 2.91.69 1.21-.02 1.97-1.09 2.7-2.18.87-1.24 1.22-2.44 1.23-2.5-.03-.01-2.27-.87-2.29-3.59ZM14.33 5.4c.61-.76 1.02-1.79.91-2.84-.89.04-2 .62-2.64 1.37-.57.66-1.07 1.73-.94 2.74 1 .08 2.03-.51 2.67-1.27Z" />
        </svg>
        <span className="ml-2 text-left leading-none">
          <span className="block text-[8px] font-medium">App Store’dan</span>
          <span className={`mt-0.5 block font-semibold ${small ? "text-[14px]" : "text-[16px]"}`}>
            İndirin
          </span>
        </span>
      </a>
      <a
        href="#indir"
        aria-label="Google Play'den indirin"
        className={`flex items-center rounded-md bg-black px-3 text-white transition-transform hover:-translate-y-px ${
          small ? "h-[39px] min-w-[120px]" : "h-[46px] min-w-[143px]"
        }`}
      >
        <svg className={small ? "h-6 w-6" : "h-7 w-7"} viewBox="0 0 24 24">
          <path fill="#00D7FE" d="M3.4 2.4 13.8 12 3.4 21.6c-.29-.39-.45-.86-.45-1.42V3.82c0-.56.16-1.03.45-1.42Z" />
          <path fill="#FFCE00" d="m17.25 8.8-3.45 3.2 3.45 3.2 3.8-2.13c1.1-.62 1.1-1.45 0-2.07l-3.8-2.2Z" />
          <path fill="#00F076" d="M3.4 2.4c.41-.53 1.07-.65 1.83-.22L17.25 8.8 13.8 12 3.4 2.4Z" />
          <path fill="#F53347" d="M3.4 21.6 13.8 12l3.45 3.2-12.02 6.62c-.76.43-1.42.31-1.83-.22Z" />
        </svg>
        <span className="ml-2 text-left leading-none">
          <span className="block text-[8px] font-medium">Google Play’den</span>
          <span className={`mt-0.5 block font-semibold ${small ? "text-[14px]" : "text-[16px]"}`}>
            İndirin
          </span>
        </span>
      </a>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[680px] text-center ${className}`}>
      <p className="eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="section-title mt-4">{title}</h2>
      {description ? <p className="body-copy mt-5">{description}</p> : null}
    </div>
  );
}

const aboutBenefits = [
  "Boş park yerlerini gerçek zamanlı görün",
  "Araç konumunuzu kaydedin ve kolaylıkla bulun",
  "Mağaza ile restoran kampanyalarını anında keşfedin",
  "Navigasyonla gitmek istediğiniz noktaya hızla ulaşın",
];

const parkingFeatures = [
  {
    number: "01",
    title: "Canlı Navigasyon",
    text: "Boş araç park yerlerinin gösterilmesi ve araç sahibinin boş park yerine navigasyon ile yönlendirilmesi",
    side: "left",
  },
  {
    number: "02",
    title: "Yer Kayıt Sistemi",
    text: "Park edilen aracın yerinin kaydedilip kolaylıkla bulunabilmesi",
    side: "left",
  },
  {
    number: "03",
    title: "Park Ücreti Görüntüleme",
    text: "Park ücretini takip eder, anlık olarak ücreti gösterir ve bildirim gönderir",
    side: "right",
  },
  {
    number: "04",
    title: "Park Ücreti Ödeme",
    text: "Uygulama içinden kolaylıkla park ücretini öde",
    side: "right",
  },
];

function ParkingFeature({
  number,
  title,
  text,
  className = "",
}: {
  number: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`parking-feature-card ${className}`}>
      <div className="parking-feature-card-top">
        <span className="parking-feature-number">{number}</span>
        <h3>{title}</h3>
      </div>
      <p className="parking-feature-copy">{text}</p>
    </div>
  );
}

function DownloadSection() {
  return (
    <section
      id="indir"
      className="scroll-mt-20 bg-white px-4 py-[72px] sm:px-6 sm:py-[96px] lg:px-0 lg:pb-[clamp(60px,5.3vw,108px)] lg:pt-[clamp(90px,7.4vw,151px)]"
    >
      <Reveal className="relative mx-auto flex min-h-[720px] max-w-[1680px] flex-col overflow-hidden rounded-[24px] bg-[#cd1d24] px-7 pt-12 sm:min-h-[900px] sm:px-12 sm:pt-16 lg:h-[clamp(460px,37.75vw,770px)] lg:w-[82.35vw] lg:min-h-0 lg:justify-center lg:overflow-visible lg:px-[clamp(48px,4.3vw,90px)] lg:py-0">
        <div className="relative z-10 max-w-[670px] lg:w-[53%] xl:w-[52%]">
          <h2 className="text-[38px] font-extrabold leading-[1.18] tracking-[-0.035em] text-white sm:text-[48px] lg:text-[clamp(38px,2.75vw,56px)]">
            <span className="block">ParketShop</span>
            <span className="block">Uygulamasını Hemen</span>
            <span className="block">İndirin</span>
          </h2>
          <p className="mt-10 max-w-[660px] text-[17px] font-medium leading-[1.43] tracking-[-0.018em] text-white sm:text-[20px] lg:mt-[clamp(34px,2.75vw,56px)] lg:max-w-[680px] lg:text-[clamp(16px,1.18vw,24px)]">
            Dünyanın en gelişmiş AVM yer bulma ve hizmetler
            <br className="hidden xl:block" /> uygulaması ParketShop çok yakında sizlerle.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 lg:mt-[clamp(30px,2.35vw,48px)] lg:gap-[clamp(16px,1.2vw,24px)]">
            <a
              href="#indir"
              aria-label="App Store'dan indirin"
              className="flex h-[66px] min-w-[202px] items-center gap-3 rounded-[12px] border border-white/45 bg-black px-[18px] text-white transition-transform hover:-translate-y-px lg:h-[clamp(44px,3.55vw,72px)] lg:min-w-0 lg:w-[clamp(132px,11.05vw,225px)] lg:gap-[clamp(8px,0.7vw,14px)] lg:px-[clamp(10px,0.88vw,18px)]"
            >
              <svg className="h-[35px] w-[35px] shrink-0 lg:h-[clamp(24px,1.8vw,37px)] lg:w-[clamp(24px,1.8vw,37px)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.55 12.09c-.02-2.28 1.87-3.39 1.96-3.44-1.06-1.55-2.7-1.76-3.28-1.78-1.38-.15-2.73.83-3.44.83-.72 0-1.8-.81-2.96-.79-1.49.02-2.89.89-3.66 2.25-1.58 2.74-.4 6.77 1.12 8.98.76 1.08 1.64 2.29 2.8 2.25 1.13-.05 1.55-.72 2.91-.72 1.35 0 1.73.72 2.91.69 1.21-.02 1.97-1.09 2.7-2.18.87-1.24 1.22-2.44 1.23-2.5-.03-.01-2.27-.87-2.29-3.59ZM14.33 5.4c.61-.76 1.02-1.79.91-2.84-.89.04-2 .62-2.64 1.37-.57.66-1.07 1.73-.94 2.74 1 .08 2.03-.51 2.67-1.27Z" />
              </svg>
              <span className="text-left leading-none">
                <span className="block text-[11px] font-semibold lg:text-[clamp(8px,0.62vw,13px)]">Hemen İndirin</span>
                <span className="mt-1 block text-[21px] font-semibold tracking-[-0.03em] lg:text-[clamp(15px,1.28vw,26px)]">
                  App Store
                </span>
              </span>
            </a>
            <a
              href="#indir"
              aria-label="Google Play'den indirin"
              className="flex h-[66px] min-w-[202px] items-center gap-3 rounded-[12px] border border-white/45 bg-black px-[18px] text-white transition-transform hover:-translate-y-px lg:h-[clamp(44px,3.55vw,72px)] lg:min-w-0 lg:w-[clamp(132px,11.05vw,225px)] lg:gap-[clamp(8px,0.7vw,14px)] lg:px-[clamp(10px,0.88vw,18px)]"
            >
              <svg className="h-[35px] w-[35px] shrink-0 lg:h-[clamp(24px,1.8vw,37px)] lg:w-[clamp(24px,1.8vw,37px)]" viewBox="0 0 24 24">
                <path fill="#00D7FE" d="M3.4 2.4 13.8 12 3.4 21.6c-.29-.39-.45-.86-.45-1.42V3.82c0-.56.16-1.03.45-1.42Z" />
                <path fill="#FFCE00" d="m17.25 8.8-3.45 3.2 3.45 3.2 3.8-2.13c1.1-.62 1.1-1.45 0-2.07l-3.8-2.2Z" />
                <path fill="#00F076" d="M3.4 2.4c.41-.53 1.07-.65 1.83-.22L17.25 8.8 13.8 12 3.4 2.4Z" />
                <path fill="#F53347" d="M3.4 21.6 13.8 12l3.45 3.2-12.02 6.62c-.76.43-1.42.31-1.83-.22Z" />
              </svg>
              <span className="text-left leading-none">
                <span className="block text-[11px] font-semibold lg:text-[clamp(8px,0.62vw,13px)]">Hemen İndirin</span>
                <span className="mt-1 block whitespace-nowrap text-[21px] font-semibold tracking-[-0.03em] lg:text-[clamp(15px,1.28vw,26px)]">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="relative mt-12 flex flex-1 items-end justify-center sm:mt-14 lg:absolute lg:bottom-0 lg:right-[clamp(48px,4.25vw,88px)] lg:mt-0 lg:w-[36.2vw] lg:max-w-[738px] lg:flex-none">
          <Image
            src="/assets/download-app.png"
            width={2000}
            height={2463}
            alt="ParketShop uygulamasının iki telefon ekranı"
            sizes="(max-width: 1023px) 92vw, (max-width: 1535px) 46vw, 800px"
            className="h-auto w-full max-w-[800px] object-contain"
          />
        </div>
      </Reveal>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section
          id="hero"
          className="hero-reference"
        >
          <div className="hero-reference-container">
            <div className="hero-reference-row">
              <div className="hero-reference-col">
                <Reveal className="hero-reference-content">
                  <div className="hero-reference-eyebrow">
                    <span aria-hidden="true" />
                    AVM Deneyimi · Yeniden Tasarlandı
                  </div>
                  <h1>
                    <span>AVM&apos;lere</span>
                    <span className="hero-reference-title-highlight">Yeni Bir Soluk</span>
                    <span>Geliyor!</span>
                  </h1>
                  <p>
                    AVM’ler ile entegre en gelişmiş yer bulma ve hizmetler
                    uygulaması ParketShop yakında sizlerle...
                  </p>
                  <div className="hero-reference-buttons">
                    <a href="#indir" aria-label="App Store" title="App Store">
                      <Image
                        src="/assets/hero-reference/app-store-button.png"
                        width={2500}
                        height={814}
                        alt="App Store"
                      />
                    </a>
                    <a href="#indir" aria-label="Play Store" title="Play Store">
                      <Image
                        src="/assets/hero-reference/google-play-button.png"
                        width={2500}
                        height={814}
                        alt="Google Play"
                      />
                    </a>
                  </div>
                  <div className="hero-reference-clients-spacer" />
                </Reveal>
              </div>
              <div className="hero-reference-col">
                <Reveal delay={0.1}>
                  <HeroPhoneCarousel />
                </Reveal>
              </div>
            </div>
          </div>
          <div className="hero-reference-shapes" aria-hidden="true">
            <Image className="shape-1" src="/assets/hero-reference/shape-1.png" alt="" width={64} height={45} />
            <Image className="shape-2" src="/assets/hero-reference/shape-2.png" alt="" width={31} height={30} />
            <Image className="shape-3" src="/assets/hero-reference/shape-3.png" alt="" width={79} height={29} />
            <Image className="shape-4" src="/assets/hero-reference/shape-4.png" alt="" width={42} height={46} />
            <Image className="shape-5" src="/assets/hero-reference/shape-5.png" alt="" width={58} height={55} />
            <Image className="shape-6" src="/assets/hero-reference/shape-6.png" alt="" width={81} height={34} />
            <Image className="shape-7" src="/assets/hero-reference/shape-7.png" alt="" width={27} height={26} />
          </div>
        </section>

        <section id="hakkinda" className="scroll-mt-20 py-[84px] sm:py-[108px] lg:py-[122px]">
          <div className="page-container grid items-center gap-14 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Neden ParketShop
              </p>
              <h2 className="section-title mt-4 max-w-[500px]">
                AVM’ler İçin Yapılmış En Gelişmiş Yer Bulma &amp; Hizmetler Uygulaması
              </h2>
              <div className="relative my-8 flex justify-center lg:hidden">
                <Image
                  src="/assets/find-stop-app.png"
                  width={1592}
                  height={1800}
                  alt="ParketShop otopark, ana sayfa ve harita uygulama ekranları"
                  priority
                  sizes="(max-width: 1024px) 90vw, 570px"
                  className="phone-shadow h-auto w-full max-w-[420px]"
                />
              </div>
              <p className="body-copy mt-6 max-w-[500px]">
                AVM ziyaretinizde zaman kazanın; park yeri, yönlendirme, mağaza
                ve kampanya bilgilerine tek uygulama üzerinden erişin.
              </p>
              <ul className="mt-8 space-y-4">
                {aboutBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-[14px] font-medium text-[#4f5561]">
                    <CheckCircle2 className="h-[18px] w-[18px] shrink-0 text-brand" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-7">
                <a href="#ekranlar" className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#f0d1d4] text-brand">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </span>
                  Tanıtım videosu
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative hidden justify-center lg:flex">
              <TiltImage
                src="/assets/find-stop-app.png"
                width={1592}
                height={1800}
                alt="ParketShop otopark, ana sayfa ve harita uygulama ekranları"
                priority
                sizes="(max-width: 1024px) 90vw, 570px"
                className="phone-shadow h-auto w-full max-w-[585px]"
              />
            </Reveal>
          </div>
        </section>

        <section id="otopark" className="scroll-mt-20 bg-white">
          <div className="parking-feature-area">
            <div className="parking-feature-container">
              <Reveal className="parking-feature-title">
                <p className="parking-feature-eyebrow">
                  <span aria-hidden="true" />
                  AVM Otopark
                </p>
                <h2>
                  Boş Park Yeri ve Aracını Bulmak İçin İhtiyacın Olan Tek
                  Uygulama
                </h2>
              </Reveal>

              <div className="parking-feature-grid">
                <Reveal className="parking-feature-side">
                  <ParkingFeature {...parkingFeatures[0]} />
                  <ParkingFeature {...parkingFeatures[1]} />
                </Reveal>

                <Reveal delay={0.06} className="parking-feature-visual">
                  <TiltImage
                    src="/assets/parking-screens.png"
                    width={1000}
                    height={1046}
                    alt="ParketShop park alanı seçimi ve araç detay ekranları"
                    sizes="(max-width: 575px) 92vw, (max-width: 991px) 620px, 560px"
                    className="h-auto w-full"
                  />
                </Reveal>

                <Reveal delay={0.1} className="parking-feature-side">
                  <ParkingFeature {...parkingFeatures[2]} />
                  <ParkingFeature {...parkingFeatures[3]} />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="avm-ici" className="py-[86px] sm:py-[112px] lg:py-[126px]">
          <div className="page-container grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <Reveal className="relative hidden justify-center lg:flex">
              <TiltImage
                src="/assets/mall-screens.png"
                width={1600}
                height={1658}
                alt="ParketShop AVM içi kampanyalar, mağazalar ve ürün ekranları"
                sizes="(max-width: 1024px) 92vw, 605px"
                className="phone-shadow h-auto w-full max-w-[610px]"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="eyebrow">
                <span aria-hidden="true" />
                AVM İçi
              </p>
              <h2 className="section-title mt-4">
                İhtiyaç Duyduğunuz Tüm Bilgiler Tek Bir Uygulamada
              </h2>
              <div className="relative my-8 flex justify-center lg:hidden">
                <Image
                  src="/assets/mall-screens.png"
                  width={1600}
                  height={1658}
                  alt="ParketShop AVM içi kampanyalar, mağazalar ve ürün ekranları"
                  sizes="(max-width: 1024px) 92vw, 605px"
                  className="phone-shadow h-auto w-full max-w-[420px]"
                />
              </div>
              <p className="body-copy mt-6">
                Favori mağazanıza ulaşın, indirimleri keşfedin ve size özel
                fırsatları alışveriş sırasında anında değerlendirin.
              </p>
              <div className="mt-9 space-y-6">
                <div className="flex gap-4">
                  <span className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-lg bg-[#fcecee] text-brand">
                    <MapPinned className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-extrabold">Canlı Mağaza Navigasyonu</h3>
                    <p className="mt-1.5 text-[13px] leading-6 text-muted">
                      Gitmek istediğiniz mağazayı seçin, en hızlı rotayı bulun.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="grid h-[48px] w-[48px] shrink-0 place-items-center rounded-lg bg-[#fcecee] text-brand">
                    <BadgePercent className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-extrabold">Tüm Kampanyalar Elinizin Altında</h3>
                    <p className="mt-1.5 text-[13px] leading-6 text-muted">
                      İlginizi çeken indirimlerden ve özel kuponlardan haberdar olun.
                    </p>
                  </div>
                </div>
              </div>
              <a className="primary-button mt-10 gap-2" href="#indir">
                Hemen indir <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </section>

        <section id="ekranlar" className="overflow-hidden scroll-mt-20">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                eyebrow="Ekran Görüntüleri"
                title="Uygulamamızın Arayüzünü İnceleyin"
              />
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <ScreenshotCarousel />
          </Reveal>
        </section>

        <section id="fiyat" className="py-[86px] scroll-mt-20 sm:py-[112px]">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                eyebrow="Üyelik Paketleri"
                title="Üyelik Paketlerimizi İnceleyin"
                description="İhtiyacınıza uygun paketle AVM ziyaretlerinizi daha hızlı ve avantajlı hale getirin."
              />
              <PricingCards />
            </Reveal>
          </div>
        </section>

        <section id="iletisim" className="scroll-mt-20">
          <div className="page-container">
            <Reveal>
              <SectionHeading eyebrow="SSS" title="Sıkça Sorulan Sorular" />
            </Reveal>
            <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
              <Reveal>
                <FaqAccordion />
              </Reveal>
              <Reveal delay={0.08}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>

        <DownloadSection />
      </main>

      <footer className="border-t border-[#f0ede7] bg-[#fcfbf8]">
        <div className="page-container grid gap-11 py-[62px] sm:grid-cols-2 lg:grid-cols-[1.55fr_0.8fr_0.9fr_0.9fr_1fr]">
          <div className="max-w-[270px]">
            <Image
              src="/assets/parketshop-logo.svg"
              alt="ParketShop"
              width={157}
              height={30}
              className="h-auto w-[150px]"
            />
            <p className="mt-6 text-[13px] leading-6 text-muted">
              AVM ziyaretlerinizde park, navigasyon ve fırsatları tek bir mobil
              deneyimde buluşturur.
            </p>
          </div>
          <div>
            <p className="text-[14px] font-extrabold">Yararlı Linkler</p>
            <div className="mt-5 space-y-3 text-[13px] text-muted">
              <a className="block hover:text-brand" href="#hero">Ana Sayfa</a>
              <a className="block hover:text-brand" href="#hakkinda">Hakkında</a>
              <a className="block hover:text-brand" href="#fiyat">Fiyat</a>
            </div>
          </div>
          <div>
            <p className="text-[14px] font-extrabold">Özellikler</p>
            <div className="mt-5 space-y-3 text-[13px] text-muted">
              <a className="block hover:text-brand" href="#otopark">Otopark</a>
              <a className="block hover:text-brand" href="#ekranlar">Navigasyon</a>
              <a className="block hover:text-brand" href="#iletisim">Kampanyalar</a>
            </div>
          </div>
          <div>
            <p className="text-[14px] font-extrabold">Keşfedin</p>
            <div className="mt-5 space-y-3 text-[13px] text-muted">
              <a className="block hover:text-brand" href="#hakkinda">Hakkımızda</a>
              <a className="block hover:text-brand" href="#iletisim">SSS</a>
              <a className="block hover:text-brand" href="#iletisim">İletişim</a>
            </div>
          </div>
          <div>
            <p className="text-[14px] font-extrabold">Uygulamayı İndir</p>
            <div className="mt-5">
              <StoreBadges small />
            </div>
          </div>
        </div>
        <div className="page-container flex flex-col items-center justify-between gap-4 border-t border-dashed border-[#e9e3db] py-7 text-[12px] text-muted sm:flex-row">
          <p>© Copyright 2026 ParketShop. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-brand">Gizlilik Politikası</a>
            <a href="#" className="hover:text-brand">Kullanım Koşulları</a>
          </div>
        </div>
      </footer>
    </>
  );
}
