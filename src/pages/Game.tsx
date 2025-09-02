import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrafficIcon } from "@/components/TrafficIcon";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Clock, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Exemplo de perguntas baseadas em leis reais do trânsito
  const questions = [
    {
      id: 1,
      question: "Qual é a velocidade máxima permitida em vias urbanas, salvo sinalização em contrário?",
      options: [
        "40 km/h",
        "50 km/h", 
        "60 km/h",
        "70 km/h"
      ],
      correct: 2,
      explanation: "Segundo o Art. 61 do CTB, a velocidade máxima em vias urbanas é de 60 km/h, salvo sinalização em contrário.",
      reference: "CTB - Art. 61, Inc. I"
    },
    {
      id: 2,
      question: "É obrigatório o uso do cinto de segurança para:",
      options: [
        "Apenas o condutor",
        "Condutor e passageiro da frente",
        "Todos os ocupantes do veículo",
        "Apenas em rodovias"
      ],
      correct: 2,
      explanation: "O Art. 65 do CTB determina que é obrigatório o uso do cinto de segurança para condutor e passageiros em todas as vias do território nacional.",
      reference: "CTB - Art. 65"
    },
    {
      id: 3,
      question: "A faixa de pedestres deve ser respeitada em que distância?",
      options: [
        "5 metros antes",
        "3 metros antes",
        "Na própria faixa apenas",
        "Não há distância específica"
      ],
      correct: 0,
      explanation: "Segundo o CTB, é proibido estacionar a menos de 5 metros das esquinas e da faixa de pedestres.",
      reference: "CTB - Art. 181, Inc. XVII"
    }
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQ.correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const handleRestartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isGameFinished = currentQuestion === questions.length - 1 && showResult;

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
            <h1 className="text-lg font-semibold">Quiz de Trânsito</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {score} pontos
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              {currentQuestion + 1}/{questions.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isGameFinished ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progresso do Quiz</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="p-8">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Questão {currentQuestion + 1} de {questions.length}</span>
                </div>
                <CardTitle className="text-2xl leading-relaxed">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentQ.correct
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : "border-primary bg-primary/5"
                        : showResult && index === currentQ.correct
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                        selectedAnswer === index
                          ? showResult
                            ? index === currentQ.correct
                              ? "border-primary bg-primary text-white"
                              : "border-destructive bg-destructive text-white"
                            : "border-primary bg-primary text-white"
                          : showResult && index === currentQ.correct
                          ? "border-primary bg-primary text-white"
                          : "border-muted-foreground"
                      }`}>
                        {showResult && index === currentQ.correct ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="text-base">{option}</span>
                    </div>
                  </button>
                ))}

                {showResult && (
                  <div className="mt-6 p-4 rounded-lg bg-muted/50 border animate-slide-up">
                    <h4 className="font-semibold mb-2 text-primary">Explicação:</h4>
                    <p className="text-muted-foreground mb-3">{currentQ.explanation}</p>
                    <Badge variant="outline" className="text-xs">
                      {currentQ.reference}
                    </Badge>
                  </div>
                )}

                {selectedAnswer !== null && !showResult && (
                  <Button 
                    onClick={handleNextQuestion}
                    variant="game" 
                    size="lg" 
                    className="w-full mt-6"
                  >
                    {currentQuestion === questions.length - 1 ? "Finalizar Quiz" : "Próxima Questão"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          // Results Screen
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-bounce-in">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold">Quiz Finalizado!</h1>
              <p className="text-xl text-muted-foreground">
                Parabéns! Você completou o quiz de trânsito.
              </p>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-primary">{score}</div>
                    <div className="text-sm text-muted-foreground">Respostas Corretas</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-secondary">
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Aproveitamento</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    {score >= questions.length * 0.8 ? (
                      <Badge variant="default" className="bg-gradient-primary text-white">
                        🏆 Excelente! Você domina as leis de trânsito!
                      </Badge>
                    ) : score >= questions.length * 0.6 ? (
                      <Badge variant="secondary">
                        👍 Bom trabalho! Continue estudando!
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        📚 Que tal revisar o conteúdo e tentar novamente?
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="game" size="lg" onClick={handleRestartGame}>
                Jogar Novamente
              </Button>
              <Link to="/estudar">
                <Button variant="secondary" size="lg">
                  Estudar Leis
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;