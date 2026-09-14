"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PrivacyPolicy } from "./privacy-policy";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export type SupportPanel = "contact" | "faq" | "about" | "privacy";

const questions = [
  { question: "Can I start with basic English?", answer: "Yes. You can start with the English you know. Get help in Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi or Bengali, plus 14 other languages." },
  { question: "Who will I practise speaking with?", answer: "You’ll talk with Sia, an AI practice partner in the app. Make mistakes, try again and get feedback to improve your English. You don’t need to find a speaking partner." },
  { question: "Can I practise for interviews and daily life?", answer: "Yes. Practise conversations for job interviews, work, college, travel, and talking with friends and family." },
  { question: "How much time should I practise?", answer: "Aim for about 15 minutes a day, at a time that suits you. Everyone learns at a different pace. Use your Progress Report to see what’s improving and what to practise next." },
  { question: "Is SpeakX free or paid?", answer: "You can use SpeakX for free. Some extra features need a paid plan. Upgrading is optional." },
];

export function SupportContent({ panel }: { panel: SupportPanel }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@ivypods.com");
      setCopyStatus("copied");
    } catch { setCopyStatus("error"); }
  };
  if (panel === "privacy") return <>
    <DialogTitle className="dialog-title">Privacy Policy</DialogTitle>
    <DialogDescription className="dialog-description">How we collect, use and protect your information.</DialogDescription>
    <PrivacyPolicy />
  </>;
  if (panel === "contact") return <>
    <DialogTitle className="dialog-title">Contact us</DialogTitle>
    <DialogDescription className="dialog-description">Have a question or need a hand? Get in touch with the SpeakX team.</DialogDescription>
    <div className="contact-email">
      <p>contact@ivypods.com</p>
      <Button variant="secondary" className="copy-email" onClick={copyEmail}>{copyStatus === "copied" ? <Check /> : <Copy />}{copyStatus === "copied" ? "Copied" : "Copy email"}</Button>
      <span role="status" className={copyStatus === "error" ? "copy-error" : "sr-only"}>{copyStatus === "copied" ? "Email address copied." : copyStatus === "error" ? "Copy didn’t work. Select and copy the email address above." : ""}</span>
    </div>
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
      <p>SpeakX is built by Ivypods Technology Private Limited, an Indian company. Practise with Sia, your AI speaking partner, and get help in seven Indian languages, plus 14 other languages.</p>
      <div className="about-proof">
        <div><strong>1 crore+ downloads</strong><span>On Google Play</span></div>
        <div><strong>Backed by MS Dhoni</strong><span>An investor in SpeakX</span></div>
      </div>
    </div>
  </>;
}
