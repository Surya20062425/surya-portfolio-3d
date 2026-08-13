interface ToastProps {
  message: string;
  visible: boolean;
  variant?: 'success' | 'error';
}

export default function Toast({ message, visible, variant = 'success' }: ToastProps) {
  return (
    <div
      className={[
        'fixed bottom-7 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-sm font-semibold z-[9999] transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
        variant === 'success' ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white border border-white/10',
      ].join(' ')}
    >
      {message}
    </div>
  );
}
