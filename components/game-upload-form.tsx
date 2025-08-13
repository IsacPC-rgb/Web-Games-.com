"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Sparkles, Rocket } from 'lucide-react'
import { supabase } from "@/lib/supabase/client"
import { uploadGameImage } from "@/lib/image-upload"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/image-upload"

export default function GameUploadForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [htmlFile, setHtmlFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleHtmlFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "text/html") {
      setHtmlFile(file)
    } else {
      alert("Por favor, selecione apenas arquivos HTML (.html)")
    }
  }

  const handleImageChange = (file: File | null, url: string) => {
    setImageFile(file)
    setImageUrl(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !htmlFile) {
      alert("Título e arquivo HTML são obrigatórios")
      return
    }

    setIsUploading(true)

    try {
      // Read HTML file content
      const htmlContent = await htmlFile.text()

      // Generate temporary game ID for image upload
      const tempGameId = crypto.randomUUID()

      // Upload image if file is provided
      let finalImageUrl = imageUrl
      if (imageFile) {
        const uploadedImageUrl = await uploadGameImage(imageFile, tempGameId)
        if (uploadedImageUrl) {
          finalImageUrl = uploadedImageUrl
        } else {
          alert("Erro ao fazer upload da imagem")
          return
        }
      }

      // Insert game into database
      const { data, error } = await supabase
        .from("games")
        .insert([
          {
            id: tempGameId,
            title,
            description,
            html_content: htmlContent,
            image_url: finalImageUrl,
            user_id: null, // Allow anonymous games
          },
        ])
        .select()

      if (error) {
        console.error("Error inserting game:", error)
        alert("Erro ao salvar o jogo")
        return
      }

      alert("Jogo enviado com sucesso!")

      // Reset form
      setTitle("")
      setDescription("")
      setHtmlFile(null)
      setImageFile(null)
      setImageUrl("")

      // Redirect to the new game
      router.push(`/game/${tempGameId}`)
    } catch (error) {
      console.error("Error uploading game:", error)
      alert("Erro ao enviar o jogo")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-32 right-16 w-1 h-1 bg-purple-400 rounded-full animate-float-delayed opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float-slow opacity-50"></div>
        <div className="absolute bottom-40 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-30"></div>
      </div>

      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-gradient-x"></div>
        <div className="absolute inset-[1px] bg-gradient-to-br from-white/95 to-gray-50/95 rounded-lg"></div>

        <CardHeader className="relative z-10 animate-slide-down">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            <div className="relative">
              <Upload className="h-7 w-7 text-blue-500 animate-bounce-gentle" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
            </div>
            Hospedar Novo Jogo
          </CardTitle>
          <p className="text-muted-foreground animate-fade-in-delayed">
            Transforme seu jogo HTML em uma experiência online incrível!
          </p>
        </CardHeader>

        <CardContent className="relative z-10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <Label htmlFor="title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Título do Jogo *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o nome do seu jogo"
                required
                disabled={isUploading}
                className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[1.02] focus:shadow-xl border-2 hover:border-blue-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2 animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span
                  className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></span>
                Descrição
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva seu jogo (opcional)"
                rows={3}
                disabled={isUploading}
                className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[1.02] focus:shadow-xl border-2 hover:border-purple-300 focus:border-purple-500 resize-none"
              />
            </div>

            <div className="space-y-2 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
              <Label htmlFor="html-file" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span
                  className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></span>
                Arquivo HTML do Jogo *
              </Label>
              <div className="relative group">
                <Input
                  id="html-file"
                  type="file"
                  accept=".html"
                  onChange={handleHtmlFileChange}
                  required
                  disabled={isUploading}
                  className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:scale-[1.02] focus:shadow-xl border-2 hover:border-pink-300 focus:border-pink-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-pink-500 file:to-purple-500 file:text-white hover:file:from-pink-600 hover:file:to-purple-600 file:transition-all file:duration-300"
                />
                <FileText className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-pink-500 transition-colors duration-300" />
              </div>
              {htmlFile && (
                <p className="text-sm text-green-600 font-medium animate-fade-in flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Arquivo selecionado: {htmlFile.name}
                </p>
              )}
            </div>

            <div className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
              <ImageUpload onImageChange={handleImageChange} disabled={isUploading} />
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: "0.5s" }}>
              <Button
                type="submit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                disabled={isUploading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-5 w-5 group-hover:animate-bounce" />
                      Hospedar Jogo
                      <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
                    </>
                  )}
                </div>
                {!isUploading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
