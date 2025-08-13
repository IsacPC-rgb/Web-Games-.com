import Header from "@/components/header"
import GamesGrid from "@/components/games-grid"
import AnimatedHero from "@/components/animated-hero"
import AnimatedFeatures from "@/components/animated-features"

export default function HomePage() {
  return (
    <div className="min-h-screen animated-bg">
      <Header />

      <div className="container mx-auto px-4">
        <AnimatedHero />

        <div className="py-20">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up delay-200">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Por que escolher o Game Host?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
              Descubra todas as vantagens de hospedar seus jogos conosco
            </p>
          </div>

          <AnimatedFeatures />
        </div>

        <div className="py-20">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up delay-100">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">Jogos da Comunidade</h2>
            <p className="text-xl text-white/90 drop-shadow">
              Descubra e jogue os jogos criados pela nossa incrível comunidade
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up delay-300">
            <GamesGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
