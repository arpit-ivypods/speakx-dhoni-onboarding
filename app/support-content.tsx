"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export type SupportPanel = "contact" | "faq" | "about";

const questions = [
  { question: "What can I practise with SpeakX?", answer: "Practise English for everyday conversations, friends and family, interviews, work, college and travel." },
  { question: "How does SpeakX help me improve?", answer: "SpeakX uses AI conversations and personalised feedback to help you practise pronunciation, fluency and speaking with confidence." },
  { question: "Where can I get help?", answer: <>Contact the SpeakX team at <a className="support-link" href="mailto:contact@ivypods.com">contact@ivypods.com</a>.</> },
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
    <DialogDescription className="dialog-description">A little help before you start speaking.</DialogDescription>
    <Accordion type="single" collapsible className="support-faq">
      {questions.map((item, i) => <AccordionItem value={`question-${i}`} key={item.question}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>)}
    </Accordion>
  </>;

  return <>
    <DialogTitle className="dialog-title">About us</DialogTitle>
    <DialogDescription className="dialog-description">SpeakX helps adults build confidence in English through AI-powered conversations and personalised practice. From everyday chats to your next interview, practise for the moments that matter to you.</DialogDescription>
    <Button asChild className="primary-cta"><a href="https://www.speakx.in/about" target="_blank" rel="noopener noreferrer">Meet SpeakX <ArrowUpRight /></a></Button>
  </>;
}
