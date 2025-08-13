"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, Zap, Star } from "lucide-react"

export default function AnimatedHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative overflow-hidden">
      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle bg-blue-500"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center py-20">
        {/* Título principal com animação */}
        <div className="opacity-0 animate-fade-in-down">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-pulse-slow">
            Game Host
          </h1>
        </div>

        {/* Ícones flutuantes */}
        <div className="flex justify-center gap-8 mb-8 opacity-0 animate-fade-in-up delay-200">
          <div className="animate-float delay-100">
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="animate-float delay-300">
            <Zap className="h-8 w-8 text-blue-500" />
          </div>
          <div className="animate-float delay-500">
            <Star className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        {/* Subtítulo */}
        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-12 opacity-0 animate-fade-in-up delay-300 max-w-4xl mx-auto leading-relaxed">
          A plataforma mais <span className="text-blue-600 font-semibold">inovadora</span> para hospedar e compartilhar
          seus jogos HTML
        </p>

        {/* Botão principal com efeito glow */}
        <div className="opacity-0 animate-fade-in-up delay-400">
          <Link href="/upload">
            <Button
              size="lg"
              className="text-xl px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 animate-glow hover-lift"
            >
              <Upload className="mr-3 h-6 w-6" />
              Começar Agora
            </Button>
          </Link>
        </div>

        {/* Estatísticas animadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto opacity-0 animate-fade-in-up delay-500">
          <div className="text-center hover-lift">
            <div className="text-4xl font-bold text-blue-600 mb-2 animate-pulse-slow">100%</div>
            <div className="text-gray-600 dark:text-gray-400">Gratuito</div>
          </div>
          <div className="text-center hover-lift">
            <div className="text-4xl font-bold text-green-600 mb-2 animate-pulse-slow delay-100">⚡</div>
            <div className="text-gray-600 dark:text-gray-400">Upload Instantâneo</div>
          </div>
          <div className="text-center hover-lift">
            <div className="text-4xl font-bold text-purple-600 mb-2 animate-pulse-slow delay-200">∞</div>
            <div className="text-gray-600 dark:text-gray-400">Jogos Ilimitados</div>
          </div>
        </div>
      </div>
    </div>
  )
}
