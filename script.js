/* ===== DATA ===== */
const ORDER = ["A", "B", "C", "D", "E"];

const PEOPLE = {
  A: { name: "Ayam Geprek Sambal Bawang", title: "The Bold & Unfiltered One", img: "assets/images/sambal-bawang.png",
       c: { primary: "#8F211E", secondary: "#C43D32", accent: "#E8754E", highlight: "#F4B183", bg: "#F8E5CB" } },
  B: { name: "Ayam Geprek Keju Mozzarella", title: "The Sweet & Comforting One", img: "assets/images/mozzarella.png",
       c: { primary: "#8D5B32", secondary: "#C18B38", accent: "#E6B95F", highlight: "#F5DFA4", bg: "#FFF3D9" } },
  C: { name: "Ayam Geprek Sambal Matah", title: "The Trendsetter", img: "assets/images/sambal-matah.png",
       c: { primary: "#245C50", secondary: "#388B72", accent: "#8DBB8A", highlight: "#F0C66B", bg: "#FFF0D5" } },
  D: { name: "Ayam Geprek Sambal Ijo", title: "The Chill & Lowkey One", img: "assets/images/sambal-ijo.png",
       c: { primary: "#354A2D", secondary: "#607B45", accent: "#9BAF75", highlight: "#D2C99B", bg: "#F1EBD8" } },
  E: { name: "Ayam Geprek Bakar", title: "The Mysterious Charmer", img: "assets/images/ayam-bakar.png",
       c: { primary: "#42271F", secondary: "#70402D", accent: "#A65F38", highlight: "#C58B5B", bg: "#E9D3B5" } }
};
const DEFAULT_THEME = { 
  primary: "#2B3A55", 
  secondary: "#4F6D8F", 
  accent: "#7F9BBF", 
  highlight: "#CBD5E1", 
  bg: "#ECEFF3" };

const QUESTIONS = [
  { q: "You’re assigned to a group project. What’s your role?", o: [
    "I naturally take charge and make sure everyone knows what to do.",
    "I make sure everyone feels included and nobody gets left behind.",
    "I bring creative ideas, even if they’re a little unconventional.",
    "I quietly observe, organize things, and do my part.",
    "I create a strategy and make sure everything goes according to plan."] },
  { q: "Your friends suddenly cancel your weekend plans. What do you do?", o: [
    "No problem. I’ll enjoy my own company.",
    "I’ll find something spontaneous and exciting to do instead.",
    "Finally, some time to focus on myself and my goals.",
    "Honestly? I’ll tell them how disappointed I am.",
    "I’ll check if they’re okay and suggest another time."] },
  { q: "You suddenly have a whole day with no responsibilities. What’s your ideal plan?", o: [
    "Spend quality time with people I love, probably with good food.",
    "Work on something I’ve been planning for a while.",
    "Stay home, recharge, and enjoy some peace and quiet.",
    "Explore somewhere new and see where the day takes me.",
    "Do whatever I feel like. No schedule, no restrictions."] },
  { q: "There’s a misunderstanding between you and your friend. How do you handle it?", o: [
    "Try to lighten the mood and find a different perspective.",
    "Address it directly. I’d rather clear things up immediately.",
    "Make sure we understand each other’s feelings first.",
    "Take some time to think before deciding what to say.",
    "Listen carefully, analyze what happened, and respond when I’m ready."] },
  { q: "What’s your usual role in a group chat?", o: [
    "The one who replies when there’s something important to discuss.",
    "The silent reader who somehow knows everything.",
    "The one who says what everyone else is thinking.",
    "The one who sends random appreciation messages and checks on everyone.",
    "The meme dealer who keeps the conversation alive."] },
  { q: "You have an important deadline tomorrow, but you’re nowhere near finished. What’s your move?", o: [
    "Panic for five minutes, then get everything done as fast as possible.",
    "Find a creative shortcut and improvise along the way.",
    "Stay calm, work steadily, and focus on what’s necessary.",
    "Make a priority list and execute the plan.",
    "Ask for help, coordinate with others, and get through it together."] },
  { q: "If you could have one superpower, what would you choose?", o: [
    "The ability to make anyone feel better instantly.",
    "The ability to detect lies and know when someone’s being fake.",
    "The ability to see the future and prepare for anything.",
    "The ability to adapt to any situation effortlessly.",
    "The ability to become invisible whenever you want."] }
];

/* Option 1..5 of each question -> personality that gets the point (exact table from the brief) */
const MAP = [
  ["A", "B", "C", "D", "E"], // Q1
  ["D", "C", "E", "A", "B"], // Q2
  ["B", "E", "D", "C", "A"], // Q3
  ["C", "A", "B", "E", "D"], // Q4
  ["E", "D", "A", "B", "C"], // Q5
  ["A", "C", "D", "E", "B"], // Q6
  ["B", "A", "E", "C", "D"]  // Q7
];

/* Keys are always in A-E order. Each entry holds the question and one option per personality. */
const TIE = {
  AB: { q: "When life gets tough, what do you need most?", A: "Someone who tells me the truth, no matter how harsh.", B: "Someone who reminds me that everything will be okay." },
  AC: { q: "Your motto in life?", A: "Say it straight, no sugarcoating.", C: "Keep exploring, never settle for ordinary." },
  AD: { q: "Someone annoys you. What’s your reaction?", A: "I’ll let them know immediately.", D: "I’ll just mind my business." },
  AE: { q: "How do you handle a challenge?", A: "Face it head-on, no hesitation.", E: "Think strategically before making a move." },
  BC: { q: "Your ideal weekend?", B: "Cozy day with my favorite people.", C: "Spontaneous adventure somewhere new." },
  BD: { q: "At a party, where can we find you?", B: "Surrounded by friends, chatting and laughing.", D: "Somewhere quiet, enjoying the atmosphere." },
  BE: { q: "What’s your biggest priority?", B: "Maintaining meaningful connections.", E: "Building my own future and independence." },
  CD: { q: "Your comfort zone?", C: "Trying something I’ve never done before.", D: "Staying somewhere familiar and peaceful." },
  CE: { q: "How would you describe yourself?", C: "An open book full of surprises.", E: "A mystery people slowly discover." },
  DE: { q: "When making an important decision, you…", D: "Trust my instincts and take things slowly.", E: "Analyze every possibility before deciding." }
};

/* ===== LOGIC (no DOM) ===== */
function tally(answers) {
  const s = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  answers.forEach((choice, i) => { s[MAP[i][choice]]++; });
  return s;
}
function leaders(scores) {
  const top = Math.max(...ORDER.map(k => scores[k]));
  return ORDER.filter(k => scores[k] === top);
}
function pairKey(a, b) {
  return ORDER.indexOf(a) < ORDER.indexOf(b) ? a + b : b + a;
}
/* Resolve a whole quiz with a function that picks the winner of each tie-breaker (used for tests) */
function resolve(answers, pick) {
  let tied = leaders(tally(answers));
  let champ = tied[0];
  for (const challenger of tied.slice(1)) champ = pick(champ, challenger, TIE[pairKey(champ, challenger)]);
  return champ;
}

/* ===== UI ===== */
if (typeof document !== "undefined") {
  const $ = id => document.getElementById(id);
  let answers = [], cur = 0, champ = null, queue = [], resultKey = null, toastTimer;

  function show(id) {
    document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === id));
    window.scrollTo(0, 0);
  }
  function theme(c) {
    const r = document.documentElement.style;
    Object.keys(c).forEach(k => r.setProperty("--" + k, c[k]));
  }
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function renderQ() {
    const { q, o } = QUESTIONS[cur];
    $("count").textContent = "Question " + (cur + 1) + " of " + QUESTIONS.length;
    $("bar").style.width = ((cur + 1) / QUESTIONS.length * 100) + "%";
    $("qText").textContent = q;
    $("next").textContent = cur === QUESTIONS.length - 1 ? "See my result" : "Next";
    $("next").disabled = answers[cur] === undefined;
    const box = $("options");
    box.innerHTML = "";
    o.forEach((text, i) => {
      const b = document.createElement("button");
      b.className = "opt" + (answers[cur] === i ? " sel" : "");
      b.textContent = text;
      b.setAttribute("aria-pressed", answers[cur] === i);
      b.onclick = () => {
        answers[cur] = i;
        [...box.children].forEach((x, j) => { x.classList.toggle("sel", j === i); x.setAttribute("aria-pressed", j === i); });
        $("next").disabled = false;
      };
      box.appendChild(b);
    });
    const card = $("qCard");
    card.classList.remove("swap");
    void card.offsetWidth;
    card.classList.add("swap");
  }

  function nextTie() {
    if (!queue.length) return showResult(champ);
    const challenger = queue.shift();
    const t = TIE[pairKey(champ, challenger)];
    $("tText").textContent = t.q;
    const box = $("tOptions");
    box.innerHTML = "";
    ORDER.filter(k => k === champ || k === challenger).forEach(k => {
      const b = document.createElement("button");
      b.className = "opt";
      b.textContent = t[k];
      b.onclick = () => { champ = k; nextTie(); };
      box.appendChild(b);
    });
    show("tie");
  }

  function finish() {
    const tied = leaders(tally(answers));
    champ = tied[0];
    queue = tied.slice(1);
    nextTie();
  }

  function showResult(key) {
    resultKey = key;
    const p = PEOPLE[key];
    theme(p.c);
    const img = $("posterImg"), ph = $("posterPh"), dl = $("download");
    img.hidden = true; ph.hidden = true; dl.hidden = false;
    img.onerror = () => {
      img.hidden = true; ph.hidden = false; dl.hidden = true;
      ph.textContent = "Poster placeholder. Put your poster at " + p.img;
    };
    img.onload = () => { img.hidden = false; ph.hidden = true; };
    img.alt = p.name + " personality poster";
    img.src = p.img;
    dl.href = p.img;
    dl.setAttribute("download", p.img.split("/").pop());
    show("result");
  }

  function restart() {
    answers = []; cur = 0; champ = null; queue = []; resultKey = null;
    theme(DEFAULT_THEME);
    show("landing");
  }

  $("startBtn").onclick = () => { answers = []; cur = 0; renderQ(); show("quiz"); };
  $("back").onclick = () => { if (cur > 0) { cur--; renderQ(); } else show("landing"); };
  $("next").onclick = () => { if (answers[cur] === undefined) return; if (cur < QUESTIONS.length - 1) { cur++; renderQ(); } else finish(); };
  $("again").onclick = restart;
  $("share").onclick = async () => {
    const p = PEOPLE[resultKey];
    const text = "I’m " + p.name + ", " + p.title + "! Which ayam geprek are you?";
    const url = location.href;
    if (navigator.share) {
      try { await navigator.share({ title: "What Ayam Geprek Are You?", text, url }); return; }
      catch (e) { if (e.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(text + " " + url); toast("Copied! Paste it anywhere."); }
    catch (e) { toast("Couldn’t copy. Share the page link manually."); }
  };
}

if (typeof module !== "undefined") module.exports = { tally, leaders, pairKey, resolve, TIE, MAP, QUESTIONS, ORDER };
