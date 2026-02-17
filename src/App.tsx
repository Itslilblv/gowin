import { useState, useEffect } from 'react';

// الأسئلة الـ 6 كما هي (من السهل للصعب)
const questions = [
  { id: 1, question: "ما هو الشهر الذي أنزل فيه القرآن الكريم؟", options: ["رجب", "رمضان", "شعبان", "شوال"], correct: 1 },
  { id: 2, question: "ما هي الوجبة التي تؤكل قبل الفجر في رمضان؟", options: ["الفطور", "الغداء", "السحور", "العشاء"], correct: 2 },
  { id: 3, question: "ما هي الصلاة التي تصلى جماعة في ليالي رمضان فقط؟", options: ["الوتر", "التراويح", "الضحى", "الكسوف"], correct: 1 },
  { id: 4, question: "كم عدد سنوات نزول القرآن الكريم؟", options: ["13 سنة", "23 سنة", "33 سنة", "10 سنوات"], correct: 1 },
  { id: 5, question: "ما هي كنية الرسول صلى الله عليه وسلم؟", options: ["أبو القاسم", "أبو بكر", "أبو إبراهيم", "أبو حفص"], correct: 0 },
  { id: 6, question: "في أي سنة فرض الصيام على المسلمين؟", options: ["السنة الأولى للهجرة", "السنة الثانية للهجرة", "السنة الثالثة للهجرة", "السنة الرابعة للهجرة"], correct: 1 }
];

const initialOpponents = ["الزعيم", "العميد", "الملكي", "الليث", "الفارس", "الصقر", "العالمي", "الممتاز", "المحترف", "المثابر", "المقاتل", "الذيب", "الجندي", "البارع", "الذكي", "الهداف", "القناص", "المبدع", "المتألق", "الناشئ"];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(initialOpponents.map((name, i) => ({ id: i, name, isReal: false })));
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leagueWinner, setLeagueWinner] = useState("المحترف_99"); // بطل افتراضي في البداية
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [matchmakingText, setMatchmakingText] = useState("");

  // نظام الشجرة (Bracket)
  const [bracket, setBracket] = useState({
    r16: initialOpponents,
    qf: ["الزعيم", "الملكي", "الفارس", "العالمي", "المحترف", "المقاتل", "الذكي", "القناص"],
    sf: ["الزعيم", "العالمي", "المحترف", "القناص"],
    final: ["الزعيم", "المحترف"],
  });

  // محاكاة تطور الدوري في المباشر (تحديث الشجرة)
  useEffect(() => {
    const timer = setInterval(() => {
      // محاكاة تغيير عشوائي في المتأهلين ليعطي شعور أن الدوري "شغال"
      const newQF = [...bracket.r16].sort(() => 0.5 - Math.random()).slice(0, 8);
      const newSF = newQF.slice(0, 4);
      const newFinal = newSF.slice(0, 2);
      
      setBracket({
        r16: initialOpponents,
        qf: newQF,
        sf: newSF,
        final: newFinal
      });
    }, 10000); // كل 10 ثواني تتغير الشجرة

    return () => clearInterval(timer);
  }, [bracket]);

  const startChallenge = () => {
    if (!playerName.trim()) return;
    setIsMatchmaking(true);
    const steps = [
      { t: "جاري حجز مقعد في القرعة...", d: 1500 },
      { t: "تحليل مستوى المنافسين...", d: 2000 },
      { t: `تم إدراجك في مواجهة ضد: ${initialOpponents[Math.floor(Math.random()*20)]}`, d: 2000 },
      { t: "انطلاق صافرة البداية!", d: 1500 }
    ];
    let delay = 0;
    steps.forEach((step, i) => {
      setTimeout(() => {
        setMatchmakingText(step.t);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setIsMatchmaking(false);
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
      setLeagueWinner(playerName); // اللاعب الحقيقي يصبح القوت
      setGameStarted(false);
      setActiveTab('home');
      setCurrentQuestionIndex(0);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      {isMatchmaking && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6">
          <div className="w-20 h-20 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-black text-yellow-400 animate-pulse">{matchmakingText}</h2>
        </div>
      )}

      {/* شريط الإشعارات */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-600 to-yellow-400 flex items-center overflow-hidden shadow-lg">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-black font-black text-[10px] uppercase">
          <span className="mx-10">🏆 دوري أبطال GOWIN - البث المباشر للشجرة شغال الآن 🏆</span>
          <span className="mx-10">🔥 سجل اسمك لتكون بطل الدوري القادم 🔥</span>
        </div>
      </div>

      <header className="relative z-50 pt-16 flex justify-center p-4">
        <h1 className="text-3xl font-black text-yellow-500 italic drop-shadow-md">🏮 GOWIN CHAMPIONS 🏮</h1>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4">
        {['home', 'leaderboard', 'live', 'prizes'].map((tab, idx) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTab === tab ? 'bg-yellow-500 text-black scale-110 shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-white/5 border border-white/10'}`}>
            <span className="text-2xl">{['🏠', '📊', '🌳', '🎁'][idx]}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-8 text-center">
            <h1 className="text-7xl font-black text-yellow-400 py-4 drop-shadow-2xl">⚔️ GOWIN ⚔️</h1>
            
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="سجل اسمك في البطولة..." className="w-full bg-black/60 p-5 rounded-2xl text-center text-2xl outline-none mb-6 border border-yellow-500/30 focus:border-yellow-500" />
              <button onClick={startChallenge} className="w-full py-5 rounded-2xl font-black text-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-xl hover:brightness-110 active:scale-95 transition-all">دخول التحدي 🏆</button>
              <p className="mt-4 text-yellow-500 font-bold animate-pulse text-sm">باقي {20 - players.filter(p => p.isReal).length} مقعد في الدوري</p>
            </div>

            <div className="bg-gradient-to-b from-[#1a0f00] to-black rounded-[2rem] p-10 border-2 border-yellow-600/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">🐐</div>
              <h2 className="text-sm font-black text-yellow-500 tracking-[0.4em] mb-4 uppercase">The Golden Goat</h2>
              <p className="text-4xl font-black text-white italic drop-shadow-lg uppercase tracking-tighter">
                {leagueWinner ? `🏆 ${leagueWinner} 🏆` : "بانتظار البطل..."}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="max-w-4xl mx-auto space-y-8 overflow-x-auto pb-10">
            <h2 className="text-2xl font-black text-yellow-400 text-center mb-8 italic uppercase tracking-widest">شجرة البطولة - مباشر 🔴</h2>
            
            <div className="flex justify-between items-center min-w-[600px] gap-4">
              {/* دور الـ 8 (ربع النهائي) */}
              <div className="flex flex-col gap-8 flex-1">
                {bracket.qf.map((name, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs font-bold flex justify-between">
                    <span>{name}</span>
                    <span className="text-yellow-500">QF</span>
                  </div>
                ))}
              </div>

              {/* نصف النهائي */}
              <div className="flex flex-col gap-24 flex-1">
                {bracket.sf.map((name, i) => (
                  <div key={i} className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/40 text-sm font-black text-yellow-400 flex justify-between shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                    <span>{name}</span>
                    <span>SF</span>
                  </div>
                ))}
              </div>

              {/* النهائي */}
              <div className="flex flex-col gap-40 flex-1">
                {bracket.final.map((name, i) => (
                  <div key={i} className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-5 rounded-xl text-black font-black text-base flex justify-between shadow-2xl animate-pulse">
                    <span>{name}</span>
                    <span>FINAL</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-white/30 text-xs mt-10 font-bold italic">يتم تحديث الشجرة تلقائياً بناءً على نتائج المباريات القائمة حالياً</p>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto py-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
            <div className="mb-6 text-yellow-500 font-black text-sm tracking-widest">المرحلة النهائية - سؤال {currentQuestionIndex + 1}/6</div>
            <h2 className="text-3xl font-bold mb-10 px-6 leading-tight">{questions[currentQuestionIndex].question}</h2>
            <div className="grid gap-4 px-8">
              {questions[currentQuestionIndex].options.map((opt, i) => (
                <button key={i} onClick={handleAnswer} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-xl hover:bg-yellow-500 hover:text-black transition-all active:scale-95 shadow-lg text-right pr-10">{opt}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-black text-yellow-400 mb-6 italic text-center">المتأهلون الحاليون 📊</h2>
            <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 p-4 bg-yellow-500 text-black font-black text-xs uppercase italic">
                <span>الترتيب</span><span>الاسم</span><span>الحالة</span>
              </div>
              <div className="max-h-[450px] overflow-y-auto">
                {players.map((p, i) => (
                  <div key={i} className="grid grid-cols-3 p-5 border-b border-white/5 text-sm items-center hover:bg-white/5">
                    <span className="text-yellow-500 font-black">#{i+1}</span>
                    <span className="font-bold">{p.name}</span>
                    <span className="flex items-center justify-center gap-2 text-[10px] text-green-400 font-black">
                      <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgb(34,197,94)]"></span> مباشر
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center bg-black/80 backdrop-blur-xl border-t border-white/5 z-50">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-yellow-500 font-black tracking-[0.3em] text-[10px] hover:scale-110 transition-transform inline-block uppercase">PRODUCED BY: @_ITLULP</a>
      </footer>

      <style>{` @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } `}</style>
    </div>
  );
}

export default App;
