import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgePercent,
  BellRing,
  BrainCircuit,
  Building2,
  Car,
  CheckCircle2,
  Clock3,
  CreditCard,
  Gauge,
  LineChart,
  MapPinned,
  Navigation,
  ParkingCircle,
  Route,
  Sparkles,
  Store,
  Target,
  TicketPercent,
  Users,
} from "lucide-react";
import {
  ContactForm,
  FaqAccordion,
  Header,
  Reveal,
  TiltImage,
} from "@/components/interactive";
import {
  DownloadSection,
  Footer,
  SectionHeading,
  StoreBadges,
} from "@/components/site-sections";

export const metadata: Metadata = {
  title: "Hakkımızda | ParketShop",
  description:
    "ParketShop, AVM ziyaretlerinde otopark, navigasyon, ödeme ve kampanyaları tek uygulamada birleştirir. Misyonumuzu, çözdüğümüz problemleri ve ana modüllerimizi keşfedin.",
};

const problems = [
  {
    icon: ParkingCircle,
    title: "Boş park yeri bulma zorluğu",
    text: "Yoğun gün ve saatlerde AVM otoparklarında boş yer arama süresi uzar, ziyaret deneyimi olumsuz etkilenir.",
  },
  {
    icon: Car,
    title: "Aracın yerini unutma",
    text: "Park edilen aracın konumu kaydedilmediğinde, alışveriş sonrası aracı bulmak ciddi bir zaman kaybına dönüşür.",
  },
  {
    icon: MapPinned,
    title: "Mağaza ve restoran bulma",
    text: "Büyük ve karmaşık AVM yapılarında aranan mağaza veya hizmet noktasına ulaşmak güçleşir.",
  },
  {
    icon: BadgePercent,
    title: "Dağınık kampanya kanalları",
    text: "İndirim ve kampanyalar farklı kanallara dağıldığından ziyaretçiye doğru zamanda ulaşamaz.",
  },
  {
    icon: Clock3,
    title: "Ödeme kuyrukları",
    text: "Mevcut otopark ücretlendirme süreci operasyonel yavaşlığa ve ödeme noktalarında uzun kuyruklara yol açar.",
  },
];

const capabilities = [
  {
    icon: Gauge,
    title: "Otopark yoğunluğu",
    text: "AVM’ye gitmeden önce otopark doluluğunu gösterir.",
  },
  {
    icon: ParkingCircle,
    title: "Boş yer bulma",
    text: "En kısa sürede aracınıza boş park yeri bulmanızı sağlar.",
  },
  {
    icon: Navigation,
    title: "Araca dönüş navigasyonu",
    text: "Araç konumunu kaydeder ve canlı navigasyonla geri dönmenizi sağlar.",
  },
  {
    icon: MapPinned,
    title: "Mağaza & restoran bulma",
    text: "AVM içinde istediğiniz noktaya en hızlı şekilde ulaşmanızı kolaylaştırır.",
  },
  {
    icon: BadgePercent,
    title: "Güncel kampanyalar",
    text: "Mağaza indirim ve promosyonlarını anında karşınıza getirir.",
  },
  {
    icon: TicketPercent,
    title: "Özel indirim kuponları",
    text: "Yalnızca mobil uygulama kullanıcılarına özel kuponlar sunar.",
  },
  {
    icon: CreditCard,
    title: "Uygulamadan ödeme",
    text: "Otopark ücretini kolaylıkla uygulama üzerinden ödemenizi sağlar.",
  },
];

const parkingModule = [
  "Otopark doluluk oranı ve boş yer bilgisi",
  "AVM’ye yol tarifi ve canlı navigasyon",
  "Boş park yerlerinin harita üzerinde gösterimi",
  "Yapay zeka destekli en ideal park yeri önerisi",
  "Park edilen aracın konumunu kaydetme",
  "Araca canlı navigasyon ile geri dönme",
  "Otopark süresi ve ücret bilgisini görüntüleme",
  "Uygulama üzerinden otopark ücreti ödeme",
];

const indoorModule = [
  "Mağaza, restoran ve hizmet noktalarının harita üzerinde gösterimi",
  "AVM içi canlı navigasyon",
  "Mağaza kampanyaları ve indirimleri görüntüleme",
  "Yapay zeka destekli kişiselleştirilmiş kampanya bildirimleri",
  "ParketShop kullanıcılarına özel indirim kuponları",
];

const audiences = [
  {
    icon: Users,
    title: "Ziyaretçiler için",
    text: "Daha hızlı, kolay ve avantajlı bir AVM deneyimi; park, navigasyon, ödeme ve fırsatlar tek uygulamada.",
  },
  {
    icon: LineChart,
    title: "AVM yönetimleri için",
    text: "Operasyonel verimlilik, ziyaretçi davranışı analizi ve ölçülebilir deneyim yönetimi.",
  },
  {
    icon: Store,
    title: "Mağaza ve restoranlar için",
    text: "Doğru hedef kitleye, doğru zamanda, ölçülebilir kampanya erişimi.",
  },
];

const reasons = [
  {
    icon: Sparkles,
    title: "Tek uygulamada her şey",
    text: "Otopark, navigasyon, ödeme ve kampanya deneyimini tek bir yerde toplar.",
  },
  {
    icon: BrainCircuit,
    title: "Yapay zeka destekli kişiselleştirme",
    text: "Kullanıcı davranışlarını öğrenerek en alakalı öneri ve bildirimleri sunar.",
  },
  {
    icon: Clock3,
    title: "Zaman tasarrufu",
    text: "Park yeri arama ve mağaza bulma sürelerini belirgin şekilde kısaltır.",
  },
  {
    icon: CheckCircle2,
    title: "Daha iyi memnuniyet",
    text: "Ziyaretçi deneyimini baştan sona iyileştirerek memnuniyeti artırır.",
  },
  {
    icon: Target,
    title: "Veri odaklı pazarlama",
    text: "AVM ve markalar için ölçülebilir, hedefli pazarlama imkânı sağlar.",
  },
  {
    icon: BellRing,
    title: "Operasyonel hız",
    text: "Ödeme ve yönlendirme süreçlerinde hız ve kolaylık getirir.",
  },
];

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof MapPinned;
  title: string;
  text: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-[#edf0f5] bg-white p-6 shadow-[0_18px_45px_rgba(20,24,36,0.06)]">
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#fcecee] text-brand">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-[16px] font-extrabold text-ink">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-6 text-muted">{text}</p>
    </div>
  );
}

function ModuleList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[14px] font-medium text-[#4f5561]">
          <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-hero pb-[72px] pt-[150px] sm:pb-[92px] sm:pt-[172px] lg:pb-[108px]">
          <div className="page-container grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
            <Reveal className="max-w-[640px]">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Hakkımızda
              </p>
              <h1 className="text-[40px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[54px] lg:text-[60px]">
                AVM deneyimini tek uygulamada{" "}
                <span className="text-brand">akıllı hale getiriyoruz</span>
              </h1>
              <p className="body-copy mt-6 max-w-[560px] text-[16px] sm:text-[17px]">
                ParketShop, alışveriş merkezlerinde teknolojiyi kullanarak ziyaretçilere
                hizmet sunan bir mobil uygulamadır. Otoparkta yer bulmaktan araç konumunu
                kaydetmeye, AVM içinde mağaza bulmaktan kişiselleştirilmiş kampanyalara kadar
                tüm süreçleri tek bir deneyimde birleştirir.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a className="primary-button gap-2" href="#nedir">
                  ParketShop’u keşfedin <ArrowRight className="h-4 w-4" />
                </a>
                <StoreBadges small />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative flex justify-center">
              <TiltImage
                src="/assets/find-stop-app.png"
                width={1592}
                height={1800}
                alt="ParketShop otopark, ana sayfa ve harita uygulama ekranları"
                priority
                sizes="(max-width: 1024px) 80vw, 520px"
                className="phone-shadow h-auto w-full max-w-[520px]"
              />
            </Reveal>
          </div>
        </section>

        {/* 2. ParketShop Nedir? */}
        <section id="nedir" className="scroll-mt-24 py-[84px] sm:py-[108px]">
          <div className="page-container grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                ParketShop Nedir?
              </p>
              <h2 className="section-title mt-4 max-w-[520px]">
                AVM ziyaretlerini herkes için daha verimli kılan bir ekosistem
              </h2>
              <p className="body-copy mt-6 max-w-[560px]">
                ParketShop, günümüz alışveriş merkezlerinin karşılaştığı operasyonel
                verimsizlikleri ve ziyaretçi deneyimindeki memnuniyetsizlikleri teknoloji
                odaklı bir yaklaşımla çözmeyi hedefler. AVM ziyaretçileri için park yeri bulma,
                araç konumu kaydetme, mağaza bulma ve kampanyalardan yararlanma süreçlerini tek
                uygulamada birleştirir.
              </p>
              <p className="body-copy mt-4 max-w-[560px]">
                Aynı zamanda AVM yönetimleri ve kiracı markalar için veri analizi ve ölçülebilir
                pazarlama imkânları sunarak; ziyaretçi, yönetim ve marka tarafında değer üretir.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <div className="benefit-chip">
                  <Users className="h-5 w-5" />
                  <span>Ziyaretçiler</span>
                </div>
                <div className="benefit-chip">
                  <Building2 className="h-5 w-5" />
                  <span>AVM yönetimleri</span>
                </div>
                <div className="benefit-chip">
                  <Store className="h-5 w-5" />
                  <span>Kiracı markalar</span>
                </div>
                <div className="benefit-chip">
                  <Sparkles className="h-5 w-5" />
                  <span>Tek uygulama deneyimi</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative flex justify-center">
              <TiltImage
                src="/assets/mall-screens.png"
                width={1600}
                height={1658}
                alt="ParketShop AVM içi kampanyalar, mağazalar ve ürün ekranları"
                sizes="(max-width: 1024px) 80vw, 540px"
                className="phone-shadow h-auto w-full max-w-[540px]"
              />
            </Reveal>
          </div>
        </section>

        {/* 3. Çözdüğümüz Problem */}
        <section className="bg-mist py-[84px] sm:py-[108px]">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                eyebrow="Çözdüğümüz Problem"
                title="AVM ziyaretlerini zorlaştıran sorunları ortadan kaldırıyoruz"
                description="Bu sorunlar hem ziyaretçi memnuniyetini hem de AVM’lerin operasyonel verimliliğini olumsuz etkiler. ParketShop bu ihtiyaçları gidermek için tasarlandı."
              />
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((problem, index) => (
                <Reveal key={problem.title} delay={index * 0.05}>
                  <ValueCard {...problem} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Misyon & Vizyon */}
        <section className="py-[84px] sm:py-[108px]">
          <div className="page-container grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <div className="flex h-full flex-col rounded-[28px] border border-[#edf0f5] bg-white p-8 shadow-[0_18px_45px_rgba(20,24,36,0.06)] sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#fcecee] text-brand">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-[26px] font-extrabold tracking-[-0.03em] text-ink">
                  Misyonumuz
                </h2>
                <p className="body-copy mt-4">
                  AVM ziyaretlerinde zaman kaybını azaltmak, ziyaretçi deneyimini iyileştirmek ve
                  alışveriş süreçlerini tek uygulama üzerinden kolaylaştırmak.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[28px] bg-brand-deep p-8 text-white shadow-[0_22px_45px_rgba(201,31,37,0.2)] sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-white">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-[26px] font-extrabold tracking-[-0.03em]">
                  Vizyonumuz
                </h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-white/85">
                  AVM’ler, markalar ve ziyaretçiler için daha akıllı, ölçülebilir ve
                  kişiselleştirilmiş bir alışveriş ekosistemi oluşturmak.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. ParketShop Ne Yapar? */}
        <section className="bg-mist py-[84px] sm:py-[108px]">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                eyebrow="ParketShop Ne Yapar?"
                title="AVM ziyaretlerinizde zaman kazandırır, avantaj sağlar"
                description="Anlaşmalı mağaza ve restoranlarda maddi avantaj elde etmenizi sağlarken, ziyaretinizin her adımını kolaylaştırır."
              />
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <Reveal key={capability.title} delay={index * 0.04}>
                  <ValueCard {...capability} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Ana Modüller */}
        <section className="py-[84px] sm:py-[108px]">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                eyebrow="Ana Modüller"
                title="İki güçlü modül, kesintisiz bir AVM deneyimi"
              />
            </Reveal>

            {/* AVM Otoparkı Modülü */}
            <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <Reveal>
                <p className="eyebrow">
                  <span aria-hidden="true" />
                  AVM Otoparkı Modülü
                </p>
                <h3 className="section-title mt-4 max-w-[500px] !text-[1.7rem]">
                  Boş park yeri ve aracını bulmak için ihtiyacın olan tek modül
                </h3>
                <p className="body-copy mt-5 max-w-[540px]">
                  Otopark doluluğundan ödemeye kadar tüm park sürecini uçtan uca yönetir;
                  yapay zeka desteğiyle en ideal yere yönlendirir.
                </p>
                <div className="mt-8">
                  <ModuleList items={parkingModule} />
                </div>
              </Reveal>
              <Reveal delay={0.1} className="relative flex justify-center">
                <TiltImage
                  src="/assets/parking-screens.png"
                  width={1000}
                  height={1046}
                  alt="ParketShop park alanı seçimi ve araç detay ekranları"
                  sizes="(max-width: 1024px) 80vw, 520px"
                  className="h-auto w-full max-w-[520px]"
                />
              </Reveal>
            </div>

            {/* AVM İçi Modülü */}
            <div className="mt-20 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <Reveal className="order-2 lg:order-1 relative flex justify-center">
                <TiltImage
                  src="/assets/mall-screens.png"
                  width={1600}
                  height={1658}
                  alt="ParketShop AVM içi kampanyalar, mağazalar ve ürün ekranları"
                  sizes="(max-width: 1024px) 80vw, 540px"
                  className="phone-shadow h-auto w-full max-w-[540px]"
                />
              </Reveal>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <p className="eyebrow">
                  <span aria-hidden="true" />
                  AVM İçi Modülü
                </p>
                <h3 className="section-title mt-4 max-w-[500px] !text-[1.7rem]">
                  İhtiyaç duyduğunuz tüm bilgiler tek bir uygulamada
                </h3>
                <p className="body-copy mt-5 max-w-[540px]">
                  Mağaza ve restoranlara canlı navigasyonla ulaşın, kampanyaları keşfedin ve size
                  özel kuponlardan yararlanın.
                </p>
                <div className="mt-8">
                  <ModuleList items={indoorModule} />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 7. Kimler İçin Değer Üretiyoruz? */}
        <section className="bg-mist py-[84px] sm:py-[108px]">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                eyebrow="Kimler İçin Değer Üretiyoruz?"
                title="Ziyaretçi, AVM ve markalar için ölçülebilir fayda"
              />
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {audiences.map((audience, index) => (
                <Reveal key={audience.title} delay={index * 0.06}>
                  <ValueCard {...audience} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Neden ParketShop? */}
        <section className="py-[84px] sm:py-[108px]">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                eyebrow="Neden ParketShop?"
                title="Tek uygulamada hız, kolaylık ve kişiselleştirme"
              />
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 0.04}>
                  <ValueCard {...reason} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9. SSS + 10. İletişim Formu */}
        <section className="scroll-mt-20 bg-mist py-[84px] sm:py-[108px]">
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

        {/* 11. App Download Section */}
        <DownloadSection />
      </main>

      <Footer />
    </>
  );
}
