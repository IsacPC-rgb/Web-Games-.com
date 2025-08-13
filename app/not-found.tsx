import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import Header from "@/components/header"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="text-8xl mb-6">🎮</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Jogo não encontrado</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            O jogo que você está procurando não existe ou foi removido.
          </p>

          <div className="space-y-4">
            <Link href="/">
              <Button size="lg" className="w-full">
                <Home className="h-5 w-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>

            <Link href="/upload">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Hospedar um Jogo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
