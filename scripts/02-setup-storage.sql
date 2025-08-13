-- Create storage bucket for game images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('game-images', 'game-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow anyone to view images
CREATE POLICY "Anyone can view game images" ON storage.objects
  FOR SELECT USING (bucket_id = 'game-images');

-- Create policy to allow anyone to upload images
CREATE POLICY "Anyone can upload game images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'game-images');

-- Create policy to allow users to update their own images
CREATE POLICY "Users can update their own game images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'game-images');

-- Create policy to allow users to delete their own images
CREATE POLICY "Users can delete their own game images" ON storage.objects
  FOR DELETE USING (bucket_id = 'game-images');
