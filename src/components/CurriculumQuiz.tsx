import { useState } from "react";
import { CheckCircle2, CircleHelp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CurriculumQuizQuestion } from "@/lib/curriculum-data";

type CurriculumQuizProps = {
  questions: CurriculumQuizQuestion[];
  accentClass: string;
};

const CurriculumQuiz = ({ questions, accentClass }: CurriculumQuizProps) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const score = questions.reduce((total, question, index) => {
    return total + (answers[index] === question.correctIndex ? 1 : 0);
  }, 0);

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {questions.map((question, questionIndex) => (
        <div key={question.question} className="offset-card rounded-[1.6rem] bg-white p-5">
          <div className="flex items-start gap-3">
            <div className={`inline-flex rounded-full p-2 text-foreground ${accentClass}`}>
              <CircleHelp className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-foreground">
                {questionIndex + 1}. {question.question}
              </h3>
              <div className="mt-4 space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground"
                  >
                    <input
                      type="radio"
                      name={`quiz-${questionIndex}`}
                      checked={answers[questionIndex] === optionIndex}
                      onChange={() =>
                        setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))
                      }
                      className="mt-1"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {showResults ? (
                <div className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
                  <strong className="text-foreground">Explanation:</strong> {question.explanation}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}

      <div className="offset-card rounded-[1.6rem] bg-white p-5">
        {showResults ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-foreground">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">
                You got {score} out of {questions.length} correct.
              </span>
            </div>
            <Button variant="outline" onClick={resetQuiz}>
              <RotateCcw className="h-4 w-4" />
              Try again
            </Button>
          </div>
        ) : (
          <Button onClick={() => setShowResults(true)} disabled={Object.keys(answers).length < questions.length}>
            Check answers
          </Button>
        )}
      </div>
    </div>
  );
};

export default CurriculumQuiz;
