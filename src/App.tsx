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
  const [activeTab, setActiveTab] = useState<'home' | 'leaderboard' | 'live' | 'history' | 'friends' | 'challenge'>('home');
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

  // Load saved data
  useEffect(() => {
    const savedPlayer = localStorage.getItem('gowin_player');
    if (savedPlayer) {
      const player = JSON.parse(savedPlayer);
      setCurrentPlayer(player);
      setPlayerName(player.name);
    }
    const savedPlayers = localStorage.getItem('gowin_all_players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
    const savedChat = localStorage.getItem('gowin_chat');
    if (savedChat) {
      setChatMessages(JSON.parse(savedChat));
    }
    const savedHistory = localStorage.getItem('gowin_match_history');
    if (savedHistory) {
      setMatchHistory(JSON.parse(savedHistory));
    }
    const savedQuestionSet = localStorage.getItem('gowin_question_set');
    if (savedQuestionSet) {
      setCurrentQuestionSet(parseInt(savedQuestionSet));
    }
  }, []);

  // Save data
  useEffect(() => {
    if (currentPlayer) {
      localStorage.setItem('gowin_player', JSON.stringify(currentPlayer));
    }
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
    const musicTracks = [
      'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946e92d0b3.mp3',
      'https://cdn.pixabay.com/download/audio/2023/05/16/audio_166b9c7242.mp3',
      'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3'
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
    const handleInteraction = () => {
      playMusic();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

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
      const updatedPlayer = { ...currentPlayer, points: score };
      setCurrentPlayer(updatedPlayer);
      setPlayers(prev => prev.map(p => p.deviceId === currentPlayer.deviceId ? updatedPlayer : p));
    }
    setGameStarted(false);
    setActiveTab('leaderboard');
  };

  const startLeague = () => {
    const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
    const qualifiedPlayers = sortedPlayers.slice(0, 8);
    const newMatches: Match[] = [];
    for (let i = 0; i < 8; i += 2) {
      newMatches.push({
        id: `qf_${i}`,
        player1: qualifiedPlayers[i],
        player2: qualifiedPlayers[i + 1],
        score1: 0,
        score2: 0,
        round: 1,
        status: 'live'
      });
    }
    setMatches(newMatches);
    setLeagueStarted(true);
    leagueTimerRef.current = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === 'live') {
          const s1 = Math.floor(Math.random() * 3);
          const s2 = Math.floor(Math.random() * 3);
          const winner = s1 > s2 ? match.player1 : match.player2;
          return { ...match, score1: s1, score2: s2, status: 'finished', winner };
        }
        return match;
      }));
    }, 3000);
  };

  const t = {
    ar: {
      welcome: "مرحباً بك في Gowin",
      subtitle: "الدوري الأقوى - 20 لاعب يتنافسون على Golden Goat",
      startChallenge: "🚀 ابدأ التحدي",
      leaderboard: "📊 لوحة المتصدرين",
      live: "🔴 مباشر",
      history: "📜 التاريخ",
      friends: "💬 الأصدقاء",
      points: "نقاط",
      timeLeft: "ثانية",
      score: "نتيجتك",
      vs: "VS",
      chatPlaceholder: "اكتب رسالة...",
      motivation: {
        start: "🌙 استعد لتحدي المربع الذهبي في ليالي رمضان",
        league: "🏆 أقوى دوري رمضاني - 4 أبطال فقط للتتويج",
        leaderboard: "📊 الترتيب يتغير لحظياً.. نافس على الصدارة",
        prizesTab: "✨ الجوائز والتعليمات",
        prizesTitle: "🎁 جوائز بانتظارك",
        noonCoupon: "VTP129",
        copyBtn: "نسخ الكود",
        alertCopied: "تم نسخ الكود! استمتع بالتوفير في نون 🌙"
      }
    },
    en: {
      welcome: "Welcome to Gowin",
      subtitle: "Compete for Golden Goat",
      startChallenge: "🚀 Start Challenge",
      leaderboard: "📊 Leaderboard",
      live: "🔴 Live",
      history: "📜 History",
      friends: "💬 Friends",
      points: "points",
      timeLeft: "sec",
      score: "Your Score",
      vs: "VS",
      chatPlaceholder: "Type message...",
      motivation: {
        start: "🌙 Get ready for the Golden Square Challenge",
        league: "🏆 Strongest League - Only 4 Champions",
        leaderboard: "📊 Real-time ranking.. Compete for top",
        prizesTab: "✨ Prizes & Instructions",
        prizesTitle: "🎁 Prizes Awaiting",
        noonCoupon: "VTP129",
        copyBtn: "Copy Code",
        alertCopied: "Code copied! Enjoy Noon discount 🌙"
      }
    }
  };

  const tr = t[language];
  const currentQuestions = language === 'ar' ? 
    questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic :
    questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      
      <div className="fixed top-0 left-0 right-0 z-[100] h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 flex items-center shadow-lg">
        <div className="whitespace-nowrap animate-marquee text-black font-black text-xs uppercase">
          <span className="mx-8">🎁 {tr.motivation.prizesTitle}: كود نون الحصري {tr.motivation.noonCoupon} 🎁</span>
          <span className="mx-8">🏆 {tr.motivation.league} 🏆</span>
          <span className="mx-8">🌙 رمضان كريم - استمتع باللعب والربح 🌙</span>
        </div>
      </div>

      <header className="relative z-50 pt-12 flex justify-between items-center p-4 bg-black/30 backdrop-blur-sm border-b border-white/5">
        <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/20">
          {language === 'ar' ? 'English' : 'عربي'}
        </button>
        <h1 className="text-2xl font-bold text-yellow-400 tracking-widest drop-shadow-md">🏮 GOWIN 🏮</h1>
        <div className="w-8"></div>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 overflow-x-auto no-scrollbar">
        {['home', 'leaderboard', 'live', 'history', 'friends'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} 
            className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all uppercase whitespace-nowrap ${activeTab === tab ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-white/10 text-white/60'}`}>
            {tab}
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center py-8">
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 mb-4 drop-shadow-lg">⚔️ GOWIN ⚔️</h1>
              <p className="text-xl text-white/80 font-medium">{tr.welcome}</p>
              <p className="text-sm text-yellow-500/80 mt-1">{tr.subtitle}</p>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md">
              <label className="block text-white/40 text-xs mb-2 px-1 uppercase font-bold">Player Identity</label>
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسمك المستعار...' : 'Enter your nickname...'}
                className="w-full bg-white/5 text-white rounded-2xl px-5 py-4 border border-white/10 focus:border-yellow-500/50 focus:outline-none transition-all placeholder:text-white/20" />
              <button onClick={startChallenge} disabled={!playerName.trim()}
                className="w-full mt-4 py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-yellow-500 to-orange-600 text-black shadow-xl shadow-yellow-500/10 active:scale-95 transition-transform disabled:opacity-50">
                {tr.startChallenge}
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-3xl p-6 border border-yellow-500/20">
              <h3 className="text-lg font-black text-yellow-500 mb-4 flex items-center gap-2">
                <span>🎁</span> {tr.motivation.prizesTab}
              </h3>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 text-center relative overflow-hidden">
                <p className="text-xs text-white/50 mb-3 leading-relaxed">انسخ الكود لدعم استمرارية الدوري والحصول على خصومات حصرية في نون:</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-white/5 px-6 py-3 rounded-xl border border-white/10">
                    <span className="text-3xl font-black text-yellow-400 tracking-widest">{tr.motivation.noonCoupon}</span>
                  </div>
                  <button onClick={() => {
                    navigator.clipboard.writeText(tr.motivation.noonCoupon);
                    alert(tr.motivation.alertCopied);
                  }} className="bg-yellow-500 text-black px-5 py-4 rounded-xl font-black text-xs hover:bg-yellow-400 transition-colors">
                    {tr.motivation.copyBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-3 animate-fadeIn">
            <h2 className="text-xl font-black text-yellow-500 text-center mb-6 uppercase tracking-widest">{tr.leaderboard}</h2>
            {[...players].sort((a,b)=>b.points-a.points).slice(0, 10).map((p, i) => (
              <div key={p.id} className={`p-5 rounded-2xl flex justify-between items-center border transition-all ${p.deviceId === getDeviceId() ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-white/5 border-white/5'}`}>
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white/40'}`}>{i+1}</span>
                  <span className="font-bold text-white/90">{p.name} {i === 0 && '👑'}</span>
                </div>
                <div className="text-right">
                  <p className="text-yellow-500 font-black text-lg">{p.points}</p>
                  <p className="text-[10px] text-white/30 uppercase font-bold">{tr.points}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-red-500 font-black">❤️ {lives}</span>
              <div className="bg-yellow-500/20 px-4 py-1 rounded-full border border-yellow-500/30">
                <span className="text-yellow-500 font-black text-sm">⏱️ {timeLeft}s</span>
              </div>
              <span className="text-green-500 font-black">⭐ {score}</span>
            </div>
            <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 text-center backdrop-blur-lg">
              <p className="text-white/20 text-xs font-black uppercase mb-4 tracking-widest">Question {currentQuestionIndex + 1} of 6</p>
              <h2 className="text-2xl font-bold mb-10 leading-snug">{currentQuestions[currentQuestionIndex].question}</h2>
              <div className="grid gap-4">
                {currentQuestions[currentQuestionIndex].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} disabled={selectedAnswer !== null}
                    className={`py-5 px-6 rounded-2xl border-2 font-bold transition-all text-sm ${selectedAnswer === i ? 'bg-yellow-500 border-yellow-500 text-black scale-[0.98]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
           <div className="max-w-2xl mx-auto animate-fadeIn">
             <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-6">
               <input type="text" value={chatInput} onChange={(e)=>setChatInput(e.target.value)} 
                placeholder={tr.chatPlaceholder} className="w-full bg-transparent outline-none border-b border-white/10 pb-4 mb-4 text-white placeholder:text-white/20"/>
               <button onClick={()=>{
                 if(chatInput.trim()){
                   setChatMessages([...chatMessages, {name: playerName || 'Guest', text: chatInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isMe: true}]);
                   setChatInput('');
                 }
               }} className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-black text-sm shadow-lg shadow-yellow-500/10">SEND MESSAGE</button>
             </div>
             <div className="space-y-4 h-[400px] overflow-y-auto p-2 no-scrollbar">
               {chatMessages.length === 0 ? (
                 <p className="text-center text-white/10 mt-20 font-bold uppercase tracking-widest">No messages yet</p>
               ) : (
                 chatMessages.map((m,i)=>(
                   <div key={i} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                     <div className={`p-4 rounded-2xl max-w-[85%] border ${m.isMe ? 'bg-yellow-500/10 border-yellow-500/20 rounded-tr-none' : 'bg-white/5 border-white/5 rounded-tl-none'}`}>
                       <p className={`text-[10px] font-black mb-1 uppercase ${m.isMe ? 'text-yellow-500' : 'text-white/40'}`}>{m.name}</p>
                       <p className="text-sm text-white/80 leading-relaxed">{m.text}</p>
                       <p className="text-[8px] text-white/20 mt-2 text-right">{m.time}</p>
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 text-center bg-[#0d041a]/80 backdrop-blur-xl border-t border-white/5 z-[100]">
        <a href="https://instagram.com/_itlulp" target="_blank" rel="noreferrer" className="text-white/40 hover:text-pink-500 transition-colors font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-widest">
          <span>Developed by</span>
          <span className="text-pink-500/80">@_itlulp</span>
        </a>
      </footer>

      <style>{`
        .animate-marquee { display: inline-block; animation: marquee 25s linear infinite; }
        @keyframes marquee { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default App;
