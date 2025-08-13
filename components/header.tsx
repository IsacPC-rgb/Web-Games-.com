import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, Home, Gamepad2 } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Game Host</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Home className="h-4 w-4" />
              Início
            </Link>
            <Link href="/upload">
              <Button variant="default" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Hospedar Jogo
              </Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <Link href="/upload">
              <Button size="sm">
                <Upload className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
