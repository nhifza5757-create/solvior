type Tone = 'success' | 'neutral' | 'primary';

const TONES: Record<Tone, string> = {
  success: 'bg-emerald-50 text-emerald-700',
  neutral: 'bg-gray-100 text-gray-500',
  primary: 'bg-[#0075ff]/10 text-[#0075ff]',
};

const DOTS: Record<Tone, string> = {
  success: 'bg-emerald-500',
  neutral: 'bg-gray-400',
  primary: 'bg-[#0075ff]',
};

export default function StatusBadge({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOTS[tone]}`} />
      {label}
    </span>
  );
}
