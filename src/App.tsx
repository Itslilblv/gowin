import { useState, useEffect, useRef } from 'react';

// Questions data with multiple sets
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

type Player = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  lives: number;
  isWinner: boolean;
  joinedAt: Date;
  deviceId: string;
};

type Match = {
  id: string;
  player1: Player;
  player2: Player;
  score1: number;
  score2: number;
  round: number;
  status: 'pending' | 'live' | 'finished';
  winner?: Player;
  loser?: Player;
};

type MatchHistory = {
  id: string;
  player1: string;
  player2: string;
  score1: number;
  score2: number;
  winner: string;
  round: string;
  date: Date;
};

function App() {
  // State
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
  const [_musicEnabled, _setMusicEnabled] = useState(false); 
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [leagueStarted, setLeagueStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<{name: string, text: string, time: string, isMe: boolean}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const leagueTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Persistence
  useEffect(() => {
    const savedPlayer = localStorage.getItem('gowin_player');
    if (savedPlayer) {
      const player = JSON.parse(savedPlayer);
      setCurrentPlayer(player);
      setPlayerName(player.name);
    }
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

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('gowin_device_id');
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('gowin_device_id', deviceId);
    }
    return deviceId;
  };

  useEffect(() => {
    if (showResult || !gameStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult, gameStarted]);

  const handleTimeOut = () => {
    if (lives > 1) {
      setLives(prev => prev - 1);
      setTimeLeft(15);
    } else endChallenge();
  };

  const startChallenge = () => {
    if (!playerName.trim()) return;
    const deviceId = getDeviceId();
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerName,
      avatar: '👤',
      points: 0,
      lives: 5,
      isWinner: false,
      joinedAt: new Date(),
      deviceId
    };
    setCurrentPlayer(newPlayer);
    setPlayers(prev => [...prev.filter(p => p.deviceId !== deviceId), newPlayer]);
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
    const currentQuestions = language === 'ar' ? 
      questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic :
      questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    setTimeout(() => {
      if (index === currentQuestion.correct) {
        setScore(prev => prev + currentQuestion.points);
      } else {
        if (lives > 1) setLives(prev => prev - 1);
      }
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

  const endChallenge = () => {
    if (currentPlayer) {
      setPlayers(prev => prev.map(p => p.deviceId === currentPlayer.deviceId ? { ...p, points: score } : p));
    }
    setGameStarted(false);
    setActiveTab('leaderboard');
  };

  const startLeague = () => {
    setLeagueStarted(true);
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
      copy: "نسخ",
      copied: "تم النسخ! 🌙",
      rules: [
        "أجب لجمع النقاط.",
        "لديك 5 محاولات (قلوب).",
        "لديك 15 ثانية لكل سؤال.",
        "المتصدرون يتأهلون للنخبة."
      ]
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
      noonCode: "Noon Code: VTP129",
      copy: "Copy",
      copied: "Copied! 🌙",
      rules: [
        "Answer to get points.",
        "You have 5 lives.",
        "15 seconds per question.",
        "Top players qualify."
      ]
    }
  };

  const tr = t[language];
  const currentQuestions = language === 'ar' ? 
    questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic :
    questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      
      {/* 2. البانر الذهبي */}
      <div className="fixed top-0 left-0 right-0 z-[100] overflow-hidden h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 shadow-[0_2px_15px_rgba(234,179,8,0.4)] flex items-center border-b border-yellow-300/30">
        <div className="whitespace-nowrap animate-marquee flex items-center text-black font-black text-[10px] sm:text-xs uppercase tracking-wider">
          <span className="mx-8">🎁 مبارك عليكم الشهر: جوائز نقدية لأبطال المربع الذهبي 🎁</span>
          <span className="mx-8">🏆 المراكز (1-4) يستلمون الجوائز عبر الخاص 🏆</span>
          <span className="mx-8">🌙 رمضان يجمعنا في دوري Gowin الأقوى 🌙</span>
        </div>
      </div>

      <header className="relative z-50 pt-12 flex justify-between items-center p-4">
        <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="px-3 py-1 bg-white/10 rounded-lg text-xs">
          {language === 'ar' ? 'EN' : 'ع'}
        </button>
        <h1 className="text-2xl font-bold text-yellow-400">🏮 GOWIN 🏮</h1>
        <div className="w-8"></div>
      </header>

      {/* Navigation - أضفت Prizes فقط */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 overflow-x-auto no-scrollbar">
        {['home', 'leaderboard', 'live', 'history', 'friends', 'prizes'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} 
            className={`px-4 py-2 rounded-xl text-xs transition-all ${activeTab === tab ? 'bg-yellow-500 text-black font-bold' : 'bg-white/10'}`}>
            {tab === 'prizes' ? tr.prizes : tab.toUpperCase()}
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center py-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-pulse mb-4">⚔️ GOWIN ⚔️</h1>
              <p className="text-white/70">{tr.welcome}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)}
                placeholder="أدخل اسمك..."
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 border border-white/20 focus:outline-none" />
              <button onClick={startChallenge} disabled={!playerName.trim()}
                className="w-full mt-4 py-4 rounded-xl font-bold bg-yellow-500 text-black">
                {tr.startChallenge}
              </button>
            </div>
          </div>
        )}

        {/* تبويب الجوائز والتعليمات المضاف */}
        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl p-6 border border-yellow-500/30 text-center">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">{tr.prizes}</h2>
              <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/20 mb-4">
                <p className="mb-3">{tr.noonCode}</p>
                <button onClick={() => {navigator.clipboard.writeText("VTP129"); alert(tr.copied);}}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold">{tr.copy}</button>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-yellow-400 mb-2">📖 التعليمات:</h3>
                <ul className="text-sm space-y-2 text-white/80">
                  {tr.rules.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* بقية التبويبات الأصلية كما هي */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-3">
            {[...players].sort((a,b)=>b.points-a.points).map((p, i) => (
              <div key={p.id} className="bg-white/5 p-4 rounded-xl flex justify-between border border-white/10">
                <span>{i+1}. {p.name}</span>
                <span className="text-yellow-400 font-bold">{p.points} {tr.points}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between font-bold">
              <span className="text-red-500">❤️ {lives}</span>
              <span className="text-yellow-400">⏱️ {timeLeft}s</span>
              <span className="text-green-400">⭐ {score}</span>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
              <h2 className="text-xl font-bold mb-8">{currentQuestions[currentQuestionIndex].question}</h2>
              <div className="grid gap-3">
                {currentQuestions[currentQuestionIndex].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={selectedAnswer !== null}
                    className={`p-4 rounded-xl border transition-all ${selectedAnswer === i ? 'bg-yellow-500 text-black' : 'bg-white/5'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-black/50 backdrop-blur-md">
        <a href="https://instagram.com/_itlulp" target="_blank" className="text-pink-400 font-bold">📷 @_itlulp</a>
      </footer>
    </div>
  );
}

export default App;
