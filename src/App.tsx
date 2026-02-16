import { useState, useEffect, useRef } from 'react';

const questionsSets = {
  set1: {
    arabic: [
      { id: 1, question: "ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "مكة", "الدمام"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "كم عدد الكواكب في المجموعة الشمسية؟", options: ["7", "8", "9", "10"], correct: 1, points: 10, difficulty: "سهل جداً" },
    ],
  },
  set2: { arabic: [ { id: 1, question: "ما هو أكبر محيط؟", options: ["الأطلسي", "الهادئ"], correct: 1, points: 10 } ] },
  set3: { arabic: [ { id: 1, question: "اليوم الوطني؟", options: ["23 سبتمبر", "1 يناير"], correct: 0, points: 10 } ] }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([
    { id: '1', name: 'نايف', points: 2500 }, { id: '2', name: 'سارة', points: 2100 }, { id: '3', name: 'فهد', points: 1850 }
  ]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState('set1');
  const [leagueWinner, setLeagueWinner] = useState(null);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);

  // منطق الدوري (20 لاعب)
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
    setTimeout(() => {
      setPlayers([]);
      setCurrentSet(prev => prev === 'set1' ? 'set2' : prev === 'set2' ? 'set3' : 'set1');
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
      {/* الخلفية الأصلية */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      <div className="absolute top-20 right-10 text-6xl opacity-20 animate-pulse">🌙</div>
      <div className="absolute top-10 left-8 text-4xl opacity-40 animate-bounce">🏮</div>

      {/* البانر الذهبي */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] text-black font-black text-xs uppercase">
          <span className="mx-8">🎁 كود نون: VTP129 🎁</span>
          <span className="mx-8">🏆 هدايا للمربع الذهبي (1-4) 🏆</span>
          <span className="mx-8">🌙 رمضان يجمعنا في دوري Gowin 🌙</span>
        </div>
      </div>

      <header className="relative z-50 pt-12 flex justify-center p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">🏮 GOWIN 🏮</h1>
      </header>

      {/* التبويبات الستة */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20">
        {['home', 'leaderboard', 'live', 'history', 'friends', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-yellow-500 text-black scale-110' : 'bg-white/10'}`}>
            <span className="text-xl">{['🏠', '📊', '🔴', '📜', '💬', '🎁'][idx]}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <h1 className="text-6xl font-bold text-yellow-400 py-8">⚔️ GOWIN ⚔️</h1>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="اسمك..." className="w-full bg-white/10 p-4 rounded-xl text-center text-xl outline-none mb-4" />
              <button onClick={startChallenge} className="w-full py-4 rounded-2xl font-bold text-xl bg-yellow-500 text-black">🚀 دخول الدوري</button>
              <p className="mt-2 text-yellow-400">المقاعد: {players.length} / 20</p>
            </div>
            <div className="bg-[#1a0f00] rounded-3xl p-8 border-2 border-yellow-600 shadow-2xl">
              <h2 className="text-2xl font-black text-yellow-400">THE GOLDEN GOAT</h2>
              <p className="text-3xl mt-4 font-bold uppercase">{leagueWinner ? `🐐 ${leagueWinner} 🐐` : "⏳ بانتظار البطل..."}</p>
            </div>
          </div>
        )}

        {/* رجعت لك تبويب المتصدرين 📊 */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">قائمة المتصدرين</h2>
            {players.sort((a,b) => b.points - a.points).map((p, i) => (
              <div key={p.id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center border border-white/10">
                <span className="font-bold text-lg">{i + 1}. {p.name}</span>
                <span className="text-yellow-400 font-mono">{p.points} PTS</span>
              </div>
            ))}
          </div>
        )}

        {/* رجعت لك تبويب البث 🔴 */}
        {activeTab === 'live' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse flex items-center justify-center gap-2 mb-8">
              <span className="w-3 h-3 bg-red-600 rounded-full"></span>
              <h2 className="text-2xl font-bold text-red-500">مباريات جارية الآن</h2>
            </div>
            <div className="bg-black/40 p-8 rounded-3xl border border-red-900/30">
              <p className="text-white/60">يتم تحديث المواجهات فور اكتمال اللاعبين...</p>
            </div>
          </div>
        )}

        {/* رجعت لك تبويب التاريخ 📜 */}
        {activeTab === 'history' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center text-purple-400 mb-6">سجل الأبطال</h2>
            <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/5 italic text-white/40">لا يوجد سجل بطولات سابقة حتى الآن</div>
          </div>
        )}

        {/* رجعت لك تبويب الأصدقاء 💬 */}
        {activeTab === 'friends' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">الدردشة واللاعبين</h2>
            <div className="bg-white/5 h-64 rounded-2xl p-4 overflow-y-auto mb-4 border border-white/10">
              <p className="text-sm text-white/30 text-center mt-20">ابدأ المحادثة مع منافسيك...</p>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="اكتب شيئاً..." className="flex-1 bg-white/10 p-3 rounded-xl outline-none" />
              <button className="bg-blue-600 px-6 rounded-xl">إرسال</button>
            </div>
          </div>
        )}

        {/* تبويب الهدايا والتعليمات 🎁 */}
        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center text-shadow-sm">🏆 قوانين دوري GOWIN</h2>
            <div className="space-y-4 text-right font-bold text-white/90">
              <p>1. المواجهات بنظام "خروج مغلوب" فور وصولنا لـ 20 لاعب.</p>
              <p>2. الفائز بالنهائي يتوج بلقب الـ Golden Goat في الواجهة.</p>
              <p>3. جوائز قيمة للمربع الذهبي (المراكز 1-4).</p>
              <p>4. كود نون VTP129 يمنحك خصم إضافي ومشاركة مجانية.</p>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">{questionsSets[currentSet].arabic[currentQuestionIndex]?.question}</h2>
            <div className="grid gap-4">
              {questionsSets[currentSet].arabic[currentQuestionIndex]?.options.map((opt, i) => (
                <button key={i} onClick={() => { if(currentQuestionIndex < 1) setCurrentQuestionIndex(1); else { setGameStarted(false); setActiveTab('home'); } }} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition-all">{opt}</button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/40 backdrop-blur-md">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold">📷 @_itlulp</a>
      </footer>

      <style>{` @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } `}</style>
    </div>
  );
}

export default App;
