"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Maximize2, Minimize2, RotateCcw, Calendar, User } from "lucide-react"
import Link from "next/link"

interface Game {
  id: string
  title: string
  description: string | null
  html_content: string
  image_url: string | null
  created_at: string
  user_id: string
}

interface GameViewerProps {
  game: Game
}

export default function GameViewer({ game }: GameViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [gameKey, setGameKey] = useState(0)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const restartGame = () => {
    setGameKey((prev) => prev + 1)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Create a blob URL for the HTML content
  const gameBlob = new Blob([game.html_content], { type: "text/html" })
  const gameUrl = URL.createObjectURL(gameBlob)

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(gameUrl)
    }
  }, [gameUrl])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Jogos
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Game Info Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              {game.image_url && (
                <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                  <img
                    src={game.image_url || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardTitle className="text-xl">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {game.description && (
                <div>
                  <h4 className="font-semibold mb-2">Descrição</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{game.description}</p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  {formatDate(game.created_at)}
                </div>
                <Badge variant="secondary" className="text-xs">
                  <User className="h-3 w-3 mr-1" />
                  {game.user_id === "anonymous" ? "Anônimo" : "Usuário"}
                </Badge>
              </div>

              <div className="space-y-2 pt-4">
                <Button onClick={restartGame} variant="outline" size="sm" className="w-full bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar Jogo
                </Button>
                <Button onClick={toggleFullscreen} variant="outline" size="sm" className="w-full bg-transparent">
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-4 w-4 mr-2" />
                      Sair da Tela Cheia
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Tela Cheia
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Container */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardContent className="p-0">
              <div
                className={`relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${
                  isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-video min-h-[400px] lg:min-h-[600px]"
                }`}
              >
                {isFullscreen && (
                  <div className="absolute top-4 right-4 z-10">
                    <Button onClick={toggleFullscreen} variant="secondary" size="sm">
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <iframe
                  key={gameKey}
                  src={gameUrl}
                  className="w-full h-full border-0"
                  title={game.title}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
