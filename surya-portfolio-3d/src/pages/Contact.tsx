import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useAvatar } from '../context/AvatarContext';
import { useCursorHover } from '../context/CursorContext';
import Toast from '../components/Toast';
import Reveal from '../components/Reveal';

const EMAILJS_SERVICE_ID = 'service_f8p4pv1';
const EMAILJS_TEMPLATE_ID = 'template_4gp9h0g';
const EMAILJS_PUBLIC_KEY = 'h9VoD_B_otOQic63H';

export default function Contact() {
  const { setState, setCameraTarget, pulse } = useAvatar();
  const hover = useCursorHover();
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ msg: string; variant: 'success' | 'error'; visible: boolean }>({
    msg: '',
    variant: 'success',
    visible: false,
  });

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    setState('CONTACT');
    setCameraTarget({ position: [0, 0.3, 5.2], lookAt: [0, 0.1, 0], fov: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showToast(msg: string, variant: 'success' | 'error' = 'success') {
    setToast({ msg, variant, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2600);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    pulse('THINKING', 4000);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current);
      showToast('Message sent successfully!', 'success');
      pulse('SUCCESS', 2200);
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      showToast('Failed to send. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative min-h-screen pt-40 pb-32 flex items-center">
      <div className="max-w-[720px] mx-auto px-[6vw] w-full">
        <Reveal>
          <p className="font-space text-xs tracking-[0.22em] uppercase text-gray-500 mb-5 text-center">06 / Contact</p>
          <h1 className="font-space font-bold leading-[0.92] text-[clamp(2.6rem,8vw,5.4rem)] text-center">
            LET'S BUILD
            <br />
            SOMETHING AMAZING.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 mt-16">
            <div className="relative">
              <input
                required
                name="user_name"
                type="text"
                placeholder=" "
                className="peer w-full bg-transparent border-b border-white/15 focus:border-white outline-none py-3 text-sm"
              />
              <label className="absolute left-0 top-3 text-sm text-gray-500 pointer-events-none transition-all peer-focus:-top-3 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-muted peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[11px]">
                Your Name
              </label>
            </div>
            <div className="relative">
              <input
                required
                name="user_email"
                type="email"
                placeholder=" "
                className="peer w-full bg-transparent border-b border-white/15 focus:border-white outline-none py-3 text-sm"
              />
              <label className="absolute left-0 top-3 text-sm text-gray-500 pointer-events-none transition-all peer-focus:-top-3 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-muted peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[11px]">
                Your Email
              </label>
            </div>
            <div className="relative">
              <textarea
                required
                name="message"
                placeholder=" "
                rows={4}
                className="peer w-full bg-transparent border-b border-white/15 focus:border-white outline-none py-3 text-sm resize-none"
              />
              <label className="absolute left-0 top-3 text-sm text-gray-500 pointer-events-none transition-all peer-focus:-top-3 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-muted peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[11px]">
                Your Message
              </label>
            </div>
            <button type="submit" disabled={sending} {...hover('hover')} className="btn-fill justify-center mt-4 disabled:opacity-50">
              {sending ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center gap-4 mt-14">
          <a href="https://www.linkedin.com/in/suryaprakashboda" target="_blank" rel="noopener noreferrer" {...hover('link')} className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            in
          </a>
          <a href="https://github.com/surya20062425" target="_blank" rel="noopener noreferrer" {...hover('link')} className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            gh
          </a>
          <a href="mailto:b.7993974026@gmail.com" {...hover('link')} className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            @
          </a>
        </Reveal>
      </div>

      <Toast message={toast.msg} visible={toast.visible} variant={toast.variant} />
    </section>
  );
}
