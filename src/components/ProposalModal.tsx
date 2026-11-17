import {CheckCircle2, Sparkles, X} from 'lucide-react';
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121A2C]/65 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-[#E5EAF1] bg-white p-6 sm:p-8 shadow-[0_24px_80px_rgba(18,26,44,0.22)]">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close proposal dialog"
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#E5EAF1] bg-[#F8FAFD] text-[#64748B] transition-colors hover:border-[#62C9C1] hover:text-[#121A2C]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {validated ? (
          <div className="py-4">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#62C9C1]/35 bg-[#62C9C1]/15 text-[#137C75]">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3
              id="proposal-modal-title"
              className="font-display mb-2 text-2xl font-bold text-[#121A2C]"
            >
              Proposal Draft Validated
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[#64748B]">
              Your proposal draft for{' '}
              <span className="font-semibold text-[#121A2C]">
                {projectTitle}
              </span>{' '}
              ({teamName}) is ready. Once official registration opens, configure{' '}
              <code className="font-mono-tabular text-xs text-[#137C75]">
                externalProposalFormUrl
              </code>{' '}
              in{' '}
              <code className="font-mono-tabular text-xs text-[#137C75]">
                src/config/eventData.ts
              </code>{' '}
              to connect the live submission portal.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-lg bg-[#121A2C] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B2742]"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => setValidated(false)}
                className="cursor-pointer rounded-lg border border-[#E5EAF1] bg-[#F8FAFD] px-6 py-2.5 text-sm font-semibold text-[#121A2C] transition-colors hover:border-[#62C9C1]"
              >
                Edit Draft
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5 pr-8">
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#137C75]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>EUREKA Proposal Desk</span>
              </div>
              <h3
                id="proposal-modal-title"
                className="font-display mb-1.5 text-2xl font-bold text-[#121A2C]"
              >
                Prepare Your Proposal
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Official submission links are configured centrally before event
                launch. Draft and validate your concept summary below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="proposal-team"
                    className="mb-1 block text-xs font-medium text-[#334155]"
                  >
                    Team / Lead Name
                  </label>
                  <input
                    id="proposal-team"
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Aurora Labs"
                    className="w-full rounded-lg border border-[#E5EAF1] bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#94A3B8] focus:border-[#62C9C1] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="proposal-email"
                    className="mb-1 block text-xs font-medium text-[#334155]"
                  >
                    Contact Email
                  </label>
                  <input
                    id="proposal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="team@domain.example"
                    className="w-full rounded-lg border border-[#E5EAF1] bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#94A3B8] focus:border-[#62C9C1] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="proposal-track"
                    className="mb-1 block text-xs font-medium text-[#334155]"
                  >
                    Discovery Track
                  </label>
                  <select
                    id="proposal-track"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full rounded-lg border border-[#E5EAF1] bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#121A2C] focus:border-[#62C9C1] focus:bg-white focus:outline-none"
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
                    className="mb-1 block text-xs font-medium text-[#334155]"
                  >
                    Working Project Title
                  </label>
                  <input
                    id="proposal-title"
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Cryogenic Edge Photonic Sensor"
                    className="w-full rounded-lg border border-[#E5EAF1] bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#94A3B8] focus:border-[#62C9C1] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="proposal-summary"
                  className="mb-1 block text-xs font-medium text-[#334155]"
                >
                  Breakthrough Summary
                </label>
                <textarea
                  id="proposal-summary"
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Describe the problem you are investigating, your working prototype approach, and expected impact..."
                  className="w-full resize-none rounded-lg border border-[#E5EAF1] bg-[#F8FAFD] px-3.5 py-2.5 text-sm text-[#121A2C] placeholder-[#94A3B8] focus:border-[#62C9C1] focus:bg-white focus:outline-none"
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
                className="cursor-pointer rounded-lg border border-[#E5EAF1] px-5 py-2.5 text-sm font-medium text-[#64748B] transition-colors hover:text-[#121A2C]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-[#121A2C] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B2742]"
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
