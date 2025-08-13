"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, X, Upload } from "lucide-react"

interface ImageUploadProps {
  onImageChange: (file: File | null, url: string) => void
  currentImageUrl?: string
  disabled?: boolean
}

export default function ImageUpload({ onImageChange, currentImageUrl, disabled }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUrlChange = (url: string) => {
    setImageUrl(url)
    setImageFile(null)
    setPreviewUrl(null)
    onImageChange(null, url)
  }

  const handleFileChange = (file: File | null) => {
    setImageFile(file)
    setImageUrl("")

    if (file) {
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
      onImageChange(file, "")
    } else {
      setPreviewUrl(null)
      onImageChange(null, "")
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file)
    } else {
      alert("Por favor, selecione apenas arquivos de imagem")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file)
    }
  }

  const clearImage = () => {
    setImageFile(null)
    setImageUrl("")
    setPreviewUrl(null)
    onImageChange(null, "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const displayImage = previewUrl || imageUrl || currentImageUrl

  return (
    <div className="space-y-4">
      <Label>Imagem do Jogo</Label>

      {/* Preview */}
      {displayImage && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img src={displayImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={clearImage}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="image-url" className="text-sm">
          URL da Imagem
        </Label>
        <Input
          id="image-url"
          type="url"
          value={imageUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          disabled={!!imageFile || disabled}
        />
      </div>

      <div className="text-center text-sm text-muted-foreground">ou</div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label htmlFor="image-file" className="text-sm">
          Upload de Arquivo
        </Label>
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            {imageFile ? imageFile.name : "Arraste uma imagem aqui ou clique para selecionar"}
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
          {!imageFile && (
            <Button type="button" variant="outline" size="sm" disabled={disabled}>
              <Upload className="h-4 w-4 mr-2" />
              Selecionar Arquivo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
