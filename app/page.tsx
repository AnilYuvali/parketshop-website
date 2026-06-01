import Image from "next/image";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  MapPinned,
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
  VideoModalButton,
} from "@/components/interactive";
import { DownloadSection, Footer, SectionHeading } from "@/components/site-sections";

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
                        src="/assets/hero-reference/app-store-button.webp"
                        width={2500}
                        height={814}
                        alt="App Store"
                      />
                    </a>
                    <a href="#indir" aria-label="Play Store" title="Play Store">
                      <Image
                        src="/assets/hero-reference/google-play-button.webp"
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
                <VideoModalButton />
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
              <a className="primary-button mt-10 gap-2" href="/avm-ici">
                Keşfet <ArrowRight className="h-4 w-4" />
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

      <Footer />
    </>
  );
}
