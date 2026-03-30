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
  primary: 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700 hover:border-teal-700 shadow-md hover:shadow-lg',
  secondary: 'bg-stone-800 text-white border-stone-800 hover:bg-stone-900',
  outline: 'bg-transparent text-teal-700 border-teal-600 hover:bg-teal-600 hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
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
  const baseStyles = `inline-block border-2 rounded-full font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 text-center ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

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
