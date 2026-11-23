import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, BrainCircuit, CheckCircle2, GraduationCap, Mail, Microscope, ShieldCheck, Wrench } from "lucide-react";
import CamShell from "@/components/cam/CamShell";
import { cam } from "@/data/cam";

const programmes = [
  {
    number: "01", name: "CAM", full: "Career Advisory Movement", grades: "Classes 8–12",
    line: "A wider map before a big decision.",
    detail: "Career awareness, exposure to real professions, guided reflection and informed exploration. CAM widens students' options; it does not choose a career for them.",
    outcomes: ["Discover professions beyond familiar choices", "Understand what different professionals actually do", "Reflect on interests, strengths and next steps"],
    Icon: GraduationCap, tone: "#BFE8DC", link: "/about",
  },
  {
    number: "02", name: "AI for Schools", full: "Artificial intelligence literacy", grades: "Suggested: Classes 5–10",
    line: "Understand AI. Question its answers. Use it responsibly.",
    detail: "A student-friendly introduction to AI concepts, everyday applications, prompting, verification, privacy and human judgement—with offline discussion options.",
    outcomes: ["Explain AI in plain language", "Write clearer prompts and check outputs", "Recognise errors, bias and privacy risks"],
    Icon: BrainCircuit, tone: "#FFC94A", link: "/ai-for-schools",
  },
  {
    number: "03", name: "Robotics & Coding", full: "Computational thinking and making", grades: "Suggested: Classes 5–10",
    line: "Move from consuming technology to building with it.",
    detail: "A practical pathway through logic, beginner coding, electronics, sensors, motors and age-appropriate robotics projects. Equipment needs are agreed with each school before a pilot.",
    outcomes: ["Break a problem into logical steps", "Understand simple inputs, outputs and code", "Plan, build and test a small prototype"],
    Icon: Bot, tone: "#FFDDD4", link: "/ai-for-schools",
  },
];

export default function ForSchoolsPage() {
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [grades, setGrades] = useState("");
  const [programme, setProgramme] = useState("I'd like to discuss all three");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`School programme enquiry — ${school || "New school"}`);
    const body = encodeURIComponent([
      "Hello, I'd like to discuss a school programme / demonstration.",
      "", `School: ${school}`, `Location: ${location}`, `Contact person / phone: ${contact}`,
      `Classes / grades: ${grades}`, `Programme: ${programme}`, `Additional note: ${message || "Not provided"}`,
    ].join("\n"));
    window.location.href = `mailto:${cam.meta.email}?subject=${subject}&body=${body}`;
  };

  return (
    <CamShell title="For Schools — CAM, AI Literacy, Robotics & Coding" description="Explore separate school programmes for career awareness, AI literacy, robotics and coding. Start with a conversation or a practical demonstration." canonical="/for-schools">
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="cam-kicker">CAM / SCHOOL PARTNERSHIPS</p>
            <h1 className="cam-serif mt-5 text-[clamp(44px,7vw,82px)] leading-[.96]">Give students a wider world to <em>explore.</em></h1>
            <p className="cam-muted mt-6 max-w-2xl text-lg leading-relaxed">Three distinct learning programmes. One practical starting point: understand your students, your school's context and what can be delivered well.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#school-enquiry" className="cam-btn cam-btn-sun">Discuss a school pilot <ArrowRight className="h-4 w-4"/></a>
              <a href="#programmes" className="cam-btn cam-btn-ghost">Explore programmes</a>
            </div>
          </div>
          <div className="cam-band p-6 sm:p-8">
            <p className="cam-kicker" style={{color:"#BFE8DC"}}>THE PRINCIPLE</p>
            <p className="cam-serif mt-4 text-3xl leading-tight" style={{color:"#FFF6E9"}}>Keep the foundations. Add the experiences students may not get from a textbook alone.</p>
            <p className="mt-4 text-sm leading-relaxed" style={{color:"#BFE8DC"}}>Academic learning matters. So do curiosity, practical understanding, responsible technology use and exposure to the world beyond the classroom.</p>
          </div>
        </div>
      </section>

      <section id="programmes" className="border-y-2 py-14 sm:py-20" style={{borderColor:"var(--cam-ink)",background:"#F4EBDD"}}>
        <div className="mx-auto max-w-6xl px-5">
          <p className="cam-kicker">Three separate offerings</p>
          <h2 className="cam-serif mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">Choose the programme that fits your students.</h2>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {programmes.map(({number,name,full,grades,line,detail,outcomes,Icon,tone,link}) => (
              <article key={name} className="cam-card flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between"><span className="cam-kicker">PROGRAMME {number}</span><span className="flex h-12 w-12 items-center justify-center rounded-full border-2" style={{background:tone,borderColor:"var(--cam-ink)"}}><Icon className="h-6 w-6"/></span></div>
                <p className="cam-kicker mt-6">{grades}</p>
                <h3 className="cam-serif mt-2 text-3xl leading-tight">{name}</h3>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-wide" style={{color:"var(--cam-coral)"}}>{full}</p>
                <p className="cam-serif mt-5 text-xl leading-snug">{line}</p>
                <p className="cam-muted mt-3 text-sm leading-relaxed">{detail}</p>
                <ul className="mt-5 flex-1 space-y-3">
                  {outcomes.map(item => <li key={item} className="flex gap-2 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{color:"var(--cam-teal)"}}/>{item}</li>)}
                </ul>
                <Link to={link} className="cam-btn cam-btn-ghost mt-7 w-full justify-center">Explore programme <ArrowRight className="h-4 w-4"/></Link>
              </article>
            ))}
          </div>
          <p className="cam-muted mt-5 text-xs leading-relaxed">Grade ranges are starting recommendations, not fixed eligibility rules. Final scope, lesson count, equipment and schedule are agreed with the school after a readiness discussion.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="cam-kicker">A sensible first step</p>
            <h2 className="cam-serif mt-3 text-4xl leading-tight sm:text-5xl">Start small. Learn from the classroom. Then scale.</h2>
            <p className="cam-muted mt-5 max-w-xl leading-relaxed">We recommend beginning with a short demonstration or pilot for one selected grade. It gives school leaders, teachers and students a chance to assess the teaching approach before discussing a longer programme.</p>
            <ol className="mt-8 space-y-5">
              {[
                ["01","Understand the school","Discuss grades, timetable, class size, language, devices and internet access."],
                ["02","Agree a focused pilot","Choose one programme, a student group, a realistic schedule and clear learning goals."],
                ["03","Teach and observe","Run the sessions, collect student work and invite teacher feedback."],
                ["04","Review evidence together","Look at participation, student understanding and practical constraints before deciding what comes next."],
              ].map(([n,title,body]) => <li key={n} className="flex gap-4"><span className="cam-mono flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{background:"var(--cam-sun)",border:"2px solid var(--cam-ink)"}}>{n}</span><div><h3 className="cam-serif text-xl">{title}</h3><p className="cam-muted mt-1 text-sm leading-relaxed">{body}</p></div></li>)}
            </ol>
          </div>
          <div className="space-y-4">
            <div className="cam-card p-6 sm:p-8">
              <p className="cam-kicker">Designed for real school conditions</p>
              <h3 className="cam-serif mt-3 text-2xl">Rural-ready does not mean lower ambition.</h3>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0" style={{color:"var(--cam-teal)"}}/><p className="text-sm leading-relaxed"><strong>Offline-aware delivery.</strong> Core explanations and activities can be conducted without live internet; connected demonstrations are optional.</p></div>
                <div className="flex gap-3"><Wrench className="h-5 w-5 shrink-0" style={{color:"var(--cam-teal)"}}/><p className="text-sm leading-relaxed"><strong>Equipment agreed in advance.</strong> We identify what the school has and what a programme would require before promising hands-on builds.</p></div>
                <div className="flex gap-3"><Microscope className="h-5 w-5 shrink-0" style={{color:"var(--cam-teal)"}}/><p className="text-sm leading-relaxed"><strong>Local problems, real examples.</strong> Use familiar contexts such as water, farming, transport, health awareness and school facilities.</p></div>
                <div className="flex gap-3"><GraduationCap className="h-5 w-5 shrink-0" style={{color:"var(--cam-teal)"}}/><p className="text-sm leading-relaxed"><strong>Teacher coordination.</strong> Align the lesson plan with the school's timetable, age group and language needs.</p></div>
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{background:"var(--cam-sun)",border:"2px solid var(--cam-ink)",boxShadow:"4px 4px 0 var(--cam-ink)"}}>
              <p className="cam-kicker">What we will not promise</p>
              <p className="cam-serif mt-2 text-2xl">No magic outcomes. No inflated claims.</p>
              <p className="mt-2 text-sm leading-relaxed">We will agree scope, costs, equipment, safeguarding responsibilities and measurable learning goals before a programme begins. Results should be demonstrated, not assumed.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="school-enquiry" className="border-y-2 py-14 sm:py-20" style={{background:"#0F3D3E",borderColor:"#0F3D3E",color:"#FFF6E9"}}>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="cam-kicker" style={{color:"#FFC94A"}}>Talk to the team</p>
            <h2 className="cam-serif mt-3 text-4xl leading-tight sm:text-5xl">Let's understand your school before we propose a programme.</h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed" style={{color:"#BFE8DC"}}>Share a few details. Your email app will open with a prepared enquiry addressed to the team; nothing is submitted or stored by this website.</p>
            <div className="mt-7 flex items-center gap-3 text-sm font-semibold"><Mail className="h-5 w-5" style={{color:"#FFC94A"}}/><a className="underline" href={`mailto:${cam.meta.email}`}>{cam.meta.email}</a></div>
          </div>
          <form onSubmit={submit} className="rounded-2xl p-5 sm:p-7" style={{background:"#FFF6E9",color:"#0F3D3E"}}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-extrabold uppercase tracking-wide">School name<input required value={school} onChange={e=>setSchool(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border-2 px-3 text-base font-medium normal-case" style={{borderColor:"#0F3D3E"}} placeholder="Your school"/></label>
              <label className="text-xs font-extrabold uppercase tracking-wide">Village / town<input required value={location} onChange={e=>setLocation(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border-2 px-3 text-base font-medium normal-case" style={{borderColor:"#0F3D3E"}} placeholder="Location, district"/></label>
              <label className="text-xs font-extrabold uppercase tracking-wide">Contact person / phone<input required value={contact} onChange={e=>setContact(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border-2 px-3 text-base font-medium normal-case" style={{borderColor:"#0F3D3E"}} placeholder="Name and phone"/></label>
              <label className="text-xs font-extrabold uppercase tracking-wide">Classes interested<input value={grades} onChange={e=>setGrades(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border-2 px-3 text-base font-medium normal-case" style={{borderColor:"#0F3D3E"}} placeholder="e.g. Classes 6–8"/></label>
            </div>
            <label className="mt-4 block text-xs font-extrabold uppercase tracking-wide">Programme<select value={programme} onChange={e=>setProgramme(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border-2 px-3 text-base font-medium normal-case" style={{borderColor:"#0F3D3E"}}><option>I'd like to discuss all three</option><option>CAM — Career Advisory Movement</option><option>AI for Schools</option><option>Robotics & Coding</option></select></label>
            <label className="mt-4 block text-xs font-extrabold uppercase tracking-wide">Anything else? <span className="font-medium normal-case">(optional)</span><textarea value={message} onChange={e=>setMessage(e.target.value)} rows={3} className="mt-2 w-full rounded-xl border-2 p-3 text-base font-medium normal-case" style={{borderColor:"#0F3D3E"}} placeholder="Timings, class size, language or questions"/></label>
            <button type="submit" className="cam-btn cam-btn-sun mt-5 w-full justify-center">Prepare school enquiry <ArrowRight className="h-4 w-4"/></button>
            <p className="mt-3 text-xs leading-relaxed" style={{color:"#526B67"}}>By opening your email app, you choose whether to send the enquiry. Please do not include sensitive student information.</p>
          </form>
        </div>
      </section>
    </CamShell>
  );
}
