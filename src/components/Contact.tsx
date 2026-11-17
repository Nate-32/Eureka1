import {CheckCircle2, Mail, MessageSquare, Phone, Send} from 'lucide-react';
import {type FormEvent, useState} from 'react';
import {eventData, type ContactChannel} from '../config/eventData';

function ChannelIcon({icon}: {icon: ContactChannel['icon']}) {
  switch (icon) {
    case 'mail':
      return <Mail className="h-5 w-5 text-[#137C75]" aria-hidden="true" />;
    case 'message-square':
      return (
        <MessageSquare className="h-5 w-5 text-[#6D56C1]" aria-hidden="true" />
      );
    case 'phone':
      return <Phone className="h-5 w-5 text-[#121A2C]" aria-hidden="true" />;
  }
}

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
      className="relative border-t border-[#E5EAF1] bg-white py-20 text-[#121A2C] sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#137C75]">
            {contact.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121A2C] text-balance">
            {contact.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B]">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Contact Channels */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            <div className="flex flex-col gap-4">
              {contact.channels.map((channel) => (
                <div
                  key={channel.id}
                  className="aurora-pane aurora-pane-interactive flex items-center gap-4 rounded-2xl p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E5EAF1] bg-[#F8FAFD]">
                    <ChannelIcon icon={channel.icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#137C75]">
                      {channel.role}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[#121A2C]">
                      {channel.label}
                    </p>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="mt-1 block truncate text-sm text-[#334155] transition-colors hover:text-[#137C75]"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-1 truncate font-mono-tabular text-xs sm:text-sm text-[#64748B]">
                        {channel.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#E5EAF1] bg-[#F8FAFD] p-5">
              <p className="text-xs leading-relaxed text-[#64748B]">
                {contact.placeholderNote}
              </p>
            </div>
          </div>

          {/* Interactive Helpdesk Form */}
          <div className="lg:col-span-7">
            <div className="aurora-pane relative h-full rounded-2xl bg-[#F8FAFD]/60 p-7 sm:p-9">
              {submitted ? (
                <div className="flex h-full flex-col items-start justify-center py-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#62C9C1]/35 bg-[#62C9C1]/15 text-[#137C75]">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mb-2 text-2xl font-bold text-[#121A2C]">
                    Query Recorded Locally
                  </h3>
                  <p className="mb-6 max-w-lg text-sm sm:text-base leading-relaxed text-[#64748B]">
                    Thank you,{' '}
                    <span className="font-semibold text-[#121A2C]">
                      {name}
                    </span>
                    . Your{' '}
                    <span className="font-medium text-[#137C75]">{topic}</span>{' '}
                    inquiry has been validated. Connect an active form endpoint
                    or helpdesk URL in{' '}
                    <code className="font-mono-tabular text-xs text-[#137C75]">
                      src/config/eventData.ts
                    </code>{' '}
                    when publishing live registration.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#E5EAF1] bg-white px-6 py-2.5 text-sm font-semibold text-[#121A2C] transition-colors hover:border-[#62C9C1]"
                  >
                    Send Another Query
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex h-full flex-col justify-between gap-5"
                >
                  <div>
                    <p className="mb-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#137C75]">
                      Helpdesk Inquiry
                    </p>
                    <h3 className="font-display mb-2 text-2xl font-bold text-[#121A2C]">
                      Have a Specific Question?
                    </h3>
                    <p className="mb-6 text-sm text-[#64748B]">
                      Reach out regarding tracks, proposal guidelines, technical
                      infrastructure, or ecosystem partnerships.
                    </p>

                    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-1.5 block text-xs font-medium text-[#334155]"
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
                          className="w-full rounded-lg border border-[#E5EAF1] bg-white px-4 py-2.5 text-sm text-[#121A2C] placeholder-[#94A3B8] transition-colors focus:border-[#62C9C1] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-1.5 block text-xs font-medium text-[#334155]"
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
                          className="w-full rounded-lg border border-[#E5EAF1] bg-white px-4 py-2.5 text-sm text-[#121A2C] placeholder-[#94A3B8] transition-colors focus:border-[#62C9C1] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="contact-topic"
                        className="mb-1.5 block text-xs font-medium text-[#334155]"
                      >
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full rounded-lg border border-[#E5EAF1] bg-white px-4 py-2.5 text-sm text-[#121A2C] transition-colors focus:border-[#62C9C1] focus:outline-none"
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
                        className="mb-1.5 block text-xs font-medium text-[#334155]"
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
                        className="w-full resize-y rounded-lg border border-[#E5EAF1] bg-white px-4 py-2.5 text-sm text-[#121A2C] placeholder-[#94A3B8] transition-colors focus:border-[#62C9C1] focus:outline-none"
                      />
                    </div>
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
                        className="text-xs font-medium text-[#137C75] underline underline-offset-4 hover:text-[#121A2C]"
                      >
                        Open external query form
                      </a>
                    ) : (
                      <span className="text-xs text-[#64748B]">
                        Validated interactive helpdesk preview
                      </span>
                    )}

                    <button
                      type="submit"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#121A2C] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1B2742] whitespace-nowrap"
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
