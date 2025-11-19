import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MousePointerClick, Clock, Users, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface PhishingStats {
  total_clicks: number;
  unique_users: number;
  last_click_at: string | null;
}

const Cliques = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<PhishingStats>({
    total_clicks: 0,
    unique_users: 0,
    last_click_at: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
    
    // Atualizar a cada 5 segundos
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_phishing_stats');

      if (error) {
        console.error('Erro ao carregar estatísticas:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setStats({
          total_clicks: data[0].total_clicks || 0,
          unique_users: data[0].unique_users || 0,
          last_click_at: data[0].last_click_at,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Cabeçalho */}
        <Card className="p-6 shadow-festive">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Estatísticas Públicas
                </h1>
                <p className="text-sm text-muted-foreground">
                  Visualização agregada dos cliques registados
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Voltar ao Início
            </Button>
          </div>
        </Card>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MousePointerClick className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Cliques</p>
                <p className="text-3xl font-bold text-foreground">{stats.total_clicks}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-secondary/10">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Utilizadores Únicos</p>
                <p className="text-3xl font-bold text-foreground">
                  {stats.unique_users}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/10">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Último Clique</p>
                <p className="text-lg font-bold text-foreground">
                  {stats.last_click_at ? formatDate(stats.last_click_at) : 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Informação sobre privacidade */}
        <Card className="p-6 shadow-lg bg-muted/30">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Sobre as Estatísticas
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Esta página exibe apenas estatísticas agregadas para proteger a privacidade dos participantes.
            </p>
            <p>
              Os dados individuais de cliques estão protegidos e só podem ser acedidos por administradores autenticados.
            </p>
            <p className="font-medium text-foreground">
              Este é um projeto educativo sobre sensibilização para phishing.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cliques;
