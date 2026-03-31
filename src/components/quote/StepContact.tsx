interface Props {
  name: string;
  email: string;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
}

export default function StepContact({ name, email, onChangeName, onChangeEmail }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-2">Almost there! Where should we send your quote?</h3>
      <p className="text-zinc-500 text-sm mb-6">We&apos;ll email you a detailed breakdown.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>
    </div>
  );
}
