"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          <span className="text-psych-green">Get in</span> Touch
        </h1>
        <p className="mt-2 text-muted">
          Found a reference we missed? Have a correction? We&apos;d love to hear from you.
        </p>
      </motion.div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 rounded-xl border border-psych-green/30 bg-psych-green/10 p-8 text-center"
        >
          <CheckCircle size={48} className="mx-auto text-psych-green" />
          <h2 className="mt-4 text-xl font-bold">Message Sent!</h2>
          <p className="mt-2 text-sm text-muted">
            I&apos;ve heard it both ways... but we&apos;ll definitely get back to you.
          </p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          action="https://formspree.io/f/xplaceholder"
          method="POST"
          onSubmit={() => setSubmitted(true)}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-muted">Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-psych-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-psych-green"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-1 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-psych-green"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-psych-green px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-psych-green-light"
          >
            <Send size={16} /> Send Message
          </button>
        </motion.form>
      )}
    </div>
  );
}
