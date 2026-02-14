import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Users, Globe, Heart, Instagram, 
  Home, Play, Clock, MessageSquare 
} from 'lucide-react';

// --- إعدادات الربط السحابي (بناءً على صورك) ---
const API_CONFIG = {
  endpoint: 'https://api.jsonbin.io/v3/b/698ec55bd0ea881f40b6b5e3', 
  key: '$2a$10$zP2nglkzKrG1K81/D3uY1ejRP73C/zxIpE9QiFtYPOS2pU9saHnU.' 
};

// --- أسئلة اللعبة ---
const QUESTION_SETS = {
  set1: {
    ar: [
      { id: 1, question: "ما هي عاصمة فرنسا؟", options: ["باريس", "لندن", "برلين", "روما"], correctAnswer: 0, difficulty: 'easy' },
      { id: 2, question: "كم عدد أيام الأسبوع؟", options: ["5", "6", "7", "8"], correctAnswer: 2, difficulty: 'easy' },
      { id: 3, question: "ما هو أكبر كوكب في المجموعة الشمسية؟", options: ["الأرض", "المريخ", "المشتري", "زحل"], correctAnswer: 2, difficulty: 'medium' },
      { id: 4, question: "ما هي عاصمة اليابان؟", options: ["سول", "بكين", "طوكيو", "سايغون"], correctAnswer: 2, difficulty: 'medium' },
      { id: 5, question: "ما هو المصدر الأول للتشريع في الإسلام؟", options: ["السنة", "القرآن الكريم", "الإجماع", "القياس"], correctAnswer: 1, difficulty: 'hard' },
      { id: 6, question: "ما هي أصغر دولة في العالم؟", options: ["موناكو", "الفاتيكان", "سان مارينو", "ليختنشتاين"], correctAnswer: 1, difficulty: 'hard' }
    ]
  }
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [currentTab, setCurrentTab] = useState<'home' | 'leaderboard' | 'live' | 'friends' | 'history'>('home');
  const [players, setPlayers] = useState<any[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // --- جلب البيانات من السحابة عند تشغيل اللعبة ---
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await fetch(`${API_CONFIG.endpoint}/latest`, {
          headers: { 'X-Master-Key': API_CONFIG.key }
        });
        const data = await response.json();
        if (data.record && data.record.players) {
          setPlayers(data.record.players);
        }
      } catch (e) { console.error("Fetch Error:", e); }
    };
    fetchGlobalData();
  }, []);

  // --- حفظ البيانات في السحابة ---
  const saveToCloud = async (updatedPlayers: any[]) => {
    try {
      await fetch(API_CONFIG.endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_CONFIG.key
        },
        body: JSON.stringify({ players: updatedPlayers })
      });
    } catch (e) { console.error("Save Error:", e); }
  };

  const startGame = (name: string) => {
    setCurrentPlayer({ name, id: Date.now().toString() });
    setIsPlaying(true);
    setScore(0);
    setLives(5);
    setCurrentQuestionIndex(0);
    setTimeLeft(15);
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const isCorrect = idx === QUESTION_SETS.set1.ar[currentQuestionIndex].correctAnswer;

    setTimeout(() => {
      if (isCorrect) setScore(s => s + 10);
      else setLives(l => l - 1);

      if (lives > 1 && currentQuestionIndex < QUESTION_SETS.set1.ar.length - 1) {
        setCurrentQuestionIndex(c => c + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
      } else {
        finishGame();
      }
    }, 1000);
  };

  const finishGame = () => {
    setIsPlaying(false);
    setShowResult(true);
    if (currentPlayer) {
      const newEntry = { name: currentPlayer.name, score: score, date: new Date().toLocaleDateString() };
      const newPlayersList = [...players, newEntry].sort((a, b) => b.score - a.score).slice(0, 20);
      setPlayers(newPlayersList);
      saveToCloud(newPlayersList);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white" dir="rtl">
      {/* Header */}
      <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]/90 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          <span className="font-black text-xl">GOWIN</span>
        </div>
        <div className="text-xs text-slate-400">حساب: {currentPlayer?.name || 'زائر'}</div>
      </header>

      {/* Tabs */}
      {!isPlaying && (
        <nav className="flex p-2 gap-2 overflow-x-auto bg-slate-900 border-b border-slate-800 sticky top-[61px] z-40">
          {[
            { id: 'home', icon: Home, label: 'الرئيسية' },
            { id: 'leaderboard', icon: Trophy, label: 'المتصدرين' },
            { id: 'friends', icon: MessageSquare, label: 'الدردشة' }
          ].map(t => (
            <button 
              key={t.id}
              onClick={() => setCurrentTab(t.id as any)}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${currentTab === t.id ? 'bg-yellow-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              <t.icon size={16} />
              <span className="text-sm font-bold">{t.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Main Content */}
      <main className="p-4 max-w-xl mx-auto">
        {isPlaying ? (
          <div className="bg-slate-800 p-6 rounded-3xl border-2 border-slate-700 animate-in fade-in duration-500">
             <div className="flex justify-between items-center mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Heart key={i} size={20} className={i < lives ? "fill-red-500 text-red-500" : "text-slate-600"} />)}
                </div>
                <div className="text-2xl font-black text-yellow-500">{timeLeft}s</div>
             </div>
             <h2 className="text-2xl font-bold text-center mb-10">{QUESTION_SETS.set1.ar[currentQuestionIndex].question}</h2>
             <div className="grid gap-4">
                {QUESTION_SETS.set1.ar[currentQuestionIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`p-5 rounded-2xl text-right font-bold border-2 transition-all ${selectedAnswer === i ? 'bg-yellow-600 border-yellow-400' : 'bg-slate-700 border-slate-600'}`}
                  >
                    {opt}
                  </button>
                ))}
             </div>
          </div>
        ) : (
          <div className="space-y-6">
            {currentTab === 'home' && (
              <div className="text-center py-10">
                <div className="bg-gradient-to-b from-yellow-500 to-yellow-700 p-10 rounded-3xl shadow-2xl mb-8">
                  <h1 className="text-4xl font-black mb-2">GOLDEN THE GOAT</h1>
                  <p className="opacity-80">تحدى العالم واثبت أنك الأفضل</p>
                </div>
                <button 
                  onClick={() => { const n = prompt("ادخل اسمك المستعار:"); if(n) startGame(n); }}
                  className="bg-green-600 hover:bg-green-500 px-12 py-4 rounded-2xl font-black text-xl shadow-lg transition-transform hover:scale-105"
                >
                  🚀 ابدأ اللعب الآن
                </button>
              </div>
            )}

            {currentTab === 'leaderboard' && (
              <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700">
                <h3 className="text-center font-black mb-4 text-yellow-500">🏆 قائمة العشرين العمالقة</h3>
                <div className="space-y-2">
                  {players.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${i < 3 ? 'bg-yellow-500 text-black' : 'bg-slate-700'}`}>{i+1}</span>
                        <span className="font-bold">{p.name}</span>
                      </div>
                      <span className="text-yellow-500 font-black">{p.score} نقطة</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-[100]">
          <div className="bg-slate-800 p-8 rounded-[40px] text-center max-w-sm w-full border-4 border-yellow-500/20">
            <Trophy className="mx-auto text-yellow-500 mb-4" size={60} />
            <h2 className="text-3xl font-black mb-2">انتهى التحدي!</h2>
            <p className="text-slate-400 mb-6">لقد جمعت نقاطاً تليق بلقب الـ GOAT</p>
            <div className="text-6xl font-black text-yellow-500 mb-8">{score}</div>
            <button onClick={() => setShowResult(false)} className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl">عودة للقائمة</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
