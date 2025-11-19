-- Drop the security definer view
DROP VIEW IF EXISTS public.phishing_stats;

-- Create a function to return aggregated stats instead
CREATE OR REPLACE FUNCTION public.get_phishing_stats()
RETURNS TABLE (
  total_clicks BIGINT,
  unique_users BIGINT,
  last_click_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE
SECURITY INVOKER
AS $$
  SELECT 
    COUNT(*)::BIGINT as total_clicks,
    COUNT(DISTINCT anonymous_id)::BIGINT as unique_users,
    MAX(clicked_at) as last_click_at
  FROM public.phishing_clicks;
$$;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION public.get_phishing_stats() TO anon, authenticated;