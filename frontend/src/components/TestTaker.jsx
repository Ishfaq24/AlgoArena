import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Timer,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  Home,
} from 'lucide-react';

const TestTaker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // Hooks
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Initialize answers & timer
  useEffect(() => {
    if (state && state.mockTest) {
      setUserAnswers(new Array(state.mockTest.questions.length).fill(null));
      setTimeLeft(state.mockTest.questions.length * 60);
    }
  }, [state]);

  // Timer logic
  useEffect(() => {
    if (!state?.mockTest || isSubmitted || timeLeft <= 0) {
      if (timeLeft === 0 && !isSubmitted && state?.mockTest) {
        setIsSubmitted(true);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft, state]);

  // Redirect if no test data
  useEffect(() => {
    if (!state || !state.mockTest) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  // Score calculation
  const score = useMemo(() => {
    if (!state?.mockTest) return 0;
    return userAnswers.reduce((acc, ans, idx) => {
      return ans === state.mockTest.questions[idx].correctAnswerIndex
        ? acc + 1
        : acc;
    }, 0);
  }, [userAnswers, state]);

  // Safeguard render
  if (!state || !state.mockTest || userAnswers.length === 0) {
    return null;
  }

  const { mockTest } = state;
  const currentQuestion = mockTest.questions[currentQuestionIndex];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    const updated = [...userAnswers];
    updated[currentQuestionIndex] = index;
    setUserAnswers(updated);
  };

  const handleSubmit = () => {
    if (
      window.confirm(
        'Confirm your submission. All unanswered questions will be marked incorrect.'
      )
    ) {
      setIsSubmitted(true);
    }
  };

  /* ---------- RESULT SCREEN ---------- */
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="bg-base-200/80 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden mb-12 border border-primary/20">
          <div className="bg-primary p-12 text-center text-base-100">
            <Trophy className="size-20 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-display font-black mb-3 uppercase">
              Evaluation Complete
            </h2>

            <div className="mt-10 flex justify-center gap-16">
              <div className="bg-base-100/10 px-8 py-4 rounded-3xl">
                <div className="text-5xl font-display font-black">
                  {score}/{mockTest.questions.length}
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mt-2">
                  Accuracy Raw
                </div>
              </div>

              <div className="bg-base-100/10 px-8 py-4 rounded-3xl">
                <div className="text-5xl font-display font-black">
                  {Math.round(
                    (score / mockTest.questions.length) * 100
                  )}
                  %
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-60 mt-2">
                  Mastery Index
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 space-y-16">
            <h3 className="text-2xl font-display font-bold border-b border-primary/20 pb-6 uppercase">
              Logical Analysis
            </h3>

            {mockTest.questions.map((q, idx) => (
              <div key={q.id} className="space-y-6">
                <div className="flex gap-6">
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center font-display font-black ${
                      userAnswers[idx] === q.correctAnswerIndex
                        ? 'bg-primary text-base-100'
                        : 'bg-red-500/20 text-red-500 border border-red-500/40'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-display font-bold mb-6">
                      {q.text}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-4 rounded-2xl border text-sm ${
                            optIdx === q.correctAnswerIndex
                              ? 'bg-primary/10 border-primary/60 text-primary'
                              : optIdx === userAnswers[idx]
                              ? 'bg-red-500/10 border-red-500/40 text-red-400'
                              : 'bg-base-100 border-primary/10 text-muted'
                          }`}
                        >
                          <div className="flex justify-between">
                            {opt}
                            {optIdx === q.correctAnswerIndex && (
                              <CheckCircle2 className="size-5 text-primary" />
                            )}
                            {optIdx === userAnswers[idx] &&
                              optIdx !== q.correctAnswerIndex && (
                                <XCircle className="size-5 text-red-400" />
                              )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-6 bg-primary/5 border border-primary/10 rounded-2xl italic text-sm">
                      <span className="block text-primary font-display font-black uppercase text-[10px] mb-2">
                        Cognitive Explanation
                      </span>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-10 bg-primary/5 border-t border-primary/20 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 bg-primary text-base-100 px-10 py-4 rounded-2xl font-display font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              <Home className="size-5" />
              Terminal Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- ACTIVE TEST ---------- */
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-6 mb-10 bg-base-200/60 backdrop-blur-xl p-8 rounded-[2rem] border border-primary/20">
        <div>
          <h2 className="text-2xl font-display font-bold">
            {mockTest.title}
          </h2>
          <p className="text-[10px] uppercase tracking-widest opacity-60">
            Section Progress: {currentQuestionIndex + 1} /{' '}
            {mockTest.questions.length}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-display font-black ${
              timeLeft < 60
                ? 'bg-red-500/10 text-red-500 border-red-500/50 animate-pulse'
                : 'bg-base-100 text-primary border-primary/20'
            }`}
          >
            <Timer className="size-5" />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-primary text-base-100 px-8 py-3 rounded-2xl font-display font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-primary/10 h-3 rounded-full mb-12 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-700"
          style={{
            width: `${
              ((currentQuestionIndex + 1) /
                mockTest.questions.length) *
              100
            }%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="bg-base-200/80 backdrop-blur-xl rounded-[3rem] border border-primary/20 shadow-2xl min-h-[500px] flex flex-col">
        <div className="p-10 flex-1">
          <h3 className="text-3xl font-display font-bold mb-12">
            {currentQuestion.text}
          </h3>

          <div className="grid gap-5">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-6 rounded-3xl border-2 text-left transition-all ${
                  userAnswers[currentQuestionIndex] === idx
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/10 bg-base-100/50 hover:border-primary/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-8 bg-primary/5 border-t border-primary/10 flex justify-between">
          <button
            onClick={() =>
              setCurrentQuestionIndex((p) => Math.max(0, p - 1))
            }
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl uppercase text-xs disabled:opacity-20"
          >
            <ChevronLeft className="size-5" />
            Previous
          </button>

          <button
            onClick={() => {
              if (
                currentQuestionIndex <
                mockTest.questions.length - 1
              ) {
                setCurrentQuestionIndex((p) => p + 1);
              } else {
                handleSubmit();
              }
            }}
            className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-primary text-base-100 font-display font-black uppercase text-xs tracking-widest"
          >
            {currentQuestionIndex ===
            mockTest.questions.length - 1
              ? 'Finish'
              : 'Next'}
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestTaker;
