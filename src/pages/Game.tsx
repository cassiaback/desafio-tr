import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrafficIcon } from "@/components/TrafficIcon";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Clock, Target, CheckCircle, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import questionsData from "@/data/questions.json";

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  // Load questions on component mount
  useEffect(() => {
    // Shuffle questions and take 5 random ones for each game session
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
  }, []);

  // Early return if questions not loaded
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <TrafficIcon className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Carregando perguntas...</p>
        </div>
      </div>
    );
  }

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
    // Shuffle and get new set of questions
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
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

                <div className="space-y-4">
                  <div className="text-center">
                    {score >= questions.length * 0.8 ? (
                      <div className="space-y-2">
                        <Badge className="bg-gradient-primary text-white px-4 py-2 text-base">
                          🏆 Mestre do Trânsito
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Excelente! Você domina as leis de trânsito!
                        </p>
                      </div>
                    ) : score >= questions.length * 0.6 ? (
                      <div className="space-y-2">
                        <Badge variant="secondary" className="px-4 py-2 text-base">
                          👍 Intermediário
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Bom trabalho! Continue estudando!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="outline" className="px-4 py-2 text-base">
                          📚 Iniciante
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Que tal revisar o conteúdo e tentar novamente?
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg" 
                onClick={handleRestartGame}
                className="bg-gradient-primary text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Jogar Novamente
              </Button>
              <Link to="/estudar">
                <Button variant="secondary" size="lg">
                  <Target className="w-4 h-4 mr-2" />
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