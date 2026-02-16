import { useState, useEffect, useRef } from 'react';

// Questions data (بدون أي تعديل)
const questionsSets = {
  set1: {
    arabic: [
      { id: 1, question: "ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "مكة", "الدمام"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "كم عدد الكواكب في المجموعة الشمسية؟", options: ["7", "8", "9", "10"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 3, question: "من هو مؤسس شركة أبل؟", options: ["بيل غيتس", "ستيف جوبز", "مارك زوكربيرغ", "إيلون ماسك"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 4, question: "ما هو الحيوان الأسرع في العالم؟", options: ["الفهد", "النمر", "الغزال", "صقر"], correct: 0, points: 15, difficulty: "متوسط" },
      { id: 5, question: "كم عدد ألوان قوس قزح؟", options: ["5", "6", "7", "8"], correct: 2, points: 15, difficulty: "متوسط" },
      { id: 6, question: "من فاز بكأس العالم 2018؟", options: ["ألمانيا", "البرازيل", "فرنسا", "كرواتيا"], correct: 2, points: 20, difficulty: "صعب قليلاً" },
    ],
    english: []
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);

  // --- نظام نغمات من عندي (Audio Context) ---
  const playSound = (freq: number, type: 'sine' | 'square' | 'triangle' = 'sine', duration: number = 0.1) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  };

  const playClick = () => playSound(440, 'sine', 0.05); // نغمة زر
  const playCorrect = () => playSound(880, 'sine', 0.2); // نغمة صح
  const playWrong = () => playSound(220, 'square', 0.3); // نغمة خطأ

  useEffect(() => {
    if (!gameStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { 
          playWrong();
          if (lives > 1) { setLives(l => l - 1); return 15; }
          setGameStarted(false); setActiveTab('leaderboard'); return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, lives]);

  const handleAnswer = (index: number) => {
    const correct = questionsSets.set1.arabic[currentQuestionIndex].correct;
    if (index === correct) {
      playCorrect();
      setScore(s => s + 10);
    } else {
      playWrong();
      if (lives > 1) setLives(l => l - 1);
      else { setGameStarted(false); setActiveTab('leaderboard'); }
    }
    if (currentQuestionIndex < questionsSets.set1.arabic.length - 1) {
      setCurrentQuestionIndex(c => c + 1);
      setTimeLeft(15);
    } else {
      setGameStarted(false);
      setActiveTab('leaderboard');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 15s linear infinite; }
      `}</style>

      {/* البانر الذهبي المتحرك */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30">
        <div className="animate-marquee text-black font-black text-xs">
           🎁 كود خصم نون: VTP129 🎁 | 🏆 جوائز نقدية للمربع الذهبي (1-4) 🏆 | 🌙 رمضان يجمعنا في دوري Gowin 🌙
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4 text-2xl font-bold text-yellow-400">
        🏮 GOWIN 🏮
      </header>

      {/* التبويبات بالإيموجيات فقط */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20">
        <button onClick={() => { playClick(); setActiveTab('home'); }} className={`p-3 rounded-xl ${activeTab === 'home' ? 'bg-yellow-500' : 'bg-white/10'}`}>🏠</button>
        <button onClick={() => { playClick(); setActiveTab('leaderboard'); }} className={`p-3 rounded-xl ${activeTab === 'leaderboard' ? 'bg-yellow-500' : 'bg-white/10'}`}>📊</button>
        <button onClick={() => { playClick(); setActiveTab('live'); }} className={`p-3 rounded-xl ${activeTab === 'live' ? 'bg-yellow-500' : 'bg-white/10'}`}>🔴</button>
        <button onClick={() => { playClick(); setActiveTab('history'); }} className={`p-3 rounded-xl ${activeTab === 'history' ? 'bg-yellow-500' : 'bg-white/10'}`}>📜</button>
        <button onClick={() => { playClick(); setActiveTab('friends'); }} className={`p-3 rounded-xl ${activeTab === 'friends' ? 'bg-yellow-500' : 'bg-white/10'}`}>💬</button>
        <button onClick={() => { playClick(); setActiveTab('prizes'); }} className={`p-3 rounded-xl ${activeTab === 'prizes' ? 'bg-yellow-500' : 'bg-white/10'}`}>🎁</button>
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto text-center py-10 space-y-6">
            <h1 className="text-6xl font-bold text-yellow-400 mb-6">⚔️ GOWIN ⚔️</h1>
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="اسمك الكريم..." className="w-full bg-white/10 p-4 rounded-xl border border-white/20 text-center outline-none" />
            <button onClick={() => { playClick(); setGameStarted(true); setActiveTab('challenge'); }} className="w-full py-4 rounded-2xl font-bold text-xl bg-yellow-500 text-black">🚀 ابدأ التحدي</button>
          </div>
        )}

        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🏆 تعليمات الدوري</h2>
            <div className="bg-white/5 p-6 rounded-xl text-right whitespace-pre-line text-white/90">
                1. المسابقة تضم 20 لاعباً فقط بنظام النقاط.{"\n"}
                2. يتأهل أفضل 8 لاعبين إلى دور المجموعات.{"\n"}
                3. أصحاب المراكز (1-4) يحصلون على جوائز نقدية فورية.{"\n"}
                4. كل لاعب لديه 5 محاولات (قلوب) للإجابة.{"\n"}
                5. كود الخصم VTP129 متاح للجميع للاستخدام في نون.
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex justify-between font-bold text-xl px-2"><span>❤️ {lives}</span><span className="text-yellow-400">⏱️ {timeLeft}</span></div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/20">
              <h2 className="text-xl font-bold mb-8">{questionsSets.set1.arabic[currentQuestionIndex]?.question}</h2>
              <div className="grid gap-4">
                {questionsSets.set1.arabic[currentQuestionIndex]?.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">{opt}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/80 backdrop-blur-md">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold">📷 @_itlulp</a>
      </footer>
    </div>
  );
}

export default App;
