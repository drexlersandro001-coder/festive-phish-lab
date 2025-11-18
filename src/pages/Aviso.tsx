import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Shield, BookOpen, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Aviso = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-destructive/10 via-background to-accent/10 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 md:p-12 shadow-xl border-2 border-destructive/30">
          <div className="text-center space-y-6">
            {/* Ícone de alerta */}
            <div className="flex justify-center">
              <div className="p-6 rounded-full bg-destructive/10 border-4 border-destructive/30">
                <AlertTriangle className="w-16 h-16 text-destructive" />
              </div>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-destructive">
                ⚠️ ATENÇÃO ⚠️
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Isto foi uma Simulação de Phishing!
              </h2>
            </div>

            {/* Alerta principal */}
            <Alert className="border-destructive/50 bg-destructive/5">
              <Shield className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">Projeto Educativo de Cibersegurança</AlertTitle>
              <AlertDescription className="text-base">
                Acabou de clicar num link de uma campanha de phishing simulada. 
                Não se preocupe - nenhum dado pessoal foi recolhido!
              </AlertDescription>
            </Alert>

            {/* Explicação educativa */}
            <div className="text-left space-y-6 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">O que é Phishing?</h3>
                  <p className="text-muted-foreground">
                    Phishing é uma técnica de engenharia social onde atacantes criam páginas 
                    falsas que imitam sites legítimos para roubar informações sensíveis como 
                    passwords, dados bancários ou informação pessoal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Época Festiva = Maior Risco</h3>
                  <p className="text-muted-foreground">
                    Durante o Natal e Ano Novo, os criminosos aproveitam a época festiva para 
                    criar campanhas falsas de promoções, sorteios e vouchers. A excitação das 
                    festas torna as pessoas mais vulneráveis a clicar em links suspeitos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Como se Proteger?</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Verifique sempre o URL do site antes de clicar</li>
                    <li>Desconfie de promoções "boas demais para ser verdade"</li>
                    <li>Nunca partilhe passwords ou dados pessoais em links suspeitos</li>
                    <li>Use autenticação de dois fatores sempre que possível</li>
                    <li>Confirme a legitimidade de emails e mensagens promocionais</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Informação do projeto */}
            <Alert className="border-primary/50 bg-primary/5">
              <BookOpen className="h-5 w-5" />
              <AlertTitle className="text-lg font-bold">Sobre este Projeto</AlertTitle>
              <AlertDescription className="text-base text-left">
                <p className="mb-3">
                  Esta é uma simulação educativa desenvolvida para um projeto académico de 
                  cibersegurança. O objetivo é demonstrar como campanhas de phishing funcionam 
                  e aumentar a consciencialização sobre segurança digital.
                </p>
                <p className="font-semibold text-primary">
                  ✅ Nenhum dado pessoal foi recolhido
                  <br />
                  ✅ Apenas foi registado o clique de forma anónima
                  <br />
                  ✅ Esta aplicação é exclusivamente para fins educativos
                </p>
              </AlertDescription>
            </Alert>

            {/* Botão de retorno */}
            <Button
              size="lg"
              onClick={() => navigate('/')}
              className="w-full md:w-auto px-8 py-6 text-lg font-bold"
            >
              <Home className="mr-2 h-5 w-5" />
              Voltar à Página Inicial
            </Button>

            {/* Nota de rodapé */}
            <p className="text-xs text-muted-foreground italic">
              Projeto académico de cibersegurança • Apenas para fins educativos
              <br />
              Não utilize este código para fins maliciosos ou ilegais
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Aviso;
