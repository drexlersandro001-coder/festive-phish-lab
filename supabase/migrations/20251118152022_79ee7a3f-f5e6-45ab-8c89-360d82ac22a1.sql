-- Criar tabela para registar cliques anónimos da simulação de phishing educativa
CREATE TABLE public.phishing_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anonymous_id TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT
);

-- Criar índice para melhor performance
CREATE INDEX idx_phishing_clicks_anonymous_id ON public.phishing_clicks(anonymous_id);
CREATE INDEX idx_phishing_clicks_clicked_at ON public.phishing_clicks(clicked_at DESC);

-- Ativar Row Level Security
ALTER TABLE public.phishing_clicks ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (qualquer pessoa pode clicar)
CREATE POLICY "Permitir inserção pública de cliques"
ON public.phishing_clicks
FOR INSERT
TO anon
WITH CHECK (true);

-- Política para permitir leitura pública (para o painel admin)
CREATE POLICY "Permitir leitura pública de cliques"
ON public.phishing_clicks
FOR SELECT
TO anon
USING (true);

-- Adicionar comentários para documentação
COMMENT ON TABLE public.phishing_clicks IS 'Tabela para projeto educativo de simulação de phishing - regista apenas cliques anónimos';
COMMENT ON COLUMN public.phishing_clicks.anonymous_id IS 'ID anónimo gerado pelo cliente - não contém informação pessoal';
COMMENT ON COLUMN public.phishing_clicks.clicked_at IS 'Timestamp do clique';
COMMENT ON COLUMN public.phishing_clicks.user_agent IS 'User agent do browser (opcional)';
COMMENT ON COLUMN public.phishing_clicks.ip_address IS 'Endereço IP (opcional e anónimo)';