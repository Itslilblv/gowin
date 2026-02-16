import { useState, useEffect, useRef } from 'react';

// 1. مصفوفة الأسئلة المحدثة (3 مجموعات تتغير تلقائياً)
const questionsData = {
  set1: [
    { id: 1, question: "ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "مكة", "الدمام"], correct: 1, points: 10 },
    { id: 2, question: "كم عدد الكواكب في المجموعة الشمسية؟", options: ["7", "8", "9", "10"], correct: 1, points: 10 }
  ],
  set2: [
    { id: 1, question: "ما هو أكبر محيط في العالم؟", options: ["الأطلسي", "الهادئ", "الهندي", "القطبي"], correct: 1, points: 10 },
    { id: 2, question: "ما هو العنصر الكيميائي للذهب؟", options: ["Ag", "Fe", "Au", "Cu"], correct: 2, points: 10 }
  ],
  set3: [
    { id: 1, question: "ما هو اليوم الوطني للمملكة؟", options: ["23 سبتمبر", "1 يناير", "14 أكتوبر", "11 نوفمبر"], correct: 0, points: 10 },
    { id: 2, question: "من هو مؤسس المملكة العربية السعودية؟", options: ["الملك فيصل", "الملك عبدالعزيز", "الملك فهد", "الملك عبدالله"], correct: 1, points: 20 }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState('set1'); // نظام تبديل الأسئلة
  const [leagueWinner, setLeagueWinner] = useState(null);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);

  // نغمات برمجية
  const playBeep = (freq) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.frequency.value = freq; gain.gain.value = 0.05;
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
  };

  // 2. منطق الدوري (20 لاعب + مواجهات إقصائية + تبديل أسئلة)
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
    
    setLeagueWinner(currentRound[0].name); // وضع الفائز في الكرت

    // إعادة ضبط الدوري والأسئلة تلقائياً بعد 15 ثانية
    setTimeout(() => {
      setPlayers([]); // تصفير الـ 20 لاعب لبدء دوري جديد
      setCurrentSet(prev => prev === 'set1' ? 'set2' : prev === 'set2' ? 'set3' : 'set1');
      setCurrentQuestionIndex(0);
    }, 15000);
  };

  const startChallenge = () => {
    if (!playerName) return;
    const newPlayer = { id: Date.now(), name: playerName };
    const updated = [...players, newPlayer];
    setPlayers(updated);
    setGameStarted(true);
    setActiveTab('challenge');
    if (updated.length >= 20) runLeague(updated);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 15s linear infinite; }
      `}</style>

      {/* خلفيتك الأصلية */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      <div className="absolute top-20 right-10 text-6xl opacity-20 pointer-events-none animate-pulse">🌙</div>
      <div className="absolute top-10 left-8 text-4xl opacity-40 animate-bounce pointer-events-none">🏮</div>

      {/* البانر الذهبي */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30 shadow-lg">
        <div className="animate-marquee text-black font-black text-xs uppercase">
           🎁 كود نون: VTP129 🎁 | 🏆 هدايا للمربع الذهبي 🏆 | 🌙 رمضان يجمعنا في دوري Gowin 🌙 | كود الخصم: VTP129
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-bold text-yellow-400">🏮 GOWIN 🏮</h1>
      </header>

      {/* التبويبات الستة (أيقونات فقط) */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 backdrop-blur-md">
        {['home', 'leaderboard', 'live', 'history', 'friends', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => {playBeep(400); setActiveTab(tab)}} 
            className={`p-3 rounded-xl transition-all ${activeTab === tab ? 'bg-yellow-500 scale-110' : 'bg-white/10'}`}>
            {['🏠', '📊', '🔴', '📜', '💬', '🎁'][idx]}
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-8 py-6">
            <div className="text-center">
              <h1 className="text-6xl font-black text-yellow-400 mb-2">⚔️ GOWIN ⚔️</h1>
              <p className="text-white/60">أقوى دوري إقصائي (20 لاعب)</p>
            </div>

            {/* إدخال الاسم */}
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-lg">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="سجل اسمك للبطولة..." 
                className="w-full bg-white/10 p-4 rounded-2xl border border-white/20 text-center text-xl outline-none" />
              <button onClick={startChallenge} className="w-full mt-4 py-4 rounded-2xl font-black text-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black">🚀 دخول الدوري</button>
              <p className="text-center mt-3 text-xs text-yellow-400">المقاعد: {players.length} / 20</p>
            </div>

            {/* كرت الفائز - The Golden Goat */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-700 via-yellow-400 to-yellow-800 p-[2px] shadow-2xl">
              <div className="bg-[#1a0f00] rounded-[22px] p-8 text-center">
                <h2 className="text-2xl font-black text-yellow-400">THE GOLDEN GOAT</h2>
                <div className="mt-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
                  <p className="text-yellow-400 font-bold text-2xl uppercase">
                    {leagueWinner ? `🐐 ${leagueWinner} 🐐` : "⏳ بانتظار البطل..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* تبويب الهدايا (🎁) */}
        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🏆 تعليمات الدوري</h2>
            <div className="bg-white/5 p-6 rounded-xl text-right text-white/90 leading-relaxed">
                1. الدوري يضم 20 لاعباً بنظام الإقصاء المباشر.{"\n"}
                2. كل مواجهة تخرج الخاسر وتصعد بالفائز.{"\n"}
                3. المركز الأول يتوج بلقب The Golden Goat.{"\n"}
                4. المربع الذهبي (1-4) يحصلون على هدايا قيمة.{"\n"}
                5. كود نون VTP129 متاح للجميع.
            </div>
          </div>
        )}

        {/* نظام التحدي */}
        {activeTab === 'challenge' && gameStarted && (
           <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="bg-white/5 p-8 rounded-[40px] border border-white/20">
                 <h2 className="text-2xl font-bold mb-10">{questionsData[currentSet][currentQuestionIndex]?.question}</h2>
                 <div className="grid gap-4">
                    {questionsData[currentSet][currentQuestionIndex]?.options.map((opt, i) => (
                      <button key={i} onClick={() => { playBeep(600); if(currentQuestionIndex < 1) setCurrentQuestionIndex(1); else { setGameStarted(false); setActiveTab('home'); } }} 
                        className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-yellow-500 transition-all font-bold">{opt}</button>
                    ))}
                 </div>
              </div>
           </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/60 backdrop-blur-md">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold">📷 @_itlulp</a>
      </footer>
    </div>
  );
}

export default App;
