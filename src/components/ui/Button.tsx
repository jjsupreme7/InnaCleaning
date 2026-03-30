import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const variants = {
  primary: 'bg-sky-600 text-white border-sky-600 hover:bg-sky-700 hover:border-sky-700 shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30',
  secondary: 'bg-slate-800 text-white border-slate-800 hover:bg-slate-900 shadow-md shadow-slate-800/20 hover:shadow-lg hover:shadow-slate-800/30',
  outline: 'bg-transparent text-slate-800 border-slate-300 hover:bg-slate-800 hover:border-slate-800 hover:text-white',
};

const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = `inline-block border-2 uppercase tracking-widest font-bold transition-all duration-300 hover:-translate-y-0.5 text-center rounded-sm ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : 'cursor-pointer'} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  );
}
