import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { testApi } from '../api/tests';

const PracticeConfig = () => {
  const { domain } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStart = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { test: mockTest } = await testApi.generateTest(
        domain || 'General',
        topic,
        questionCount
      );

      navigate('/test', { state: { mockTest } });
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to generate test. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const domainDisplayName =
    domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : 'General';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-500">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-all font-display font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="size-4" />
          Return Home
        </button>

        {/* Main Card */}
        <div className="relative bg-base-200/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6)] p-10 border border-primary/20">

          {/* Header */}
          <div className="flex items-center gap-5 mb-12">
            <div className="bg-primary/20 p-4 rounded-2xl border border-primary/30 shadow-inner">
              <BookOpen className="text-primary size-8" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-base-content tracking-tight">
                Practice Suite
              </h2>
              <p className="text-primary/60 font-semibold uppercase text-xs tracking-[0.25em] mt-1">
                {domainDisplayName} Domain
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleStart} className="space-y-10">

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-display font-bold text-primary mb-3 uppercase tracking-widest">
                Knowledge Focus
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Quantum Physics, Web APIs, UPSC History..."
                className="w-full px-6 py-4 rounded-2xl border border-primary/20 bg-base-100 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-base-content font-medium placeholder-muted/30"
              />
              <p className="text-[10px] text-muted mt-3 font-semibold uppercase tracking-wider">
                AlgoArena AI will generate topic-specific questions
              </p>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-xs font-display font-bold text-primary mb-4 uppercase tracking-widest">
                Evaluation Depth
              </label>
              <div className="grid grid-cols-4 gap-4">
                {[5, 10, 15, 20].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-xl border-2 transition-all font-display font-bold text-sm ${
                      questionCount === count
                        ? 'bg-primary text-base-100 border-primary shadow-lg shadow-primary/30 scale-105'
                        : 'bg-base-100 text-muted border-primary/10 hover:border-primary/40 hover:scale-[1.03]'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/30 rounded-2xl text-xs font-bold font-display uppercase tracking-wider">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-base-100 py-5 rounded-2xl font-display font-black shadow-2xl shadow-primary/40 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 uppercase tracking-[0.25em]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  Synthesizing
                </>
              ) : (
                <>
                  <Sparkles className="size-6" />
                  Initialize Test
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PracticeConfig;
