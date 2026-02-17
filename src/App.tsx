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
    { q: "من هو صحابي الذي لقب بـ سيف الله المسلول؟", options: ["عمر بن الخطاب", "خالد بن وليد", "حمزة بن عبدالمطلب", "علي بن أبي طالب"], correct: 1 },
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
  const [leagueWinner, setLeagueWinner] = useState(""); // الكرت يبدأ فاضي
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchmakingText, setMatchmakingText] = useState("");
  const [visiblePlayers, setVisiblePlayers] = useState([]); // لإضافة الأسماء تدريجياً

  // منطق تصفير الدوري وإعادة تشغيله وتدريج الأسماء
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= initialOpponents.length) {
        setVisiblePlayers(initialOpponents.slice(0, index));
        index++;
      } else {
        // الدوري ينتهي تلقائياً بفوز بوت عشوائي إذا لم يتدخل لاعب
        if (!gameStarted) {
           const randomWinner = initialOpponents[Math.floor(Math.random() * initialOpponents.length)];
           setLeagueWinner(randomWinner);
           setIsMatchmaking(true);
           setMatchmakingText("انتهى الدوري! الدوري القادم يبدأ خلال (10ث)...");
           
           setTimeout(() => {
             setIsMatchmaking(false);
             index = 0; // تصفير الأسماء للبداية من جديد
             setVisiblePlayers([]);
           }, 10000);
        }
      }
    }, 5000); // إضافة اسم كل 5 ثواني
    return () => clearInterval(interval);
  }, [gameStarted]);

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
        setLeagueWinner(playerName); // تحديث الكرت باسم اللاعب الحقيقي
        setGameStarted(false);
        setIsMatchmaking(true);
        setMatchmakingText("🎉 بطل الدوري! الدوري القادم جاري التحضير (10ث)...");
        setTimeout(() => {
          setIsMatchmaking(false);
          setActiveTab('home');
          setCurrentStageIdx(0);
          setCurrentQuestionIdx(0);
          setVisiblePlayers([]);
        }, 10000);
      }
    } else {
      alert("خسرت وخرجت من الدوري!");
      setGameStarted(false);
      setActiveTab('home');
      setCurrentStageIdx(0);
      setCurrentQuestionIdx(0);
    }
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
          <span className="mx-8">🏆 دوري GOWIN الرمضاني - تصفير تلقائي للدوري وتحديث الأسماء 🏆</span>
          <span className="mx-8">🎁 كود نون: VTP129 🎁</span>
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-black text-yellow-500 italic">🏮 GOWIN 🏮</h1>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 backdrop-blur-md">
        {['home', 'leaderboard', 'live', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-yellow-500 text-black shadow-lg' : 'bg-white/5'}`}>
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
              <button onClick={startChallenge} className="w-full py-5 rounded-2xl font-black text-xl bg-yellow-500 text-black">🚀 دخول الدوري</button>
            </div>
            {/* الكرت الذهبي: يكون فاضي لين ينتهي الدوري ويفوز بطل */}
            <div className="bg-[#1a0f00]/80 rounded-3xl p-8 border-2 border-yellow-600 shadow-xl">
              <h2 className="text-xl font-bold text-yellow-400 mb-4 italic uppercase">The Golden Goat</h2>
              <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 h-20 flex items-center justify-center">
                <p className="text-3xl font-black text-white">{leagueWinner ? `🏆 ${leagueWinner} 🏆` : ""}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="max-w-md mx-auto space-y-6 px-2 animate-fadeIn">
            <h2 className="text-lg font-black text-red-500 animate-pulse mb-4 italic">البث المباشر (تحديث 5ث) 🔴</h2>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((g) => (
                <div key={g} className="bg-white/5 p-2 rounded-xl border border-white/10">
                  <h3 className="text-[9px] font-black text-yellow-500 mb-2 border-b border-white/5 pb-1">المجموعة {String.fromCharCode(65 + g)}</h3>
                  <div className="space-y-1 h-24 overflow-hidden">
                    {visiblePlayers.slice(g * 4, (g * 4) + 4).map((name, i) => (
                      <div key={i} className="flex justify-between items-center text-[8px] bg-black/30 p-1 rounded animate-slideUp">
                        <span className="font-black truncate">{name}</span>
                        <span className="text-yellow-500">{[9, 6, 3, 1][i] || 0}ن</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* توب المباريات الجارية */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/20">
                <p className="text-[8px] font-bold text-yellow-500 mb-1">مباراة 1</p>
                {visiblePlayers.length >= 2 ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]"><span className="text-green-400">فائز</span> <span className="font-bold">{visiblePlayers[0]}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-red-400">خاسر</span> <span className="font-bold">{visiblePlayers[1]}</span></div>
                  </div>
                ) : <span className="text-[8px]">بانتظار اكتمال الأسماء...</span>}
              </div>
              <div className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/20">
                <p className="text-[8px] font-bold text-yellow-500 mb-1">مباراة 2</p>
                {visiblePlayers.length >= 4 ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]"><span className="text-green-400">فائز</span> <span className="font-bold">{visiblePlayers[3]}</span></div>
                    <div className="flex justify-between text-[10px]"><span className="text-red-400">خاسر</span> <span className="font-bold">{visiblePlayers[2]}</span></div>
                  </div>
                ) : <span className="text-[8px]">بانتظار اكتمال الأسماء...</span>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto py-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md animate-scaleIn">
            <div className="mb-4"><span className="bg-yellow-500 text-black px-4 py-1 rounded-full font-black text-xs uppercase">{tournamentData[currentStageIdx].stage}</span></div>
            <h2 className="text-2xl font-bold mb-10 px-4">{tournamentData[currentStageIdx].questions[currentQuestionIdx].q}</h2>
            <div className="grid gap-4 px-6">
              {tournamentData[currentStageIdx].questions[currentQuestionIdx].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition-all">{opt}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-md mx-auto">
             <h2 className="text-2xl font-black text-yellow-400 mb-6 italic">القائمة المتجددة 📊</h2>
             <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
              {visiblePlayers.map((p, i) => (
                <div key={i} className="flex justify-between p-4 border-b border-white/5 items-center animate-fadeIn">
                  <span className="text-yellow-500 font-bold">#{i+1}</span>
                  <span className="font-bold">{p}</span>
                  <span className="text-[9px] text-green-400 font-black">LIVE 🟢</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prizes' && (
          <div className="max-w-md mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/20 text-right">
             <h2 className="text-2xl font-black text-yellow-400 mb-6 text-center italic">الجوائز 🏆</h2>
             <p className="font-bold text-sm leading-7">• الدوري ينطلق تلقائياً بمجرد اكتمال الأسماء.</p>
             <p className="font-bold text-sm leading-7">• بطل الدوري يثبت اسمه في كرت العز فور انتهاء التحدي.</p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center bg-black/60 backdrop-blur-xl border-t border-white/5">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-yellow-500 font-black text-sm uppercase">@_ITLULP</a>
      </footer>
      <style>{` @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes slideUp { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } } .animate-slideUp { animation: slideUp 0.3s ease-out; } `}</style>
    </div>
  );
}

export default App;
