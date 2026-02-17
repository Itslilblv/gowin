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
    { q: "من هو أول المؤذنين في الإسلام؟", options: ["عمر بن الخطاب", "بلال بن رباح", "أبو بكر الصديق", "علي بن أبي طالب"], correct: 1 },
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
  const [leagueWinner, setLeagueWinner] = useState(""); 
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchmakingText, setMatchmakingText] = useState("");
  const [visiblePlayers, setVisiblePlayers] = useState([]);
  const [isFull, setIsFull] = useState(false);
  
  // حالات جديدة للتحقق من الإجابة (الصح والغلط)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= initialOpponents.length) {
        setVisiblePlayers(initialOpponents.slice(0, index));
        if (index === initialOpponents.length) setIsFull(true);
        index++;
      } else if (isFull && !gameStarted) {
           const randomWinner = initialOpponents[Math.floor(Math.random() * initialOpponents.length)];
           setLeagueWinner(randomWinner);
           setIsMatchmaking(true);
           setMatchmakingText("انتهى الدوري! انتظر الدوري القادم (10ث)...");
           setTimeout(() => {
             setIsMatchmaking(false);
             setVisiblePlayers([]);
             setIsFull(false);
             setLeagueWinner("");
             index = 0;
           }, 10000);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isFull, gameStarted]);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return; // منع النقر المتكرر
    
    const correctIdx = tournamentData[currentStageIdx].questions[currentQuestionIdx].correct;
    setSelectedAnswer(index);
    const isRight = index === correctIdx;
    setIsCorrect(isRight);

    setTimeout(() => {
      if (isRight) {
        if (currentQuestionIdx < 3) {
          setCurrentQuestionIdx(prev => prev + 1);
        } else if (currentStageIdx < tournamentData.length - 1) {
          setIsMatchmaking(true);
          setMatchmakingText(`كفو! تأهلت إلى ${tournamentData[currentStageIdx + 1].stage} 🏆`);
          setTimeout(() => {
            setIsMatchmaking(false);
            setCurrentStageIdx(prev => prev + 1);
            setCurrentQuestionIdx(0);
          }, 2000);
        } else {
          setLeagueWinner(playerName);
          setGameStarted(false);
          setIsMatchmaking(true);
          setMatchmakingText("🎉 بطل الدوري! استعد للدورة القادمة (10ث)...");
          setTimeout(() => {
            setIsMatchmaking(false);
            setActiveTab('home');
            setCurrentStageIdx(0);
            setCurrentQuestionIdx(0);
            setVisiblePlayers([]);
            setIsFull(false);
          }, 10000);
        }
      } else {
        alert("إجابة خاطئة! خرجت من الدوري.");
        setGameStarted(false);
        setActiveTab('home');
        setCurrentStageIdx(0);
        setCurrentQuestionIdx(0);
      }
      setSelectedAnswer(null);
      setIsCorrect(null);
    }, 1500); // تأخير بسيط لرؤية النتيجة (الصح/الغلط)
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      {/* الخلفية الرمضانية */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">🏮</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">⭐</div>
        <div className="absolute bottom-40 left-1/4 text-3xl animate-bounce">🏮</div>
      </div>

      {isMatchmaking && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-xl font-black text-yellow-400 animate-pulse">{matchmakingText}</h2>
        </div>
      )}

      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] text-black font-black text-xs uppercase">
          <span className="mx-8">🏆 دوري GOWIN الرمضاني - تصفير تلقائي وإجابات ذكية 🏆</span>
          <span className="mx-8">🎁 كود نون: VTP129 🎁</span>
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-black text-yellow-500 italic">🏮 GOWIN 🏮</h1>
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
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="اسمك للدوري القادم..." className="w-full bg-black/40 p-4 rounded-2xl text-center text-xl outline-none mb-4 border border-yellow-500/20" />
              <button onClick={() => { if(playerName.trim()) { setGameStarted(true); setActiveTab('challenge'); }}} className="w-full py-5 rounded-2xl font-black text-xl bg-yellow-500 text-black">🚀 دخول الدوري</button>
            </div>
            <div className="bg-[#1a0f00]/80 rounded-3xl p-8 border-2 border-yellow-600 shadow-xl">
              <h2 className="text-xl font-bold text-yellow-400 mb-4 italic uppercase">The Golden Goat</h2>
              <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 h-24 flex items-center justify-center">
                <p className="text-4xl font-black text-white">{leagueWinner ? `🏆 ${leagueWinner} 🏆` : ""}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto py-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md animate-scaleIn">
            <div className="mb-4"><span className="bg-yellow-500 text-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest">{tournamentData[currentStageIdx].stage}</span></div>
            <h2 className="text-2xl font-bold mb-10 px-4">{tournamentData[currentStageIdx].questions[currentQuestionIdx].q}</h2>
            <div className="grid gap-4 px-6">
              {tournamentData[currentStageIdx].questions[currentQuestionIdx].options.map((opt, i) => {
                const isCorrectOption = i === tournamentData[currentStageIdx].questions[currentQuestionIdx].correct;
                const isSelected = i === selectedAnswer;
                
                let btnStyle = "bg-white/5 border-white/10";
                if (selectedAnswer !== null) {
                  if (isCorrectOption) btnStyle = "bg-green-600 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]";
                  else if (isSelected) btnStyle = "bg-red-600 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
                }

                return (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(i)} 
                    className={`p-5 border rounded-2xl font-bold transition-all flex justify-between items-center ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer !== null && isCorrectOption && <span className="text-xl">✅</span>}
                    {selectedAnswer !== null && isSelected && !isCorrectOption && <span className="text-xl">❌</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="max-w-md mx-auto space-y-6 px-2 animate-fadeIn">
            <h2 className="text-lg font-black text-red-500 animate-pulse mb-4 italic">
              {isFull ? "البث المباشر: الدوري انطلق 🔴" : "بانتظار اكتمال اللاعبين... ⏳"}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((g) => (
                <div key={g} className="bg-white/5 p-2 rounded-xl border border-white/10">
                  <h3 className="text-[10px] font-black text-yellow-500 mb-2 border-b border-white/5 pb-1">المجموعة {String.fromCharCode(65 + g)}</h3>
                  <div className="space-y-1 h-28 overflow-hidden">
                    {visiblePlayers.slice(g * 4, (g * 4) + 4).map((name, i) => (
                      <div key={i} className="flex justify-between items-center text-[9px] bg-black/30 p-1.5 rounded animate-slideUp">
                        <span className="font-black truncate">{name}</span>
                        <span className="text-yellow-500 font-bold">{isFull ? [12, 9, 6, 3][i] : 0}ن</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {isFull && (
              <div className="bg-yellow-500/5 p-4 rounded-xl border border-yellow-500/20 mt-4">
                <p className="text-[8px] font-black text-yellow-500 mb-2">مباراة جارية</p>
                <div className="flex justify-between text-xs font-bold italic">
                   <span className="text-green-400 font-black italic">WINNER: {visiblePlayers[0]}</span>
                   <span className="text-white/20">VS</span>
                   <span className="text-red-400 font-black italic">OUT: {visiblePlayers[10]}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* بقية التبويبات تظل كما هي لعدم التعديل على ما لم تطلبه */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-md mx-auto animate-fadeIn">
             <h2 className="text-2xl font-black text-yellow-400 mb-6 italic uppercase">قائمة المشاركين 📊</h2>
             <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
              {visiblePlayers.map((p, i) => (
                <div key={i} className="flex justify-between p-4 border-b border-white/5 items-center">
                  <span className="text-yellow-500 font-bold">#{i+1}</span>
                  <span className="font-bold">{p}</span>
                  <span className="text-[9px] text-green-400 font-black">LIVE 🟢</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center bg-black/60 backdrop-blur-xl border-t border-white/5">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-yellow-500 font-black text-sm uppercase">@_ITLULP</a>
      </footer>
      <style>{` @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } } .animate-slideUp { animation: slideUp 0.3s ease-out; } .animate-fadeIn { animation: fadeIn 0.5s ease-out; } `}</style>
    </div>
  );
}

export default App;
