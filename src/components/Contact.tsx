import {CheckCircle2, Send} from 'lucide-react';
import {type FormEvent, useState} from 'react';
import {eventData} from '../config/eventData';

export function Contact() {
  const {contact} = eventData;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Proposal & Track Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your name (at least 2 characters).');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (trimmedMessage.length < 10) {
      setError('Please include a brief message (at least 10 characters).');
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setTopic('Proposal & Track Inquiry');
    setMessage('');
    setError(null);
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-[#E4E4E7] bg-[#FAFAFA] py-20 text-[#121A2C] sm:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Heading & Contact Directory */}
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488]">
              {contact.eyebrow}
            </p>
            <h2 className="font-display mb-4 text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-[#121A2C] text-balance">
              {contact.heading}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[#52525B]">
              {contact.subtitle}
            </p>

            <div className="border-t border-[#E4E4E7]">
              {contact.channels.map((channel) => (
                <div
                  key={channel.id}
                  className="border-b border-[#E4E4E7] py-4"
                >
                  <p className="text-xs font-medium text-[#0D9488]">
                    {channel.role}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[#121A2C]">
                    {channel.label}
                  </p>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="mt-1 block truncate text-sm text-[#52525B] transition-colors hover:text-[#121A2C]"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="mt-1 truncate font-mono-tabular text-xs sm:text-sm text-[#71717A]">
                      {channel.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#71717A]">
              {contact.placeholderNote}
            </p>
          </div>

          {/* Minimalist White Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#E4E4E7] bg-white p-7 sm:p-9">
              {submitted ? (
                <div className="py-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-[#0D9488]/25 bg-[#0D9488]/10 text-[#0D9488]">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mb-2 text-2xl font-bold text-[#121A2C]">
                    Query Recorded Locally
                  </h3>
                  <p className="mb-6 max-w-lg text-sm sm:text-base leading-relaxed text-[#52525B]">
                    Thank you,{' '}
                    <span className="font-semibold text-[#121A2C]">
                      {name}
                    </span>
                    . Your{' '}
                    <span className="font-medium text-[#121A2C]">{topic}</span>{' '}
                    inquiry has been validated. Connect an active form endpoint
                    or helpdesk URL in{' '}
                    <code className="font-mono-tabular text-xs text-[#0D9488]">
                      src/config/eventData.ts
                    </code>{' '}
                    when publishing live registration.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#E4E4E7] bg-white px-5 py-2.5 text-sm font-semibold text-[#121A2C] transition-colors hover:border-[#121A2C]"
                  >
                    Send Another Query
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div>
                    <h3 className="font-display mb-1.5 text-xl sm:text-2xl font-bold tracking-[-0.015em] text-[#121A2C]">
                      Have a Specific Question?
                    </h3>
                    <p className="text-sm text-[#52525B]">
                      Reach out regarding tracks, proposal guidelines, technical
                      infrastructure, or ecosystem partnerships.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-medium text-[#3F3F46]"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        required
                        className="w-full rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#A1A1AA] transition-colors focus:border-[#121A2C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-medium text-[#3F3F46]"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.example"
                        required
                        className="w-full rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#A1A1AA] transition-colors focus:border-[#121A2C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="mb-1.5 block text-xs font-medium text-[#3F3F46]"
                    >
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] transition-colors focus:border-[#121A2C] focus:outline-none"
                    >
                      <option value="Proposal & Track Inquiry">
                        Proposal & Track Inquiry
                      </option>
                      <option value="Technical & Infrastructure">
                        Technical & Infrastructure
                      </option>
                      <option value="Sponsorship & Partnerships">
                        Sponsorship & Partnerships
                      </option>
                      <option value="General Event Details">
                        General Event Details
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-medium text-[#3F3F46]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your question or partnership details..."
                      required
                      className="w-full resize-y rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#A1A1AA] transition-colors focus:border-[#121A2C] focus:outline-none"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-[#B91C1C]"
                    >
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    {eventData.externalQueryFormUrl ? (
                      <a
                        href={eventData.externalQueryFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-[#0D9488] underline underline-offset-4 hover:text-[#121A2C]"
                      >
                        Open external query form
                      </a>
                    ) : (
                      <span className="text-xs text-[#71717A]">
                        Validated interactive helpdesk preview
                      </span>
                    )}

                    <button
                      type="submit"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#121A2C] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E293B] whitespace-nowrap"
                    >
                      <Send className="h-4 w-4 text-[#62C9C1]" aria-hidden="true" />
                      <span>Submit Query</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
