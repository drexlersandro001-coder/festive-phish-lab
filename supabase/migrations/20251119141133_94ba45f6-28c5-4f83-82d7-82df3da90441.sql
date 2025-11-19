-- Remover a política restritiva de SELECT apenas para admins
DROP POLICY IF EXISTS "Only admins can view clicks" ON public.phishing_clicks;

-- Criar nova política que permite SELECT público para a visualização educativa
CREATE POLICY "Allow public view of anonymous clicks"
ON public.phishing_clicks
FOR SELECT
USING (true);