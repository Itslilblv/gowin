import { useState, useEffect, useRef } from 'react';

// Questions data - لم يتم تغيير أي حرف هنا
const questionsSets = {
  set1: {
    arabic: [
      { id: 1, question: "ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "مكة", "الدمام"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "كم عدد الكواكب في المجموعة الشمسية؟", options: ["7", "8", "9", "10"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 3, question: "من هو مؤسس شركة أبل؟", options: ["بيل غيتس", "ستيف جوبز", "مارك زوكربيرغ", "إيلون ماسك"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 4, question: "ما هو الحيوان الأسرع في العالم؟", options: ["الفهد", "النمر", "الغزال", "صقر"], correct: 0, points: 15, difficulty: "متوسط" },
      { id: 5, question: "كم عدد ألوان قوس قزح؟", options: ["5", "6", "7", "8"], correct: 2, points: 15, difficulty: "متوسط" },
      { id: 6, question: "من فاز بكأس العالم 2018؟", options: ["ألمانيا", "البرازيل", "فرنسا", "كرواتيا"], correct: 2, points: 20, difficulty: "صعب قليلاً" },
    ],
    english: []
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);
  const [chatMessages, setChatMessages] = useState<{name: string, text: string, time: string, isMe: boolean}[]>([]);
  const [chatInput, setChatInput] = useState('');

  // --- نظام نغمات برمجية بسيطة (بدل الموسيقى) ---
  const playBeep = (freq: number) => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = freq;
    gain.gain.value = 0.05;
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  };

  useEffect(() => {
    if (!gameStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { 
          playBeep(200);
          if (lives > 1) { setLives(l => l - 1); return 15; }
          setGameStarted(false); setActiveTab('leaderboard'); return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, lives]);

  const handleAnswer = (index: number) => {
    playBeep(500);
    const correct = questionsSets.set1.arabic[currentQuestionIndex].correct;
    if (index === correct) setScore(s => s + 10);
    else if (lives > 1) setLives(l => l - 1);

    if (currentQuestionIndex < questionsSets.set1.arabic.length - 1) {
      setCurrentQuestionIndex(c => c + 1);
      setTimeLeft(15);
    } else {
      setGameStarted(false);
      setActiveTab('leaderboard');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 15s linear infinite; }
      `}</style>

      {/* البانر الذهبي المتحرك */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30">
        <div className="animate-marquee text-black font-black text-xs">
           🎁 كود نون: VTP129 🎁 | 🏆 هدايا قيمة للمربع الذهبي (1-4) 🏆 | 🌙 رمضان يجمعنا في دوري Gowin 🌙 | كود الخصم: VTP129
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4">
        <h1 className="text-2xl font-bold text-yellow-400">🏮 GOWIN 🏮</h1>
      </header>

      {/* التبويبات بالإيموجيات فقط (تم إضافة تبويب الهدية) */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20">
        <button onClick={() => { playBeep(400); setActiveTab('home'); }} className={`p-3 rounded-xl transition-all ${activeTab === 'home' ? 'bg-yellow-500 scale-110' : 'bg-white/10'}`}>🏠</button>
        <button onClick={() => { playBeep(400); setActiveTab('leaderboard'); }} className={`p-3 rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-yellow-500 scale-110' : 'bg-white/10'}`}>📊</button>
        <button onClick={() => { playBeep(400); setActiveTab('live'); }} className={`p-3 rounded-xl transition-all ${activeTab === 'live' ? 'bg-yellow-500 scale-110' : 'bg-white/10'}`}>🔴</button>
        <button onClick={() => { playBeep(400); setActiveTab('history'); }} className={`p-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-yellow-500 scale-110' : 'bg-white/10'}`}>📜</button>
        <button onClick={() => { playBeep(400); setActiveTab('friends'); }} className={`p-3 rounded-xl transition-all ${activeTab === 'friends' ? 'bg-yellow-500 scale-110' : 'bg-white/10'}`}>💬</button>
        <button onClick={() => { playBeep(400); setActiveTab('prizes'); }} className={`p-3 rounded-xl transition-all ${activeTab === 'prizes' ? 'bg-yellow-500 scale-110' : 'bg-white/10'}`}>🎁</button>
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto text-center py-10 space-y-6">
            <h1 className="text-6xl font-bold text-yellow-400 mb-6">⚔️ GOWIN ⚔️</h1>
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="اسمك الكريم..." className="w-full bg-white/10 p-4 rounded-xl border border-white/20 text-center outline-none" />
            <button onClick={() => { playBeep(800); setGameStarted(true); setActiveTab('challenge'); }} className="w-full py-4 rounded-2xl font-bold text-xl bg-yellow-500 text-black shadow-lg">🚀 ابدأ التحدي</button>
          </div>
        )}

        {/* التبويب الجديد: تعليمات الدوري والهدايا */}
        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🏆 تعليمات الدوري والجوائز</h2>
            <div className="bg-white/5 p-6 rounded-xl text-right whitespace-pre-line text-white/90 leading-relaxed">
                1. المسابقة تضم 20 لاعباً فقط بنظام النقاط.{"\n"}
                2. يتأهل أفضل 8 لاعبين إلى دور المجموعات.{"\n"}
                3. أصحاب المراكز (1-4) يحصلون على هدايا قيمة فورية.{"\n"}
                4. كل لاعب لديه 5 محاولات (قلوب) للإجابة.{"\n"}
                5. كود الخصم VTP129 متاح للجميع للاستخدام في نون.
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && <div className="text-center py-10 text-white/60">لوحة المتصدرين فارغة حالياً</div>}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex justify-between font-bold text-xl px-2"><span>❤️ {lives}</span><span className="text-yellow-400">⏱️ {timeLeft}</span></div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/20">
              <h2 className="text-xl font-bold mb-8">{questionsSets.set1.arabic[currentQuestionIndex]?.question}</h2>
              <div className="grid gap-4">
                {questionsSets.set1.arabic[currentQuestionIndex]?.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-yellow-500 hover:text-black transition-all">{opt}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
           <div className="max-w-2xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="h-64 overflow-y-auto space-y-3 mb-4 p-2 bg-black/20 rounded-xl">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-2xl px-4 py-2 ${msg.isMe ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white'}`}>
                      <p className="text-xs font-bold opacity-70">{msg.name}</p>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="اكتب رسالة..." className="flex-1 bg-white/10 p-3 rounded-xl border border-white/20 outline-none" />
                <button onClick={() => { if(chatInput) { setChatMessages([...chatMessages, {name: playerName||'لاعب', text: chatInput, time: '', isMe: true}]); setChatInput(''); } }} className="bg-yellow-500 text-black px-6 rounded-xl font-bold">إرسال</button>
              </div>
           </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/80 backdrop-blur-md border-t border-white/5">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold text-sm">📷 @_itlulp</a>
      </footer>
    </div>
  );
}

export default App;
