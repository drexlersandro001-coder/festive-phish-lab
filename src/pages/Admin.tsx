import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Users, MousePointerClick, Clock, AlertTriangle, LogOut, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Click {
  id: string;
  anonymous_id: string;
  clicked_at: string;
  user_agent: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clicks, setClicks] = useState<Click[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (roleError || !roleData) {
        toast.error("Você não tem permissão de administrador");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      loadClicks();
      
      // Atualizar a cada 5 segundos
      const interval = setInterval(loadClicks, 5000);
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Erro ao verificar acesso:', error);
      navigate("/auth");
    } finally {
      setIsLoading(false);
    }
  };

  const loadClicks = async () => {
    try {
      const { data, error } = await supabase
        .from('phishing_clicks')
        .select('*')
        .order('clicked_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar cliques:', error);
        return;
      }
      setClicks(data || []);
    } catch (error) {
      console.error('Erro ao carregar cliques:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada");
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-PT');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <Card className="p-8">
          <p className="text-muted-foreground">A carregar...</p>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Cabeçalho */}
        <Card className="p-6 shadow-festive">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Painel Administrativo
                </h1>
                <p className="text-sm text-muted-foreground">
                  Monitoramento de campanhas educativas
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </Card>

        {/* Aviso Educativo */}
        <Alert className="border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="font-bold">Projeto Educativo</AlertTitle>
          <AlertDescription>
            Este é um projeto académico de demonstração. Não utilize para fins reais de ataque.
          </AlertDescription>
        </Alert>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6">
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
                  {clicks.length > 0 ? formatDate(clicks[0].clicked_at) : 'N/A'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-chart-1/10">
                <Activity className="w-8 h-8 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Clique</p>
                <p className="text-3xl font-bold text-foreground">
                  {clicks.length > 0 ? '100%' : '0%'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de Cliques */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Cliques Detalhados
          </h2>
          
          {clicks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum clique registado ainda.
            </p>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {clicks.map((click) => (
                <Card key={click.id} className="p-4 bg-muted/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">ID Anónimo</p>
                      <p className="font-mono text-foreground truncate">
                        {click.anonymous_id.substring(0, 8)}...
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data e Hora</p>
                      <p className="font-medium text-foreground">
                        {formatDate(click.clicked_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Navegador</p>
                      <p className="font-medium text-foreground truncate">
                        {click.user_agent ? 
                          click.user_agent.split(' ').slice(0, 3).join(' ') + '...' : 
                          'N/A'
                        }
                      </p>
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

export default Admin;
