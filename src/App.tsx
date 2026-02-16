import { useState, useEffect, useRef } from 'react';

// Questions data with multiple sets
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
type Match = { id: string; player1: Player; player2: Player; score1: number; score2: number; round: number; status: 'pending' | 'live' | 'finished'; winner?: Player; loser?: Player; };
type MatchHistory = { id: string; player1: string; player2: string; score1: number; score2: number; winner: string; round: string; date: Date; };

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard' | 'live' | 'history' | 'friends' | 'challenge' | 'prizes'>('home');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [playerName, setPlayerName] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState(15);
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [chatMessages, setChatMessages] = useState<{name: string, text: string, time: string, isMe: boolean}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedPlayer = localStorage.getItem('gowin_player');
    if (savedPlayer) { const p = JSON.parse(savedPlayer); setCurrentPlayer(p); setPlayerName(p.name); }
    const savedPlayers = localStorage.getItem('gowin_all_players');
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    const savedChat = localStorage.getItem('gowin_chat');
    if (savedChat) setChatMessages(JSON.parse(savedChat));
    const savedHistory = localStorage.getItem('gowin_match_history');
    if (savedHistory) setMatchHistory(JSON.parse(savedHistory));
    const savedQuestionSet = localStorage.getItem('gowin_question_set');
    if (savedQuestionSet) setCurrentQuestionSet(parseInt(savedQuestionSet));
  }, []);

  useEffect(() => {
    if (currentPlayer) localStorage.setItem('gowin_player', JSON.stringify(currentPlayer));
    localStorage.setItem('gowin_all_players', JSON.stringify(players));
    localStorage.setItem('gowin_chat', JSON.stringify(chatMessages));
    localStorage.setItem('gowin_match_history', JSON.stringify(matchHistory));
    localStorage.setItem('gowin_question_set', currentQuestionSet.toString());
  }, [currentPlayer, players, chatMessages, matchHistory, currentQuestionSet]);

  // إضافة النغمات الرمضانية كما طلبت
  useEffect(() => {
    const musicTracks = [
      'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Ramadan+Kareem&filename=mt/MTI0NDU5OTI0NDU5Njg1_P_2bfG_2fFmE0.mp3',
      'https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Ramadan+Song&filename=mt/MTI0NDU5OTI0NDU5Njg1_t_2bYV_2bQ1kU.mp3'
    ];
    let currentTrackIndex = 0;
    const playMusic = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(musicTracks[currentTrackIndex]);
        audioRef.current.volume = 0.35;
        audioRef.current.onended = () => {
          currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
          audioRef.current = new Audio(musicTracks[currentTrackIndex]);
          audioRef.current.volume = 0.35;
          audioRef.current.play().catch(() => {});
        };
        audioRef.current.play().catch(() => {});
      }
    };
    const handleInteraction = () => { playMusic(); document.removeEventListener('click', handleInteraction); };
    document.addEventListener('click', handleInteraction);
    return () => { document.removeEventListener('click', handleInteraction); };
  }, []);

  useEffect(() => {
    if (showResult || !gameStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => { if (prev <= 1) { handleTimeOut(); return 15; } return prev - 1; });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult, gameStarted]);

  const handleTimeOut = () => { if (lives > 1) { setLives(prev => prev - 1); setTimeLeft(15); } else endChallenge(); };

  const startChallenge = () => {
    if (!playerName.trim()) return;
    const newPlayer: Player = { id: Date.now().toString(), name: playerName, avatar: '👤', points: 0, lives: 5, isWinner: false, joinedAt: new Date(), deviceId: 'dev_'+Math.random() };
    setCurrentPlayer(newPlayer);
    setPlayers(prev => [...prev, newPlayer]);
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
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
  
  const sendMessage = () => {
    if (!chatInput.trim() || !playerName) return;
    setChatMessages(prev => [...prev, { name: playerName, text: chatInput, time: new Date().toLocaleTimeString(), isMe: true }]);
    setChatInput('');
  };

  const t = {
    ar: { 
      welcome: "مرحباً بك في Gowin", 
      startChallenge: "🚀 ابدأ التحدي", 
      leaderboard: "📊 لوحة المتصدرين", 
      live: "🔴 مباشر", 
      history: "📜 التاريخ", 
      friends: "💬 الأصدقاء", 
      prizes: "🎁 الجوائز", 
      points: "نقاط", 
      noonCode: "كود خصم نون: VTP129", 
      prizeDetails: "جوائز الدوري: المربع الذهبي (المراكز 1-4) يحصلون على جوائز نقدية.\n\nتعليمات اللعبة:\n1. لديك 5 محاولات فقط.\n2. لكل سؤال 15 ثانية للإجابة.\n3. أصحاب أعلى نقاط يتأهلون للمراحل النهائية." 
    },
    en: { 
      welcome: "Welcome to Gowin", 
      startChallenge: "🚀 Start Challenge", 
      leaderboard: "📊 Leaderboard", 
      live: "🔴 Live", 
      history: "📜 History", 
      friends: "💬 Friends", 
      prizes: "🎁 Prizes", 
      points: "points", 
      noonCode: "Noon Promo: VTP129", 
      prizeDetails: "League Prizes: Top 4 get cash prizes.\n\nInstructions: 5 lives, 15s per question." 
    }
  };
  const tr = t[language];
  const currentQuestions = language === 'ar' ? questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic : questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      <div className="absolute top-20 right-10 text-6xl opacity-20 animate-pulse">🌙</div>
      <div className="absolute top-10 left-8 text-4xl opacity-40 animate-bounce">🏮</div>

      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center overflow-hidden">
        <div className="whitespace-nowrap animate-marquee text-black font-black text-xs uppercase">
          <span className="mx-8">🎁 مبارك عليكم الشهر: جوائز نقدية لأبطال المربع الذهبي 🎁</span>
          <span className="mx-8">🏆 المراكز (1-4) يستلمون الجوائز عبر الخاص 🏆</span>
        </div>
      </div>

      <header className="relative z-50 pt-12 flex justify-between items-center p-4">
        <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="px-3 py-1 bg-white/10 rounded-lg text-xs">{language === 'ar' ? 'EN' : 'ع'}</button>
        <h1 className="text-2xl font-bold text-yellow-400">🏮 GOWIN 🏮</h1>
        <div className="w-8"></div>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 overflow-x-auto no-scrollbar">
        {['home', 'leaderboard', 'live', 'history', 'friends', 'prizes'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap ${activeTab === tab ? 'bg-yellow-500 text-black font-bold' : 'bg-white/10'}`}>
            {tab === 'prizes' ? tr.prizes : tab.toUpperCase()}
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <h1 className="text-6xl font-bold text-yellow-400 animate-pulse">⚔️ GOWIN ⚔️</h1>
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="أدخل اسمك..." className="w-full bg-white/10 p-4 rounded-xl border border-white/20 focus:outline-none" />
            <button onClick={startChallenge} className="w-full py-4 rounded-xl bg-yellow-500 text-black font-bold text-xl">{tr.startChallenge}</button>
          </div>
        )}

        {/* إضافة تبويب الجوائز الجديد كما طلبت */}
        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <div className="bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/30">
                <h2 className="text-2xl font-bold text-yellow-400 mb-6">{tr.prizes}</h2>
                <div className="bg-black/40 p-6 rounded-2xl border border-yellow-500/20 mb-6">
                    <p className="text-2xl font-bold mb-4">{tr.noonCode}</p>
                    <button onClick={() => {navigator.clipboard.writeText("VTP129"); alert("تم نسخ الكود!");}} className="bg-yellow-500 text-black px-8 py-2 rounded-xl font-bold">نسخ الكود</button>
                </div>
                <div className="text-right bg-white/5 p-6 rounded-2xl whitespace-pre-line text-sm opacity-90 border border-white/10">{tr.prizeDetails}</div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-3">
            {[...players].sort((a,b)=>b.points-a.points).map((p, i) => (
              <div key={p.id} className="bg-white/5 p-4 rounded-xl flex justify-between border border-white/10">
                <span>{i+1}. {p.name}</span><span className="text-yellow-400 font-bold">{p.points} {tr.points}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'live' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">🔴 المباريات المباشرة</h2>
            {matches.length > 0 ? matches.map(m => (
              <div key={m.id} className="bg-white/5 p-4 rounded-xl mb-3 flex justify-around items-center border border-white/10">
                <span>{m.player1.name}</span>
                <span className="text-yellow-400 font-bold">{m.score1} - {m.score2}</span>
                <span>{m.player2.name}</span>
              </div>
            )) : <p className="text-center opacity-50">لا توجد مباريات جارية حالياً</p>}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-center">📜 سجل التحديات</h2>
            {matchHistory.length > 0 ? matchHistory.map((h, i) => (
              <div key={i} className="bg-white/5 p-3 rounded-lg mb-2 flex justify-between text-sm border border-white/5">
                <span>{h.player1} vs {h.player2}</span>
                <span className="text-green-400">الفائز: {h.winner}</span>
              </div>
            )) : <p className="text-center opacity-50 text-sm">السجل فارغ</p>}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="max-w-2xl mx-auto flex flex-col h-[50vh]">
            <div className="flex-1 overflow-y-auto p-4 bg-black/20 rounded-xl mb-4 border border-white/10">
              {chatMessages.map((m, i) => (
                <div key={i} className={`p-3 rounded-xl max-w-[80%] mb-2 ${m.isMe ? 'bg-yellow-500/20 mr-auto text-right' : 'bg-white/10 ml-auto'}`}>
                  <p className="text-[10px] text-yellow-400 mb-1">{m.name}</p>
                  <p className="text-sm">{m.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} className="flex-1 bg-white/10 p-3 rounded-xl focus:outline-none" placeholder="اكتب رسالة..." />
              <button onClick={sendMessage} className="bg-yellow-500 text-black px-6 rounded-xl font-bold">إرسال</button>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-between mb-4"><span>❤️ {lives}</span><span className="text-yellow-400">⏱️ {timeLeft}s</span></div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl mb-6">{currentQuestions[currentQuestionIndex].question}</h2>
              <div className="grid gap-3">
                {currentQuestions[currentQuestionIndex].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={selectedAnswer !== null} className={`p-4 rounded-xl border transition-all ${selectedAnswer === i ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>{opt}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/50 backdrop-blur-md border-t border-white/10">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold">📷 @_itlulp</a>
      </footer>
    </div>
  );
}

export default App;
