import { useState, useEffect } from 'react';

const questions = [
  { id: 1, question: "ما هو الشهر الذي أنزل فيه القرآن الكريم؟", options: ["رجب", "رمضان", "شعبان", "شوال"], correct: 1 },
  { id: 2, question: "ما هي الوجبة التي تؤكل قبل الفجر في رمضان؟", options: ["الفطور", "الغداء", "السحور", "العشاء"], correct: 2 },
  { id: 3, question: "ما هي الصلاة التي تصلى جماعة في ليالي رمضان فقط؟", options: ["الوتر", "التراويح", "الضحى", "الكسوف"], correct: 1 },
  { id: 4, question: "كم عدد سنوات نزول القرآن الكريم؟", options: ["13 سنة", "23 سنة", "33 سنة", "10 سنوات"], correct: 1 },
  { id: 5, question: "ما هي كنية الرسول صلى الله عليه وسلم؟", options: ["أبو القاسم", "أبو بكر", "أبو إبراهيم", "أبو حفص"], correct: 0 },
  { id: 6, question: "في أي سنة فرض الصيام على المسلمين؟", options: ["السنة الأولى للهجرة", "السنة الثانية للهجرة", "السنة الثالثة للهجرة", "السنة الرابعة للهجرة"], correct: 1 }
];

const opponentsList = ["عبدالعزيز_99", "سارة_خالد", "Legend_Goat", "الزعيم_01", "صقر_الشرقية", "The_Wolf_KSA", "عزوز_باشا", "فهد_01", "مريم_نور", "سلطان_KSA", "نورة_M", "خالد_العنزي", "بطل_الرمال", "Gamer_Boy", "البرنس", "القناص_X", "سيف_الدين", "ماجد_9", "الأسد_الذهبي", "فارس_رمضان"];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(opponentsList.map((name, index) => ({ id: index, name, isReal: false }))); 
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leagueWinner, setLeagueWinner] = useState(null);
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchmakingText, setMatchmakingText] = useState("");
  
  // نظام دوري أبطال أوروبا (المباشر)
  const [liveStage, setLiveStage] = useState("دور الـ 16");
  const [liveMatch, setLiveMatch] = useState("الزعيم VS صقر الشرقية");

  useEffect(() => {
    const stages = ["ربع النهائي", "نصف النهائي", "النهائي الكبير 🔥"];
    let i = 0;
    const interval = setInterval(() => {
      setLiveStage(stages[i % stages.length]);
      setLiveMatch(`${opponentsList[Math.floor(Math.random()*10)]} VS ${opponentsList[Math.floor(Math.random()*10+10)]}`);
      
      if (stages[i % stages.length] === "النهائي الكبير 🔥") {
        setLeagueWinner(opponentsList[Math.floor(Math.random()*opponentsList.length)]);
      }
      i++;
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const startChallenge = () => {
    if (!playerName.trim()) return;
    setIsMatchmaking(true);
    const steps = [
      { t: "جاري فحص الاتصال...", d: 1500 },
      { t: "البحث عن منافس متصل الآن...", d: 2500 },
      { t: `تم العثور على الخصم: ${opponentsList[Math.floor(Math.random()*opponentsList.length)]}`, d: 2000 },
      { t: "جاري تهيئة المربع الذهبي...", d: 1500 }
    ];
    let delay = 0;
    steps.forEach((step, i) => {
      setTimeout(() => {
        setMatchmakingText(step.t);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setIsMatchmaking(false);
            // استبدال أحد اللاعبين (البوتات) باللاعب الحقيقي
            setPlayers(prev => {
              const newPlayers = [...prev];
              const placeholderIdx = newPlayers.findIndex(p => !p.isReal);
              if (placeholderIdx !== -1) {
                newPlayers[placeholderIdx] = { id: 'user', name: playerName, isReal: true };
              }
              return newPlayers;
            });
            setGameStarted(true);
            setActiveTab('challenge');
          }, step.d);
        }
      }, delay);
      delay += step.d;
    });
  };

  const handleAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setLeagueWinner(playerName);
      setGameStarted(false);
      setActiveTab('home');
      setCurrentQuestionIndex(0);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      {isMatchmaking && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-center p-6">
          <h2 className="text-2xl font-black text-yellow-400 animate-pulse italic">{matchmakingText}</h2>
          <div className="mt-8 flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>)}
          </div>
        </div>
      )}

      {/* البنـر الذهبي */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] text-black font-black text-xs uppercase">
          <span className="mx-8">🏆 دوري GOWIN الرمضاني - نافس 20 لاعباً على اللقب 🏆</span>
          <span className="mx-8">🎁 كود نون: VTP129 🎁</span>
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-black text-yellow-500 italic">🏮 GOWIN 🏮</h1>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 backdrop-blur-md">
        {['home', 'leaderboard', 'live', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-yellow-500 text-black shadow-lg scale-110' : 'bg-white/5'}`}>
            <span className="text-2xl">{['🏠', '📊', '🔴', '🎁'][idx]}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24 text-center">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-6xl font-black text-yellow-400 py-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] animate-pulse">⚔️ GOWIN ⚔️</h1>
            
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="أدخل اسمك للمنافسة..." className="w-full bg-black/40 p-4 rounded-2xl text-center text-xl outline-none mb-4 border border-yellow-500/20 focus:border-yellow-500 transition-all" />
              <button onClick={startChallenge} className="w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-b from-yellow-400 to-yellow-600 text-black shadow-xl active:scale-95 transition-transform">🚀 دخول الدوري الآن</button>
              <div className="mt-4 flex justify-between text-[10px] font-bold text-yellow-500">
                 <span>المقاعد المتبقية: {players.filter(p => !p.isReal).length}</span>
                 <span className="animate-pulse">🔴 البث المباشر متاح</span>
              </div>
            </div>

            <div className="bg-[#1a0f00] rounded-3xl p-8 border-2 border-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
              <h2 className="text-xl font-bold text-yellow-400 uppercase tracking-widest mb-4 italic">The Golden Goat</h2>
              <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 shadow-[inset_0_0_15px_rgba(234,179,8,0.1)]">
                <p className="text-3xl font-black text-white uppercase tracking-wider">
                  {leagueWinner ? `🐐 ${leagueWinner} 🐐` : "⏳ بانتظار بطل النهائي..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
              <h2 className="text-xl font-black text-red-500 uppercase italic">بث مباشر - الدوري الحالي</h2>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-lg">
              <p className="text-yellow-400 font-bold mb-4 tracking-widest uppercase">{liveStage}</p>
              <div className="text-2xl font-black flex items-center justify-between gap-4">
                <span className="flex-1">{liveMatch.split('VS')[0]}</span>
                <span className="text-yellow-500 text-xs italic">VS</span>
                <span className="flex-1">{liveMatch.split('VS')[1]}</span>
              </div>
              <div className="mt-6 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 animate-[marquee_3s_linear_infinite]" style={{width: '40%'}}></div>
              </div>
            </div>
            <p className="text-white/40 text-[10px] italic">شاهد أقوى المواجهات قبل تسجيل اسمك ودخول التحدي</p>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto py-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <div className="mb-6 text-yellow-500 font-black text-sm uppercase tracking-widest">تحدي المربع الذهبي - سؤال {currentQuestionIndex + 1}/6</div>
            <h2 className="text-2xl font-bold mb-10 px-4">{questions[currentQuestionIndex].question}</h2>
            <div className="grid gap-4 px-6">
              {questions[currentQuestionIndex].options.map((opt, i) => (
                <button key={i} onClick={handleAnswer} className="p-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition-all active:scale-95">{opt}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-black text-yellow-400 mb-6 italic">قائمة المنافسين الحالية 📊</h2>
            <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-md">
              <div className="grid grid-cols-3 p-4 bg-yellow-500 text-black font-black text-[10px] uppercase">
                <span>الترتيب</span><span>الاسم</span><span>الحالة</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {players.map((p, i) => (
                  <div key={i} className="grid grid-cols-3 p-4 border-b border-white/5 text-sm items-center">
                    <span className="text-yellow-500 font-bold">#{i+1}</span>
                    <span className="font-bold">{p.name}</span>
                    <span className="flex items-center justify-center gap-1 text-[9px] text-green-400 font-bold">
                      <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span> متصل
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prizes' && (
          <div className="max-w-md mx-auto bg-gradient-to-t from-yellow-600/20 to-transparent p-8 rounded-3xl border border-yellow-500/20 text-right space-y-4">
            <h2 className="text-2xl font-black text-yellow-400 mb-6 text-center italic">الجوائز والقوانين 🏆</h2>
            <p className="font-bold text-sm">1. الدوري ينطلق عند اكتمال 20 لاعباً حقيقياً.</p>
            <p className="font-bold text-sm">2. بطل الدوري يتوج باللقب الذهبي في الصفحة الرئيسية.</p>
            <p className="font-bold text-sm">3. الجوائز تشمل أصحاب المراكز الأربعة الأولى.</p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center bg-black/60 backdrop-blur-xl border-t border-white/5 z-50">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-yellow-500 font-black tracking-[0.2em] text-xs hover:scale-110 transition-transform inline-block">FOLLOW: @_ITLULP</a>
      </footer>

      <style>{` @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } `}</style>
    </div>
  );
}

export default App;
