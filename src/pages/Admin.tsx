import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Lock, Users, MousePointerClick, Clock, AlertTriangle } from "lucide-react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [clicks, setClicks] = useState<Click[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_PASSWORD = "admin123"; // Apenas para demonstração educativa

  useEffect(() => {
    if (isAuthenticated) {
      loadClicks();
      
      // Atualizar a cada 5 segundos
      const interval = setInterval(loadClicks, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

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
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('Acesso concedido ao painel administrativo');
    } else {
      toast.error('Senha incorreta');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-PT');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-festive">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Lock className="w-12 h-12 text-primary" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Painel Administrativo
              </h1>
              <p className="text-sm text-muted-foreground">
                Apenas para fins educativos
              </p>
            </div>

            <Alert className="border-destructive/50 bg-destructive/5">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-sm font-bold">Projeto Educativo</AlertTitle>
              <AlertDescription className="text-xs">
                Este é um projeto académico de demonstração. Não utilize para fins reais de ataque.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Senha de administrador"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Dica: admin123
                </p>
              </div>

              <Button type="submit" className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </form>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Voltar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Cabeçalho */}
        <Card className="p-6 shadow-festive">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Painel Administrativo
                </h1>
                <p className="text-sm text-muted-foreground">
                  Simulação de Phishing - Projeto Educativo
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsAuthenticated(false);
                navigate('/');
              }}
            >
              Sair
            </Button>
          </div>
        </Card>

        {/* Alerta educativo */}
        <Alert className="border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-bold">⚠️ AVISO EDUCATIVO ⚠️</AlertTitle>
          <AlertDescription>
            Este painel é parte de um projeto académico de cibersegurança. Os dados apresentados 
            são completamente anónimos e não contêm informação pessoal. Esta ferramenta destina-se 
            exclusivamente a fins educativos e de demonstração.
            <strong className="block mt-2 text-destructive">
              NÃO UTILIZE para fins maliciosos ou ataques reais!
            </strong>
          </AlertDescription>
        </Alert>

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
                <p className="text-lg font-bold text-foreground">
                  {clicks.length > 0 ? 'Há poucos segundos' : 'Nenhum'}
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
              Histórico de Cliques Anónimos
            </h2>
          </div>

          {clicks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum clique registado ainda.</p>
              <p className="text-sm mt-2">Aguarde que alguém clique no link da campanha.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {clicks.map((click) => (
                <Card key={click.id} className="p-4 bg-muted/50">
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

        {/* Informação adicional */}
        <Card className="p-6 bg-primary/5 border-primary/30">
          <div className="space-y-3 text-sm">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Informação de Privacidade
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✅ Não são recolhidos emails, nomes ou passwords</li>
              <li>✅ IDs anónimos gerados automaticamente</li>
              <li>✅ Nenhuma informação pessoal identificável</li>
              <li>✅ Apenas timestamps e user agents básicos</li>
              <li>✅ Dados utilizados exclusivamente para fins educativos</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
