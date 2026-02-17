import { useState, useEffect } from 'react';

const tournamentData = [
  { stage: "دور المجموعات", questions: [
    { q: "ما هو الشهر الذي أنزل فيه القرآن الكريم؟", options: ["رجب", "رمضان", "شعبان", "شوال"], correct: 1 },
    { q: "ما هي الوجبة التي تؤكل قبل الفجر في رمضان؟", options: ["الفطور", "الغداء", "السحور", "العشاء"], correct: 2 },
    { q: "كم عدد ركعات صلاة الفجر؟", options: ["2", "3", "4", "1"], correct: 0 },
    { q: "ما هي القبلة الأولى للمسلمين؟", options: ["الكعبة", "المسجد الأقصى", "المسجد النبوي", "مسجد قباء"], correct: 1 }
  ]},
  { stage: "دور الـ 16", questions: [
    { q: "ما هي الصلاة التي تصلى جماعة في ليالي رمضان فقط؟", options: ["الوتر", "التراويح", "الضحى", "الكسوف"], correct: 1 },
    { q: "كم عدد أجزاء القرآن الكريم؟", options: ["20", "25", "30", "40"], correct: 2 },
    { q: "من هو أول المؤذنين في الإسلام؟", options: ["عمر بن الخطاب", "بلال بن رحاح", "أبو بكر الصديق", "علي بن أبي طالب"], correct: 1 },
    { q: "في أي غار نزل الوحي على الرسول ﷺ؟", options: ["غار ثور", "غار حراء", "غار أحد", "غار القدس"], correct: 1 }
  ]},
  { stage: "ربع النهائي (دور الـ 8)", questions: [
    { q: "كم عدد سنوات نزول القرآن الكريم؟", options: ["13 سنة", "23 سنة", "33 سنة", "10 سنوات"], correct: 1 },
    { q: "ما هي أطول سورة في القرآن الكريم؟", options: ["آل عمران", "النساء", "البقرة", "المائدة"], correct: 2 },
    { q: "ما هي كنية الرسول ﷺ؟", options: ["أبو القاسم", "أبو بكر", "أبو إبراهيم", "أبو حفص"], correct: 0 },
    { q: "كم عدد السجدات في القرآن الكريم؟", options: ["10", "12", "15", "14"], correct: 2 }
  ]},
  { stage: "نصف النهائي (دور الـ 4)", questions: [
    { q: "في أي سنة فرض الصيام على المسلمين؟", options: ["1 هـ", "2 هـ", "3 هـ", "5 هـ"], correct: 1 },
    { q: "ما هي السورة التي تسمى عروس القرآن؟", options: ["يس", "الرحمن", "الملك", "الواقعة"], correct: 1 },
    { q: "كم كان عمر النبي ﷺ عندما نزل عليه الوحي؟", options: ["25 سنة", "30 سنة", "40 سنة", "50 سنة"], correct: 2 },
    { q: "ما هي السورة التي تسمى قلب القرآن؟", options: ["البقرة", "الإخلاص", "يس", "الفاتحة"], correct: 2 }
  ]},
  { stage: "النهائي الكبير 🔥", questions: [
    { q: "ما هي السورة التي تعادل ثلث القرآن؟", options: ["الفاتحة", "الإخلاص", "الكرسي", "الناس"], correct: 1 },
    { q: "من هو صحابي الذي لقب بـ سيف الله المسلول؟", options: ["عمر بن الخطاب", "خالد بن الوليد", "حمزة بن عبدالمطلب", "علي بن أبي طالب"], correct: 1 },
    { q: "ما هي السورة التي خلت من حرف الراء؟", options: ["الإخلاص", "الكوثر", "الفلق", "الناس"], correct: 0 },
    { q: "في أي مدينة توفي الرسول ﷺ؟", options: ["مكة", "الطائف", "المدينة المنورة", "جدة"], correct: 2 }
  ]}
];

const initialOpponents = ["خالد", "ريان", "أحمد", "سارة", "فهد", "نورة", "عزوز", "مريم", "سلطان", "ليلى", "بدر", "هند", "جاسم", "عبير", "نايف", "العنزي", "البرنس", "القناص"];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [leagueWinner, setLeagueWinner] = useState("القناص"); 
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchmakingText, setMatchmakingText] = useState("");
  const [shuffledPlayers, setShuffledPlayers] = useState(initialOpponents);

  // منطق إعادة تشغيل الدوري تلقائياً كل فترة
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledPlayers([...initialOpponents].sort(() => Math.random() - 0.5));
    }, 15000); // تغيير الأسماء كل 15 ثانية ليعطي إحساس بالحركة
    return () => clearInterval(interval);
  }, []);

  const startChallenge = () => {
    if (!playerName.trim()) return;
    setIsMatchmaking(true);
    setMatchmakingText("جاري سحب قرعة المجموعات...");
    setTimeout(() => {
        setIsMatchmaking(false);
        setGameStarted(true);
        setActiveTab('challenge');
    }, 2000);
  };

  const handleAnswer = (selected) => {
    const currentStage = tournamentData[currentStageIdx];
    const currentQuestion = currentStage.questions[currentQuestionIdx];
    if (selected === currentQuestion.correct) {
      if (currentQuestionIdx < 3) {
        setCurrentQuestionIdx(prev => prev + 1);
      } else if (currentStageIdx < tournamentData.length - 1) {
        setIsMatchmaking(true);
        setMatchmakingText(`كفو! تأهلت إلى ${tournamentData[currentStageIdx + 1].stage} 🏆`);
        setTimeout(() => {
          setIsMatchmaking(false);
          setCurrentStageIdx(prev => prev + 1);
          setCurrentQuestionIdx(0);
        }, 2500);
      } else {
        setLeagueWinner(playerName);
        setGameStarted(false);
        setIsMatchmaking(true);
        setMatchmakingText("🎉 انتهى الدوري! انتظر الدوري القادم جاري التحضير (10ث)...");
        setTimeout(() => {
          setIsMatchmaking(false);
          setActiveTab('home');
          setCurrentStageIdx(0);
          setCurrentQuestionIdx(0);
        }, 10000); // إعادة الدوري تلقائياً بعد 10 ثواني
      }
    } else {
      alert("خسرت وخرجت من الدوري! حاول مرة أخرى.");
      setGameStarted(false);
      setActiveTab('home');
      setCurrentStageIdx(0);
      setCurrentQuestionIdx(0);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      {/* الخلفية الرمضانية الأصلية (الفوانيس) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🏮</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">⭐</div>
        <div className="absolute bottom-40 left-1/4 text-3xl animate-bounce">🏮</div>
        <div className="absolute top-1/2 right-10 text-3xl animate-pulse">🌙</div>
      </div>

      {isMatchmaking && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-black text-yellow-400 animate-pulse">{matchmakingText}</h2>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] text-black font-black text-xs uppercase">
          <span className="mx-8">🏆 دوري GOWIN الرمضاني - المجموعات تتجدد تلقائياً كل دورة 🏆</span>
          <span className="mx-8">🎁 كود نون: VTP129 🎁</span>
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-black text-yellow-500 italic drop-shadow-lg">🏮 GOWIN 🏮</h1>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 backdrop-blur-md">
        {['home', 'leaderboard', 'live', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-yellow-500 text-black shadow-lg' : 'bg-white/5 border border-white/10'}`}>
            <span className="text-2xl">{['🏠', '📊', '🔴', '🎁'][idx]}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24 text-center">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
            <h1 className="text-6xl font-black text-yellow-400 py-4 animate-pulse">⚔️ GOWIN ⚔️</h1>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="سجل اسمك للدوري القادم..." className="w-full bg-black/40 p-4 rounded-2xl text-center text-xl outline-none mb-4 border border-yellow-500/20" />
              <button onClick={startChallenge} className="w-full py-5 rounded-2xl font-black text-xl bg-yellow-500 text-black hover:scale-[1.02] transition-transform">🚀 دخول الدوري</button>
            </div>
            <div className="bg-[#1a0f00]/80 rounded-3xl p-8 border-2 border-yellow-600 shadow-xl relative overflow-hidden">
              <div className="absolute -top-2 -right-2 text-4xl opacity-20">🏆</div>
              <h2 className="text-xl font-bold text-yellow-400 mb-4 italic uppercase">The Golden Goat</h2>
              <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                <p className="text-3xl font-black text-white drop-shadow-md">{leagueWinner ? `🏆 ${leagueWinner} 🏆` : "⏳ بانتظار البطل..."}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="max-w-md mx-auto space-y-6 px-2 animate-fadeIn">
            <h2 className="text-lg font-black text-red-500 animate-pulse mb-4 italic uppercase tracking-widest">البث المباشر (تحديث تلقائي) 🔴</h2>
            
            <div className="grid grid-cols-2 gap-2 transition-all duration-500">
              {[0, 1, 2, 3].map((g) => (
                <div key={g} className="bg-white/5 p-2 rounded-xl border border-white/10 shadow-lg animate-slideUp">
                  <h3 className="text-[9px] font-black text-yellow-500 mb-2 border-b border-white/5 pb-1">المجموعة {String.fromCharCode(65 + g)}</h3>
                  <div className="space-y-1">
                    {shuffledPlayers.slice(g * 4, (g * 4) + 4).map((name, i) => (
                      <div key={i} className="flex justify-between items-center text-[8px] bg-black/30 p-1 rounded hover:bg-white/5 transition-colors">
                        <span className="font-black truncate">{name}</span>
                        <span className="text-yellow-500 font-bold">{[9, 6, 3, 1][i]}ن</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/20 animate-pulse">
                <p className="text-[8px] font-bold text-yellow-500 mb-1 uppercase">مواجهة جارية</p>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px]"><span className="text-green-400 font-black">فائز</span> <span className="font-bold">{shuffledPlayers[0]}</span></div>
                  <div className="flex justify-between text-[10px]"><span className="text-red-400 font-black">خاسر</span> <span className="font-bold">{shuffledPlayers[1]}</span></div>
                </div>
              </div>
              <div className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/20">
                <p className="text-[8px] font-bold text-yellow-500 mb-1 uppercase">مواجهة جارية</p>
                <div className="flex flex-col gap-1 text-white/50">
                  <div className="flex justify-between text-[10px] italic"><span>جاري اللعب...</span> <span className="font-bold">{shuffledPlayers[2]}</span></div>
                  <div className="flex justify-between text-[10px] italic"><span>جاري اللعب...</span> <span className="font-bold">{shuffledPlayers[3]}</span></div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-black/40 p-4 rounded-xl border border-white/10">
               <div className="flex justify-between text-[9px] font-black uppercase text-white/40 mb-2 italic">
                  <span>ربع النهائي</span> <span>نصف النهائي</span> <span>النهائي</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold">{shuffledPlayers[4]} VS {shuffledPlayers[5]}</div>
                  <div className="h-px bg-white/10 flex-grow mx-2"></div>
                  <div className="text-[10px] font-bold text-yellow-500">البطولة مستمرة...</div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto py-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl animate-scaleIn">
            <div className="mb-4">
              <span className="bg-yellow-500 text-black px-4 py-1 rounded-full font-black text-xs uppercase italic">
                {tournamentData[currentStageIdx].stage}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-10 px-4 leading-relaxed">{tournamentData[currentStageIdx].questions[currentQuestionIdx].q}</h2>
            <div className="grid gap-4 px-6">
              {tournamentData[currentStageIdx].questions[currentQuestionIdx].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition-all hover:scale-[1.02]">{opt}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-md mx-auto animate-fadeIn">
             <h2 className="text-2xl font-black text-yellow-400 mb-6 italic uppercase">قائمة المنافسين 📊</h2>
             <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
              {shuffledPlayers.map((p, i) => (
                <div key={i} className="flex justify-between p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
                  <span className="text-yellow-500 font-bold">#{i+1}</span>
                  <span className="font-bold tracking-tighter">{p}</span>
                  <span className="text-[9px] text-green-400 font-black flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> LIVE</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prizes' && (
          <div className="max-w-md mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/20 text-right animate-fadeIn">
             <h2 className="text-2xl font-black text-yellow-400 mb-6 text-center italic">نظام البطولة 🏆</h2>
             <p className="font-bold text-sm leading-7">• البطولة تتجدد تلقائياً عند فوز أي بطل.</p>
             <p className="font-bold text-sm leading-7">• يجب اجتياز 4 مراحل (مجموعات، 16، 8، نهائي).</p>
             <p className="font-bold text-sm leading-7">• أي خطأ يخرجك من المنافسة فوراً.</p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center bg-black/60 backdrop-blur-xl border-t border-white/5 z-50">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-yellow-500 font-black text-sm uppercase tracking-widest">@_ITLULP</a>
      </footer>

      <style>{` 
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default App;
