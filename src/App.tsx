import { useState, useEffect, useRef } from 'react';

// Questions data - لم يتم تغيير أي حرف هنا
const questionsSets = {
  set1: {
    arabic: [
      { id: 1, question: "ما هي عاصمة المملكة العربية السعودية؟", options: ["جدة", "الرياض", "مكة", "الدمام"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "كم عدد الكواكب في المجموعة الشمسية؟", options: ["7", "8", "9", "10"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 3, question: "من هو مؤسس شركة أبل? ", options: ["بيل غيتس", "ستيف جوبز", "مارك زوكربيرغ", "إيلون ماسك"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 4, question: "ما هو الحيوان الأسرع في العالم؟", options: ["الفهد", "النمر", "الغزال", "صقر"], correct: 0, points: 15, difficulty: "متوسط" },
      { id: 5, question: "كم عدد ألوان قوس قزح؟", options: ["5", "6", "7", "8"], correct: 2, points: 15, difficulty: "متوسط" },
      { id: 6, question: "من فاز بكأس العالم 2018؟", options: ["ألمانيا", "البرازيل", "فرنسا", "كرواتيا"], correct: 2, points: 20, difficulty: "صعب قليلاً" },
    ],
    english: [
      { id: 1, question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Rome"], correct: 1, points: 10, difficulty: "Very Easy" },
      { id: 2, question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2, points: 10, difficulty: "Very Easy" },
      { id: 3, question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], correct: 2, points: 10, difficulty: "Very Easy" },
      { id: 4, question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2, points: 15, difficulty: "Medium" },
      { id: 5, question: "Which planet is closest to the sun?", options: ["Venus", "Mercury", "Mars", "Earth"], correct: 1, points: 15, difficulty: "Medium" },
      { id: 6, question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Jane Austen", "Shakespeare", "Hemingway"], correct: 2, points: 20, difficulty: "Slightly Hard" },
    ]
  },
  set2: {
    arabic: [
      { id: 1, question: "ما هو أكبر محيط في العالم؟", options: ["الأطلسي", "الهادئ", "الهندي", "القطبي"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "من هو أول رئيس أمريكي؟", options: ["أبراهام لنكولن", "جورج واشنطن", "توماس جيفرسون", "جون亚当س"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 3, question: "ما هو العنصر الكيميائي للذهب؟", options: ["Ag", "Fe", "Au", "Cu"], correct: 2, points: 10, difficulty: "سهل جداً" },
      { id: 4, question: "كم عدد عظام جسم الإنسان البالغ؟", options: ["186", "206", "226", "246"], correct: 1, points: 15, difficulty: "متوسط" },
      { id: 5, question: "ما هو أطول نهر في العالم؟", options: ["الأمازون", "النيل", "اليانغتسي", "الميسيسيبي"], correct: 1, points: 15, difficulty: "متوسط" },
      { id: 6, question: "من اكتشف أمريكا؟", options: ["فاسكو دا غاما", "كريستوفر كولومبوس", "ماجلان", "أمريغو فيسبوتشي"], correct: 1, points: 20, difficulty: "صعب قليلاً" },
    ],
    english: [
      { id: 1, question: "What is the largest planet?", options: ["Jupiter", "Saturn", "Neptune", "Uranus"], correct: 0, points: 10, difficulty: "Very Easy" },
      { id: 2, question: "How many weeks in a year?", options: ["48", "50", "52", "54"], correct: 2, points: 10, difficulty: "Very Easy" },
      { id: 3, question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2, points: 10, difficulty: "Very Easy" },
      { id: 4, question: "Which country has the most population?", options: ["USA", "India", "China", "Russia"], correct: 1, points: 15, difficulty: "Medium" },
      { id: 5, question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: 0, points: 15, difficulty: "Medium" },
      { id: 6, question: "Who discovered penicillin?", options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Edward Jenner"], correct: 1, points: 20, difficulty: "Slightly Hard" },
    ]
  },
  set3: {
    arabic: [
      { id: 1, question: "ما هو اليوم الوطني للمملكة؟", options: ["23 سبتمبر", "1 يناير", "14 أكتوبر", "11 نوفمبر"], correct: 0, points: 10, difficulty: "سهل جداً" },
      { id: 2, question: "كم شهراً في السنة؟", options: ["10", "11", "12", "13"], correct: 2, points: 10, difficulty: "سهل جداً" },
      { id: 3, question: "ما هو لون السماء في النهار؟", options: ["أخضر", "أزرق", "أحمر", "أصفر"], correct: 1, points: 10, difficulty: "سهل جداً" },
      { id: 4, question: "كم عدد أصابع اليد الواحدة؟", options: ["4", "5", "6", "7"], correct: 1, points: 15, difficulty: "متوسط" },
      { id: 5, question: "ما هو الحيوان الذي يُسمى 'سفينة الصحراء'؟", options: ["الجمل", "الخيل", "الفيل", "النمر"], correct: 0, points: 15, difficulty: "متوسط" },
      { id: 6, question: "من هو مؤسس المملكة العربية السعودية؟", options: ["الملك فيصل", "الملك عبدالعزيز", "الملك فهد", "الملك عبدالله"], correct: 1, points: 20, difficulty: "صعب قليلاً" },
    ],
    english: [
      { id: 1, question: "How many days in a leap year?", options: ["364", "365", "366", "367"], correct: 2, points: 10, difficulty: "Very Easy" },
      { id: 2, question: "What is 10 x 10?", options: ["100", "1000", "10", "10000"], correct: 0, points: 10, difficulty: "Very Easy" },
      { id: 3, question: "Which is a fruit?", options: ["Carrot", "Potato", "Apple", "Onion"], correct: 2, points: 10, difficulty: "Very Easy" },
      { id: 4, question: "How many players in a soccer team?", options: ["9", "10", "11", "12"], correct: 2, points: 15, difficulty: "Medium" },
      { id: 5, question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correct: 2, points: 15, difficulty: "Medium" },
      { id: 6, question: "Who invented the telephone?", options: ["Edison", "Tesla", "Bell", "Marconi"], correct: 2, points: 20, difficulty: "Slightly Hard" },
    ]
  }
};

type Player = { id: string; name: string; avatar: string; points: number; lives: number; isWinner: boolean; joinedAt: Date; deviceId: string; };

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard' | 'live' | 'history' | 'friends' | 'challenge' | 'prizes'>('home');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [chatMessages, setChatMessages] = useState<{name: string, text: string, time: string, isMe: boolean}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // موسيقى رمضان (تعمل عند التفاعل)
  useEffect(() => {
    const musicUrl = 'https://www.arabic-keyboard.org/mp3/ramadan-gana.mp3';
    const startMusic = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicUrl);
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };
    window.addEventListener('click', startMusic);
    window.addEventListener('touchstart', startMusic);
  }, []);

  useEffect(() => {
    if (showResult || !gameStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { handleTimeOut(); return 15; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult, gameStarted]);

  const handleTimeOut = () => { if (lives > 1) { setLives(prev => prev - 1); setTimeLeft(15); } else endChallenge(); };

  const startChallenge = () => {
    if (!playerName.trim()) return;
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setLives(5);
    setTimeLeft(15);
    setActiveTab('challenge');
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const currentQuestions = language === 'ar' ? questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic : questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;
    const currentQuestion = currentQuestions[currentQuestionIndex];
    setTimeout(() => {
      if (index === currentQuestion.correct) setScore(prev => prev + currentQuestion.points);
      else if (lives > 1) setLives(prev => prev - 1);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        setTimeLeft(15);
        if (currentQuestionIndex < currentQuestions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
        else endChallenge();
      }, 400);
    }, 300);
  };

  const endChallenge = () => { setGameStarted(false); setActiveTab('leaderboard'); };

  const currentQuestions = language === 'ar' ? questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic : questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 15s linear infinite; }
      `}</style>

      {/* البانر الذهبي المتحرك */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden border-b border-yellow-300/30">
        <div className="animate-marquee text-black font-black text-xs">
           🎁 كود خصم نون: VTP129 🎁 | 🏆 جوائز نقدية للمربع الذهبي (1-4) 🏆 | 🌙 رمضان يجمعنا في دوري Gowin 🌙
        </div>
      </div>

      <header className="relative z-50 pt-14 flex justify-center p-4 text-2xl font-bold text-yellow-400">
        🏮 GOWIN 🏮
      </header>

      {/* التبويبات بالإيموجيات فقط */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20">
        <button onClick={() => setActiveTab('home')} className={`p-3 rounded-xl ${activeTab === 'home' ? 'bg-yellow-500' : 'bg-white/10'}`}>🏠</button>
        <button onClick={() => setActiveTab('leaderboard')} className={`p-3 rounded-xl ${activeTab === 'leaderboard' ? 'bg-yellow-500' : 'bg-white/10'}`}>📊</button>
        <button onClick={() => setActiveTab('live')} className={`p-3 rounded-xl ${activeTab === 'live' ? 'bg-yellow-500' : 'bg-white/10'}`}>🔴</button>
        <button onClick={() => setActiveTab('history')} className={`p-3 rounded-xl ${activeTab === 'history' ? 'bg-yellow-500' : 'bg-white/10'}`}>📜</button>
        <button onClick={() => setActiveTab('friends')} className={`p-3 rounded-xl ${activeTab === 'friends' ? 'bg-yellow-500' : 'bg-white/10'}`}>💬</button>
        <button onClick={() => setActiveTab('prizes')} className={`p-3 rounded-xl ${activeTab === 'prizes' ? 'bg-yellow-500' : 'bg-white/10'}`}>🎁</button>
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto text-center py-10 space-y-6">
            <h1 className="text-6xl font-bold text-yellow-400 mb-6">⚔️ GOWIN ⚔️</h1>
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="اسمك الكريم..." className="w-full bg-white/10 p-4 rounded-xl border border-white/20 text-center outline-none" />
            <button onClick={startChallenge} className="w-full py-4 rounded-2xl font-bold text-xl bg-yellow-500 text-black">🚀 ابدأ التحدي</button>
          </div>
        )}

        {/* تعليمات الدوري الرمضاني */}
        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🏆 تعليمات الدوري</h2>
            <div className="bg-white/5 p-6 rounded-xl text-right whitespace-pre-line text-white/90">
                1. المسابقة تضم 20 لاعباً فقط بنظام النقاط.{"\n"}
                2. يتأهل أفضل 8 لاعبين إلى دور المجموعات.{"\n"}
                3. أصحاب المراكز (1-4) يحصلون على جوائز نقدية فورية.{"\n"}
                4. كل لاعب لديه 5 محاولات (قلوب) للإجابة.{"\n"}
                5. كود الخصم VTP129 متاح للجميع للاستخدام في نون.
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="flex justify-between font-bold text-xl px-2"><span>❤️ {lives}</span><span className="text-yellow-400">⏱️ {timeLeft}</span></div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/20">
              <h2 className="text-xl font-bold mb-8">{currentQuestions[currentQuestionIndex]?.question}</h2>
              <div className="grid gap-4">
                {currentQuestions[currentQuestionIndex]?.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">{opt}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/80 backdrop-blur-md">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold">📷 @_itlulp</a>
      </footer>
    </div>
  );
}

export default App;
