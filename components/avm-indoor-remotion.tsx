"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ComponentType,
  type ReactNode,
} from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type RemotionLoopProps = {
  component: ComponentType;
  durationInFrames: number;
  width: number;
  height: number;
  className?: string;
  ariaLabel: string;
};

const RED = "#ed0033";
const BLUE = "#147df5";
const INK = "#111827";
const MUTED = "#667085";
const EASE = Easing.bezier(0.16, 1, 0.3, 1);

function clampInterpolate(
  frame: number,
  input: [number, number],
  output: [number, number],
) {
  return interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
}

function loopingProgress(frame: number, duration: number) {
  return (frame % duration) / duration;
}

function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: 28,
        background: "rgba(255,255,255,0.92)",
        boxShadow: "0 24px 60px rgba(15,24,42,0.18)",
        border: "1px solid rgba(255,255,255,0.7)",
        backdropFilter: "blur(14px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PhoneShell({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: 196,
        height: 420,
        borderRadius: 36,
        background: "#0b1020",
        padding: 8,
        boxShadow: "0 34px 70px rgba(7,17,31,0.34)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 14,
          left: "50%",
          width: 70,
          height: 16,
          transform: "translateX(-50%)",
          borderRadius: 999,
          background: "#080b13",
          zIndex: 4,
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 30,
          background: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ProgressPill({
  label,
  active,
  style,
}: {
  label: string;
  active: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 42,
        padding: "0 14px",
        borderRadius: 999,
        background: active > 0.5 ? RED : "rgba(255,255,255,0.88)",
        color: active > 0.5 ? "#fff" : INK,
        fontSize: 18,
        fontWeight: 800,
        boxShadow: "0 14px 34px rgba(15,24,42,0.16)",
        ...style,
      }}
    >
      <span
        style={{
          width: 9,
          height: 9,
          borderRadius: 999,
          background: active > 0.5 ? "#fff" : RED,
        }}
      />
      {label}
    </div>
  );
}

export function RemotionLoop({
  component,
  durationInFrames,
  width,
  height,
  className,
  ariaLabel,
}: RemotionLoopProps) {
  const reduceMotion = useReducedMotion();
  const playerRef = useRef<PlayerRef>(null);

  const play = useCallback(() => {
    const player = playerRef.current;

    if (!player || reduceMotion) {
      return;
    }

    if (!player.isPlaying()) {
      player.play();
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      playerRef.current?.pause();
      return;
    }

    const player = playerRef.current;
    play();

    const restartIfPaused = () => {
      window.setTimeout(play, 0);
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") {
        play();
      }
    };

    player?.addEventListener("pause", restartIfPaused);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("focus", play);

    const retry = window.setInterval(play, 1200);

    return () => {
      player?.removeEventListener("pause", restartIfPaused);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("focus", play);
      window.clearInterval(retry);
    };
  }, [play, reduceMotion]);

  return (
    <div className={className} aria-label={ariaLabel}>
      <Player
        ref={playerRef}
        component={component}
        durationInFrames={durationInFrames}
        compositionWidth={width}
        compositionHeight={height}
        fps={30}
        loop
        autoPlay={!reduceMotion}
        initiallyMuted
        controls={false}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        acknowledgeRemotionLicense
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          borderRadius: "inherit",
          overflow: "hidden",
        }}
      />
    </div>
  );
}

export function HeroExperienceVideo() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = loopingProgress(frame, durationInFrames);
  const phoneX = interpolate(progress, [0, 0.3, 0.64, 1], [0, 18, -8, 0]);
  const phoneRotate = interpolate(progress, [0, 0.5, 1], [-2, 3, -2]);
  const routeDraw = clampInterpolate(frame, [18, 76], [700, 0]);

  return (
    <AbsoluteFill style={{ background: "#f6f9fd", overflow: "hidden" }}>
      <Img
        src={staticFile("assets/avm-indoor/hero-mall-navigation.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(246,249,253,0.82), rgba(246,249,253,0.2) 52%, rgba(246,249,253,0.08))",
        }}
      />
      <svg
        viewBox="0 0 900 560"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d="M124 420 C214 330 292 368 360 282 C420 206 498 244 600 154"
          fill="none"
          stroke={BLUE}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="700"
          strokeDashoffset={routeDraw}
          style={{ filter: "drop-shadow(0 0 18px rgba(20,125,245,0.72))" }}
        />
        <path
          d="M124 420 C214 330 292 368 360 282 C420 206 498 244 600 154"
          fill="none"
          stroke={RED}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="22 20"
          strokeDashoffset={-frame * 2}
          opacity="0.92"
        />
      </svg>
      <PhoneShell
        style={{
          right: 84 + phoneX,
          top: 70,
          transform: `rotate(${phoneRotate}deg)`,
        }}
      >
        <Img
          src={staticFile("assets/slider-screens/screen-13.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </PhoneShell>
      <Card
        style={{
          position: "absolute",
          left: 44,
          top: 54,
          width: 312,
          padding: 24,
          opacity: clampInterpolate(frame, [0, 18], [0, 1]),
          transform: `translateY(${clampInterpolate(frame, [0, 22], [18, 0])}px)`,
        }}
      >
        <div style={{ color: RED, fontSize: 17, fontWeight: 900 }}>AVM içi akış</div>
        <div style={{ marginTop: 10, color: INK, fontSize: 34, lineHeight: 1.08, fontWeight: 900 }}>
          Ara, keşfet, rotayı başlat.
        </div>
        <div style={{ marginTop: 12, color: MUTED, fontSize: 18, lineHeight: 1.45, fontWeight: 700 }}>
          Kampanya, marka ve canlı yönlendirme tek deneyimde birleşir.
        </div>
      </Card>
      <ProgressPill label="Mağaza bul" active={progress < 0.34 ? 1 : 0} style={{ position: "absolute", left: 68, bottom: 72 }} />
      <ProgressPill label="Fırsatı yakala" active={progress >= 0.34 && progress < 0.68 ? 1 : 0} style={{ position: "absolute", left: 286, bottom: 118 }} />
      <ProgressPill label="3 dk rota" active={progress >= 0.68 ? 1 : 0} style={{ position: "absolute", right: 82, bottom: 68 }} />
      <div
        style={{
          position: "absolute",
          left: 118 + interpolate(progress, [0, 1], [0, 480]),
          top: 410 + Math.sin(progress * Math.PI * 2) * 20,
          width: 22,
          height: 22,
          borderRadius: 999,
          background: BLUE,
          boxShadow: "0 0 0 12px rgba(20,125,245,0.18)",
        }}
      />
    </AbsoluteFill>
  );
}

export function CampaignDiscoveryVideo() {
  const frame = useCurrentFrame();
  const cards = [
    ["Moda", "Sepette %30"],
    ["Yeme & İçme", "2. kahve"],
    ["Spor", "Yeni sezon"],
  ];
  const sweep = interpolate(loopingProgress(frame, 150), [0, 1], [-180, 930]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(circle at 18% 10%, rgba(237,0,51,0.18), transparent 30%), radial-gradient(circle at 82% 12%, rgba(20,125,245,0.18), transparent 26%), #ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 34,
          borderRadius: 36,
          background: "#f7f9fc",
          border: "1px solid #e9eef5",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      />
      <PhoneShell style={{ left: 52, top: 54, transform: "rotate(-3deg)" }}>
        <Img
          src={staticFile("assets/slider-screens/screen-14.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </PhoneShell>
      <div style={{ position: "absolute", left: 310, top: 72, right: 56 }}>
        <div style={{ color: RED, fontSize: 18, fontWeight: 900 }}>Kampanya radarınız</div>
        <div style={{ marginTop: 10, maxWidth: 430, color: INK, fontSize: 38, lineHeight: 1.05, fontWeight: 900 }}>
          Tüm fırsatlar tek ekranda taranır.
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          {["Mağaza", "Restoran", "Yakınımda"].map((label, index) => {
            const active = Math.floor((frame / 42) % 3) === index;
            return (
              <div
                key={label}
                style={{
                  borderRadius: 999,
                  padding: "12px 18px",
                  background: active ? RED : "#fff",
                  color: active ? "#fff" : "#4b5563",
                  fontSize: 17,
                  fontWeight: 850,
                  boxShadow: "0 14px 28px rgba(15,24,42,0.09)",
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", left: 326, right: 52, bottom: 50, display: "flex", gap: 18 }}>
        {cards.map(([title, offer], index) => {
          const y = Math.sin((frame + index * 14) / 18) * 8;
          return (
            <Card
              key={title}
              style={{
                flex: 1,
                minHeight: 190,
                padding: 18,
                transform: `translateY(${y}px)`,
              }}
            >
              <div
                style={{
                  height: 82,
                  borderRadius: 22,
                  background:
                    index === 0
                      ? "linear-gradient(135deg,#ed0033,#ff7a90)"
                      : index === 1
                        ? "linear-gradient(135deg,#147df5,#56c7ff)"
                        : "linear-gradient(135deg,#111827,#586174)",
                }}
              />
              <div style={{ marginTop: 16, color: INK, fontSize: 20, fontWeight: 900 }}>{title}</div>
              <div style={{ marginTop: 7, color: MUTED, fontSize: 16, fontWeight: 750 }}>{offer}</div>
            </Card>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: 34,
          bottom: 34,
          left: sweep,
          width: 90,
          transform: "skewX(-18deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.72), transparent)",
          opacity: 0.78,
        }}
      />
    </AbsoluteFill>
  );
}

export function AiPushVideo() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loop = loopingProgress(frame, durationInFrames);
  const pulse = 1 + Math.sin(frame / 8) * 0.035;
  const notificationY = interpolate(loop, [0, 0.18, 0.74, 1], [88, 0, 0, 88]);
  const notificationOpacity = interpolate(loop, [0, 0.16, 0.82, 1], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#07111f" }}>
      <Img
        src={staticFile("assets/avm-indoor/ai-push-personalization.png")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.58 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 42% 46%, rgba(237,0,51,0.26), transparent 28%), linear-gradient(90deg, rgba(7,17,31,0.96), rgba(7,17,31,0.62))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 74,
          width: 300,
          color: "#fff",
        }}
      >
        <div style={{ color: "#7cc8ff", fontSize: 18, fontWeight: 900 }}>AI kampanya eşleşmesi</div>
        <div style={{ marginTop: 14, fontSize: 42, lineHeight: 1.04, fontWeight: 950 }}>
          Doğru zamanda doğru fırsat.
        </div>
        <div style={{ marginTop: 16, color: "rgba(255,255,255,0.68)", fontSize: 18, lineHeight: 1.55, fontWeight: 700 }}>
          İlgi alanı, konum ve davranış sinyalleri kişiselleştirilmiş bildirime dönüşür.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 410,
          top: 104,
          width: 240,
          height: 240,
          borderRadius: 999,
          background: "rgba(237,0,51,0.13)",
          border: "1px solid rgba(255,255,255,0.18)",
          transform: `scale(${pulse})`,
          boxShadow: "0 0 70px rgba(237,0,51,0.44)",
        }}
      />
      {["İlgi", "Konum", "Kategori", "Zaman"].map((label, index) => {
        const angle = (index / 4) * Math.PI * 2 + frame / 68;
        const x = 530 + Math.cos(angle) * 174;
        const y = 224 + Math.sin(angle) * 126;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 98,
              height: 42,
              display: "grid",
              placeItems: "center",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: 15,
              fontWeight: 900,
              transform: "translate(-50%, -50%)",
            }}
          >
            {label}
          </div>
        );
      })}
      <PhoneShell style={{ right: 94, top: 74, transform: "rotate(4deg)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#ed0033,#111827)" }} />
        <div style={{ position: "absolute", left: 20, right: 20, top: 54, color: "#fff", fontSize: 18, fontWeight: 900 }}>
          ParketShop
        </div>
        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            top: 112 + notificationY,
            opacity: notificationOpacity,
            borderRadius: 20,
            background: "rgba(255,255,255,0.94)",
            padding: 16,
            color: INK,
            boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: RED, color: "#fff", display: "grid", placeItems: "center", fontSize: 20 }}>
              %
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 950 }}>Sana özel fırsat</div>
              <div style={{ marginTop: 3, color: MUTED, fontSize: 12, fontWeight: 750 }}>Yakınındaki mağazada hazır</div>
            </div>
          </div>
        </div>
      </PhoneShell>
      <div
        style={{
          position: "absolute",
          left: 486,
          top: 178,
          width: 92,
          height: 92,
          display: "grid",
          placeItems: "center",
          borderRadius: 999,
          background: RED,
          color: "#fff",
          fontSize: 42,
          fontWeight: 950,
          boxShadow: "0 0 0 14px rgba(237,0,51,0.14), 0 26px 60px rgba(237,0,51,0.36)",
        }}
      >
        AI
      </div>
    </AbsoluteFill>
  );
}

export function NavigationRouteVideo() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = loopingProgress(frame, durationInFrames);
  const pathLength = 920;
  const draw = interpolate(progress, [0, 0.52, 1], [pathLength, 0, 0]);
  const pinX = interpolate(progress, [0, 0.2, 0.48, 0.72, 1], [114, 236, 358, 542, 542]);
  const pinY = interpolate(progress, [0, 0.2, 0.48, 0.72, 1], [494, 390, 430, 192, 192]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(circle at 70% 18%, rgba(20,125,245,0.18), transparent 26%), linear-gradient(180deg,#ffffff,#f6f9fd)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 34,
          borderRadius: 38,
          background: "#fff",
          boxShadow: "0 28px 80px rgba(15,24,42,0.12)",
          border: "1px solid #e9eef5",
        }}
      />
      <svg viewBox="0 0 900 600" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="storeFill" x1="0" x2="1">
            <stop offset="0" stopColor="#ffe8ee" />
            <stop offset="1" stopColor="#fff3f5" />
          </linearGradient>
          <linearGradient id="routeGradient" x1="0" x2="1">
            <stop offset="0" stopColor={BLUE} />
            <stop offset="1" stopColor={RED} />
          </linearGradient>
        </defs>
        {[
          [88, 88, 210, 110, "Zara"],
          [338, 88, 206, 110, "Nike"],
          [590, 88, 218, 110, "Kahve"],
          [90, 288, 198, 118, "LCW"],
          [612, 304, 198, 118, "Burger"],
        ].map(([x, y, w, h, label]) => (
          <g key={label}>
            <rect x={x} y={y} width={w} height={h} rx="24" fill="url(#storeFill)" stroke="#f1d3da" strokeWidth="2" />
            <text x={Number(x) + 24} y={Number(y) + 62} fill={INK} fontSize="26" fontWeight="900">
              {label}
            </text>
          </g>
        ))}
        <path
          d="M114 494 L114 438 C114 404 148 390 184 390 L258 390 C300 390 322 430 362 430 L446 430 C496 430 542 392 542 338 L542 192"
          fill="none"
          stroke="#d9e4f2"
          strokeWidth="52"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M114 494 L114 438 C114 404 148 390 184 390 L258 390 C300 390 322 430 362 430 L446 430 C496 430 542 392 542 338 L542 192"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={draw}
          style={{ filter: "drop-shadow(0 0 16px rgba(20,125,245,0.55))" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: pinX,
          top: pinY,
          width: 26,
          height: 26,
          borderRadius: 999,
          background: BLUE,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 0 13px rgba(20,125,245,0.18)",
        }}
      />
      <Card
        style={{
          position: "absolute",
          right: 62,
          top: 202,
          width: 252,
          padding: 22,
          transform: `translateY(${Math.sin(frame / 16) * 8}px)`,
        }}
      >
        <div style={{ color: RED, fontSize: 16, fontWeight: 900 }}>Hedef mağaza</div>
        <div style={{ marginTop: 9, color: INK, fontSize: 34, fontWeight: 950 }}>Nike</div>
        <div style={{ marginTop: 8, color: MUTED, fontSize: 18, fontWeight: 750 }}>3 dk içinde ulaşın</div>
      </Card>
      <PhoneShell style={{ left: 620, bottom: -58, width: 160, height: 344, transform: "rotate(7deg)" }}>
        <Img
          src={staticFile("assets/slider-screens/screen-18.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </PhoneShell>
    </AbsoluteFill>
  );
}

export function JourneyTimelineVideo() {
  const frame = useCurrentFrame();
  const steps = ["AVM’yi seç", "Markayı bul", "Öneriyi gör", "Rotayı başlat", "Fırsatı kullan"];
  const activeIndex = Math.floor((frame / 34) % steps.length);
  const progress = ((frame % 170) / 170) * 100;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(circle at 16% 22%, rgba(237,0,51,0.14), transparent 28%), radial-gradient(circle at 76% 12%, rgba(20,125,245,0.16), transparent 28%), #ffffff",
      }}
    >
      <div style={{ position: "absolute", left: 64, top: 64, right: 64 }}>
        <div style={{ color: RED, fontSize: 18, fontWeight: 950 }}>Kullanıcı yolculuğu</div>
        <div style={{ marginTop: 12, maxWidth: 640, color: INK, fontSize: 42, lineHeight: 1.05, fontWeight: 950 }}>
          AVM içindeki kararlar tek akışa bağlanır.
        </div>
      </div>
      <div style={{ position: "absolute", left: 70, right: 70, top: 250, height: 8, borderRadius: 999, background: "#e7edf5" }}>
        <div style={{ width: `${progress}%`, height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${RED}, ${BLUE})` }} />
      </div>
      <div style={{ position: "absolute", left: 52, right: 52, top: 202, display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 16 }}>
        {steps.map((step, index) => {
          const active = index === activeIndex;
          const scale = active ? 1.08 : 1;
          return (
            <div key={step} style={{ display: "grid", justifyItems: "center", gap: 18, transform: `scale(${scale})` }}>
              <div
                style={{
                  width: 78,
                  height: 78,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 28,
                  background: active ? RED : "#fff",
                  color: active ? "#fff" : RED,
                  border: active ? "0" : "1px solid #eef1f5",
                  fontSize: 28,
                  fontWeight: 950,
                  boxShadow: active ? "0 22px 46px rgba(237,0,51,0.28)" : "0 14px 32px rgba(15,24,42,0.08)",
                }}
              >
                {index + 1}
              </div>
              <Card
                style={{
                  width: 150,
                  minHeight: 112,
                  padding: 16,
                  textAlign: "center",
                  opacity: active ? 1 : 0.74,
                }}
              >
                <div style={{ color: active ? RED : INK, fontSize: 18, lineHeight: 1.15, fontWeight: 950 }}>{step}</div>
                <div style={{ marginTop: 10, color: MUTED, fontSize: 13, lineHeight: 1.35, fontWeight: 750 }}>
                  {active ? "Sıradaki aksiyon netleşir." : "Tek deneyim"}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
