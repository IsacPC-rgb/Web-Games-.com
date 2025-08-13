import { supabase } from "@/lib/supabase/client"

export async function uploadGameImage(file: File, gameId: string): Promise<string | null> {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${gameId}-${Date.now()}.${fileExt}`
    const filePath = `games/${fileName}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage.from("game-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading image:", error)
      return null
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("game-images").getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    return null
  }
}

export async function deleteGameImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split("/")
    const filePath = pathParts.slice(-2).join("/") // Get 'games/filename.ext'

    const { error } = await supabase.storage.from("game-images").remove([filePath])

    if (error) {
      console.error("Error deleting image:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting image:", error)
    return false
  }
}
