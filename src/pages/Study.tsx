import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrafficIcon } from "@/components/TrafficIcon";
import { 
  ArrowLeft, 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Gavel, 
  Shield,
  AlertTriangle,
  Car,
  Users,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const Study = () => {
  const studyTopics = [
    {
      icon: Gavel,
      title: "Código de Trânsito Brasileiro (CTB)",
      description: "Lei completa que rege o trânsito no Brasil com todas as regras e penalidades.",
      topics: ["Normas gerais", "Sistema Nacional de Trânsito", "Normas de circulação", "Infrações e penalidades"],
      link: "https://www.planalto.gov.br/ccivil_03/leis/l9503.htm",
      color: "primary"
    },
    {
      icon: Shield,
      title: "DETRAN/SC - Legislação",
      description: "Regulamentações específicas de Santa Catarina e procedimentos do DETRAN/SC.",
      topics: ["Habilitação", "Licenciamento", "Infrações SC", "Recursos e multas"],
      link: "https://www.detran.sc.gov.br/servicos/carteira-de-motorista/provas-online",
      color: "secondary"
    },
    {
      icon: FileText,
      title: "Resoluções CONTRAN",
      description: "Resoluções do Conselho Nacional de Trânsito que complementam o CTB.",
      topics: ["Sinalização", "Equipamentos", "Procedimentos", "Normas técnicas"],
      link: "https://www.gov.br/infraestrutura/pt-br/assuntos/transito",
      color: "accent"
    }
  ];

  const quickTopics = [
    {
      icon: AlertTriangle,
      title: "Infrações e Penalidades",
      description: "Entenda as diferentes categorias de infrações e suas consequências.",
      items: [
        "Infrações leves: multa de R$ 88,38",
        "Infrações médias: multa de R$ 130,16", 
        "Infrações graves: multa de R$ 195,23",
        "Infrações gravíssimas: multa de R$ 293,47"
      ]
    },
    {
      icon: Car,
      title: "Velocidades Permitidas",
      description: "Limites de velocidade em diferentes tipos de vias.",
      items: [
        "Vias urbanas: até 60 km/h",
        "Vias rurais: até 60 km/h",
        "Rodovias: até 110 km/h",
        "Autoestradas: até 120 km/h"
      ]
    },
    {
      icon: Users,
      title: "Direitos e Deveres",
      description: "Principais obrigações de condutores e pedestres.",
      items: [
        "Uso obrigatório do cinto de segurança",
        "Respeitar sinalização de trânsito",
        "Dar preferência ao pedestre na faixa",
        "Manter distância segura entre veículos"
      ]
    },
    {
      icon: MapPin,
      title: "Sinalização de Trânsito",
      description: "Tipos de placas e seus significados.",
      items: [
        "Placas de regulamentação (circular)",
        "Placas de advertência (triangular)",
        "Placas de indicação (retangular)",
        "Semáforos e gestos dos agentes"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
            <TrafficIcon className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Estudar Leis de Trânsito</h1>
          </div>
          <Link to="/jogo">
            <Button variant="game" size="sm">
              Fazer Quiz
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Central de Estudos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Acesse o conteúdo oficial das leis de trânsito brasileiras. 
            Todo material é baseado em fontes governamentais confiáveis.
          </p>
        </div>

        {/* Official Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Fontes Oficiais</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {studyTopics.map((topic, index) => (
              <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    topic.color === 'primary' ? 'bg-gradient-primary' :
                    topic.color === 'secondary' ? 'bg-gradient-secondary' :
                    'bg-gradient-warning'
                  }`}>
                    <topic.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {topic.topics.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a 
                    href={topic.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full group/btn">
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Acessar Fonte Oficial
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Study Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Tópicos de Estudo Rápido</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <topic.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{topic.title}</CardTitle>
                      <CardDescription className="text-sm">{topic.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {topic.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-8">
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-accent-foreground">Importante</h3>
                  <p className="text-sm text-muted-foreground">
                    Todas as informações nesta plataforma são baseadas em fontes oficiais do governo brasileiro. 
                    Para informações mais recentes ou casos específicos, sempre consulte diretamente os órgãos competentes: 
                    DETRAN/SC, CONTRAN e a legislação federal vigente.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline" className="text-xs">Atualizado em 2024</Badge>
                    <Badge variant="outline" className="text-xs">Fonte: Gov. Federal</Badge>
                    <Badge variant="outline" className="text-xs">DETRAN/SC</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Pronto para testar seus conhecimentos?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jogo">
              <Button variant="hero" size="lg">
                Fazer Quiz Agora
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;