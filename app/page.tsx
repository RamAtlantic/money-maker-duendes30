"use client"

import { useEffect, useState } from "react"
import { Loader2, Zap, Star, DollarSign, TrendingUp, Coins, Target } from "lucide-react"
import Image from "next/image"
import { LeadFormModal } from "@/components/modal-lead"

declare global {
  interface Window {
    fbq: any
  }
}

export default function Page() {
  const [showImages, setShowImages] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [showButton, setShowButton] = useState(false)

  // Min delay and initial width detection for loading
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const [minDelayDone, setMinDelayDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowImages(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleButton = (button: string) => {
    if (button !== "1") {
      setOpenForm(true)
    } else {
      window.fbq("track", "StartTrial", {
        value: 0,
        currency: "USD",
      })
      window.location.href = "https://wa.me/573178520000?text=Hola, quiero saber mas de MoneyMaker"
    }
  }

  // Detect viewport to toggle between mobile and desktop
  useEffect(() => {
    const detect = () => setIsDesktop(window.innerWidth >= 1024)
    detect()
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Ensure at least 1000ms loading
  useEffect(() => {
    const t = setTimeout(() => setMinDelayDone(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const ready = isDesktop !== null && minDelayDone

  // Loading: circular progress centered, black background
  if (!ready) {
    return (
      <main className="relative min-h-screen bg-black grid place-items-center">
        <div className="flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-white animate-spin" aria-hidden="true" />
          <span className="sr-only">{"Cargando..."}</span>
        </div>
      </main>
    )
  }

  // ----------------------------- Desktop Return -----------------------------
  if (isDesktop) {
    return (
      <main className="relative bg-black min-h-screen">
        {/* GIF 1 (Desktop) */}
        <VideoSectionDesktop src={`/two-desktop.gif`} label="GIF 1 Desktop" id="d1" />

        {/* Botón CTA (desktop) */}
        <div className="absolute top-[25%] left-1/5 flex justify-center items-center z-20 cursor-pointer">
          {showButton && (
            <div className="flex gap-4 justify-between items-center w-full px-24">
              <button
                onClick={() => handleButton("2")}
                className="bg-transparent text-black py-2 rounded-md cursor-pointer group"
              >
                <img
                  src={`/button-2.png`}
                  alt="Botón principal"
                  width={660}
                  height={160}
                  className="object-contain pointer-events-none select-none transform transition-transform duration-200 ease-out will-change-transform origin-center lg:group-hover:scale-[1.2]"
                />
              </button>
            </div>
          )}
        </div>

        {/* Spacer */}
        <section>
          <div className="h-24 bg-black" />
        </section>

        {/* Más GIFs desktop */}
        <VideoSectionDesktop src={`/landing-desktop-2.gif`} label="GIF 2 Desktop" id="d2" />

        {/* Modal Lead */}
        <LeadFormModal open={openForm} onOpenChange={setOpenForm} baseUrl={process.env.NEXT_PUBLIC_BASE_URL} />
      </main>
    )
  }

  // ----------------------------- Mobile Return -----------------------------
  return (
    <main className="relative bg-black min-h-screen">
      {/* GIF 1 */}
      <GifBackground src={`/landing-mobile-1.webp`} label="GIF 1: Relámpagos y templo" id="1" />

      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full z-20">
        {showButton && !openForm && (
          <button
            id="cta-button"
            onClick={() => handleButton("1")}
            className="bg-transparent text-black py-2 rounded-md"
          >
            <img
              src={`/button-1.png`}
              alt="Logo principal"
              width={300}
              height={100}
              className="object-contain pointer-events-none select-none"
            />
          </button>
        )}
      </div>

      {/* Slider infinito de iconos */}
      <IconSlider />

      {/* GIF 2 */}
      <GifBackground src={`/landing-mobile-2.webp`} label="GIF 2: Relámpagos y templo" id="2" />

      <div className="absolute top-[34%] flex justify-center items-center w-full z-20">
        {showButton && !openForm && (
          <button
            id="cta-button"
            onClick={() => handleButton("2")}
            className="bg-transparent text-black py-2 rounded-md"
          >
            <img
              src={`/button-2.png`}
              alt="Logo principal"
              width={300}
              height={100}
              className="object-contain pointer-events-none select-none"
            />
          </button>
        )}
      </div>
      <div className="h-20 bg-black"></div>
      {/* Modal */}
      <LeadFormModal open={openForm} onOpenChange={setOpenForm} baseUrl={process.env.NEXT_PUBLIC_BASE_URL} />

      {/* Estilo para giro lento (solo si usas animate-spin-slow) */}
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  )
}

// Componente de slider infinito de iconos
function IconSlider() {
  const icons = [Zap, Star, DollarSign, TrendingUp, Coins, Target]
  const iconSize = 24

  // Crear múltiples repeticiones para el efecto infinito
  const repeatedIcons = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="flex items-center justify-center gap-8 flex-shrink-0 bg-transparent">
      {icons.map((Icon, iconIndex) => (
        <Icon key={`${i}-${iconIndex}`} size={iconSize} className="text-black bg-green" />
      ))}
    </div>
  ))

  return (
    <div
      className="relative h-[80px] overflow-hidden" // Aumenté la altura de 50px a 80px
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(112, 253, 53, 0.8) 20%, #70FD35 40%, rgba(112, 253, 53, 0.8) 60%, rgba(0, 0, 0, 0.3) 100%)",
        boxShadow: '0px -8px 16px rgba(0, 0, 0, 0.2), 0px 30px 60px rgba(0, 0, 0, 0.8), 0px 50px 100px rgba(0, 0, 0, 0.6), 0px 80px 160px rgba(0, 0, 0, 0.4), 40px 0px 80px rgba(0, 0, 0, 0.7), 80px 0px 120px rgba(0, 0, 0, 0.5), -40px 0px 80px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Gradientes de fade out en los bordes laterales */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* Contenedor del slider */}
      <div className="flex h-full animate-slide-infinite">{repeatedIcons}</div>

      {/* Estilos CSS para la animación */}
      <style jsx>{`
        @keyframes slide-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide-infinite {
          animation: slide-infinite 15s linear infinite;
        }
      `}</style>
    </div>
  )
}

function VideoSection({
  src = "/landing-mobile4.mp4",
  label = "Sección de video",
  id,
  sideFadeWidthMobile = 96,
  sideFadeWidthDesktop = 320,
}: {
  src?: string
  label?: string
  id?: string
  sideFadeWidthMobile?: number
  sideFadeWidthDesktop?: number
}) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Gradiente lateral muy exagerado: negro sólido en el borde que se desvanece al centro
  const sideGradientL =
    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.97) 12%, rgba(0,0,0,0.9) 26%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 72%, rgba(0,0,0,0) 100%)"
  const sideGradientR =
    "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.97) 12%, rgba(0,0,0,0.9) 26%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 72%, rgba(0,0,0,0) 100%)"

  const videoClass = isDesktop ? "w-full h-full object-cover" : "w-auto h-auto max-w-full max-h-full object-contain"

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black">
      <div
        className={`absolute inset-0 flex items-center justify-center ${id === "2" ? "w-full h-full" : "min-w-[95vw]"}`}
      >
        <video src={src} className={videoClass} autoPlay muted loop playsInline preload="auto" aria-label={label} />
      </div>

      {/* SOLO DIFUMINADOS LATERALES (no superior, no inferior) */}
      {/* Izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 md:hidden"
        style={{ width: `${sideFadeWidthMobile}px`, background: sideGradientL }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 hidden md:block"
        style={{
          width: `${sideFadeWidthDesktop}px`,
          background: sideGradientL,
        }}
      />
      {/* Derecha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 md:hidden"
        style={{ width: `${sideFadeWidthMobile}px`, background: sideGradientR }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 hidden md:block"
        style={{
          width: `${sideFadeWidthDesktop}px`,
          background: sideGradientR,
        }}
      />
    </section>
  )
}

/* ----------------------------- GifBackground (Mobile Optimized) ----------------------------- */
function GifBackground({
  src = "/landing-mobile-1.webp",
  label = "GIF animado optimizado",
  id,
  sideFadeWidthMobile = 96,
}: {
  src?: string
  label?: string
  id?: string
  sideFadeWidthMobile?: number
}) {
  // Gradiente lateral optimizado para mobile: negro sólido en el borde que se desvanece al centro
  const sideGradientL =
    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.97) 12%, rgba(0,0,0,0.9) 26%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 72%, rgba(0,0,0,0) 100%)"
  const sideGradientR =
    "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.97) 12%, rgba(0,0,0,0.9) 26%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 72%, rgba(0,0,0,0) 100%)"

  const imageClass = "w-auto h-auto max-w-full max-h-full object-contain"

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black p-0 m-0">
      <div
        className={`absolute inset-0 flex p-0 m-0 items-center justify-center ${
          id === "2" ? "w-full h-full" : "min-w-[95vw]"
        }`}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={label}
          fill
          className={imageClass}
          priority={id === "1"} // Prioridad para el primer GIF
          sizes="(max-width: 1023px) 100vw, 0vw" // Solo carga en mobile
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAAQAAAABwAABwAAQUxQSDcAAAABJ6CgbWRhdGEAAAAAAA=="
        />
      </div>

      {/* SOLO DIFUMINADOS LATERALES (no superior, no inferior) */}
      {/* Izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
        style={{ width: `${sideFadeWidthMobile}px`, background: sideGradientL }}
      />
      {/* Derecha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
        style={{ width: `${sideFadeWidthMobile}px`, background: sideGradientR }}
      />
    </section>
  )
}

/* ----------------------------- VideoSectionDesktop ----------------------------- */
function VideoSectionDesktop({
  src = "/two-desktop.gif",
  label = "Sección de GIF animado",
  id,
}: {
  src?: string
  label?: string
  id?: string
}) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const gifClass = isDesktop ? "w-full h-full object-cover" : "w-auto h-auto max-w-full max-h-full object-contain"

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black">
      <div
        className={`absolute inset-0 flex items-center justify-center ${id === "2" ? "w-full h-full" : "min-w-[95vw]"}`}
      >
        <img src={src || "/placeholder.svg"} className={gifClass} alt={label} loading="lazy" />
      </div>
    </section>
  )
}
