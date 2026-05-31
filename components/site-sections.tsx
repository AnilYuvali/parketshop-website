import Image from "next/image";
import { Reveal } from "@/components/interactive";

export function StoreBadges({ small = false }: { small?: boolean }) {
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

export function SectionHeading({
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

export function DownloadSection() {
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

export function Footer() {
  return (
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
            <a className="block hover:text-brand" href="/#hero">Ana Sayfa</a>
            <a className="block hover:text-brand" href="/#hakkinda">Hakkında</a>
            <a className="block hover:text-brand" href="/#fiyat">Fiyat</a>
          </div>
        </div>
        <div>
          <p className="text-[14px] font-extrabold">Özellikler</p>
          <div className="mt-5 space-y-3 text-[13px] text-muted">
            <a className="block hover:text-brand" href="/#otopark">Otopark</a>
            <a className="block hover:text-brand" href="/#ekranlar">Navigasyon</a>
            <a className="block hover:text-brand" href="/#avm-ici">Kampanyalar</a>
          </div>
        </div>
        <div>
          <p className="text-[14px] font-extrabold">Keşfedin</p>
          <div className="mt-5 space-y-3 text-[13px] text-muted">
            <a className="block hover:text-brand" href="/#hakkinda">Hakkımızda</a>
            <a className="block hover:text-brand" href="/#iletisim">SSS</a>
            <a className="block hover:text-brand" href="/iletisim">İletişim</a>
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
  );
}
