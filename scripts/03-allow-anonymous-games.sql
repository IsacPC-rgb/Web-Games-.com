-- Permitir jogos anônimos (user_id pode ser NULL)
ALTER TABLE public.games 
ALTER COLUMN user_id DROP NOT NULL;

-- Atualizar políticas RLS para permitir jogos anônimos
DROP POLICY IF EXISTS "Users can insert their own games" ON public.games;
DROP POLICY IF EXISTS "Users can update their own games" ON public.games;
DROP POLICY IF EXISTS "Users can delete their own games" ON public.games;

-- Nova política: qualquer pessoa pode inserir jogos (incluindo anônimos)
CREATE POLICY "Anyone can insert games" ON public.games
    FOR INSERT WITH CHECK (true);

-- Nova política: apenas donos autenticados podem atualizar seus jogos
CREATE POLICY "Users can update their own games" ON public.games
    FOR UPDATE USING (auth.uid() = user_id);

-- Nova política: apenas donos autenticados podem deletar seus jogos  
CREATE POLICY "Users can delete their own games" ON public.games
    FOR DELETE USING (auth.uid() = user_id);

-- Comentário para identificar jogos anônimos vs autenticados
COMMENT ON COLUMN public.games.user_id IS 'ID do usuário que criou o jogo. NULL para jogos anônimos.';
