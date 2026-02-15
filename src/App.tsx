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
  const [_musicEnabled, _setMusicEnabled] = useState(false); // Hidden but kept for future use
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

  // Get device ID
  const getDeviceId = () => {
    let deviceId = localStorage.getItem('gowin_device_id');
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('gowin_device_id', deviceId);
    }
    return deviceId;
  };

  // Music handling - Auto play on any touch/click
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
        audioRef.current.loop = false;
        
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

    // Stop music when page is hidden
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
      } else if (!document.hidden && audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Timer for questions
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
    } else {
      endChallenge();
    }
  };

  // Start challenge
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

  // Handle answer
  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const currentQuestions = language === 'ar' ? 
      questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic :
      questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;
    const currentQuestion = currentQuestions[currentQuestionIndex];
    
    // Fast response - reduced delays
    setTimeout(() => {
      if (index === currentQuestion.correct) {
        setScore(prev => prev + currentQuestion.points);
        if (currentPlayer) {
          setCurrentPlayer(prev => prev ? { ...prev, points: prev.points + currentQuestion.points } : null);
        }
      } else {
        if (lives > 1) {
          setLives(prev => prev - 1);
        }
      }
      
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
        setTimeLeft(15);
        
        if (currentQuestionIndex < currentQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          endChallenge();
        }
      }, 400); // Faster transition
    }, 300); // Faster response
  };

  // End challenge
  const endChallenge = () => {
    if (currentPlayer) {
      setCurrentPlayer(prev => prev ? { ...prev, points: score, isWinner: false } : null);
      setPlayers(prev => {
        const updated = prev.map(p => 
          p.deviceId === currentPlayer?.deviceId ? { ...p, points: score, isWinner: false } : p
        );
        return updated;
      });
    }
    setGameStarted(false);
    setActiveTab('leaderboard');
  };

  // Check if 20 players joined and start league
  useEffect(() => {
    if (players.length >= 20 && !leagueStarted) {
      startLeague();
    }
  }, [players.length, leagueStarted]);

  // Start league
  const startLeague = () => {
    const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
    const qualifiedPlayers = sortedPlayers.slice(0, 8);
    
    // Generate matches for Quarter Finals
    const newMatches: Match[] = [];
    
    for (let i = 0; i < 8; i += 2) {
      const match: Match = {
        id: `qf_${i}`,
        player1: qualifiedPlayers[i],
        player2: qualifiedPlayers[i + 1],
        score1: 0,
        score2: 0,
        round: 1,
        status: 'live'
      };
      newMatches.push(match);
    }
    
    setMatches(newMatches);
    setLeagueStarted(true);
    
    // Simulate match results
    leagueTimerRef.current = setInterval(() => {
      setMatches(prev => prev.map(match => {
        if (match.status === 'live') {
          const newScore1 = Math.floor(Math.random() * 3);
          const newScore2 = Math.floor(Math.random() * 3);
          
          if (newScore1 !== match.score1 || newScore2 !== match.score2) {
            const winner = newScore1 > newScore2 ? match.player1 : match.player2;
            const loser = newScore1 > newScore2 ? match.player2 : match.player1;
            
            // Add to history
            const historyEntry: MatchHistory = {
              id: match.id,
              player1: match.player1.name,
              player2: match.player2.name,
              score1: newScore1,
              score2: newScore2,
              winner: winner.name,
              round: 'ربع النهائي',
              date: new Date()
            };
            setMatchHistory(prev => [historyEntry, ...prev]);
            
            return { ...match, score1: newScore1, score2: newScore2, status: 'finished', winner, loser };
          }
        }
        return match;
      }));
    }, 3000);
    
    return () => {
      if (leagueTimerRef.current) {
        clearInterval(leagueTimerRef.current);
      }
    };
  };

  // Get player title based on rank
  const getPlayerTitle = (rank: number, isWinner: boolean) => {
    if (rank === 1 && isWinner) return { title: 'Golden The Goat 🐐', emoji: '🐐' };
    if (rank === 2) return { title: 'The Legend 🥈', emoji: '🥈' };
    if (rank === 3) return { title: 'The Hero 🥉', emoji: '🥉' };
    if (rank <= 8) return { title: 'The Champion ⚡', emoji: '⚡' };
    if (rank <= 16) return { title: 'The Warrior 🔥', emoji: '🔥' };
    return { title: 'The Fighter 💪', emoji: '💪' };
  };

  // Current questions
  const currentQuestions = language === 'ar' ? 
    questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].arabic :
    questionsSets[`set${currentQuestionSet + 1}` as keyof typeof questionsSets].english;

  // Translations
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
        }
      
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
          start: "🌙 استعد لتحدي المربع الذهبي في ليالي رمضان",
          league: "🏆 أقوى دوري رمضاني - 4 مراكز فقط للتتويج",
          leaderboard: "📊 الترتيب يتغير لحظياً.. نافس على القمة"
        }
    }
  };

  const tr = t[language];

  return (
            <div className="min-h-screen relative overflow-hidden text-white font-sans bg-[#0d041a]">
      
      {/* 1. الخلفية الرمضانية (تدرج ونجوم) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d041a] via-[#1b0a33] to-[#2d1255]"></div>
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}>
      </div>
      <div className="absolute top-20 right-10 text-6xl opacity-20 blur-[1px] pointer-events-none animate-pulse">🌙</div>
{/* فوانيس معلقة متحركة */}
<div className="absolute top-10 left-8 text-4xl opacity-40 animate-[bounce_4s_infinite] pointer-events-none">🏮</div>
<div className="absolute top-40 right-12 text-3xl opacity-30 animate-[bounce_3s_infinite] pointer-events-none">🏮</div>

      {/* 2. البانر الذهبي (تأكد أن الـ z-index عالي لكي لا يختفي) */}
      <div className="fixed top-0 left-0 right-0 z-[100] overflow-hidden h-10 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 shadow-[0_2px_15px_rgba(234,179,8,0.4)] flex items-center border-b border-yellow-300/30">
        <div className="whitespace-nowrap animate-marquee flex items-center text-black font-black text-[10px] sm:text-xs uppercase tracking-wider">
          <span className="mx-8">🎁 مبارك عليكم الشهر: جوائز نقدية لأبطال المربع الذهبي 🎁</span>
          <span className="mx-8">🏆 المراكز (1-4) يستلمون الجوائز عبر الخاص 🏆</span>
          <span className="mx-8">🌙 رمضان يجمعنا في دوري Gowin الأقوى 🌙</span>
        </div>
      </div>

  {/* 4. الهلال المتوهج (بإضافة تأثير Pulse للحركة) */}
  <div className="absolute top-20 right-10 text-6xl opacity-20 blur-[1px] pointer-events-none animate-pulse">🌙</div>
  <div className="absolute top-40 left-12 text-2xl opacity-10 pointer-events-none animate-bounce">✨</div>

      {/* Header */}
      <header className="relative z-50 pt-12 flex justify-between items-center p-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <button
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="px-2 py-1 bg-white/10 rounded-lg text-xs hover:bg-white/20 transition-colors text-white"
        >
          {language === 'ar' ? 'EN' : 'ع'}
        </button>
        
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] flex items-center gap-2">
  🏮 GOWIN 🏮
</h1>
        
        <div className="w-8"></div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-50 flex justify-center gap-2 p-4 bg-black/20">
        {[
          { id: 'home', icon: '🏠', label: tr.welcome.split(' ')[0] },
          { id: 'leaderboard', icon: '📊', label: tr.leaderboard.split(' ')[1] },
          { id: 'live', icon: '🔴', label: tr.live },
          { id: 'history', icon: '📜', label: tr.history },
          { id: 'friends', icon: '💬', label: tr.friends },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-xs hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto p-4 pb-24">
        
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Logo */}
            <div className="text-center py-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-pulse mb-4">
                ⚔️ GOWIN ⚔️
              </h1>
              <p className="text-2xl text-white/80 font-bold">{tr.welcome}</p>
              <p className="text-lg text-purple-300 mt-2">{tr.subtitle}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-yellow-400">{players.length}</p>
                <p className="text-xs text-white/60">{tr.stats.totalPlayers}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-green-400">8</p>
                <p className="text-xs text-white/60">{tr.stats.qualified}</p>
              </div>
              <div className="bg-gradient-to-br from-red-500/30 to-pink-500/30 rounded-2xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-red-400">{Math.max(0, 20 - players.length)}</p>
                <p className="text-xs text-white/60">{tr.stats.eliminated}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl p-4 text-center border border-white/10">
                <p className="text-3xl font-bold text-yellow-400">5</p>
                <p className="text-xs text-white/60">{tr.stats.rounds}</p>
              </div>
            </div>

            {/* Motivation */}
            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-4 text-center border border-white/10">
              <p className="text-lg font-bold text-white animate-pulse">💪 {tr.motivation.start}</p>
            </div>

            {/* Name Input */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-white/80 mb-2 font-bold">👤 {language === 'ar' ? 'اسمك' : 'Your Name'}</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسمك...' : 'Enter your name...'}
                className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 border border-white/20 focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Start Button */}
            <button
              onClick={startChallenge}
              disabled={!playerName.trim() || players.length >= 20}
              className={`w-full py-4 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 ${
                !playerName.trim() || players.length >= 20
                  ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-400 hover:to-orange-400'
              }`}
            >
              {tr.startChallenge} 🎮
            </button>

            {/* League Status */}
            {players.length >= 20 && (
              <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-2xl p-4 text-center border border-green-500/30 animate-pulse">
                <p className="text-xl font-bold text-green-400">🎉 الدوري جاهز للبدء!</p>
                <p className="text-sm text-white/70">انتقل إلى تويب 🔴 مباشر لتشغيل الدوري</p>
              </div>
            )}

            {/* Golden Goat Banner - Realistic & Animated */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              
              {/* Animated Shine Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-[shimmer_3s_infinite]"></div>
              </div>
              
              {/* Particle Effects */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                    style={{
                      left: `${10 + (i * 8)}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
              
              {/* Main Content */}
              <div className="relative z-10 p-8 text-center">
                {/* Crown with glow */}
                <div className="relative inline-block mb-2">
                  <span className="text-6xl animate-bounce drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">👑</span>
                  <div className="absolute inset-0 blur-xl bg-yellow-400/50 -z-10"></div>
                </div>
                
                {/* Title with metallic effect */}
                <h2 className="text-4xl md:text-5xl font-black mb-2 relative">
                  <span className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    Golden The Goat
                  </span>
                  <span className="ml-3 text-5xl animate-pulse">🐐</span>
                </h2>
                
                {/* Subtitle */}
                <p className="text-yellow-200/90 text-lg font-bold mb-4 animate-pulse">
                  {language === 'ar' ? '⚔️ كن الأفضل واحصل على اللقب الأسطوري ⚔️' : '⚔️ Be the best and claim the legendary title ⚔️'}
                </p>
                
                {/* Stats Bar */}
                <div className="flex justify-center gap-6 text-yellow-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold">🏆</p>
                    <p className="text-xs opacity-80">{language === 'ar' ? 'لقب واحد' : 'One Title'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">20</p>
                    <p className="text-xs opacity-80">{language === 'ar' ? 'متنافسين' : 'Competitors'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">∞</p>
                    <p className="text-xs opacity-80">{language === 'ar' ? 'مجد أبدي' : 'Eternal Glory'}</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom Border Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">{tr.leaderboard}</h2>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-4 border border-white/10">
              {/* Motivation */}
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-3 mb-4 text-center">
                <p className="text-sm font-bold text-orange-400 animate-pulse">📊 {tr.motivation.leaderboard}</p>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {[...players].sort((a, b) => b.points - a.points).slice(0, 20).map((player, index) => {
                  const rank = index + 1;
                  const title = getPlayerTitle(rank, player.isWinner);
                  const isCurrentPlayer = player.deviceId === getDeviceId();
                  
                  return (
                    <div
                      key={player.id}
                      className={`relative bg-white/5 rounded-xl p-4 border transition-all ${
                        isCurrentPlayer ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/10'
                      }`}
                    >
                      {isCurrentPlayer && (
                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                          أنت
                        </span>
                      )}
                      
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          rank === 1 ? 'bg-yellow-500 text-black' :
                          rank === 2 ? 'bg-gray-400 text-black' :
                          rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-white/10 text-white'
                        }`}>
                          {rank}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-white">{player.name}</p>
                            <span className="text-lg">{title.emoji}</span>
                          </div>
                          <p className="text-xs text-yellow-400 font-bold">{title.title}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-yellow-400">{player.points}</p>
                          <p className="text-xs text-white/40">{tr.points}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Live Tab */}
        {activeTab === 'live' && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-red-400 flex items-center gap-2">
                {tr.live}
                <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              </h2>
              <span className="text-sm text-white/60">{players.length}/20 {tr.playersJoined}</span>
            </div>

            {/* Motivation */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 mb-4 text-center">
              <p className="text-sm font-bold text-purple-400 animate-pulse">⚡ {tr.motivation.league}</p>
            </div>

            {/* Start League Button */}
            {players.length >= 20 && !leagueStarted && (
              <button
                onClick={startLeague}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl font-bold text-xl text-white mb-6 animate-pulse hover:from-green-400 hover:to-emerald-400 transition-all"
              >
                🏆 ابدأ الدوري الآن - Start League Now 🏆
              </button>
            )}

            {/* League Started */}
            {leagueStarted && (
              <div className="space-y-4">
                {/* Quarter Finals */}
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-4 border border-white/10">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">⚔️ {tr.quarterFinal} - 8 لاعبين</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matches.map((match) => {
                      const isMatchFinished = match.status === 'finished';
                      const player1Qualified = match.winner?.id === match.player1.id;
                      
                      return (
                        <div
                          key={match.id}
                          className={`relative rounded-xl p-3 transition-all ${
                            match.status === 'live' 
                              ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 animate-pulse'
                              : 'bg-white/5'
                          }`}
                        >
                          {match.status === 'live' && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              🔴 LIVE
                            </span>
                          )}
                          
                          {/* Player 1 */}
                          <div className={`flex items-center justify-between mb-2 ${isMatchFinished ? (player1Qualified ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">👤</span>
                              <span className="font-bold">{match.player1.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold">{match.score1}</span>
                              {isMatchFinished && (
                                <span>{player1Qualified ? '✅' : '❌'}</span>
                              )}
                            </div>
                          </div>
                          
                          {/* VS */}
                          <div className="text-center text-white/30 text-sm mb-2">
                            {tr.vs}
                          </div>
                          
                          {/* Player 2 */}
                          <div className={`flex items-center justify-between ${isMatchFinished ? (!player1Qualified ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">👤</span>
                              <span className="font-bold">{match.player2.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold">{match.score2}</span>
                              {isMatchFinished && (
                                <span>{!player1Qualified ? '✅' : '❌'}</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Result */}
                          {isMatchFinished && (
                            <div className="mt-2 text-center">
                              <p className="text-xs text-white/60">
                                {language === 'ar' ? 'الفائز: ' : 'Winner: '} 
                                <span className="text-green-400 font-bold">{match.winner?.name}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Waiting Message */}
            {!leagueStarted && (
              <div className="text-center py-12">
                <p className="text-2xl text-white/60 mb-4">⏳ {language === 'ar' ? 'انتظر حتى يكتمل العدد' : 'Waiting for players...'}</p>
                <p className="text-lg text-yellow-400">{players.length}/20</p>
                <div className="mt-4 flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full animate-bounce ${
                        i < players.length ? 'bg-green-500' : 'bg-white/20'
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">{tr.history}</h2>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-4 border border-white/10">
              {matchHistory.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-2xl text-white/40 mb-2">📭</p>
                  <p className="text-white/60">{language === 'ar' ? 'لا توجد مباريات سابقة' : 'No matches yet'}</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                  {matchHistory.map((match, idx) => (
                    <div
                      key={`${match.id}_${idx}`}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-purple-400 font-bold">{match.round}</span>
                        <span className="text-xs text-white/40">
                          {new Date(match.date).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-white/60">{match.player1}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-black/30 px-3 py-1 rounded-lg">
                          <span className="text-yellow-400 font-bold">{match.score1}</span>
                          <span className="text-white/30">-</span>
                          <span className="text-yellow-400 font-bold">{match.score2}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/60">{match.player2}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-center">
                        <p className="text-xs text-green-400">
                          👑 {language === 'ar' ? 'الفائز: ' : 'Winner: '}{match.winner}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Challenge Tab */}
        {activeTab === 'challenge' && gameStarted && (
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-red-500 animate-pulse">❤️</span>
                <span className="text-white font-bold">{lives}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <span className="text-yellow-400">⏱️</span>
                <span className="text-white font-bold">{timeLeft}</span>
                <span className="text-white/40 text-sm">{tr.timeLeft}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white font-bold">{score}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-2 mb-6">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
              ></div>
            </div>
            
            {/* Question */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-purple-400">
                  {language === 'ar' ? 'السؤال' : 'Question'} {currentQuestionIndex + 1}/{currentQuestions.length}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currentQuestions[currentQuestionIndex].difficulty === 'سهل جداً' || currentQuestions[currentQuestionIndex].difficulty === 'Very Easy'
                    ? 'bg-green-500/30 text-green-400'
                    : currentQuestions[currentQuestionIndex].difficulty === 'متوسط' || currentQuestions[currentQuestionIndex].difficulty === 'Medium'
                    ? 'bg-yellow-500/30 text-yellow-400'
                    : 'bg-red-500/30 text-red-400'
                }`}>
                  {currentQuestions[currentQuestionIndex].difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                {currentQuestions[currentQuestionIndex].question}
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {currentQuestions[currentQuestionIndex].options.map((option, index) => {
                  const isCorrect = index === currentQuestions[currentQuestionIndex].correct;
                  const isSelected = selectedAnswer === index;
                  const showResult = selectedAnswer !== null;
                  
                  let buttonClass = "bg-white/5 hover:bg-white/10 border-white/10";
                  if (showResult) {
                    if (isCorrect) {
                      buttonClass = "bg-green-500/50 border-green-500";
                    } else if (isSelected) {
                      buttonClass = "bg-red-500/50 border-red-500";
                    }
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`${buttonClass} border rounded-xl p-4 text-white font-medium transition-all ${language === 'ar' ? 'text-right' : 'text-left'}`}
                    >
                      <span className="inline-block w-8 h-8 bg-white/10 rounded-full text-center leading-8 ml-3">
                        {['A', 'B', 'C', 'D'][index]}
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-pink-400">{tr.friends}</h2>
            
            {/* Share Link */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-4 border border-white/10 mb-4">
              <p className="text-white/80 mb-3 font-bold">🔗 {tr.shareLink}</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={`https://gowin.app/${getDeviceId()}`}
                  readOnly
                  className="flex-1 bg-white/10 text-white text-sm rounded-lg px-3 py-2 border border-white/20"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(`https://gowin.app/${getDeviceId()}`)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg font-bold"
                >
                  📋
                </button>
              </div>
            </div>
            
            {/* Chat */}
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/60 text-sm">💬 {language === 'ar' ? 'غرفة الأصدقاء' : 'Friends Room'}</p>
                <span className="text-xs text-green-400 animate-pulse">● {chatMessages.length} {language === 'ar' ? 'رسالة' : 'messages'}</span>
              </div>
              
              {/* Messages */}
              <div className="h-64 overflow-y-auto space-y-3 mb-4 p-2 bg-black/20 rounded-xl">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/40">💬 {language === 'ar' ? 'ابدأ المحادثة' : 'Start the conversation'}</p>
                  </div>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.isMe 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                          : 'bg-white/10 text-white'
                      }`}>
                        <p className="text-xs font-bold opacity-70 mb-1">
                          {msg.isMe ? '👤 ' + (playerName || 'أنت') : msg.name}
                        </p>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-50 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={tr.chatPlaceholder}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && chatInput.trim()) {
                      setChatMessages(prev => [...prev, {
                        name: playerName || 'أنت',
                        text: chatInput,
                        time: new Date().toLocaleTimeString(),
                        isMe: true
                      }]);
                      setChatInput('');
                    }
                  }}
                  className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 border border-white/20 focus:border-pink-400 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => {
                    if (chatInput.trim()) {
                      setChatMessages(prev => [...prev, {
                        name: playerName || 'أنت',
                        text: chatInput,
                        time: new Date().toLocaleTimeString(),
                        isMe: true
                      }]);
                      setChatInput('');
                    }
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-xl font-bold"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t border-white/10 bg-black/30">
        <a
          href="https://www.instagram.com/_itlulp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
        >
          <span className="text-xl">📷</span>
          <span className="font-bold">@_itlulp</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
