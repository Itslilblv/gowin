import { useState, useEffect } from 'react';

const questionsSets = {
  set1: {
    arabic: [
      { id: 1, question: "ما هو الشهر الذي أنزل فيه القرآن الكريم؟", options: ["رجب", "رمضان", "شعبان", "شوال"], correct: 1, points: 10 },
      { id: 2, question: "ما هي الوجبة التي تؤكل قبل الفجر في رمضان؟", options: ["الفطور", "الغداء", "السحور", "العشاء"], correct: 2, points: 10 }
    ],
    english: [
      { id: 1, question: "What is the capital city of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correct: 2, points: 10 },
      { id: 2, question: "How many colors are there in a rainbow?", options: ["6", "7", "8", "9"], correct: 1, points: 10 }
    ]
  },
  set2: {
    arabic: [
      { id: 1, question: "ما هي الصلاة التي تصلى جماعة في ليالي رمضان فقط؟", options: ["الوتر", "التراويح", "الضحى", "الكسوف"], correct: 1, points: 15 },
      { id: 2, question: "كم عدد سنوات نزول القرآن الكريم؟", options: ["13 سنة", "23 سنة", "33 سنة", "10 سنوات"], correct: 1, points: 20 }
    ],
    english: [
      { id: 1, question: "Who painted the 'Mona Lisa'?", options: ["Picasso", "Van Gogh", "Da Vinci", "Dalí"], correct: 2, points: 15 },
      { id: 2, question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 2, points: 15 }
    ]
  }
};

const titles = ["الزعيم", "العميد", "الملكي", "الليث", "الفارس", "الصقر", "العالمي", "الممتاز", "المحترف", "المثابر", "المقاتل", "الذيب", "الجندي", "البارع", "الذكي", "الهداف", "القناص", "المبدع", "المتألق", "الناشئ"];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [language, setLanguage] = useState('arabic');
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState('set1');
  const [leagueWinner, setLeagueWinner] = useState(null);

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
      setCurrentSet(prev => prev === 'set1' ? 'set2' : 'set1');
    }, 15000);
  };

  const startChallenge = () => {
    if (!playerName.trim() || players.length >= 20) return;
    const newPlayer = { id: Date.now().toString(), name: playerName, joinedAt: new Date().toLocaleTimeString('ar-SA') };
    const updated = [...players, newPlayer];
    setPlayers(updated);
    setGameStarted(true);
    setActiveTab('challenge');
    if (updated.length >= 20) runLeague(updated);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      <div className="absolute top-20 right-10 text-6xl opacity-20 animate-pulse">🌙</div>
      <div className="absolute top-10 left-8 text-4xl opacity-40 animate-bounce">🏮</div>

      {/* البنـر */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30 shadow-lg">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] text-black font-black text-xs uppercase">
          <span className="mx-8">🎁 كود نون: VTP129 🎁</span>
          <span className="mx-8">🏆 هدايا للمربع الذهبي (1-4) 🏆</span>
          <span className="mx-8">🌙 رمضان يجمعنا في دوري Gowin 🌙</span>
        </div>
      </div>

      {/* زر اللغة تحت البنر يسار */}
      <div className="fixed top-12 left-4 z-[110]">
        <button 
          onClick={() => setLanguage(language === 'arabic' ? 'english' : 'arabic')}
          className="bg-yellow-500/20 border border-yellow-500/40 px-3 py-1 rounded-lg text-[10px] font-bold text-yellow-400 backdrop-blur-md"
        >
          {language === 'arabic' ? 'EN' : 'AR'}
        </button>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">🏮 GOWIN 🏮</h1>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20">
        {['home', 'leaderboard', 'live', 'history', 'friends', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-yellow-500 text-black scale-110' : 'bg-white/10'}`}>
            <span className="text-xl">{['🏠', '📊', '🔴', '📜', '👥', '🎁'][idx]}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24 text-center">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-6xl font-bold text-yellow-400 py-8 drop-shadow-lg">⚔️ GOWIN ⚔️</h1>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder={language === 'arabic' ? "سجل اسمك..." : "Enter name..."} className="w-full bg-white/10 p-4 rounded-xl text-center text-xl outline-none mb-4" />
              <button onClick={startChallenge} className="w-full py-4 rounded-2xl font-bold text-xl bg-yellow-500 text-black shadow-lg">🚀 {language === 'arabic' ? "دخول البطولة" : "JOIN LEAGUE"}</button>
              <p className="mt-2 text-yellow-400 font-bold">المقاعد المتاحة: {20 - players.length} / 20</p>
            </div>
            {/* الكرت الذهبي (عربي دائماً) */}
            <div className="bg-[#1a0f00] rounded-3xl p-8 border-2 border-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
              <h2 className="text-2xl font-black text-yellow-400 uppercase tracking-widest">The Golden Goat</h2>
              <div className="mt-4 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <p className="text-3xl font-bold text-white uppercase tracking-wider">
                  {leagueWinner ? `🐐 ${leagueWinner} 🐐` : "⏳ بانتظار بطل الدوري..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">قائمة الترتيب</h2>
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden text-right">
              <table className="w-full text-sm">
                <thead className="bg-white/10 text-yellow-400">
                  <tr><th className="p-3">#</th><th className="p-3">الاسم</th><th className="p-3">اللقب</th></tr>
                </thead>
                <tbody>
                  {[...Array(20)].map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-3 text-white/50">{i + 1}</td>
                      <td className="p-3 font-bold">{players[i] ? players[i].name : "---"}</td>
                      <td className="p-3 text-xs text-purple-300 font-bold">{titles[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">اللاعبين النشطين</h2>
            <div className="space-y-3">
              {players.map((p) => (
                <div key={p.id} className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">
                  <span className="font-bold">🟢 {p.name}</span>
                  <span className="text-[10px] text-white/40">{p.joinedAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto py-10 bg-white/5 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-10 px-4">{questionsSets[currentSet][language][currentQuestionIndex]?.question}</h2>
            <div className="grid gap-4 px-6">
              {questionsSets[currentSet][language][currentQuestionIndex]?.options.map((opt, i) => (
                <button key={i} onClick={() => { if(currentQuestionIndex < questionsSets[currentSet][language].length - 1) setCurrentQuestionIndex(prev => prev + 1); else { setGameStarted(false); setActiveTab('home'); } }} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition-all">{opt}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'live' && <div className="py-20 text-white/40 italic">🔴 جاري تحديث المواجهات الحية...</div>}
        {activeTab === 'history' && <div className="py-20 text-white/20 italic">📜 سجل الأبطال فارغ حالياً</div>}
        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/30 text-right font-bold space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🏆 الجوائز والقوانين</h2>
            <p>1. الدوري ينطلق عند اكتمال 20 لاعباً.</p>
            <p>2. بطل الدوري يتوج منفرداً في كرت الـ Goat.</p>
            <p>3. الجوائز تشمل المربع الذهبي (1-4).</p>
            <p>4. كود نون VTP129 يمنحك مميزات إضافية.</p>
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
