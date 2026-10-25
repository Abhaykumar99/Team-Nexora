import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Reveal from '../components/motion/Reveal';
import SectionHeader from '../components/SectionHeader';
import { Clock3, ShieldCheck, MessagesSquare } from 'lucide-react';
import siteConfig from '../config/site';
import { CATEGORIES } from '../data/projects';

const BUDGET_OPTIONS = [
  'Prefer not to say',
  'Under $1,000 / ₹25,000',
  '$1,000 – $5,000 / ₹25k – ₹1L',
  '$5,000+ / Above ₹1,00,000',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    budget: '',
    desc: '',
    hp: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ s: 'idle', m: '' });
  const [shake, setShake] = useState(false);

  const formEndpoint =
    import.meta.env.VITE_FORM_ENDPOINT || siteConfig.formEndpoint;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const errs = {};
    if (formData.name.trim().length < 2) errs.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.type) errs.type = 'Choose a project type.';
    if (formData.desc.trim().length < 20)
      errs.desc = 'Describe your project in at least 20 characters.';
    return errs;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      triggerShake();
      return;
    }

    // Honeypot check
    if (formData.hp) return;

    if (!formEndpoint) {
      triggerShake();
      setStatus({
        s: 'error',
        m: 'The form endpoint is not connected yet (VITE_FORM_ENDPOINT is unset), so your message was not sent. Please configure the endpoint or contact us directly.',
      });
      return;
    }

    setStatus({ s: 'loading', m: '' });

    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.type,
          budget: formData.budget,
          description: formData.desc,
        }),
      });

      if (!res.ok) throw new Error();

      setStatus({
        s: 'success',
        m: 'Thanks! Your enquiry was sent successfully. We will get back to you by email.',
      });
      setFormData({ name: '', email: '', type: '', budget: '', desc: '', hp: '' });
    } catch {
      triggerShake();
      setStatus({
        s: 'error',
        m: 'Sending failed. Please check your internet connection and try again.',
      });
    }
  };

  const filledCount = [formData.name.trim().length >= 2, /^\S+@\S+\.\S+$/.test(formData.email), Boolean(formData.type), formData.desc.trim().length >= 20].filter(Boolean).length;
  const formProgress = filledCount / 4;

  const fieldProps = (field) => ({
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `err-${field}` : undefined,
  });

  return (
    <section id="contact" className="section-band py-16 sm:py-24">
      <div className="section-container !py-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Column: Contact Info */}
        <div>
          <SectionHeader
            eyebrow="Tell us about your project"
            title="Start a project,"
            highlight="without the pressure"
            description="Two minutes, four questions. Tell us what you want to build — we'll review it personally and reply by email with honest next steps, whether we end up working together or not."
          />

          <div className="flex flex-col gap-5">
            {siteConfig.email && (
              <div className="val-card">
                <b className="block text-fg font-heading text-sm font-semibold">Email</b>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-primary hover:underline text-[15px]"
                >
                  {siteConfig.email}
                </a>
              </div>
            )}

            {siteConfig.whatsapp && (
              <div className="val-card">
                <b className="block text-fg font-heading text-sm font-semibold">WhatsApp</b>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-[15px]"
                >
                  Message us on WhatsApp
                </a>
              </div>
            )}

            {!siteConfig.email && !siteConfig.whatsapp && (
              <div className="val-card">
                <b className="block text-fg font-heading text-sm font-semibold">Direct Contact</b>
                <p className="text-fg-muted text-[14px]">
                  Direct contact details will appear here once added in{' '}
                  <code className="text-xs bg-surface-2 px-1 py-0.5 rounded text-fg">
                    src/config/site.js
                  </code>.
                </p>
              </div>
            )}

            <div className="val-card">
              <b className="block text-fg font-heading text-sm font-semibold">Response Time</b>
              <p className="text-fg-muted text-[14px]">
                We typically reply within 24 business hours with an initial scope review.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Enquiry Form with Motion Shake */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden bg-surface border border-border rounded-[16px] p-6 sm:p-8 flex flex-col gap-4 shadow-[var(--shadow-card)]"
        >
          {/* Form completion — customer always knows how close they are */}
          <div className="absolute top-0 left-0 right-0" aria-hidden="true">
            <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--border)' }} />
            <motion.div
              className="h-[3px] w-full origin-left -mt-[3px]"
              style={{ backgroundColor: 'var(--primary)' }}
              animate={{ scaleX: formProgress }}
              transition={{ type: 'spring', stiffness: 160, damping: 24 }}
            />
          </div>
          <p className="text-xs font-semibold text-fg-muted -mb-1" aria-live="polite">
            {filledCount === 4 ? 'All set — hit send and we\'ll take it from there.' : `${filledCount} of 4 required details added`}
          </p>
          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <input
              tabIndex={-1}
              autoComplete="off"
              value={formData.hp}
              onChange={handleChange('hp')}
              name="website"
            />
          </div>

          {/* Name */}
          <div className="field flex flex-col gap-1.5">
            <label htmlFor="form-name" className="text-sm font-semibold text-fg">
              Name <span className="text-secondary">*</span>
            </label>
            <input
              id="form-name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange('name')}
              className={`w-full px-3.5 py-2.5 rounded-[10px] bg-bg border text-fg placeholder:text-fg-muted/50 field-input focus:border-primary outline-none ${
                errors.name ? 'border-error' : 'border-border'
              }`}
              placeholder="Your name"
              {...fieldProps('name')}
            />
            {errors.name && (
              <span id="err-name" className="text-xs text-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="field flex flex-col gap-1.5">
            <label htmlFor="form-email" className="text-sm font-semibold text-fg">
              Email <span className="text-secondary">*</span>
            </label>
            <input
              id="form-email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange('email')}
              className={`w-full px-3.5 py-2.5 rounded-[10px] bg-bg border text-fg placeholder:text-fg-muted/50 field-input focus:border-primary outline-none ${
                errors.email ? 'border-error' : 'border-border'
              }`}
              placeholder="you@company.com"
              {...fieldProps('email')}
            />
            {errors.email && (
              <span id="err-email" className="text-xs text-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Project Type */}
          <div className="field flex flex-col gap-1.5">
            <label htmlFor="form-type" className="text-sm font-semibold text-fg">
              Project type <span className="text-secondary">*</span>
            </label>
            <select
              id="form-type"
              value={formData.type}
              onChange={handleChange('type')}
              className={`w-full px-3.5 py-2.5 rounded-[10px] bg-bg border text-fg field-input focus:border-primary outline-none cursor-pointer ${
                errors.type ? 'border-error' : 'border-border'
              }`}
              {...fieldProps('type')}
            >
              <option value="" disabled>
                Select a project type…
              </option>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="Maintenance & Optimization">Maintenance &amp; Optimization</option>
              <option value="Other">Other Custom Solution</option>
            </select>
            {errors.type && (
              <span id="err-type" className="text-xs text-error" role="alert">
                {errors.type}
              </span>
            )}
          </div>

          {/* Budget Range (optional) */}
          <div className="field flex flex-col gap-1.5">
            <label htmlFor="form-budget" className="text-sm font-semibold text-fg">
              Budget range <span className="text-fg-muted font-normal">(optional)</span>
            </label>
            <select
              id="form-budget"
              value={formData.budget}
              onChange={handleChange('budget')}
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-bg border border-border text-fg field-input focus:border-primary outline-none cursor-pointer"
            >
              <option value="">Prefer not to say</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="field flex flex-col gap-1.5">
            <label htmlFor="form-desc" className="text-sm font-semibold text-fg">
              Project description <span className="text-secondary">*</span>
            </label>
            <textarea
              id="form-desc"
              rows={4}
              value={formData.desc}
              onChange={handleChange('desc')}
              className={`w-full px-3.5 py-2.5 rounded-[10px] bg-bg border text-fg placeholder:text-fg-muted/50 field-input focus:border-primary outline-none resize-y ${
                errors.desc ? 'border-error' : 'border-border'
              }`}
              placeholder="Describe your goals, desired features, and timeline (at least 20 characters)…"
              {...fieldProps('desc')}
            />
            <span className={`text-xs ${formData.desc.trim().length >= 20 ? 'text-success' : 'text-fg-muted'}`} aria-live="polite">
              {formData.desc.trim().length}/20 minimum characters{formData.desc.trim().length >= 20 ? ' — enough detail, thank you' : ''}
            </span>
            {errors.desc && (
              <span id="err-desc" className="text-xs text-error" role="alert">
                {errors.desc}
              </span>
            )}
          </div>

          {/* Submit Button with animated morphing state */}
          <Button
            type="submit"
            disabled={status.s === 'loading'}
            size="lg"
            className="w-full mt-2"
          >
            {status.s === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Sending enquiry…
              </span>
            ) : (
              'Send enquiry'
            )}
          </Button>

          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-fg-muted list-none p-0 m-0">
            <li className="inline-flex items-center gap-1.5"><Clock3 size={13} className="text-primary" /> Reply within 24 business hours</li>
            <li className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-primary" /> No spam, ever. Your details stay private</li>
            <li className="inline-flex items-center gap-1.5"><MessagesSquare size={13} className="text-primary" /> No-obligation — advice first</li>
          </ul>

          {/* Animated Status Message */}
          <AnimatePresence mode="wait">
            {status.m && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`p-3.5 rounded-[10px] text-sm border font-medium flex items-start gap-2.5 mt-1 ${
                  status.s === 'success'
                    ? 'bg-success/10 border-success/30 text-success'
                    : 'bg-error/10 border-error/30 text-error'
                }`}
                role="alert"
              >
                {status.s === 'success' ? (
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                )}
                <span>{status.m}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
