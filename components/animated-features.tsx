"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Gamepad2, Globe, Zap, Shield, Heart } from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Upload Simples",
    description: "Envie seu arquivo index.html e sua imagem de capa em segundos",
    color: "text-blue-600",
    delay: "delay-100",
  },
  {
    icon: Gamepad2,
    title: "Jogos Instantâneos",
    description: "Seus jogos ficam disponíveis imediatamente após o upload",
    color: "text-green-600",
    delay: "delay-200",
  },
  {
    icon: Globe,
    title: "Compartilhamento Fácil",
    description: "Compartilhe seus jogos com o mundo através de links únicos",
    color: "text-purple-600",
    delay: "delay-300",
  },
  {
    icon: Zap,
    title: "Performance Otimizada",
    description: "Carregamento rápido e experiência fluida para todos os jogadores",
    color: "text-yellow-600",
    delay: "delay-400",
  },
  {
    icon: Shield,
    title: "Seguro e Confiável",
    description: "Seus jogos são executados em ambiente seguro e isolado",
    color: "text-red-600",
    delay: "delay-500",
  },
  {
    icon: Heart,
    title: "Comunidade Ativa",
    description: "Faça parte de uma comunidade apaixonada por desenvolvimento de jogos",
    color: "text-pink-600",
    delay: "delay-300",
  },
]

export default function AnimatedFeatures() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <Card
            key={index}
            className={`opacity-0 animate-fade-in-up ${feature.delay} hover-lift group cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 group-hover:scale-105 transition-transform duration-300">
                <div
                  className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900 transition-colors duration-300`}
                >
                  <Icon
                    className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <span className="group-hover:text-blue-600 transition-colors duration-300">{feature.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
