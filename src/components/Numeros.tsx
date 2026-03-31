import { useEffect, useRef, useState } from 'preact/hooks'
import { useProgressiveNumber } from '@/hooks/useProgressiveNumber'

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
}

const stats: Stat[] = [
  { prefix: '+', value: 138, suffix: ' m²', label: 'Superficie diseñada', decimals: 0 },
  { value: 3, label: 'Proyectos destacados', decimals: 0 },
  { value: 5, suffix: '+', label: 'Años en Ushuaia', decimals: 0 },
]

function StatItem({ stat }: { stat: Stat }) {
  const [display, setDisplay] = useProgressiveNumber(0, 1800, stat.decimals ?? 0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (started) {
      setDisplay(String(stat.value))
    }
  }, [started])

  return (
    <div class="flex flex-col items-center gap-2 text-center">
      <span class="font-bebas text-5xl md:text-7xl text-white leading-none">
        {stat.prefix}<span class="text-primary">{display}</span>{stat.suffix}
      </span>
      <span class="text-white/40 font-barlow text-xs md:text-sm tracking-widest uppercase">
        {stat.label}
      </span>
      <span
        // Placeholder to attach observer
        data-started={String(started)}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default function Numeros() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const [m2, setM2] = useProgressiveNumber(0, 1800, 0)
  const [proyectos, setProyectos] = useProgressiveNumber(0, 1400, 0)
  const [años, setAños] = useProgressiveNumber(0, 1200, 0)

  useEffect(() => {
    if (isVisible) {
      setM2('138')
      setProyectos('3')
      setAños('5')
    }
  }, [isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return (
    <section class="w-full py-14 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Background grid */}
      <div class="absolute inset-0 numeros-grid opacity-5 pointer-events-none" />

      <div class="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20" ref={ref}>
        {/* Section header */}
        <div class="text-center mb-16">
          <span class="text-primary font-barlow font-semibold tracking-[0.3em] text-xs uppercase">
            En números
          </span>
          <h2 class="font-bebas text-4xl md:text-5xl text-white mt-2">
            9410 en <span class="text-primary">cifras</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* m² */}
          <div class="flex flex-col items-center gap-2 text-center">
            <span class="font-bebas text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              +<span class="text-primary">{m2}</span> m²
            </span>
            <span class="text-white/40 font-barlow text-xs md:text-sm tracking-widest uppercase">
              Superficie diseñada
            </span>
          </div>
          {/* Proyectos */}
          <div class="flex flex-col items-center gap-2 text-center">
            <span class="font-bebas text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              <span class="text-primary">{proyectos}</span>
            </span>
            <span class="text-white/40 font-barlow text-xs md:text-sm tracking-widest uppercase">
              Proyectos destacados
            </span>
          </div>
          {/* Años */}
          <div class="flex flex-col items-center gap-2 text-center">
            <span class="font-bebas text-5xl md:text-7xl lg:text-8xl text-white leading-none">
              <span class="text-primary">{años}</span>+
            </span>
            <span class="text-white/40 font-barlow text-xs md:text-sm tracking-widest uppercase">
              Años en Ushuaia
            </span>
          </div>
        </div>

        {/* Decorative horizontal rule */}
        <div class="flex items-center gap-4 mt-16">
          <div class="flex-1 h-px bg-white/5" />
          <span class="text-primary/60 font-bebas text-sm tracking-widest">9410 ARQ</span>
          <div class="flex-1 h-px bg-white/5" />
        </div>
      </div>

      <style>{`
        .numeros-grid {
          background-image:
            linear-gradient(rgba(200, 131, 26, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 131, 26, 0.3) 1px, transparent 1px);
          background-size: 80px 80px;
        }
      `}</style>
    </section>
  )
}
