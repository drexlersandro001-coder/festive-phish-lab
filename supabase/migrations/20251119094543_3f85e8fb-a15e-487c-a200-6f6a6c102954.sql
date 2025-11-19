-- Fix the search_path for get_phishing_stats function
CREATE OR REPLACE FUNCTION public.get_phishing_stats()
RETURNS TABLE (
  total_clicks BIGINT,
  unique_users BIGINT,
  last_click_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT 
    COUNT(*)::BIGINT as total_clicks,
    COUNT(DISTINCT anonymous_id)::BIGINT as unique_users,
    MAX(clicked_at) as last_click_at
  FROM public.phishing_clicks;
$$;