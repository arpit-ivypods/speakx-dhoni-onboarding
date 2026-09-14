"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export type SupportPanel = "contact" | "faq" | "about";

const questions = [
  { question: "Is SpeakX free or paid?", answer: "You can use SpeakX for free. Some extra features need a paid plan. Upgrading is optional." },
  { question: "Can I start with basic English?", answer: "Yes. You can start with the English you know. Get help in Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi or Bengali." },
  { question: "Who will I practise speaking with?", answer: "You’ll talk with Sia, an AI practice partner in the app. Make mistakes, try again and get feedback to improve your English. You don’t need to find a speaking partner." },
  { question: "Can I practise for interviews and daily life?", answer: "Yes. Practise conversations for job interviews, work, college, travel, and talking with friends and family." },
  { question: "How much time should I practise?", answer: "Aim for about 15 minutes a day, at a time that suits you. Everyone learns at a different pace. Use your Progress Report to see what’s improving and what to practise next." },
];

export function SupportContent({ panel }: { panel: SupportPanel }) {
  if (panel === "contact") return <>
    <DialogTitle className="dialog-title">Contact us</DialogTitle>
    <DialogDescription className="dialog-description">Have a question or need a hand? Get in touch with the SpeakX team.</DialogDescription>
    <a className="support-link" href="mailto:contact@ivypods.com">contact@ivypods.com</a>
    <Button asChild className="primary-cta"><a href="mailto:contact@ivypods.com">Email us <Mail /></a></Button>
    <a className="support-link" href="https://www.speakx.in/contact-us" target="_blank" rel="noopener noreferrer">More ways to contact us</a>
  </>;

  if (panel === "faq") return <>
    <DialogTitle className="dialog-title">FAQ</DialogTitle>
    <DialogDescription className="dialog-description">Your questions, answered.</DialogDescription>
    <Accordion type="single" collapsible defaultValue="question-0" className="support-faq">
      {questions.map((item, i) => <AccordionItem value={`question-${i}`} key={item.question}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </>;

  return <>
    <DialogTitle className="dialog-title">About us</DialogTitle>
    <DialogDescription className="dialog-description">Made in India to help you speak English with confidence—in interviews, at work and in everyday life.</DialogDescription>
    <div className="about-copy">
      <p>SpeakX is built by Ivypods Technology Private Limited, an Indian company. Practise with Sia, your AI speaking partner, and get help in seven Indian languages.</p>
      <div className="about-proof">
        <a href="https://play.google.com/store/apps/details?id=yellowclass.kids.live" target="_blank" rel="noopener noreferrer"><strong>1 crore+ downloads</strong><span>On Google Play <ArrowUpRight aria-hidden="true" /></span></a>
        <a href="https://speakx.in/" target="_blank" rel="noopener noreferrer"><strong>Backed by MS Dhoni</strong><span>An investor in SpeakX <ArrowUpRight aria-hidden="true" /></span></a>
      </div>
      <p>You can use SpeakX for free. Paid upgrades are optional.</p>
    </div>
    <Button asChild className="primary-cta"><a href="https://speakx.in/" target="_blank" rel="noopener noreferrer">Visit our website <ArrowUpRight /></a></Button>
  </>;
}
