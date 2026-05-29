
const WORDS = [
  "Triumph",
  "Tenacity",
  "Scale",
  "Direct",
  "Trip",
  "Knowledge",
  "Sprint",
  "Reason",
  "Mark",
  "Conceal",
  "Era",
  "Attraction",
  "Force",
  "Sinew",
  "Hold",
  "Prosper",
  "Forge",
  "Soul",
  "Tour",
  "Notion",
  "Century",
  "Warmth",
  "Aura",
  "Radiate",
  "Innovate",
  "Resolve",
  "Target",
  "Heart",
  "Transcend",
  "Keep",
  "Bullseye",
  "Mission",
  "Reality",
  "Belief",
  "Fearless",
  "Reach",
  "Sparkle",
  "Lion",
  "Course",
  "Guide",
  "Chivalry",
  "Foresight",
  "Sharp",
  "Refresh",
  "Compete",
  "Whirl",
  "Fall",
  "Propel",
  "Sink",
  "Run",
  "Appeal",
  "Today",
  "Influence",
  "Glimmer",
  "Bliss",
  "Trail",
  "Hoard",
  "Walk",
  "Surge",
  "Guts",
  "Magnetism",
  "Snatch",
  "Ring",
  "Sly",
  "Swim",
  "Charm",
  "Bright",
  "Veil",
  "Cover",
  "Prevail",
  "Apex",
  "Journey",
  "Earth",
  "Plunge",
  "Battle",
  "Vivid",
  "Sphere",
  "Astute",
  "Galaxy",
  "Burn",
  "Drive",
  "Circle",
  "Climb",
  "Cure",
  "Sight",
  "Surpass",
  "Smart",
  "Objective",
  "Willpower",
  "Eagle",
  "Store",
  "Happy",
  "Thrive",
  "Mastery",
  "Build",
  "Leap",
  "Courage",
  "Brain",
  "Rule",
  "Helm",
  "Faith",
  "Manifest",
  "Navigate",
  "Rebirth",
  "Progress",
  "Blaze",
  "Wander",
  "Advance",
  "Joy",
  "Flash",
  "Grace",
  "Thought",
  "Daring",
  "Concept",
  "Heroism",
  "Rush",
  "Fuel",
  "Path",
  "Architect",
  "Clarity",
  "March",
  "Intrepid",
  "Hope",
  "Brawn",
  "Protect",
  "Cheerful",
  "Elevate",
  "Shield",
  "Fact",
  "Clash",
  "Bounce",
  "Flex",
  "Mend",
  "Vigor",
  "Energy",
  "Globe",
  "Match",
  "Euphoria",
  "Idea",
  "Week",
  "Fix",
  "Twirl",
  "Goal",
  "Giggle",
  "Muscle",
  "Motivate",
  "Rebound",
  "Dream",
  "Create",
  "Shine",
  "Empower",
  "Bloom",
  "Accelerate",
  "Glad",
  "Glide",
  "Play",
  "Grit",
  "Attain",
  "Dash",
  "Soar",
  "Stand",
  "Save",
  "Govern",
  "Grasp",
  "Rise",
  "Discover",
  "Cruise",
  "Strive",
  "Take",
  "Grip",
  "Roll",
  "Pace",
  "Launch",
  "Wise",
  "Minute",
  "Trust",
  "Cloak",
  "Cosmos",
  "Spirit",
  "Month",
  "Command",
  "Stamina",
  "Hindsight",
  "Flourish",
  "Smile",
  "Stroll",
  "Lead",
  "Pride",
  "Logic",
  "Travel",
  "Fun",
  "Acute",
  "Delight",
  "Mind",
  "Ignite",
  "Intellect",
  "Catapult",
  "Bear",
  "Clever",
  "Overcome",
  "Success",
  "Chuckle",
  "Sail",
  "Fire",
  "Restore",
  "Allure",
  "Recover",
  "Shrewd",
  "Orb",
  "Heat",
  "Truth",
  "Bravery",
  "Cape",
  "Hide",
  "Momentum",
  "Fight",
  "Purpose",
  "Outlast",
  "Charisma",
  "Bend",
  "Cheer",
  "Nobility",
  "Rotate",
  "Spin",
  "Core",
  "Laugh",
  "Awareness",
  "Route",
  "Blossom",
  "Awaken",
  "Quest",
  "Vision",
  "Stride",
  "Sense",
  "Drift",
  "Glee",
  "Design",
  "Fly",
  "Honor",
  "Wolf",
  "Pilot",
  "Second",
  "Captain",
  "Spark",
  "Roam",
  "Merry",
  "Proceed",
  "Instant",
  "Beam",
  "Decade",
  "Heal",
  "Jump",
  "Lucid",
  "Gallantry",
  "Happiness",
  "Arise",
  "Conquer",
  "Day",
  "Renew",
  "Explore",
  "Nerve",
  "Repair",
  "Epoch",
  "Shroud",
  "Outperform",
  "Flame",
  "Uplift",
  "Pinnacle",
  "Construct",
  "Evolve",
  "Beauty",
  "Ecstasy",
  "Voyage",
  "Age",
  "Vault",
  "Flare",
  "Float",
  "Inspire",
  "Keen",
  "Emerge",
  "Revive",
  "Turn",
  "Bound",
  "Space",
  "Twist",
  "Aim",
  "Realize",
  "Fortitude",
  "Sun",
  "Center",
  "Presence",
  "Sunny",
  "Stretch",
  "Hour",
  "Elegance",
  "Courageous",
  "Guard",
  "Tumble",
  "Falcon",
  "Victory",
  "Star",
  "Defend",
  "Glow",
  "Coil",
  "Dive",
  "Adapt",
  "Control",
  "Year",
  "Invent",
  "Sport",
  "Steer",
  "Chart",
  "Dignity",
  "Strength",
  "Coat",
  "Grin",
  "Wisdom",
  "Drop",
  "Spring",
  "Hawk",
  "Seize",
  "World",
  "Win",
  "Loop",
  "Fox",
  "Race",
  "Spiral",
  "Moon",
  "Universe",
  "Excel",
  "Swirl",
  "Clutch",
  "Dominate",
  "Hike",
  "Grab",
  "Master",
  "Cycle",
  "Vibe",
  "War",
  "Now",
  "Mask",
  "Persist",
  "Clear",
  "Bold",
  "Moment",
  "Glint",
  "Tiger",
  "Duel",
  "Planet",
  "Hustle",
  "Glory",
  "Pioneer",
  "Achieve",
  "Time",
  "Zenith",
  "Power",
  "Game",
  "Revolve",
  "Endurance",
  "Combat",
  "Helix",
  "Insight",
  "Ascend",
  "Valor",
  "Might"
];
const QUOTES = [
  {
    "text": "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    "author": "Joshua J. Marine"
  },
  {
    "text": "The true measure of a society is how it treats its women.",
    "author": "Savitribai Phule"
  },
  {
    "text": "Believe you can and you're halfway there.",
    "author": "Theodore Roosevelt"
  },
  {
    "text": "When I was 5 years old, my mother always told me that happiness was the key to life.",
    "author": "John Lennon"
  },
  {
    "text": "He who has a why to live for can bear almost any how.",
    "author": "Friedrich Nietzsche"
  },
  {
    "text": "The best way to predict your future is to create it.",
    "author": "Abraham Lincoln"
  },
  {
    "text": "It is never too late to be what you might have been.",
    "author": "George Eliot"
  },
  {
    "text": "Even if there were a sword in the hands of everyone, it is willpower that establishes a government.",
    "author": "Chhatrapati Shivaji Maharaj"
  },
  {
    "text": "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",
    "author": "Jamie Paolinetti"
  },
  {
    "text": "It is not what you do for your children, but what you have taught them to do for themselves.",
    "author": "Ann Landers"
  },
  {
    "text": "Cultivation of mind should be the ultimate aim of human existence.",
    "author": "Dr. B.R. Ambedkar"
  },
  {
    "text": "You take your life in your own hands, and what happens? A terrible thing, no one to blame.",
    "author": "Erica Jong"
  },
  {
    "text": "Ups and downs in life are very important to keep us going.",
    "author": "Ratan Tata"
  },
  {
    "text": "Happiness is not something readymade. It comes from your own actions.",
    "author": "Dalai Lama"
  },
  {
    "text": "Be — don't try to become.",
    "author": "Osho"
  },
  {
    "text": "Once you start a working on something, don't be afraid of failure and don't abandon it.",
    "author": "Chanakya"
  },
  {
    "text": "I really believe that entrepreneurship is about being able to face failure.",
    "author": "Kiran Mazumdar-Shaw"
  },
  {
    "text": "Arise, awake, and stop not till the goal is reached.",
    "author": "Swami Vivekananda"
  },
  {
    "text": "You can never cross the ocean until you have the courage to lose sight of the shore.",
    "author": "Christopher Columbus"
  },
  {
    "text": "A truly rich man is one whose children run into his arms when his hands are empty.",
    "author": "Unknown"
  },
  {
    "text": "I measure the progress of a community by the degree of progress which women have achieved.",
    "author": "Dr. B.R. Ambedkar"
  },
  {
    "text": "Life shrinks or expands in proportion to one's courage.",
    "author": "Anais Nin"
  },
  {
    "text": "For, each man can do best and excel in only that thing of which he is passionately fond.",
    "author": "Homi J. Bhabha"
  },
  {
    "text": "Winning isn't everything, but wanting to win is.",
    "author": "Vince Lombardi"
  },
  {
    "text": "Either you run the day, or the day runs you.",
    "author": "Jim Rohn"
  },
  {
    "text": "Either you run the day, or the day runs you.",
    "author": "Jim Rohn"
  },
  {
    "text": "Work is undoubtedly worship but laughter is life.",
    "author": "Sardar Vallabhbhai Patel"
  },
  {
    "text": "Too many of us are not living our dreams because we are living our fears.",
    "author": "Les Brown"
  },
  {
    "text": "When one door of happiness closes, another opens, but often we look so long at the closed door.",
    "author": "Helen Keller"
  },
  {
    "text": "Education costs money. But then so does ignorance.",
    "author": "Sir Claus Moser"
  },
  {
    "text": "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "author": "Thomas A. Edison"
  },
  {
    "text": "If you don't build your dream, someone else will hire you to help them build theirs.",
    "author": "Dhirubhai Ambani"
  },
  {
    "text": "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.",
    "author": "Jesus"
  },
  {
    "text": "Remember that not getting what you want is sometimes a wonderful stroke of luck.",
    "author": "Dalai Lama"
  },
  {
    "text": "Quality is not an act, it is a habit.",
    "author": "Aristotle"
  },
  {
    "text": "Play iterated games. All the returns in life come from compound interest.",
    "author": "Naval Ravikant"
  },
  {
    "text": "Your time is limited, don't waste it living someone else's life.",
    "author": "Steve Jobs"
  },
  {
    "text": "True knowledge is not attained by thinking.",
    "author": "Sri Aurobindo"
  },
  {
    "text": "Our greatest glory is not in never falling, but in rising every time we fall.",
    "author": "Confucius"
  },
  {
    "text": "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    "author": "A.P.J. Abdul Kalam"
  },
  {
    "text": "If people are not laughing at your goals, your goals are too small.",
    "author": "Azim Premji"
  },
  {
    "text": "We become what we think about.",
    "author": "Earl Nightingale"
  },
  {
    "text": "Yesterday is but a dream, tomorrow but a vision.",
    "author": "Kalidasa"
  },
  {
    "text": "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.",
    "author": "Sheryl Sandberg"
  },
  {
    "text": "I am the master of my failure.",
    "author": "C. V. Raman"
  },
  {
    "text": "Don't give up, there is always a next time.",
    "author": "Mary Kom"
  },
  {
    "text": "An unexamined life is not worth living.",
    "author": "Socrates"
  },
  {
    "text": "Education through self-help is our motto.",
    "author": "Karmaveer Bhaurao Patil"
  },
  {
    "text": "Do not allow your mind to wander.",
    "author": "Vinoba Bhave"
  },
  {
    "text": "Let your life lightly dance on the edges of Time like dew on the tip of a leaf.",
    "author": "Rabindranath Tagore"
  },
  {
    "text": "True teachers are those who help us think for ourselves.",
    "author": "S. Radhakrishnan"
  },
  {
    "text": "Imagination is more important than knowledge.",
    "author": "Albert Einstein"
  },
  {
    "text": "Fall seven times and stand up eight.",
    "author": "Japanese Proverb"
  },
  {
    "text": "Innovation distinguishes between a leader and a follower.",
    "author": "Steve Jobs"
  },
  {
    "text": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "author": "Aristotle"
  },
  {
    "text": "Go confidently in the direction of your dreams. Live the life you have imagined.",
    "author": "Henry David Thoreau"
  },
  {
    "text": "There are no traffic jams along the extra mile.",
    "author": "Roger Staubach"
  },
  {
    "text": "Build your own dreams, or someone else will hire you to build theirs.",
    "author": "Farrah Gray"
  },
  {
    "text": "Empowerment is about choices.",
    "author": "Amartya Sen"
  },
  {
    "text": "Be the change that you wish to see in the world.",
    "author": "Mahatma Gandhi"
  },
  {
    "text": "The two most important days in your life are the day you are born and the day you find out why.",
    "author": "Mark Twain"
  },
  {
    "text": "Stand up for your rights.",
    "author": "Raj Thackeray"
  },
  {
    "text": "Everything you've ever wanted is on the other side of fear.",
    "author": "George Addair"
  },
  {
    "text": "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
    "author": "Plato"
  },
  {
    "text": "You miss 100% of the shots you don't take.",
    "author": "Wayne Gretzky"
  },
  {
    "text": "The unexamined life is not worth living.",
    "author": "Socrates"
  },
  {
    "text": "He who can listen to the music in the midst of noise can achieve great things.",
    "author": "Vikram Sarabhai"
  },
  {
    "text": "Give me blood, and I shall give you freedom!",
    "author": "Subhash Chandra Bose"
  },
  {
    "text": "The battles that count aren't the ones for gold medals. The struggles within yourself.",
    "author": "Jesse Owens"
  },
  {
    "text": "I would rather die of passion than of boredom.",
    "author": "Vincent van Gogh"
  },
  {
    "text": "It does not matter how slowly you go as long as you do not stop.",
    "author": "Confucius"
  },
  {
    "text": "Nature does not hurry, yet everything is accomplished.",
    "author": "Lao Tzu"
  },
  {
    "text": "Courage is knowing what not to fear.",
    "author": "Plato"
  },
  {
    "text": "If you want to make the wrong decision, ask everyone.",
    "author": "Naval Ravikant"
  },
  {
    "text": "You can't use up creativity. The more you use, the more you have.",
    "author": "Maya Angelou"
  },
  {
    "text": "When I let go of what I am, I become what I might be.",
    "author": "Lao Tzu"
  },
  {
    "text": "Words are the only jewels I possess, words are the only clothes I wear.",
    "author": "Sant Tukaram"
  },
  {
    "text": "Start where you are. Use what you have. Do what you can.",
    "author": "Arthur Ashe"
  },
  {
    "text": "Don't stop when you're tired. Stop when you're done.",
    "author": "David Goggins"
  },
  {
    "text": "Calmness in preparation but boldness in execution.",
    "author": "V. D. Savarkar"
  },
  {
    "text": "I didn't fail the test. I just found 100 ways to do it wrong.",
    "author": "Benjamin Franklin"
  },
  {
    "text": "If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.",
    "author": "Vincent Van Gogh"
  },
  {
    "text": "You must write for yourself, above all.",
    "author": "R. K. Narayan"
  },
  {
    "text": "First, have a definite, clear practical ideal; a goal, an objective.",
    "author": "Aristotle"
  },
  {
    "text": "I attribute my success to this: I never gave or took any excuse.",
    "author": "Florence Nightingale"
  },
  {
    "text": "Awake, arise and educate. Smash traditions, liberate.",
    "author": "Savitribai Phule"
  },
  {
    "text": "I have learned over the years that when one's mind is made up, this diminishes fear.",
    "author": "Rosa Parks"
  },
  {
    "text": "Process is more important than the results.",
    "author": "M.S. Dhoni"
  },
  {
    "text": "How wonderful it is that nobody need wait a single moment before starting to improve the world.",
    "author": "Anne Frank"
  },
  {
    "text": "Act as if what you do makes a difference. It does.",
    "author": "William James"
  },
  {
    "text": "If you want to lift yourself up, lift up someone else.",
    "author": "Booker T. Washington"
  },
  {
    "text": "A person who never made a mistake never tried anything new.",
    "author": "Albert Einstein"
  },
  {
    "text": "I am responsible for my actions.",
    "author": "Ahilyabai Holkar"
  },
  {
    "text": "Stay hungry, stay foolish.",
    "author": "Steve Jobs"
  },
  {
    "text": "To succeed in your mission, you must have single-minded devotion to your goal.",
    "author": "A.P.J. Abdul Kalam"
  },
  {
    "text": "Teach thy tongue to say, 'I do not know,' and thous shalt progress.",
    "author": "Maimonides"
  },
  {
    "text": "Believe you can and you're halfway there.",
    "author": "Theodore Roosevelt"
  },
  {
    "text": "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
    "author": "Bruce Lee"
  },
  {
    "text": "Beauty doesn't need ornaments.",
    "author": "Munshi Premchand"
  },
  {
    "text": "We suffer more often in imagination than in reality.",
    "author": "Seneca"
  },
  {
    "text": "The best revenge is massive success.",
    "author": "Frank Sinatra"
  },
  {
    "text": "Read what you love until you love to read.",
    "author": "Naval Ravikant"
  },
  {
    "text": "The person who says it cannot be done should not interrupt the person who is doing it.",
    "author": "Chinese Proverb"
  },
  {
    "text": "Don't explain your philosophy. Embody it.",
    "author": "Epictetus"
  },
  {
    "text": "The most difficult thing is the decision to act, the rest is merely tenacity.",
    "author": "Amelia Earhart"
  },
  {
    "text": "If you look at what you have in life, you'll always have more.",
    "author": "Oprah Winfrey"
  },
  {
    "text": "The country's treasure is not kept in safe-deposit vaults, but in the minds of its youth.",
    "author": "Anna Hazare"
  },
  {
    "text": "Inclusiveness is not a philosophy; it is the nature of existence.",
    "author": "Sadhguru"
  },
  {
    "text": "An equation for me has no meaning, unless it expresses a thought of God.",
    "author": "Srinivasa Ramanujan"
  },
  {
    "text": "You can't cross the sea merely by standing and staring at the water.",
    "author": "Rabindranath Tagore"
  },
  {
    "text": "Knowing is not enough, we must apply. Willing is not enough, we must do.",
    "author": "Bruce Lee"
  },
  {
    "text": "If you want your children to turn out well, spend twice as much time with them, and half as much money.",
    "author": "Abigail Van Buren"
  },
  {
    "text": "The journey of a thousand miles begins with one step.",
    "author": "Lao Tzu"
  },
  {
    "text": "Take up one idea. Make that one idea your life.",
    "author": "Swami Vivekananda"
  },
  {
    "text": "Certain things catch your eye, but pursue only those that capture the heart.",
    "author": "Ancient Indian Proverb"
  },
  {
    "text": "A leader is one who knows the way, goes the way, and shows the way.",
    "author": "Yashwantrao Chavan"
  },
  {
    "text": "The beginning is the most important part of the work.",
    "author": "Plato"
  },
  {
    "text": "Never bend your head, always hold it high.",
    "author": "Chhatrapati Shivaji Maharaj"
  },
  {
    "text": "The universe is my home.",
    "author": "Sant Dnyaneshwar"
  },
  {
    "text": "There is only one good, knowledge, and one evil, ignorance.",
    "author": "Socrates"
  },
  {
    "text": "Every child is an artist. The problem is how to remain an artist once he grows up.",
    "author": "Pablo Picasso"
  },
  {
    "text": "We yield to none in our love, admiration and respect for the Buddha.",
    "author": "V. D. Savarkar"
  },
  {
    "text": "Swaraj is my birthright and I shall have it.",
    "author": "Lokmanya Tilak"
  },
  {
    "text": "People throw stones at you and you convert them into milestones.",
    "author": "Sachin Tendulkar"
  },
  {
    "text": "Your time is limited, so don't waste it living someone else's life.",
    "author": "Steve Jobs"
  },
  {
    "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "author": "Winston Churchill"
  },
  {
    "text": "Every strike brings me closer to the next home run.",
    "author": "Babe Ruth"
  },
  {
    "text": "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "author": "Walt Whitman"
  },
  {
    "text": "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.",
    "author": "Winston Churchill"
  },
  {
    "text": "The only person you are destined to become is the person you decide to be.",
    "author": "Ralph Waldo Emerson"
  },
  {
    "text": "Lack of education leads to lack of wisdom, which leads to lack of morals.",
    "author": "Jyotirao Phule"
  },
  {
    "text": "Do what you can, with what you have, where you are.",
    "author": "Theodore Roosevelt"
  },
  {
    "text": "You become what you believe.",
    "author": "Oprah Winfrey"
  },
  {
    "text": "Life should be great rather than long.",
    "author": "Dr. B.R. Ambedkar"
  },
  {
    "text": "What's money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.",
    "author": "Bob Dylan"
  },
  {
    "text": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "author": "Zig Ziglar"
  },
  {
    "text": "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.",
    "author": "Johann Wolfgang von Goethe"
  },
  {
    "text": "The only solutions that are ever worth anything are the solutions that people find themselves.",
    "author": "Satyajit Ray"
  },
  {
    "text": "Eighty percent of success is showing up.",
    "author": "Woody Allen"
  },
  {
    "text": "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "author": "Albert Einstein"
  },
  {
    "text": "Absorb what is useful, discard what is not, add what is uniquely your own.",
    "author": "Bruce Lee"
  },
  {
    "text": "Time is not measured by the passing of years but by what one does.",
    "author": "Jawaharlal Nehru"
  },
  {
    "text": "I have learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    "author": "Maya Angelou"
  },
  {
    "text": "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",
    "author": "David Goggins"
  },
  {
    "text": "Performance leads to recognition. Recognition brings respect. Respect enhances power.",
    "author": "Narayana Murthy"
  },
  {
    "text": "Progress is implied in independence.",
    "author": "Lokmanya Tilak"
  },
  {
    "text": "Hard work, willpower, and dedication.",
    "author": "Milkha Singh"
  },
  {
    "text": "The only limit to our realization of tomorrow will be our doubts of today.",
    "author": "Franklin D. Roosevelt"
  },
  {
    "text": "Whether you think you can or you think you can't, you're right.",
    "author": "Henry Ford"
  },
  {
    "text": "Everything has beauty, but not everyone can see.",
    "author": "Confucius"
  },
  {
    "text": "Even Kings and emperors with heaps of wealth and vast dominion cannot compare with an ant filled with the love of God.",
    "author": "Guru Nanak"
  },
  {
    "text": "They may kill me, but they cannot kill my ideas.",
    "author": "Bhagat Singh"
  },
  {
    "text": "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    "author": "Maya Angelou"
  },
  {
    "text": "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",
    "author": "Marie Curie"
  },
  {
    "text": "A man is great by deeds, not by birth.",
    "author": "Chanakya"
  },
  {
    "text": "Laugh at yourself first, before anyone else can.",
    "author": "P.L. Deshpande"
  },
  {
    "text": "It does not matter how slowly you go as long as you do not stop.",
    "author": "Confucius"
  },
  {
    "text": "Self-belief and hard work will always earn you success.",
    "author": "Virat Kohli"
  },
  {
    "text": "If you are going through hell, keep going.",
    "author": "Winston Churchill"
  },
  {
    "text": "The mind is everything. What you think you become.",
    "author": "Buddha"
  },
  {
    "text": "If the wind will not serve, take to the oars.",
    "author": "Latin Proverb"
  },
  {
    "text": "It is not death that a man should fear, but he should fear never beginning to live.",
    "author": "Marcus Aurelius"
  },
  {
    "text": "I believe in one power, and that is the hand of God.",
    "author": "Lata Mangeshkar"
  },
  {
    "text": "I am not a person who will be crushed.",
    "author": "Bal Thackeray"
  },
  {
    "text": "I don't want to be a great leader; I want to be a man who goes around with a little oil can.",
    "author": "Baba Amte"
  },
  {
    "text": "Whether you think you can or you think you can't, you're right.",
    "author": "Henry Ford"
  },
  {
    "text": "Yoga does not just change the way we see things, it transforms the person who sees.",
    "author": "B. K. S. Iyengar"
  },
  {
    "text": "Truth is a pathless land.",
    "author": "J. Krishnamurti"
  },
  {
    "text": "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
    "author": "Aristotle"
  },
  {
    "text": "I am not a product of my circumstances. I am a product of my decisions.",
    "author": "Stephen Covey"
  },
  {
    "text": "Definiteness of purpose is the starting point of all achievement.",
    "author": "W. Clement Stone"
  },
  {
    "text": "People often say that motivation doesn't last. Well, neither does bathing.",
    "author": "Zig Ziglar"
  },
  {
    "text": "You can't fall if you don't climb. But there's no joy in living your whole life on the ground.",
    "author": "Unknown"
  },
  {
    "text": "Wherever you are is the entry point.",
    "author": "Kabir"
  },
  {
    "text": "It is not my country's duty to push me ahead. It is my duty to push my country ahead.",
    "author": "Dhyan Chand"
  },
  {
    "text": "In order to succeed, your desire for success should be greater than your fear of failure.",
    "author": "Bill Cosby"
  },
  {
    "text": "Jai Jagat (Victory to the World).",
    "author": "Vinoba Bhave"
  },
  {
    "text": "Not all of us can do great things. But we can do small things with great love.",
    "author": "Mother Teresa"
  },
  {
    "text": "I have been impressed with the urgency of doing. Knowing is not enough; we must apply.",
    "author": "Leonardo da Vinci"
  },
  {
    "text": "The future depends on what you do today.",
    "author": "Mahatma Gandhi"
  },
  {
    "text": "I have not failed. I've just found 10,000 ways that won't work.",
    "author": "Thomas A. Edison"
  },
  {
    "text": "Service to the people is service to God.",
    "author": "Anand Dighe"
  },
  {
    "text": "I don't believe in taking right decisions. I take decisions and then make them right.",
    "author": "Ratan Tata"
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WORDS, QUOTES };
} else {
    window.WORDS = WORDS;
    window.QUOTES = QUOTES;
}
