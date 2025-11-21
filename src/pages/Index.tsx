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
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-10 animate-float">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <div className="absolute bottom-40 left-10 animate-float" style={{ animationDelay: '1s' }}>
          <Star className="w-10 h-10 text-accent" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <TreePine className="w-8 h-8 text-secondary" />
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Gift className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">Promoção Oficial</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Grande Sorteio de<br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Fim de Ano
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Participe no nosso sorteio exclusivo e concorra a prémios no valor total de <span className="font-bold text-foreground">475.000 Kz</span>
            </p>
          </div>

          {/* Main Card */}
          <Card className="overflow-hidden shadow-2xl bg-card border-border animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="p-8 md:p-12 lg:p-16 space-y-10">
              
              {/* Prémios */}
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                  Prémios do Sorteio
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                      1º
                    </div>
                    <div className="text-5xl mb-4 text-center">🏆</div>
                    <h3 className="font-bold text-xl mb-2 text-center text-foreground">Grande Prémio</h3>
                    <p className="text-3xl font-extrabold text-center text-primary">250.000 Kz</p>
                    <p className="text-sm text-center text-muted-foreground mt-2">em vouchers</p>
                  </div>
                  
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold shadow-lg">
                      2º
                    </div>
                    <div className="text-5xl mb-4 text-center">⭐</div>
                    <h3 className="font-bold text-xl mb-2 text-center text-foreground">Segundo Prémio</h3>
                    <p className="text-3xl font-extrabold text-center text-accent-foreground">150.000 Kz</p>
                    <p className="text-sm text-center text-muted-foreground mt-2">em vouchers</p>
                  </div>
                  
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-secondary/5 to-secondary/10 border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:scale-105">
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold shadow-lg">
                      3º
                    </div>
                    <div className="text-5xl mb-4 text-center">🎁</div>
                    <h3 className="font-bold text-xl mb-2 text-center text-foreground">Terceiro Prémio</h3>
                    <p className="text-3xl font-extrabold text-center text-secondary">75.000 Kz</p>
                    <p className="text-sm text-center text-muted-foreground mt-2">em vouchers</p>
                  </div>
                </div>
              </div>

              {/* Separador */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Como participar?</span>
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-6 text-center">
                <div className="space-y-3">
                  <p className="text-lg text-foreground font-medium">
                    É simples e rápido! Clique no botão abaixo para registar a sua participação.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    O sorteio será realizado no dia 31 de Dezembro de 2025
                  </p>
                </div>

                {/* Main CTA Button - DESTACADO */}
                <div className="pt-4">
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto px-16 py-8 text-2xl font-bold shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-110 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right animate-pulse hover:animate-none"
                    onClick={handleParticipate}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-3">
                        <div className="w-6 h-6 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        A processar...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <Gift className="h-7 w-7" />
                        Participar Agora
                        <Sparkles className="h-7 w-7" />
                      </span>
                    )}
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>100% Gratuito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Sem sorteios ocultos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Resultados públicos</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-4 border-t border-border/50 max-w-2xl mx-auto">
                  Ao participar, concorda com os nossos termos e condições. Promoção válida apenas para residentes em Angola. Os vencedores serão contactados por email.
                </p>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="pt-8 animate-in fade-in duration-700 delay-300">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 space-y-2">
                  <TreePine className="w-8 h-8 mx-auto text-secondary" />
                  <h4 className="font-semibold text-sm text-foreground">Prémios Garantidos</h4>
                  <p className="text-xs text-muted-foreground">Sorteio 100% transparente e verificável</p>
                </div>
                <div className="p-4 space-y-2">
                  <Star className="w-8 h-8 mx-auto text-accent" />
                  <h4 className="font-semibold text-sm text-foreground">Participação Gratuita</h4>
                  <p className="text-xs text-muted-foreground">Sem custos ou taxas escondidas</p>
                </div>
                <div className="p-4 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-primary" />
                  <h4 className="font-semibold text-sm text-foreground">Fácil e Rápido</h4>
                  <p className="text-xs text-muted-foreground">Apenas um clique para participar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
