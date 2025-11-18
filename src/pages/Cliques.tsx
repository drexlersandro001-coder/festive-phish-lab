import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MousePointerClick, Clock, Users, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Click {
  id: string;
  anonymous_id: string;
  clicked_at: string;
  user_agent: string | null;
}

const Cliques = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState<Click[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClicks();
    
    // Atualizar a cada 5 segundos
    const interval = setInterval(loadClicks, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadClicks = async () => {
    try {
      const { data, error } = await supabase
        .from('phishing_clicks')
        .select('*')
        .order('clicked_at', { ascending: false });

      if (error) throw error;
      setClicks(data || []);
    } catch (error) {
      console.error('Erro ao carregar cliques:', error);
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
                  Lista de Cliques
                </h1>
                <p className="text-sm text-muted-foreground">
                  Visualização pública dos cliques registados
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
                <p className="text-3xl font-bold text-foreground">{clicks.length}</p>
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
                  {new Set(clicks.map(c => c.anonymous_id)).size}
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
                <p className="text-sm font-bold text-foreground">
                  {clicks.length > 0 ? formatDate(clicks[0].clicked_at) : 'Nenhum'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de cliques */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <MousePointerClick className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Histórico de Cliques
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-50 animate-pulse" />
              <p>A carregar dados...</p>
            </div>
          ) : clicks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum clique registado ainda.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {clicks.map((click) => (
                <Card key={click.id} className="p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ID Anónimo</p>
                      <p className="font-mono text-xs truncate">{click.anonymous_id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Data/Hora</p>
                      <p className="font-medium">{formatDate(click.clicked_at)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">User Agent</p>
                      <p className="text-xs truncate">{click.user_agent || 'N/A'}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Cliques;
