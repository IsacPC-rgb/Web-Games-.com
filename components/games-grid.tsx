"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Calendar, User, ImageIcon, Sparkles, ExternalLink } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

interface Game {
  id: string
  title: string
  description: string | null
  image_url: string | null
  created_at: string
  user_id: string
}

export default function GamesGrid() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from("games")
        .select("id, title, description, image_url, created_at, user_id")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching games:", error)
        return
      }

      setGames(data || [])
    } catch (error) {
      console.error("Error fetching games:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card
            key={i}
            className={`animate-pulse opacity-0 animate-fade-in-up hover-lift`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <CardHeader className="p-0">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t-lg animate-pulse-slow"></div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded mb-3 animate-pulse-slow"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded w-3/4 mb-4 animate-pulse-slow"></div>
              <div className="h-8 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded animate-pulse-slow"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-20 opacity-0 animate-fade-in-up">
        <div className="text-8xl mb-6 animate-float">🎮</div>
        <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Nenhum jogo hospedado ainda</h3>
        <p className="text-xl text-white/90 mb-8 drop-shadow">Seja o primeiro a hospedar um jogo incrível!</p>
        <Link href="/upload">
          <Button
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 animate-glow hover-lift"
          >
            <Sparkles className="mr-3 h-5 w-5" />
            Hospedar Primeiro Jogo
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {games.map((game, index) => (
        <Card
          key={game.id}
          className={`group hover-lift bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-white/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 opacity-0 animate-fade-in-up overflow-hidden`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="p-0 relative">
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 overflow-hidden">
              {game.image_url ? (
                <img
                  src={game.image_url || "/placeholder.svg"}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.nextElementSibling?.classList.remove("hidden")
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${game.image_url ? "hidden" : ""}`}>
                <ImageIcon className="h-16 w-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Overlay com efeito hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Ícone de play que aparece no hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-full p-4 backdrop-blur-sm animate-pulse-slow">
                  <Play className="h-8 w-8 text-blue-600 fill-current" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <CardTitle className="text-xl mb-3 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {game.title}
            </CardTitle>

            {game.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {game.description}
              </p>
            )}

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                <Calendar className="h-3 w-3" />
                {formatDate(game.created_at)}
              </div>
              <Badge
                variant="secondary"
                className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 border-0 group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-all duration-300"
              >
                <User className="h-3 w-3 mr-1" />
                {game.user_id === "anonymous" ? "Anônimo" : "Usuário"}
              </Badge>
            </div>

            <div className="space-y-2">
              <Link href={`/game/${game.id}`}>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform group-hover:scale-105 transition-all duration-300 text-white border-0 shadow-lg hover:shadow-xl"
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-2 fill-current" />
                  Jogar Agora
                </Button>
              </Link>

              <Link href={`/game/${game.id}`} target="_blank">
                <Button
                  variant="outline"
                  className="w-full border-2 border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform group-hover:scale-105 transition-all duration-300 bg-transparent"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir em Nova Aba
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
