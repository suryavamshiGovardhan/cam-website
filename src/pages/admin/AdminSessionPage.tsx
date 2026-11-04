import { Link } from "react-router-dom";
import AdminPassGate from "./AdminPassGate";
import { Deck } from "./AdminDeckPage";
import type { Slide } from "./slides";

const K = ({ children }: { children: React.ReactNode }) => <p className="cam-kicker">{children}</p>;
const H = ({ children }: { children: React.ReactNode }) => (
  <h1 className="cam-serif mt-4 text-[clamp(32px,6vw,60px)] leading-[1.05]">{children}</h1>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="cam-muted mt-5 max-w-2xl text-lg font-semibold leading-relaxed">{children}</p>
);
const Foot = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-auto pt-6 text-[11px] font-semibold opacity-80" style={{ color: "#3F6B68" }}>{children}</p>
);
const Tiles = ({ items }: { items: [string, string][] }) => (
  <div className="mt-6 grid gap-3 sm:grid-cols-2">
    {items.map(([a, b]) => (
      <div key={a} className="cam-tile p-4">
        <p className="cam-serif text-lg">{a}</p>
        <p className="cam-muted mt-1 text-sm leading-relaxed">{b}</p>
      </div>
    ))}
  </div>
);

function deep(id: string, name: string, day: string, subjects: string, wayIn: string, notes: string): Slide {
  return {
    id,
    title: name,
    body: (
      <>
        <K>Career deep-dive</K>
        <H>{name}</H>
        <Tiles items={[["What they do all day", day], ["Linked subjects", subjects], ["One way in", wayIn]]} />
      </>
    ),
    notes,
  };
}

const S: Slide[] = [
  {
    id: "warmup",
    title: "Warm-up",
    body: (
      <>
        <K>Warm-up · 2 minutes</K>
        <H>Write every job you know.</H>
        <P>Paper. Pen. No phones. Go!</P>
        <p className="cam-serif mt-8 text-2xl" style={{ color: "var(--cam-coral)" }}>Count them. Keep the paper.</p>
      </>
    ),
    notes:
      "Hi everyone! Before I even tell you my name, let's play. Take out a paper and a pen. You have two minutes. Write down every job you know. Any job at all. No phones, no copying. Ready? Go!\n\n(After 2 minutes) Stop! Now count how many you wrote. Write that number at the top and circle it. Keep this paper safe. We'll come back to it at the very end.",
  },
  {
    id: "founder",
    title: "Founder story",
    body: (
      <>
        <K>Who am I?</K>
        <H>I'm Surya. I still don't know what I want to be either.</H>
        <P>That's why I started CAM — to explore with you, not to lecture you.</P>
      </>
    ),
    notes:
      "My name is Surya. I'm a student too, not much older than you. And here's the honest truth: I still don't know exactly what I want to be. Nobody gave me a full list of options either. So I started CAM, the Career Advisory Movement, to go looking. Today I'm not here to tell you what to become. I'm here to explore with you. Deal?",
  },
  {
    id: "gap",
    title: "The Knowing Gap",
    body: (
      <>
        <K>The Knowing Gap</K>
        <H>You can't choose what you've never heard of.</H>
        <P>About 1 in 5 rural 14–18 year olds couldn't name any job they want.</P>
        <Foot>Source: ASER 2023 “Beyond Basics”, ASER Centre (asercentre.org) — survey of 34,745 rural youth aged 14–18.</Foot>
      </>
    ),
    notes:
      "Think about a menu at a restaurant. If the menu has only five dishes, you can only order one of those five, right? Careers are the same. You can't choose a job you've never heard of. A big survey in 2023 called ASER asked young people aged 14 to 18 in villages across India what job they want. About one in five couldn't name any job at all. That's not because they're not smart. It's because nobody showed them the menu. We call this the Knowing Gap. Today, let's make your menu bigger.",
  },
  {
    id: "conv",
    title: "Conventional vs unconventional",
    body: (
      <>
        <K>Same world, bigger menu</K>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 p-5" style={{ borderColor: "var(--cam-ink)", background: "#ECE7DB" }}>
            <p className="cam-kicker">What we usually hear</p>
            <p className="cam-serif mt-3 text-xl leading-snug">Doctor · Engineer · CA · Teacher · Police · Lawyer</p>
          </div>
          <div className="rounded-2xl border-2 p-5" style={{ borderColor: "var(--cam-ink)", background: "var(--cam-mint)" }}>
            <p className="cam-kicker">Also real jobs</p>
            <p className="cam-serif mt-3 text-lg leading-snug">
              Biotech lab technician · UX designer · Game tester · Sports physiotherapist · Forensic scientist · Urban planner · Food technologist · Wildlife photographer · Data journalist · Audiologist
            </p>
          </div>
        </div>
        <P>The left side is great. The right side exists too.</P>
      </>
    ),
    notes:
      "On the left are the jobs we hear about at every family function. Doctor, engineer, CA, teacher, police, lawyer. These are good jobs! Nothing wrong with them. But look at the right side. Biotech lab technician. UX designer. Game tester. Sports physio. Forensic scientist. Urban planner. These are real jobs that real people do every single day. Hands up if you'd heard of at least three of these. Okay! Let's go deeper into a few.",
  },
  deep(
    "biotech",
    "Biotech lab technician",
    "Runs experiments, prepares samples, operates lab machines and records results carefully. Hyderabad's Genome Valley is a cluster of life-science companies where this work happens.",
    "Biology, chemistry, maths for measurements.",
    "Science stream, then a degree or diploma in biotechnology, microbiology or lab technology.",
    "First up: biotech lab technician. Right here in Hyderabad we have Genome Valley, which is full of life-science companies. People in labs there test samples, run machines and write down results really carefully, because one mistake can change a whole experiment. If you love biology and chemistry, and you're the kind of person who likes doing things step by step, this could be interesting. One way in: take science, then study biotechnology, microbiology or lab technology.",
  ),
  deep(
    "ux",
    "UX designer",
    "Studies how people use apps and websites, sketches screens, tests them with real users and fixes what's confusing.",
    "Art and drawing, psychology, computers, English for clear writing.",
    "Any stream. Build a portfolio of app redesigns; design or HCI courses help.",
    "Next: UX designer. UX means user experience. Every app on your phone — someone decided where each button goes. A UX designer watches how people use an app, sees where they get confused, sketches a better version and tests it again. You don't have to be a coding genius. If you like drawing, noticing things, and understanding people, this is for you. One way in: start redesigning apps you use on paper, and build a portfolio. Any stream works.",
  ),
  deep(
    "game-tester",
    "Game tester (QA)",
    "Plays builds of games again and again, tries to break them, and writes clear bug reports so developers can fix them.",
    "English for writing reports, computers, logical thinking.",
    "Start with careful bug-spotting; software testing courses can lead to QA roles.",
    "Game tester. Yes, it's real. But here's the honest part — it's not just playing for fun. You play the same level fifty times, trying to make it crash, and then you write exactly what went wrong so the developers can fix it. If you're patient, detail-loving, and good at explaining, this can be a start into the games industry. One way in: learn the basics of software testing.",
  ),
  deep(
    "sports-physio",
    "Sports physiotherapist",
    "Helps athletes recover from injuries, plans exercises, and works to prevent new injuries.",
    "Biology, physical education.",
    "Science stream, then a Bachelor of Physiotherapy (BPT) and sports specialisation.",
    "Sports physiotherapist. If you love sports but you're not going to be the next cricket star, this is a way to stay close to the game. Physios help players recover from injuries and plan exercises so they don't get hurt again. You need biology and a love of movement. One way in: science stream, then a Bachelor of Physiotherapy.",
  ),
  deep(
    "forensic",
    "Forensic scientist",
    "Examines evidence like fingerprints, fibres or chemicals in a lab and writes reports used in investigations.",
    "Chemistry, biology, physics, careful writing.",
    "Science stream, then a degree in forensic science.",
    "Forensic scientist. You've seen crime shows, right? Real forensic work is slower and more careful than TV. It's a lot of lab work — checking evidence and writing very precise reports that might be used in court. If you like chemistry and solving puzzles, it's worth exploring. One way in: science stream, then a forensic science degree.",
  ),
  deep(
    "urban",
    "Urban planner",
    "Plans how a city grows — roads, parks, housing, water — using maps, data and talking to residents.",
    "Geography, maths, social studies.",
    "Architecture, civil engineering or geography, then planning studies.",
    "Last deep-dive: urban planner. Look at Hyderabad's traffic, the metro, the new flyovers. Somebody planned those. Urban planners use maps, data and conversations with people to decide how a city should grow. If you like geography and you have opinions about your city, this is a real job. One way in: architecture, civil engineering or geography, then planning. And quickly — food technologists, wildlife photographers, data journalists and audiologists are all real jobs too. Look them up later!",
  ),
  {
    id: "interests",
    title: "Interests to careers",
    body: (
      <>
        <K>Start with what you like</K>
        <H>Your interest is a clue.</H>
        <Tiles
          items={[
            ["Drawing", "UX designer · illustrator · architect · animator"],
            ["Explaining", "Teacher · data journalist · trainer · science communicator"],
            ["Fixing", "Engineer · technician · game tester · mechanic"],
            ["Numbers", "Data analyst · CA · urban planner · sports analyst"],
            ["Helping people", "Doctor · audiologist · physio · counsellor"],
          ]}
        />
      </>
    ),
    notes:
      "Here's a trick. Don't start with 'what job should I do'. Start with 'what do I like doing'. Do you like drawing? That can lead to UX design, illustration, architecture, animation. Like explaining things to friends? Teaching, data journalism, training. Like fixing stuff? Engineering, technician work, testing. Love numbers? Data analysis, CA, urban planning, even sports analytics. Like helping people? Doctor, audiologist, physio, counsellor. Your interest is a clue, not a final answer.",
  },
  {
    id: "myths",
    title: "Myth vs reality",
    body: (
      <>
        <K>Myth vs reality</K>
        <Tiles
          items={[
            ["Myth: Only science pays.", "Reality: Every stream leads to many paths. Pay depends on skill and the specific job."],
            ["Myth: Arts means no job.", "Reality: Design, law, journalism, psychology and more grow from arts."],
            ["Myth: Decide now or it's too late.", "Reality: Many people switch paths. Exploring now is the smart move."],
            ["Myth: Unusual jobs aren't real.", "Reality: If people are paid to do it, it's real."],
          ]}
        />
      </>
    ),
    notes:
      "Let's bust some myths. Myth one: only science pays. Not true. Every stream opens many doors, and pay depends on your skills and the specific job, not only your stream. Myth two: arts means no job. Design, law, journalism and psychology are all reachable through arts. Myth three: you must decide everything right now. Lots of adults switch careers. Exploring early is actually the smart move. Myth four: unusual jobs aren't real. If someone is paid to do it, it's real.",
  },
  {
    id: "game",
    title: "Guess the Job",
    body: (
      <>
        <K>Game time · teams</K>
        <H>Guess the Job.</H>
        <P>Split into teams. Read the clue. Agree on one answer. Points for each right guess.</P>
        <Link to="/play" target="_blank" rel="noopener noreferrer" className="cam-btn cam-btn-sun mt-8 inline-flex">
          Open /play
        </Link>
      </>
    ),
    notes:
      "Game time! Make teams of four or five. I'll put a clue on the screen. Talk with your team for thirty seconds, then shout one answer. If your team is right, you get a point. Wrong answers are totally fine — they're still useful, because you'll learn a new job either way. Ready? Let's play. (Open the Play page and run rounds.)",
  },
  {
    id: "reflect",
    title: "Reflection",
    body: (
      <>
        <K>Your turn · 3 minutes</K>
        <H>Write down two things.</H>
        <Tiles items={[["1. One new career", "One job from today you didn't know before."], ["2. One person to ask", "Someone who might know about it — a relative, teacher, neighbour."]]} />
      </>
    ),
    notes:
      "On the back of your paper, write two things. One: a new career you heard about today that you didn't know before. Two: one person you could ask about it. Maybe an uncle, a teacher, a neighbour, a senior. You don't have to love the job. Just be curious enough to ask one question this week.",
  },
  {
    id: "repeat",
    title: "Repeat the warm-up",
    body: (
      <>
        <K>The proof · 2 minutes</K>
        <H>Write every job you know. Again.</H>
        <P>Count. Compare with your first number.</P>
        <p className="cam-serif mt-8 text-2xl" style={{ color: "var(--cam-coral)" }}>Did your number go up?</p>
      </>
    ),
    notes:
      "Remember that first number you circled? Let's do it again. Two minutes. Write every job you know now. Go! (After 2 minutes) Count them. Compare with your first number. Hands up if your number went up. That's it — that's the whole point. Your menu just got bigger in under an hour.",
  },
  {
    id: "close",
    title: "Close",
    body: (
      <>
        <K>Keep exploring</K>
        <H>Exposure is all you need.</H>
        <div className="mt-8 space-y-3 text-lg font-extrabold">
          <p>Site: suryavamshigovardhan.github.io/cam-website</p>
          <p>Instagram: @cam.voyce</p>
        </div>
        <Foot>CAM is an exposure and reading project. It does not give personal career, admissions or psychological advice. Talk to your school counsellor, teachers and family before big decisions.</Foot>
      </>
    ),
    notes:
      "Thank you so much. You were amazing. If you want to keep exploring, go to the CAM website — there's a job atlas with more than two thousand careers, the guessing game, and a thirty-day challenge. Follow @cam.voyce on Instagram for a new career every day. One important thing: CAM doesn't give personal career advice. For big decisions, please talk to your school counsellor, your teachers and your family. My only job today was to make your menu bigger. Keep looking!",
  },
];

export default function AdminSessionPage() {
  return (
    <AdminPassGate>
      <Deck
        slides={S}
        label="CAM · student session"
        sub="Classes 8–10 · 40–60 min · press N for script"
        extra={
          <a href="/cam-website/admin" className="cam-btn cam-btn-ghost" style={{ minHeight: 40, padding: "8px 14px" }}>
            ← Pitch deck
          </a>
        }
      />
    </AdminPassGate>
  );
}
