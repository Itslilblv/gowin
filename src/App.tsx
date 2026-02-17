import { useState, useEffect } from 'react';

// تنظيم الأسئلة: 4 لكل مرحلة
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

const initialOpponents = ["خالد", "ريان", "أحمد", "سارة", "فهد", "نورة", "عزوز", "مريم", "سلطان", "ليلى", "بدر", "هند", "جاسم", "عبير", "نايف", "العنزي", "البرنس", "القناص", "صقر", "الذيب"];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(initialOpponents.map((name, i) => ({ id: i, name, isReal: false })));
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [leagueWinner, setLeagueWinner] = useState("الذيب"); 
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchmakingText, setMatchmakingText] = useState("");

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
        // ننتقل للسؤال التالي في نفس المرحلة
        setCurrentQuestionIdx(prev => prev + 1);
      } else if (currentStageIdx < tournamentData.length - 1) {
        // ننتقل للمرحلة التالية
        setIsMatchmaking(true);
        setMatchmakingText(`كفو! تأهلت إلى ${tournamentData[currentStageIdx + 1].stage} 🏆`);
        setTimeout(() => {
          setIsMatchmaking(false);
          setCurrentStageIdx(prev => prev + 1);
          setCurrentQuestionIdx(0);
        }, 2500);
      } else {
        // فاز بالنهائي
        setLeagueWinner(playerName);
        setGameStarted(false);
        setActiveTab('home');
        setCurrentStageIdx(0);
        setCurrentQuestionIdx(0);
        alert("🎉 مبروك! لقد اجتزت كل الأدوار وأصبحت بطل الدوري! 🎉");
      }
    } else {
      alert("للأسف، خسرت في هذه المرحلة! عد للمجموعات وحاول مجدداً.");
      setGameStarted(false);
      setActiveTab('home');
      setCurrentStageIdx(0);
      setCurrentQuestionIdx(0);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      {isMatchmaking && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-2xl font-black text-yellow-400 animate-pulse italic">{matchmakingText}</h2>
        </div>
      )}

      {/* البنر العلوي */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30 shadow-lg">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-black font-black text-[10px] uppercase">
          <span className="mx-8">🏆 دوري أبطال GOWIN الرمضاني - نظام 4 أسئلة لكل دور 🏆</span>
          <span className="mx-8">🎁 كود خصم نون: VTP129 🎁</span>
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-black text-yellow-500 italic drop-shadow-md">🏮 GOWIN CHAMPIONS 🏮</h1>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4">
        {['home', 'leaderboard', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-yellow-500 text-black shadow-lg scale-110' : 'bg-white/5 border border-white/10'}`}>
            <span className="text-2xl">{['🏠', '📊', '🎁'][idx]}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24 text-center">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-7xl font-black text-yellow-400 py-4 drop-shadow-2xl animate-pulse">⚔️ GOWIN ⚔️</h1>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="اسمك للدخول في المجموعات..." className="w-full bg-black/40 p-5 rounded-2xl text-center text-2xl outline-none mb-6 border border-yellow-500/20 focus:border-yellow-500" />
              <button onClick={startChallenge} className="w-full py-5 rounded-2xl font-black text-2xl bg-gradient-to-b from-yellow-400 to-yellow-600 text-black shadow-xl active:scale-95 transition-all">🚀 دخول دور المجموعات</button>
              <div className="mt-4 flex justify-between text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                 <span>المقاعد المتبقية: 20/20</span>
                 <span className="animate-pulse">بث مباشر للأدوار 🔴</span>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#1a0f00] to-black rounded-[2rem] p-8 border-2 border-yellow-600 shadow-xl">
              <h2 className="text-xs font-black text-yellow-500 tracking-[0.5em] mb-4 uppercase">The Golden Goat</h2>
              <div className="p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/20 shadow-inner">
                <p className="text-4xl font-black text-white italic">{leagueWinner ? `🏆 ${leagueWinner} 🏆` : "⏳ بانتظار البطل..."}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto py-10 bg-white/5 rounded-[2.5rem] border-2 border-yellow-500/20 backdrop-blur-md shadow-2xl">
            <div className="flex flex-col items-center mb-8 gap-3">
               <span className="bg-yellow-500 text-black px-6 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">
                  {tournamentData[currentStageIdx].stage}
               </span>
               <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i <= currentQuestionIdx ? 'bg-yellow-500' : 'bg-white/20'}`}></div>
                  ))}
               </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 px-6 leading-relaxed">
              {tournamentData[currentStageIdx].questions[currentQuestionIdx].q}
            </h2>
            <div className="grid gap-4 px-8">
              {tournamentData[currentStageIdx].questions[currentQuestionIdx].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-xl hover:bg-yellow-500 hover:text-black transition-all active:scale-95 text-right pr-10 shadow-lg">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-md mx-auto">
             <h2 className="text-2xl font-black text-yellow-400 mb-6 italic text-center uppercase tracking-widest">المنافسون 📊</h2>
             <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              {initialOpponents.map((p, i) => (
                <div key={i} className="flex justify-between p-4 border-b border-white/5 items-center">
                  <span className="text-yellow-500 font-black">#{i+1}</span>
                  <span className="font-bold">{p}</span>
                  <span className="text-[9px] text-green-400 font-black uppercase">Live 🟢</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center bg-black/80 backdrop-blur-xl border-t border-white/5 z-50">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-yellow-500 font-black text-[10px] tracking-[0.3em] uppercase">@_ITLULP</a>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
      `}</style>
    </div>
  );
}

export default App;
