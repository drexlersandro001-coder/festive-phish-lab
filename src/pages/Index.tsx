import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Sparkles, Star, TreePine } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleParticipate = async () => {
    setIsLoading(true);
    
    try {
      // Gerar ID anónimo único
      const anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      // Registar o clique
      const { error } = await supabase
        .from('phishing_clicks')
        .insert({
          anonymous_id: anonymousId,
          user_agent: navigator.userAgent,
          ip_address: 'anonymous', // Não recolhemos IPs reais por questões de privacidade
        });

      if (error) throw error;

      // Redirecionar para página de aviso educativo
      navigate('/aviso');
    } catch (error) {
      console.error('Erro ao registar clique:', error);
      toast.error('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Flocos de neve decorativos (SVG patterns) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 animate-float">
          <Star className="w-8 h-8 text-accent" />
        </div>
        <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
          <TreePine className="w-10 h-10 text-secondary" />
        </div>
        <div className="absolute bottom-32 right-32 animate-float" style={{ animationDelay: '1.5s' }}>
          <Star className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Cabeçalho */}
          <div className="space-y-4 animate-in fade-in slide-in-from-top duration-700">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-12 h-12 text-primary animate-sparkle" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Natal & Ano Novo
              </h1>
              <Gift className="w-12 h-12 text-secondary animate-sparkle" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Grande Concurso de Fim de Ano! 🎉
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Celebre connosco esta época festiva e ganhe prémios exclusivos!
            </p>
          </div>

          {/* Card principal */}
          <Card className="p-8 md:p-12 shadow-festive backdrop-blur-sm bg-card/95 border-2 border-accent/20 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="space-y-6">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-full shadow-gold">
                <p className="text-primary-foreground font-bold text-lg">
                  🎁 SORTEIO ESPECIAL 🎁
                </p>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Ganhe Prémios Incríveis!
              </h3>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-4xl mb-3">🎄</div>
                  <h4 className="font-bold text-lg mb-2">1º Prémio</h4>
                  <p className="text-muted-foreground">Voucher de 250.000 Kz</p>
                </div>
                
                <div className="p-6 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="text-4xl mb-3">⭐</div>
                  <h4 className="font-bold text-lg mb-2">2º Prémio</h4>
                  <p className="text-muted-foreground">Voucher de 150.000 Kz</p>
                </div>
                
                <div className="p-6 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="text-4xl mb-3">🎊</div>
                  <h4 className="font-bold text-lg mb-2">3º Prémio</h4>
                  <p className="text-muted-foreground">Voucher de 75.000 Kz</p>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  ✨ Participe agora e habilite-se a ganhar!
                </p>
                <p className="text-sm">
                  Promoção válida até 31 de Dezembro de 2025
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full md:w-auto px-12 py-6 text-xl font-bold shadow-festive hover:shadow-gold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={handleParticipate}
                disabled={isLoading}
              >
                {isLoading ? (
                  "A processar..."
                ) : (
                  <>
                    <Gift className="mr-2 h-6 w-6" />
                    Participar no Sorteio
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Ao participar, concorda com os termos e condições
              </p>
            </div>
          </Card>

          {/* Rodapé com destaque */}
          <div className="mt-12 space-y-4">
            <div className="p-6 rounded-lg bg-muted/50 backdrop-blur-sm animate-in fade-in duration-700 delay-300">
              <p className="text-sm text-muted-foreground text-center">
                🎅 Não perca esta oportunidade única de celebrar as festas com prémios especiais! 🎅
              </p>
            </div>
            
            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/cliques')}
                className="text-xs"
              >
                Ver Lista de Participações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
