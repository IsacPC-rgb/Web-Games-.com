import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import GameViewer from "@/components/game-viewer"
import Header from "@/components/header"

interface GamePageProps {
  params: {
    id: string
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const supabase = createServerClient()

  const { data: game, error } = await supabase.from("games").select("*").eq("id", params.id).single()

  if (error || !game) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <GameViewer game={game} />
    </div>
  )
}

export async function generateMetadata({ params }: GamePageProps) {
  const supabase = createServerClient()

  const { data: game } = await supabase.from("games").select("title, description").eq("id", params.id).single()

  if (!game) {
    return {
      title: "Jogo não encontrado",
    }
  }

  return {
    title: `${game.title} - Game Host`,
    description: game.description || `Jogue ${game.title} gratuitamente`,
  }
}
