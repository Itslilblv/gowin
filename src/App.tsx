import { useState, useEffect, useRef } from 'react';

// مصفوفة الأسئلة الأصلية مع إضافة المجموعات الأخرى
const questionsSets = {
  set1: {
    arabic: [
      { id: 1, question: "ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "مكة", "الدمام"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "كم عدد الكواكب في المجموعة الشمسية؟", options: ["7", "8", "9", "10"], correct: 1, points: 10, difficulty: "سهل جداً" },
    ],
  },
  set2: {
    arabic: [
      { id: 1, question: "ما هو أكبر محيط في العالم؟", options: ["الأطلسي", "الهادئ", "الهندي", "القطبي"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "ما هو العنصر الكيميائي للذهب؟", options: ["Ag", "Fe", "Au", "Cu"], correct: 2, points: 10, difficulty: "سهل جداً" },
    ],
  },
  set3: {
    arabic: [
      { id: 1, question: "ما هو اليوم الوطني للمملكة؟", options: ["23 سبتمبر", "1 يناير", "14 أكتوبر", "11 نوفمبر"], correct: 0, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "من هو مؤسس المملكة العربية السعودية؟", options: ["الملك فيصل", "الملك عبدالعزيز", "الملك فهد", "الملك عبدالله"], correct: 1, points: 20, difficulty: "صعب قليلاً" },
    ],
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState('set1');
  const [leagueWinner, setLeagueWinner] = useState(null);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);

  // منطق تشغيل الدوري (20 لاعب)
  const runLeague = (allPlayers) => {
    let currentRound = [...allPlayers];
    while (currentRound.length > 1) {
      let nextRound = [];
      for (let i = 0; i < currentRound.length; i += 2) {
        if (currentRound[i + 1]) {
          const winner = Math.random() > 0.5 ? currentRound[i] : currentRound[i + 1];
          nextRound.push(winner);
        } else { nextRound.push(currentRound[i]); }
      }
      currentRound = nextRound;
    }
    setLeagueWinner(currentRound[0].name);

    // إعادة الضبط للدوري القادم
    setTimeout(() => {
      setPlayers([]);
      setCurrentSet(prev => prev === 'set1' ? 'set2' : prev === 'set2' ? 'set3' : 'set1');
      setCurrentQuestionIndex(0);
    }, 15000);
  };

  const startChallenge = () => {
    if (!playerName.trim()) return;
    const newPlayer = { id: Date.now().toString(), name: playerName, points: 0 };
    const updated = [...players, newPlayer];
    setPlayers(updated);
    setGameStarted(true);
    setActiveTab('challenge');
    if (updated.length >= 20) runLeague(updated);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      {/* خلفيتك الأصلية الفخمة */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}></div>
      <div className="absolute top-20 right-10 text-6xl opacity-20 blur-[1px] pointer-events-none animate-pulse">🌙</div>
      <div className="absolute top-10 left-8 text-4xl opacity-40 animate-[bounce_4s_infinite] pointer-events-none">🏮</div>
      <div className="absolute top-40 right-12 text-3xl opacity-30 animate-[bounce_3s_infinite] pointer-events-none">🏮</div>

      {/* البانر الذهبي العلوي */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 shadow-lg flex items-center overflow-hidden border-b border-yellow-300/30">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] flex items-center text-black font-black text-xs uppercase tracking-wider">
          <span className="mx-8">🎁 كود نون: VTP129 🎁</span>
          <span className="mx-8">🏆 هدايا للمربع الذهبي (1-4) 🏆</span>
          <span className="mx-8">🌙 رمضان يجمعنا في دوري Gowin 🌙</span>
        </div>
      </div>

      <header className="relative z-50 pt-12 flex justify-center p-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">🏮 GOWIN 🏮</h1>
      </header>

      {/* التبويبات الستة (أيقونات فقط كما طلبت) */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20">
        {['home', 'leaderboard', 'live', 'history', 'friends', 'prizes'].map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
              activeTab === tab ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg scale-110' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <span className="text-xl">{['🏠', '📊', '🔴', '📜', '💬', '🎁'][idx]}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center py-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-pulse mb-4">⚔️ GOWIN ⚔️</h1>
              <p className="text-xl text-purple-300 font-bold">أقوى دوري رمضاني (20 لاعب)</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="أدخل اسمك للمنافسة..."
                className="w-full bg-white/10 text-white text-center rounded-xl px-4 py-4 border border-white/20 focus:border-yellow-400 focus:outline-none text-xl"
              />
              <button
                onClick={startChallenge}
                className="w-full mt-4 py-4 rounded-2xl font-bold text-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:scale-[1.02] transition-transform"
              >
                🚀 حجز مقعد وبدء التحدي
              </button>
              <p className="text-center mt-3 text-yellow-400 font-bold">المقاعد المحجوزة: {players.length} / 20</p>
            </div>

            {/* كرت الـ Golden Goat المطور */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900 p-[2px] shadow-2xl">
              <div className="bg-[#1a0f00] rounded-[22px] p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite] skew-x-12"></div>
                <span className="text-5xl block mb-2 drop-shadow-lg">👑</span>
                <h2 className="text-3xl font-black bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">THE GOLDEN GOAT</h2>
                <div className="mt-4 py-4 px-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
                   <p className="text-yellow-400 font-bold text-2xl uppercase tracking-tighter">
                    {leagueWinner ? `🐐 ${leagueWinner} 🐐` : "⏳ بانتظار البطل..."}
                   </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-8 rounded-3xl border border-yellow-500/30 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🏆 تعليمات الدوري والجوائز</h2>
            <div className="bg-white/5 p-6 rounded-xl text-right whitespace-pre-line text-white/90 leading-loose font-bold">
                1. المسابقة تضم 20 لاعباً يتواجهون بنظام خروج المغلوب.{"\n"}
                2. المواجهات مباشرة (Head-to-Head) حتى النهائي.{"\n"}
                3. المركز الأول يفوز بلقب "The Golden Goat" في الكرت الرئيسي.{"\n"}
                4. المراكز (1-4) يحصلون على هدايا قيمة فورية.{"\n"}
                5. كود الخصم VTP129 متاح للجميع في تطبيق نون.
            </div>
          </div>
        )}

        {/* منطق التحدي (الأسئلة) */}
        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-between items-center text-xl font-bold px-4">
              <span className="text-red-500">❤️ {lives}</span>
              <span className="text-yellow-400">⏱️ {timeLeft}</span>
            </div>
            <div className="bg-white/5 p-8 rounded-[30px] border border-white/10 backdrop-blur-xl">
              <h2 className="text-2xl font-bold mb-10">{questionsSets[currentSet].arabic[currentQuestionIndex]?.question}</h2>
              <div className="grid gap-4">
                {questionsSets[currentSet].arabic[currentQuestionIndex]?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (currentQuestionIndex < questionsSets[currentSet].arabic.length - 1) {
                        setCurrentQuestionIndex(prev => prev + 1);
                        setTimeLeft(15);
                      } else {
                        setGameStarted(false);
                        setActiveTab('home');
                      }
                    }}
                    className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-yellow-500 hover:text-black font-bold transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/40 backdrop-blur-md border-t border-white/5 z-50">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold flex items-center justify-center gap-2">
          <span>📷</span> @_itlulp
        </a>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes shimmer { 0% { transform: translateX(-150%); } 100% { transform: translateX(150%); } }
      `}</style>
    </div>
  );
}

export default App;
