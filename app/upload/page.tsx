import GameUploadForm from "@/components/game-upload-form"
import Header from "@/components/header"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Hospedar Novo Jogo</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Compartilhe seu jogo HTML com o mundo</p>
        </div>

        <GameUploadForm />
      </div>
    </div>
  )
}
