import {CheckCircle2, X} from 'lucide-react';
import {type FormEvent, useEffect, useState} from 'react';
import {eventData} from '../config/eventData';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalModal({isOpen, onClose}: ProposalModalProps) {
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState(eventData.tracks.items[0].id);
  const [projectTitle, setProjectTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setValidated(false);
    setError(null);
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (teamName.trim().length < 2) {
      setError('Please enter your team or builder name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid contact email.');
      return;
    }

    if (projectTitle.trim().length < 3) {
      setError('Please provide a working project title.');
      return;
    }

    if (summary.trim().length < 20) {
      setError(
        'Please write a brief summary of your breakthrough concept (at least 20 characters).',
      );
      return;
    }

    setValidated(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121A2C]/55 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-xl rounded-xl border border-[#E4E4E7] bg-white p-6 sm:p-8 shadow-[0_24px_64px_rgba(18,26,44,0.18)]">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close proposal dialog"
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-[#E4E4E7] bg-white text-[#52525B] transition-colors hover:border-[#121A2C] hover:text-[#121A2C]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {validated ? (
          <div className="py-4">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#0D9488]/25 bg-[#0D9488]/10 text-[#0D9488]">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3
              id="proposal-modal-title"
              className="font-display mb-2 text-2xl font-bold text-[#121A2C]"
            >
              Proposal Draft Validated
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[#52525B]">
              Your proposal draft for{' '}
              <span className="font-semibold text-[#121A2C]">
                {projectTitle}
              </span>{' '}
              ({teamName}) is ready. Once official registration opens, configure{' '}
              <code className="font-mono-tabular text-xs text-[#0D9488]">
                externalProposalFormUrl
              </code>{' '}
              in{' '}
              <code className="font-mono-tabular text-xs text-[#0D9488]">
                src/config/eventData.ts
              </code>{' '}
              to connect the live submission portal.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-md bg-[#121A2C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E293B]"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => setValidated(false)}
                className="cursor-pointer rounded-md border border-[#E4E4E7] bg-white px-5 py-2.5 text-sm font-semibold text-[#121A2C] transition-colors hover:border-[#121A2C]"
              >
                Edit Draft
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6 pr-8">
              <p className="mb-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D9488]">
                EUREKA Proposal Desk
              </p>
              <h3
                id="proposal-modal-title"
                className="font-display mb-1.5 text-2xl font-bold tracking-[-0.015em] text-[#121A2C]"
              >
                Prepare Your Proposal
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B]">
                Official submission links are configured centrally before event
                launch. Draft and validate your concept summary below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="proposal-team"
                    className="mb-1 block text-xs font-medium text-[#3F3F46]"
                  >
                    Team / Lead Name
                  </label>
                  <input
                    id="proposal-team"
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Aurora Labs"
                    className="w-full rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#A1A1AA] focus:border-[#121A2C] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="proposal-email"
                    className="mb-1 block text-xs font-medium text-[#3F3F46]"
                  >
                    Contact Email
                  </label>
                  <input
                    id="proposal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="team@domain.example"
                    className="w-full rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#A1A1AA] focus:border-[#121A2C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="proposal-track"
                    className="mb-1 block text-xs font-medium text-[#3F3F46]"
                  >
                    Discovery Track
                  </label>
                  <select
                    id="proposal-track"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] focus:border-[#121A2C] focus:outline-none"
                  >
                    {eventData.tracks.items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="proposal-title"
                    className="mb-1 block text-xs font-medium text-[#3F3F46]"
                  >
                    Working Project Title
                  </label>
                  <input
                    id="proposal-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Cryogenic Edge Photonic Sensor"
                    className="w-full rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#A1A1AA] focus:border-[#121A2C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="proposal-summary"
                  className="mb-1 block text-xs font-medium text-[#3F3F46]"
                >
                  Breakthrough Summary
                </label>
                <textarea
                  id="proposal-summary"
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Describe the problem you are investigating, your working prototype approach, and expected impact..."
                  className="w-full resize-none rounded-md border border-[#E4E4E7] bg-white px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#A1A1AA] focus:border-[#121A2C] focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-3 text-xs font-medium text-[#B91C1C]">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-md border border-[#E4E4E7] px-5 py-2.5 text-sm font-medium text-[#52525B] transition-colors hover:text-[#121A2C]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-[#121A2C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E293B]"
              >
                Validate Proposal Draft
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
