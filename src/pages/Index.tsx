import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrafficIcon } from "@/components/TrafficIcon";
import { Trophy, BookOpen, Target, Users, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-traffic.jpg";

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "Quiz Interativo",
      description: "Perguntas baseadas em provas reais do DETRAN/SC com feedback imediato",
      link: "/jogo"
    },
    {
      icon: BookOpen,
      title: "Conteúdo Oficial",
      description: "Baseado no CTB, DETRAN/SC e resoluções do CONTRAN",
      link: "/estudar"
    },
    {
      icon: Trophy,
      title: "Gamificação",
      description: "Pontuação, medalhas e ranking para tornar o aprendizado divertido",
      link: "/jogo"
    },
    {
      icon: Users,
      title: "Para Todos",
      description: "Estudantes de autoescola, candidatos à CNH e motoristas experientes",
      link: "/estudar"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrafficIcon className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Desafio do Trânsito SC</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
            >
              Como Funciona
            </Button>
            <a href="https://www.detran.sc.gov.br/fale-conosco" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Contato
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5 pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Star className="w-4 h-4" />
                  <span>Baseado em Fontes Oficiais</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Domine as Leis de 
                  <span className="bg-gradient-hero bg-clip-text text-transparent"> Trânsito</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Aprenda e revise as leis de trânsito de Santa Catarina de forma 
                  interativa e divertida. Prepare-se para sua CNH ou aperfeiçoe seus conhecimentos!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/jogo">
                  <Button variant="hero" size="xl" className="group">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Iniciar Jogo
                  </Button>
                </Link>
                <Link to="/estudar">
                  <Button variant="secondary" size="xl">
                    <BookOpen className="w-5 h-5" />
                    Estudar Leis
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-secondary border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-warning border-2 border-background"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">+1.000 estudantes</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero rounded-3xl opacity-20 blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Desafio do Trânsito SC - Aprenda leis de trânsito de forma interativa"
                className="relative z-10 w-full h-auto rounded-3xl shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="como-funciona" className="py-20 bg-muted/30 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Por que escolher o Desafio do Trânsito SC?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma forma moderna e eficaz de aprender as leis de trânsito, 
              com conteúdo sempre atualizado e metodologia comprovada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="block">
                <Card className="relative group hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-hero rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold">
                Comece Agora Mesmo!
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Junte-se a milhares de estudantes que já estão dominando 
                as leis de trânsito de Santa Catarina de forma divertida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/jogo">
                  <Button variant="secondary" size="xl" className="bg-white text-foreground hover:bg-white/90">
                    <Play className="w-5 h-5" />
                    Começar Gratuitamente
                  </Button>
                </Link>
                <Link to="/estudar">
                  <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                    <BookOpen className="w-5 h-5" />
                    Ver Conteúdo
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Decorative traffic icons */}
            <div className="absolute top-4 left-4 opacity-20">
              <TrafficIcon className="w-16 h-16" variant="light" />
            </div>
            <div className="absolute bottom-4 right-4 opacity-20">
              <TrafficIcon className="w-12 h-12" variant="sign" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <TrafficIcon className="w-6 h-6 text-primary" />
              <span className="font-semibold">Desafio do Trânsito SC</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="https://www.planalto.gov.br/ccivil_03/leis/l9503.htm" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                CTB - Código de Trânsito Brasileiro
              </a>
              <a href="https://www.detran.sc.gov.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                DETRAN/SC
              </a>
              <a href="https://www.gov.br/infraestrutura/pt-br/assuntos/transito" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                CONTRAN
              </a>
            </div>
          </div>
          <div className="text-center pt-4 text-sm text-muted-foreground">
            <p>© 2024 Desafio do Trânsito SC. Conteúdo baseado em fontes oficiais brasileiras.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;