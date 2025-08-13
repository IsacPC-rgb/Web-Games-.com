"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Maximize2, Minimize2, RotateCcw, Monitor, Gamepad2, Home } from "lucide-react"
import Link from "next/link"

interface Game {
  id: string
  title: string
  description: string | null
  html_content: string
  image_url: string | null
  created_at: string
  user_id: string | null
}

interface GameTab {
  id: string
  game: Game
  gameKey: number
  gameUrl: string
}

interface GameTabManagerProps {
  initialGame?: Game
}

export default function GameTabManager({ initialGame }: GameTabManagerProps) {
  const [tabs, setTabs] = useState<GameTab[]>([])
  const [activeTabId, setActiveTabId] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Initialize with the initial game if provided
  useEffect(() => {
    if (initialGame && tabs.length === 0) {
      addGameTab(initialGame)
    }
  }, [initialGame])

  const addGameTab = (game: Game) => {
    const gameBlob = new Blob([game.html_content], { type: "text/html" })
    const gameUrl = URL.createObjectURL(gameBlob)

    const newTab: GameTab = {
      id: `tab-${game.id}-${Date.now()}`,
      game,
      gameKey: 0,
      gameUrl,
    }

    setTabs((prev) => [...prev, newTab])
    setActiveTabId(newTab.id)
  }

  const closeTab = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId)
    if (tab) {
      URL.revokeObjectURL(tab.gameUrl)
    }

    setTabs((prev) => prev.filter((t) => t.id !== tabId))

    if (activeTabId === tabId) {
      const remainingTabs = tabs.filter((t) => t.id !== tabId)
      setActiveTabId(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null)
    }
  }

  const restartGame = (tabId: string) => {
    setTabs((prev) => prev.map((tab) => (tab.id === tabId ? { ...tab, gameKey: tab.gameKey + 1 } : tab)))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      tabs.forEach((tab) => URL.revokeObjectURL(tab.gameUrl))
    }
  }, [])

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  if (tabs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Gamepad2 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Nenhum jogo aberto</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Abra um jogo para começar a jogar em abas</p>
          <Link href="/">
            <Button>
              <Home className="h-4 w-4 mr-2" />
              Voltar aos Jogos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-black" : "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"}`}
    >
      {/* Tab Bar */}
      <div
        className={`${isFullscreen ? "bg-gray-900 border-b border-gray-700" : "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"} px-4 py-2`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeTabId === tab.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <Gamepad2 className="h-4 w-4" />
                <span className="text-sm font-medium truncate max-w-32">{tab.game.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 hover:bg-red-500 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {activeTab && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => restartGame(activeTab.id)}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </>
            )}
            {!isFullscreen && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Game Content */}
      {activeTab && (
        <div className={`${isFullscreen ? "h-[calc(100vh-60px)]" : "h-[calc(100vh-120px)]"}`}>
          <div className="h-full flex">
            {/* Sidebar - Hidden in fullscreen */}
            {!isFullscreen && (
              <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
                <Card>
                  <CardContent className="p-4">
                    {activeTab.game.image_url && (
                      <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                        <img
                          src={activeTab.game.image_url || "/placeholder.svg"}
                          alt={activeTab.game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <h3 className="font-bold text-lg mb-2">{activeTab.game.title}</h3>

                    {activeTab.game.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{activeTab.game.description}</p>
                    )}

                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        <Monitor className="h-3 w-3 mr-1" />
                        Jogo Web
                      </Badge>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Criado em {new Date(activeTab.game.created_at).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Game Frame */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900">
              <iframe
                key={activeTab.gameKey}
                src={activeTab.gameUrl}
                className="w-full h-full border-0"
                title={activeTab.game.title}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
