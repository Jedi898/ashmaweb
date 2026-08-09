"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Globe,
  Send,
  Phone,
  MessageCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Pressable } from "@/lib/motion-primitives";

const contactLinks = [
  {
    label: "Email",
    value: "spiralout2020@gmail.com",
    href: "mailto:spiralout2020@gmail.com",
    icon: Mail,
  },
{
    label: "Instagram",
    value: "@ashmasinght",
    href: "https://instagram.com/ashmasinght",
    icon: Globe,
  },
  {
    label: "Telegram",
    value: "+977 9707498890",
    href: "https://t.me/+9779707498890",
    icon: MessageCircle,
  },
  {
    label: "Phone",
    value: "+977 9860022345",
    href: "tel:+9779860022345",
    icon: Phone,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        // Surface server-side validation / rate-limit errors safely.
        const data = (await res.json().catch(() => null)) as {
          error?: string;
          errors?: string[];
        } | null;
        const msg =
          data?.error ?? data?.errors?.[0] ?? "Something went wrong. Try again.";
        alert(msg);
        setStatus("idle");
        return;
      }

      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setFormState({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    } catch {
      alert("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-sm font-medium tracking-[0.2em] uppercase">
            Connect
          </span>
<h2 className="mt-3 font-serif font-bold text-[#f5f0e8] text-[clamp(1.75rem,4vw,3rem)]">
            Get in{" "}
            <span className="gold-gradient-text">Touch</span>
          </h2>
          <div className="mx-auto mt-4 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  variants={itemVariants}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-4 p-5 rounded-2xl glass card-hover"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                    <Icon size={20} className="text-[#d4af37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium tracking-wider text-[#c4b998] uppercase">
                      {link.label}
                    </p>
                    <p className="text-base font-medium text-[#f5f0e8] group-hover:text-[#d4af37] transition-colors duration-300 truncate">
                      {link.value}
                    </p>
                  </div>
                  <Send
                    size={16}
                    className="text-[#d4af37]/50 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all duration-300"
                  />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative p-6 sm:p-8 rounded-2xl glass"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/10 to-transparent rounded-bl-full pointer-events-none" />

              <div className="relative z-10 space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium tracking-wider text-[#c4b998] uppercase mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-[#0a0a0b]/60 border border-[#d4af37]/10 rounded-xl text-[#f5f0e8] placeholder-[#c4b998]/40 focus:outline-none focus:border-[#d4af37]/40 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-wider text-[#c4b998] uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-[#0a0a0b]/60 border border-[#d4af37]/10 rounded-xl text-[#f5f0e8] placeholder-[#c4b998]/40 focus:outline-none focus:border-[#d4af37]/40 transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium tracking-wider text-[#c4b998] uppercase mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder="Workshop inquiry, styling booking, etc."
                    className="w-full px-4 py-3 bg-[#0a0a0b]/60 border border-[#d4af37]/10 rounded-xl text-[#f5f0e8] placeholder-[#c4b998]/40 focus:outline-none focus:border-[#d4af37]/40 transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium tracking-wider text-[#c4b998] uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-4 py-3 bg-[#0a0a0b]/60 border border-[#d4af37]/10 rounded-xl text-[#f5f0e8] placeholder-[#c4b998]/40 focus:outline-none focus:border-[#d4af37]/40 transition-colors duration-300 resize-none"
                  />
                </div>

{/* Submit Button — tactile press, instant pointerdown */}
                <Pressable
                  as="button"
                  type="submit"
                  disabled={status !== "idle"}
                  className="pressable group relative w-full px-8 py-3.5 bg-[#d4af37] text-[#0a0a0b] font-medium tracking-wider rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#d4af37]/20 disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "idle" && (
                      <>
                        Send Message
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                    {status === "sending" && (
                      <>
                        Sending...
                        <Loader2 size={16} className="animate-spin" />
                      </>
                    )}
                    {status === "sent" && (
                      <>
                        Message Sent!
                        <CheckCircle2 size={16} />
                      </>
                    )}
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#e8c84a] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  />
                </Pressable>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

