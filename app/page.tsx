"use client";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MoreVertical, Pause, Play, Mail, CircleHelp, ShieldCheck, Info, Check, Signal, Wifi, BatteryFull, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog as DialogPrimitive, DropdownMenu as DropdownMenuPrimitive, Slider as SliderPrimitive } from "radix-ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContextBackdrop } from "./context-backdrop";
import { SupportContent, type SupportPanel } from "./support-content";

const scenes = [
  { image: "01_01_ptm.png", line: "Speak English", accent: "with confidence.", label: "Everyday conversations", alt: "MS Dhoni talking with parents in a classroom" },
  { image: "friends-family.png", line: "Speak English", accent: "with friends & family.", label: "Friends and family", alt: "MS Dhoni enjoying a conversation with friends and family over tea in a living room" },
  { image: "03_04_handshake.png", line: "Speak English", accent: "in interviews.", label: "Job interviews", alt: "MS Dhoni reaching out for a handshake in an office" },
  { image: "04_05_whiteboard.png", line: "Speak English", accent: "at work.", label: "Office meetings", alt: "MS Dhoni presenting at an office whiteboard" },
  { image: "05_03_library.png", line: "Speak English", accent: "at college.", label: "College life", alt: "MS Dhoni holding books in a library" },
  { image: "06_06_airport.png", line: "Speak English", accent: "anywhere.", label: "Travel conversations", alt: "MS Dhoni with a passport at an airport" },
];
export default function Home() {
  const [variation, setVariation] = useState("context");
  const [phoneScale, setPhoneScale] = useState(.8);
  const [phonePortal, setPhonePortal] = useState<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dialog, setDialogState] = useState<"start" | "signin" | SupportPanel>("about");
  const [dialogOpen, setDialogOpen] = useState(false);
  const setDialog = (value: "start" | "signin" | SupportPanel | null) => { if (value) setDialogState(value); setDialogOpen(value !== null); };
  const [goal, setGoal] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const startX = useRef(0);
  const [slideSeconds, setSlideSeconds] = useState(6);
  const slideDuration = slideSeconds * 1000;
  const playing = !paused && !reduced && !hidden && !dragging && !dialogOpen && !menuOpen && !focused;
  const go = (index: number) => { setActive((index + scenes.length) % scenes.length); setPaused(true); };
  useEffect(() => {
    const resize = () => setPhoneScale(Math.min(1, (window.innerWidth - 32) / 414, Math.max(360, window.innerHeight - (window.innerWidth <= 560 ? 260 : 232)) / 868));
    resize(); window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    change(); media.addEventListener("change", change); document.addEventListener("visibilitychange", visibility);
    return () => { media.removeEventListener("change", change); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(i => (i + 1) % scenes.length), slideDuration);
    return () => window.clearTimeout(timer);
  }, [active, playing, slideDuration]);
  return <Tabs value={variation} onValueChange={setVariation} className="preview-studio">
    <div className="variation-picker">
      <p>Explore the three variations</p>
      <TabsList aria-label="Onboarding variation" className="variation-tabs variation-tabs-three">
        <TabsTrigger value="card"><span>01</span> Card carousel</TabsTrigger>
        <TabsTrigger value="background"><span>02</span> Full background</TabsTrigger>
        <TabsTrigger value="context"><span>03</span> Scene context</TabsTrigger>
      </TabsList>
      <div className="timing-control">
        <div className="timing-label"><span id="slide-timing-label">Time per slide</span><output>{slideSeconds} s</output></div>
        <SliderPrimitive.Root className="timing-slider" min={2} max={12} step={0.5} value={[slideSeconds]} onValueChange={([seconds]) => setSlideSeconds(seconds)}>
          <SliderPrimitive.Track className="timing-track"><SliderPrimitive.Range className="timing-range" /></SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="timing-thumb" aria-labelledby="slide-timing-label" aria-valuetext={`${slideSeconds} seconds per slide`} />
        </SliderPrimitive.Root>
        <div className="timing-limits" aria-hidden="true"><span>2 s · Faster</span><span>12 s · Slower</span></div>
      </div>
    </div>
    <div className="phone-space" style={{ "--phone-scale": phoneScale } as CSSProperties}>
      <div className="phone-frame">
        <span className="hardware-button mute" aria-hidden="true" /><span className="hardware-button volume" aria-hidden="true" /><span className="hardware-button power" aria-hidden="true" />
        <div className="phone-screen" ref={setPhonePortal}>
          <div className="phone-status" aria-hidden="true"><span>9:41</span><div className="dynamic-island" /><div className="status-icons"><Signal /><Wifi /><BatteryFull /></div></div>
          <TabsContent value={variation} className="phone-content">
          <main className={`onboarding variation-${variation === "context" ? "background variation-context" : variation}`} style={{ "--slide-duration": `${slideDuration}ms` } as CSSProperties}>
            {variation === "context" && <ContextBackdrop active={active} />}
            {variation === "background" && <div className="full-background" aria-hidden="true">
              {scenes.map((scene, i) => <div key={scene.image} className={`background-scene ${active === i ? "active" : ""}`}>
                {scene.image === "friends-family.png" ? <img className="context-photo" src="/images/context/friends-family.png" alt="" /> : <svg viewBox="0 470 1080 1140" preserveAspectRatio="xMidYMid slice" className="clean-photo">
                  <image href={`/images/${scene.image}`} width="1080" height="2052" />
                </svg>}
              </div>)}
              <div className="full-background-shade" />
            </div>}
    <header className="topbar">
      <img className="wordmark" src="/speakx.svg" alt="SpeakX" width="120" height="32" />
      <div className="header-actions">
        <Button variant="secondary" className="sign-in" onClick={() => setDialog("signin")}>Sign In</Button>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="icon-button" aria-label="More options"><MoreVertical /></Button></DropdownMenuTrigger>
          <DropdownMenuPortal container={phonePortal}><DropdownMenuPrimitive.Content align="end" className="options-menu">
            <DropdownMenuItem onSelect={() => setDialog("contact")}><Mail />Contact us</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDialog("faq")}><CircleHelp />FAQ</DropdownMenuItem>
            <DropdownMenuItem asChild><a href="https://www.speakx.in/privacy-policy" target="_blank" rel="noopener noreferrer"><ShieldCheck />Privacy Policy</a></DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDialog("about")}><Info />About us</DropdownMenuItem>
          </DropdownMenuPrimitive.Content></DropdownMenuPortal>
        </DropdownMenu>
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
            {variation === "card" && <div className="photo"><img src={`/images/card/${scene.image}`} alt={scene.alt} draggable={false} fetchPriority={i === 0 ? "high" : "auto"} /></div>}
            {variation === "card" && <div className="photo-shade" />}
          </div>)}
        </div>
        <div className="hero-title"><h1>Speak English<span className="headline-context" key={active}>{scenes[active].accent}</span></h1></div>
        <button className="edge-arrow previous" aria-label="Previous slide" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()} onClick={() => go(active - 1)}><ChevronLeft /></button>
        <button className="edge-arrow next" aria-label="Next slide" onPointerDown={e => e.stopPropagation()} onPointerUp={e => e.stopPropagation()} onClick={() => go(active + 1)}><ChevronRight /></button>
      </div>
      <div className="carousel-controls">
        <div className="pagination" aria-label="Choose a slide">{scenes.map((s, i) => <button key={s.image} aria-label={`Show ${s.label}`} aria-current={i === active ? "true" : undefined} className={`dot ${i === active ? "selected" : ""}`} onClick={() => go(i)}><span>{i === active && <i key={`${active}-${playing}-${slideDuration}`} className={playing ? "progress playing" : "progress"} />}</span></button>)}</div>
        {!reduced && <button className="pause-button" aria-label={paused ? "Play carousel" : "Pause carousel"} aria-pressed={paused} onClick={() => { setPaused(v => !v); setFocused(false); }}>{paused ? <Play /> : <Pause />}</button>}
      </div>
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>{scenes[active].line} {scenes[active].accent} {active + 1} of {scenes.length}.</p>
    </section>
    <footer className="bottom-area"><Button className="primary-cta" onClick={() => { setGoal(null); setStarted(false); setDialog("start"); }}>Get Started <ArrowRight /></Button><p className="trust-note">Trusted by <strong>1 crore+ learners</strong></p></footer>
    <Dialog open={dialogOpen} onOpenChange={open => { if (!open) setDialog(null); }}>
      <DialogPortal container={phonePortal}>
        <DialogOverlay className="phone-overlay" />
        <DialogPrimitive.Content className="onboarding-dialog" data-slot="dialog-content">
        <img src="/speakx.svg" alt="SpeakX" width="104" height="28" className="dialog-logo" />
        {dialog === "start" ? <>
          <DialogTitle className="dialog-title">{started ? "Your next chapter awaits." : "Where do you want to speak English?"}</DialogTitle>
          <DialogDescription className="dialog-description">{started ? `You chose ${scenes[goal ?? 0].label.toLowerCase()}. This preview ends here — your learning journey is the next step.` : "Choose one to start."}</DialogDescription>
          {!started ? <><div className="goal-options" role="group" aria-label="Choose your learning goal">{scenes.map(scene => { const i = scenes.indexOf(scene); return <Button key={scene.label} variant="secondary" className={`goal-option ${goal === i ? "chosen" : ""}`} aria-pressed={goal === i} onClick={() => setGoal(i)}>{scene.label}{goal === i ? <Check /> : <ChevronRight />}</Button>; })}</div><Button className="primary-cta" disabled={goal === null} onClick={() => setStarted(true)}>Continue <ArrowRight /></Button></> : <Button className="primary-cta" onClick={() => { go(goal ?? 0); setDialog(null); }}>Back to exploring <ArrowRight /></Button>}
        </> : dialog === "signin" ? <><DialogTitle className="dialog-title">Welcome back.</DialogTitle><DialogDescription className="dialog-description">This is a preview of the SpeakX welcome screen. Account sign-in will be available when connected to the SpeakX app.</DialogDescription><Button className="primary-cta" onClick={() => setDialog(null)}>Keep exploring <ArrowRight /></Button></> : <SupportContent panel={dialog} />}
      <DialogClose asChild><button className="dialog-dismiss" aria-label="Close"><X /></button></DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
          </main>
          </TabsContent>
          <div className="home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  </Tabs>;
}
