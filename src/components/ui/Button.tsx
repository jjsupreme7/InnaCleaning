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
  primary:
    'border-[#467968] bg-[#467968] text-white shadow-[0_18px_40px_-20px_rgba(70,121,104,0.9)] hover:-translate-y-0.5 hover:border-[#3a6659] hover:bg-[#3a6659]',
  secondary:
    'border-white/70 bg-white/92 text-[var(--color-foreground)] shadow-[0_18px_36px_-24px_rgba(23,60,49,0.36)] hover:-translate-y-0.5 hover:bg-white',
  outline:
    'border-[rgba(70,121,104,0.18)] bg-transparent text-[var(--color-foreground)] hover:-translate-y-0.5 hover:border-[#9bc6b8] hover:bg-white/80',
};

const sizes = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-6 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
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
  const baseStyles = `inline-flex items-center justify-center gap-2 rounded-full border font-semibold tracking-[0.08em] transition-all duration-300 text-center ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseStyles}>
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
