"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MoreVertical, Pause, Play, RotateCcw, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
const scenes = [
  { image: "01_01_ptm.png", line: "Talk to anyone,", accent: "anywhere", label: "Everyday conversations", alt: "MS Dhoni talking with parents in a classroom" },
  { image: "02_02_sofa.png", line: "Grow every day,", accent: "at your own pace", label: "Learn at your pace", alt: "MS Dhoni relaxing on a sofa with his phone" },
  { image: "03_04_handshake.png", line: "Crack your next", accent: "job interview", label: "Job interviews", alt: "MS Dhoni reaching out for a handshake in an office" },
  { image: "04_05_whiteboard.png", line: "Speak up in", accent: "office meetings", label: "Office meetings", alt: "MS Dhoni presenting at an office whiteboard" },
  { image: "05_03_library.png", line: "Ace your exams", accent: "& college life", label: "College life", alt: "MS Dhoni holding books in a library" },
  { image: "06_06_airport.png", line: "Travel the world", accent: "without fear", label: "Travel conversations", alt: "MS Dhoni with a passport at an airport" },
];
export default function Home() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dialog, setDialogState] = useState<"start" | "signin" | "about">("about");
  const [dialogOpen, setDialogOpen] = useState(false);
  const setDialog = (value: "start" | "signin" | "about" | null) => { if (value) setDialogState(value); setDialogOpen(value !== null); };
  const [goal, setGoal] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const startX = useRef(0);
  const playing = !paused && !reduced && !hidden && !dragging && !dialogOpen && !menuOpen && !focused;
  const go = (index: number) => setActive((index + scenes.length) % scenes.length);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    change(); media.addEventListener("change", change); document.addEventListener("visibilitychange", visibility);
    return () => { media.removeEventListener("change", change); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(i => (i + 1) % scenes.length), 3600);
    return () => window.clearTimeout(timer);
  }, [active, playing]);
  return <main className="onboarding">
    <header className="topbar">
      <img className="wordmark" src="/speakx.svg" alt="SpeakX" width="120" height="32" />
      <div className="header-actions">
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="icon-button" aria-label="More options"><MoreVertical /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="options-menu">
            <DropdownMenuItem onSelect={() => setPaused(v => !v)}>{paused ? <Play /> : <Pause />}{paused ? "Play carousel" : "Pause carousel"}</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => { go(0); setPaused(false); }}><RotateCcw />Replay from the beginning</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDialog("about")}><Info />About SpeakX</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="secondary" className="sign-in" onClick={() => setDialog("signin")}>Sign In</Button>
      </div>
    </header>
    <section className="carousel" aria-roledescription="carousel" aria-label="Find your confidence with SpeakX"
      onFocusCapture={e => { if (e.target.matches(":focus-visible")) setFocused(true); }} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
      <div className={`hero-card ${dragging ? "is-dragging" : ""}`} tabIndex={0} aria-label={`${scenes[active].label}. Slide ${active + 1} of ${scenes.length}. Use left and right arrows to browse.`}
        onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); go(active + (e.key === "ArrowRight" ? 1 : -1)); } }}
        onPointerDown={e => { startX.current = e.clientX; setDragging(true); e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (dragging) setDrag((e.clientX - startX.current) * .18); }}
        onPointerUp={e => { const distance = e.clientX - startX.current; if (Math.abs(distance) > 40) go(active + (distance < 0 ? 1 : -1)); setDragging(false); setDrag(0); }}
        onPointerCancel={() => { setDragging(false); setDrag(0); }}>
        <div className="scenes" style={{ transform: `translateX(${drag}px)` }}>
          {scenes.map((scene, i) => <div key={scene.image} className={`scene ${active === i ? "active" : ""}`} aria-hidden={active !== i}>
            <div className="photo"><img src={`/images/${scene.image}`} alt={scene.alt} draggable={false} fetchPriority={i === 0 ? "high" : "auto"} /></div>
            <div className="photo-shade" />
            <div className="hero-title"><h1>{scene.line}<br /><span>{scene.accent}</span></h1></div>
          </div>)}
        </div>
        <div className="hero-bottom"><p>Feel the change in just <strong>1 week</strong></p><div className="trust"><span className="trust-rule" /><span>Trusted by <strong>1 crore+ learners</strong></span><span className="trust-rule" /></div></div>
        <button className="edge-arrow previous" aria-label="Previous slide" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()} onClick={() => go(active - 1)}><ChevronLeft /></button>
        <button className="edge-arrow next" aria-label="Next slide" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()} onClick={() => go(active + 1)}><ChevronRight /></button>
      </div>
      <div className="carousel-controls">
        <div className="pagination" aria-label="Choose a slide">{scenes.map((s, i) => <button key={s.image} aria-label={`Show ${s.label}`} aria-current={i === active ? "true" : undefined} className={`dot ${i === active ? "selected" : ""}`} onClick={() => go(i)}><span>{i === active && <i key={`${active}-${playing}`} className={playing ? "progress playing" : "progress"} />}</span></button>)}</div>
        {!reduced && <button className="pause-button" aria-label={paused ? "Play carousel" : "Pause carousel"} aria-pressed={paused} onClick={() => { setPaused(v => !v); setFocused(false); }}>{paused ? <Play /> : <Pause />}</button>}
      </div>
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>{scenes[active].line} {scenes[active].accent}. {active + 1} of {scenes.length}.</p>
    </section>
    <footer className="bottom-area"><p>Your next chapter starts with confidence.</p><Button className="primary-cta" onClick={() => { setGoal(null); setStarted(false); setDialog("start"); }}>Get Started <ArrowRight /></Button><span className="footer-note">A little practice. A world of possibilities.</span></footer>
    <Dialog open={dialogOpen} onOpenChange={open => { if (!open) setDialog(null); }}>
      <DialogContent className="onboarding-dialog">
        <img src="/speakx.svg" alt="SpeakX" width="104" height="28" className="dialog-logo" />
        {dialog === "start" ? <>
          <DialogTitle className="dialog-title">{started ? "Your next chapter awaits." : "Where will your confidence take you?"}</DialogTitle>
          <DialogDescription className="dialog-description">{started ? `You chose ${scenes[goal ?? 0].label.toLowerCase()}. This preview ends here — your learning journey is the next step.` : "Choose a place to start. You can always explore more later."}</DialogDescription>
          {!started ? <><div className="goal-options" role="group" aria-label="Choose your learning goal">{scenes.filter((_, i) => i !== 1).map(scene => { const i = scenes.indexOf(scene); return <Button key={scene.label} variant="secondary" className={`goal-option ${goal === i ? "chosen" : ""}`} aria-pressed={goal === i} onClick={() => setGoal(i)}>{scene.label}{goal === i ? <Check /> : <ChevronRight />}</Button>; })}</div><Button className="primary-cta" disabled={goal === null} onClick={() => setStarted(true)}>Continue <ArrowRight /></Button></> : <Button className="primary-cta" onClick={() => { go(goal ?? 0); setDialog(null); }}>Back to exploring <ArrowRight /></Button>}
        </> : dialog === "signin" ? <><DialogTitle className="dialog-title">Welcome back.</DialogTitle><DialogDescription className="dialog-description">This is a preview of the SpeakX welcome screen. Account sign-in will be available when connected to the SpeakX app.</DialogDescription><Button className="primary-cta" onClick={() => setDialog(null)}>Keep exploring <ArrowRight /></Button></> : <><DialogTitle className="dialog-title">Confidence for real life.</DialogTitle><DialogDescription className="dialog-description">Build your English confidence with SpeakX — from everyday conversations to your next big opportunity. Swipe to explore the possibilities.</DialogDescription><Button className="primary-cta" onClick={() => setDialog(null)}>Got it <Check /></Button></>}
      </DialogContent>
    </Dialog>
  </main>;
}
