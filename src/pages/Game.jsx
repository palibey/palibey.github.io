import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import './Game.css';

export default function Game() {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('loading'); // loading, playing, gameover
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}questions.txt`)
            .then(res => res.text())
            .then(text => {
                const parsed = parseQuestions(text);
                setQuestions(parsed);
                setGameState('playing');
            })
            .catch(err => {
                console.error("Failed to load game dataset:", err);
            });
    }, []);

    const parseQuestions = (text) => {
        // Format: 
        // Q: Question text
        // - Option 1
        // - Option 2
        // A: Option 1
        // (Empty line)

        const lines = text.split('\\n').map(l => l.trim()).filter(l => l);
        const result = [];
        let currentQ = null;

        for (let line of lines) {
            if (line.startsWith('Q:')) {
                if (currentQ) result.push(currentQ);
                currentQ = { question: line.substring(2).trim(), options: [], answer: '' };
            } else if (line.startsWith('-')) {
                if (currentQ) currentQ.options.push(line.substring(1).trim());
            } else if (line.startsWith('A:')) {
                if (currentQ) currentQ.answer = line.substring(2).trim();
            }
        }
        if (currentQ) result.push(currentQ);
        return result;
    };

    const handleAnswer = (option) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(option);
        const correct = option === questions[currentIdx].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentIdx < questions.length - 1) {
                setCurrentIdx(i => i + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setGameState('gameover');
            }
        }, 1500);
    };

    const resetGame = () => {
        setCurrentIdx(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setGameState('playing');
    };

    if (gameState === 'loading') {
        return (
            <div className="flex-center h-full">
                <Loader2 className="animate-spin text-secondary" size={48} />
            </div>
        );
    }

    if (gameState === 'gameover') {
        return (
            <div className="game-container animate-fade-in-up flex-center flex-col">
                <h1 className="page-title text-gradient">Game Over!</h1>
                <div className="score-card glass-panel">
                    <h2>Final Score</h2>
                    <div className="score-number">{score} / {questions.length}</div>
                    <p>You correctly answered {Math.round((score / questions.length) * 100)}% of the questions.</p>
                    <button className="btn-primary mt-4" onClick={resetGame}>Play Again</button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIdx];

    if (!currentQuestion) {
        return <div className="game-container flex-center">No questions found.</div>;
    }

    return (
        <div className="game-container animate-fade-in-up">
            <div className="game-header">
                <div className="score-badge text-gradient">Score: {score}</div>
                <div className="progress-badge">Question {currentIdx + 1} of {questions.length}</div>
            </div>

            <div className="question-card glass-panel">
                <h2 className="question-text">{currentQuestion.question}</h2>

                <div className="options-grid">
                    {currentQuestion.options.map((opt, i) => {
                        let stateClass = '';
                        if (selectedAnswer !== null) {
                            if (opt === currentQuestion.answer) stateClass = 'correct';
                            else if (opt === selectedAnswer) stateClass = 'incorrect';
                            else stateClass = 'disabled';
                        }

                        return (
                            <button
                                key={i}
                                className={`option-btn ${stateClass}`}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedAnswer !== null}
                            >
                                {opt}
                                {stateClass === 'correct' && <CheckCircle2 size={20} />}
                                {stateClass === 'incorrect' && <XCircle size={20} />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
