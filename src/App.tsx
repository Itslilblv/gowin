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
    const handleInteraction = () => { playMusic(); document.removeEventListener('click', handleInteraction); };
    document.addEventListener('click', handleInteraction);
    return () => { document.removeEventListener('click', handleInteraction); };
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

  const handleTimeOut = () => {
    if (lives > 1) { setLives(prev => prev - 1); setTimeLeft(15); }
    else endChallenge();
  };

  const startChallenge = () => {
    if (!playerName.trim()) return;
    const deviceId = getDeviceId();
    const newPlayer: Player = { id: Date.now().toString(), name: playerName, avatar: '👤', points: 0, lives: 5, isWinner: false, joinedAt: new Date(), deviceId };
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

  const endChallenge = () => {
    if (currentPlayer) setPlayers(prev => prev.map(p => p.deviceId === currentPlayer.deviceId ? { ...p, points: score } : p));
    setGameStarted(false);
    setActiveTab('leaderboard');
  };

  const sendMessage = () => {
    if (!chatInput.trim() || !playerName) return;
    const msg = { name: playerName, text: chatInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isMe: true };
    setChatMessages(prev => [...prev, msg]);
    setChatInput('');
  };

  const t = {
    ar: {
      welcome: "مرحباً بك في Gowin",
      subtitle: "الدوري الأقوى - 20 لاعب يتنافسون على Golden Goat",
      startChallenge: "🚀 ابدأ التحدي",
      joinPlayers: "عدد اللاعبين المنتظرين",
      playersJoined: "لاعباً",
      leaderboard: "📊 لوحة المتصدرين",
      live: "🔴 مباشر",
      history: "📜 التاريخ",
      friends: "💬 الأصدقاء",
      prizes: "🎁 الجوائز",
      points: "نقاط",
      goldenGoat: "🐐 Golden The Goat",
      champion: "البطل",
      next: "التالي",
      timeLeft: "ثانية",
      lives: "حياة",
      score: "نتيجتك",
      challengeComplete: "🎉 تم完成 التحدي!",
      yourScore: "نقاطك",
      league: "🏆 الدوري",
      roundOf16: "دور الـ 16",
      quarterFinal: "ربع النهائي",
      semiFinal: "نصف النهائي",
      final: "النهائي",
      qualified: "تأهل ✅",
      eliminated: "خارج ❌",
      vs: "VS",
      liveNow: "مباشر الآن",
      finished: "انتهى",
      shareLink: "شارك الرابط مع أصدقائك",
      chatPlaceholder: "اكتب رسالة...",
      send: "إرسال",
      instagram: "@_itlulp",
      language: "English",
      music: "🎵",
      stats: {
        totalPlayers: "إجمالي اللاعبين",
        qualified: "المتأهلون",
        eliminated: "المستبعدون",
        rounds: "المراحل"
      },
              motivation: {
          start: "🌙 استعد لتحدي المربع الذهبي في ليالي رمضان",
          league: "🏆 أقوى دوري رمضاني - 4 أبطال فقط للتتويج",
          leaderboard: "📊 الترتيب يتغير لحظياً.. نافس على الصدارة"
        },
      noonCode: "كود خصم نون: VTP129",
      instructions: "تعليمات اللعبة:\n1. لديك 5 محاولات فقط.\n2. كل سؤال له وقت محدد 15 ثانية.\n3. اجمع النقاط للتأهل للمراكز الأولى."
      
    },
    en: {
      welcome: "Welcome to Gowin",
      subtitle: "The Strongest League - 20 Players Compete for Golden Goat",
      startChallenge: "🚀 Start Challenge",
      joinPlayers: "Players Waiting",
      playersJoined: "players",
      leaderboard: "📊 Leaderboard",
      live: "🔴 Live",
      history: "📜 History",
      friends: "💬 Friends",
      prizes: "🎁 Prizes",
      points: "points",
      goldenGoat: "🐐 Golden The Goat",
      champion: "Champion",
      next: "Next",
      timeLeft: "sec",
      lives: "Lives",
      score: "Your Score",
      challengeComplete: "🎉 Challenge Complete!",
      yourScore: "Your Score",
      league: "🏆 League",
      roundOf16: "Round of 16",
      quarterFinal: "Quarter Final",
      semiFinal: "Semi Final",
      final: "Final",
      qualified: "Qualified ✅",
      eliminated: "Eliminated ❌",
      vs: "VS",
      liveNow: "Live Now",
      finished: "Finished",
      shareLink: "Share link with friends",
      chatPlaceholder: "Type a message...",
      send: "Send",
      instagram: "@_itlulp",
      language: "عربي",
      music: "🎵",
      stats: {
        totalPlayers: "Total Players",
        qualified: "Qualified",
        eliminated: "Eliminated",
        rounds: "Rounds"
      },
              motivation: {
          start: "🌙 Get ready for the Golden Square challenge",
          league: "🏆 Strongest League - Only 4 champions",
          leaderboard: "📊 Rankings change instantly.. compete for the top"
        },
      noonCode: "Noon Promo Code: VTP129",
      instructions: "Game Instructions:\n1. You have 5 lives only.\n2. Each question has a 15-second timer.\n3. Collect points to rank higher."
    }
  };

  const tr = t[language];
  const currentQuestions = language === 'ar' ? questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic : questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;

  return (
    <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      {/* 1. Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}></div>
      <div className="absolute top-20 right-10 text-6xl opacity-20 blur-[1px] pointer-events-none animate-pulse">🌙</div>
      <div className="absolute top-10 left-8 text-4xl opacity-40 animate-[bounce_4s_infinite] pointer-events-none">🏮</div>
      <div className="absolute top-40 right-12 text-3xl opacity-30 animate-[bounce_3s_infinite] pointer-events-none">🏮</div>

      {/* 2. Golden Banner */}
      <div className="fixed top-0 left-0 right-0 z-[100] overflow-hidden h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 shadow-[0_2px_15px_rgba(234,179,8,0.4)] flex items-center border-b border-yellow-300/30">
        <div className="whitespace-nowrap animate-marquee flex items-center text-black font-black text-[10px] sm:text-xs uppercase tracking-wider">
          <span className="mx-8">🎁 مبارك عليكم الشهر: جوائز نقدية لأبطال المربع الذهبي 🎁</span>
          <span className="mx-8">🏆 المراكز (1-4) يستلمون الجوائز عبر الخاص 🏆</span>
          <span className="mx-8">🌙 رمضان يجمعنا في دوري Gowin الأقوى 🌙</span>
        </div>
      </div>

      <header className="relative z-50 pt-12 flex justify-between items-center p-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="px-2 py-1 bg-white/10 rounded-lg text-xs hover:bg-white/20 transition-colors text-white">{language === 'ar' ? 'EN' : 'ع'}</button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] flex items-center gap-2">🏮 GOWIN 🏮</h1>
        <div className="w-8"></div>
      </header>

      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20 overflow-x-auto no-scrollbar">
        {[
          { id: 'home', icon: '🏠', label: tr.welcome.split(' ')[0] },
          { id: 'leaderboard', icon: '📊', label: tr.leaderboard.split(' ')[1] },
          { id: 'live', icon: '🔴', label: tr.live },
          { id: 'history', icon: '📜', label: tr.history },
          { id: 'friends', icon: '💬', label: tr.friends },
          { id: 'prizes', icon: '🎁', label: tr.prizes },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
            <span>{tab.icon}</span><span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="relative z-10 container mx-auto p-4 pb-24">
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center py-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-pulse mb-4">⚔️ GOWIN ⚔️</h1>
              <p className="text-2xl text-white/80 font-bold">{tr.welcome}</p>
              <p className="text-lg text-purple-300 mt-2">{tr.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-bold text-yellow-400">{players.length}</p><p className="text-xs text-white/60">{tr.stats.totalPlayers}</p></div>
              <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-bold text-green-400">8</p><p className="text-xs text-white/60">{tr.stats.qualified}</p></div>
              <div className="bg-gradient-to-br from-red-500/30 to-pink-500/30 rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-bold text-red-400">{Math.max(0, 20 - players.length)}</p><p className="text-xs text-white/60">{tr.stats.eliminated}</p></div>
              <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl p-4 text-center border border-white/10"><p className="text-3xl font-bold text-yellow-400">5</p><p className="text-xs text-white/60">{tr.stats.rounds}</p></div>
            </div>
            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-4 text-center border border-white/10"><p className="text-lg font-bold text-white animate-pulse">💪 {tr.motivation.start}</p></div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-white/80 mb-2 font-bold">👤 {language === 'ar' ? 'اسمك' : 'Your Name'}</label>
              <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder={language === 'ar' ? 'أدخل اسمك...' : 'Enter your name...'} className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 border border-white/20 focus:border-yellow-400 focus:outline-none transition-colors" />
            </div>
            <button onClick={startChallenge} className="w-full py-4 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 bg-gradient-to-r from-yellow-500 to-orange-500 text-black">{tr.startChallenge} 🎮</button>
          </div>
        )}

        {activeTab === 'prizes' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl p-6 border border-yellow-500/30 text-center">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">{tr.prizes}</h2>
              <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/20 mb-6">
                 <p className="text-xl font-bold text-white mb-4">{tr.noonCode}</p>
                 <button onClick={() => {navigator.clipboard.writeText("VTP129"); alert("تم النسخ!");}} className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold">نسخ الكود</button>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-right whitespace-pre-line">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">📜 التعليمات:</h3>
                <p className="text-white/80 leading-relaxed">{tr.instructions}</p>
              </div>
            </div>
          </div>
        )}

        {/* Keeping original logic for other tabs exactly as they were */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-3">
            {[...players].sort((a, b) => b.points - a.points).map((player, index) => (
              <div key={player.id} className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between">
                <span>{index + 1}. {player.name}</span>
                <span className="text-yellow-400 font-bold">{player.points} {tr.points}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'live' && (
          <div className="max-w-2xl mx-auto text-center py-20 opacity-50">
            {matches.length > 0 ? matches.map(m => <div key={m.id}>{m.player1.name} VS {m.player2.name}</div>) : "لا توجد مباريات جارية"}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-2xl mx-auto text-center py-20 opacity-50">
            {matchHistory.length > 0 ? matchHistory.map((h, i) => <div key={i}>{h.winner} فاز ضد {h.player1 === h.winner ? h.player2 : h.player1}</div>) : "السجل فارغ"}
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="max-w-2xl mx-auto">
            <div className="h-64 bg-black/20 rounded-xl mb-4 overflow-y-auto p-4 border border-white/10">
              {chatMessages.map((m, i) => <div key={i} className="mb-2"><b>{m.name}:</b> {m.text}</div>)}
            </div>
            <div className="flex gap-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} className="flex-1 bg-white/10 p-3 rounded-xl focus:outline-none border border-white/10" placeholder="اكتب رسالة..." />
              <button onClick={sendMessage} className="bg-yellow-500 text-black px-6 rounded-xl font-bold">إرسال</button>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-4 font-bold"><span>❤️ {lives}</span><span className="text-yellow-400">⏱️ {timeLeft}</span></div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
              <h2 className="text-xl font-bold mb-6">{currentQuestions[currentQuestionIndex].question}</h2>
              <div className="grid gap-3">
                {currentQuestions[currentQuestionIndex].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl">{opt}</button>
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
