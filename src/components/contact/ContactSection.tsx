// src/components/contact/ContactSection.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
// import { ScrollReveal } from '@/components/common/ScrollReveal';
import { profile } from '@/data/profile';
import { Mail, MapPin, Clock, Send, CheckCircle2, Loader2, Github, Linkedin, Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const ScrollReveal = ({ children, className, ...props }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(className)} {...props}>{children}</div>
);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, replace with actual API call
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    
    // Simulate success (90% success rate)
    if (Math.random() > 0.1) {
      setSubmitStatus('success');
      reset();
      // Trigger confetti
      window.dispatchEvent(new CustomEvent('confetti'));
    } else {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again or email me directly.');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      action: 'Copy',
      onAction: () => navigator.clipboard.writeText(profile.email),
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
      action: 'Map',
      onAction: () => window.open('https://maps.google.com/?q=San+Francisco,+CA', '_blank'),
    },
    {
      icon: Clock,
      label: 'Availability',
      value: 'Open to opportunities',
      action: 'Connect',
      onAction: () => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }),
    },
  ];

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? I'm always open to discussing new opportunities, interesting problems, or just saying hello.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <ScrollReveal>
            <div className="card p-6 lg:p-8" id="contact-form">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Send a Message</h3>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  >
                    <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message Sent!</p>
                      <p className="text-sm opacity-80">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <InputField
                        label="Your name"
                        placeholder="Your name"
                        error={errors.name?.message}
                        {...register('name')}
                      />
                      <InputField
                        label="your@email.com"
                        type="email"
                        placeholder="your@email.com"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <InputField
                      label="What's this about?"
                      placeholder="What's this about?"
                      error={errors.subject?.message}
                      {...register('subject')}
                    />

                    <TextareaField
                      label="Tell me about your project, idea, or just say hi..."
                      placeholder="Tell me about your project, idea, or just say hi..."
                      error={errors.message?.message}
                      rows={5}
                      {...register('message')}
                    />

                    {submitStatus === 'error' && (
                      <motion.p
                        className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="btn-primary w-full sm:w-auto flex items-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitStatus === 'submitting' ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">Let's Connect</h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="card p-5 flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-500)]/10 flex items-center justify-center flex-shrink-0 text-[var(--accent-500)] group-hover:bg-[var(--accent-500)] group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
                      <p className="font-medium text-[var(--text-primary)] truncate">{item.value}</p>
                    </div>
                    {item.onAction && (
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); item.onAction!(); }}
                        className="text-sm font-medium text-[var(--accent-500)] hover:text-[var(--accent-600)] flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent-500)]/10 group-hover:bg-[var(--accent-500)]/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.action}
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-[var(--border-light)]">
                <p className="text-sm text-[var(--text-muted)] mb-4">Or find me here:</p>
                <div className="flex gap-3">
                  <a href="https://github.com/alexchen" target="_blank" rel="noopener noreferrer" className="icon-button glass-strong group-hover:bg-[var(--accent-500)] group-hover:text-white" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com/in/alexchen" target="_blank" rel="noopener noreferrer" className="icon-button glass-strong group-hover:bg-blue-600 group-hover:text-white" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://twitter.com/alexchen" target="_blank" rel="noopener noreferrer" className="icon-button glass-strong group-hover:bg-sky-500 group-hover:text-white" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${profile.email}`} className="icon-button glass-strong group-hover:bg-[var(--accent-500)] group-hover:text-white" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card aspect-video rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-[var(--surface-hover)]">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 text-[var(--text-muted)]/30 mx-auto mb-4" />
                    <p className="text-[var(--text-muted)]">Map placeholder</p>
                    <p className="text-sm text-[var(--text-muted)]/70 mt-1">San Francisco, CA</p>
                    <a href="https://maps.google.com/?q=San+Francisco,+CA" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-[var(--accent-500)] hover:text-[var(--accent-600)] font-medium">
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function InputField({ 
  label, 
  type = 'text', 
  placeholder, 
  error, 
  className, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { 
  label: string; 
  error?: string; 
}) {
  return (
    <div className="input-wrapper relative">
      <input
        type={type}
        placeholder=" "
        className={cn(
          'input-field',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      <label className="label-floating">{label}</label>
      {error && (
        <motion.p
          id={`${props.id}-error`}
          className="text-sm text-red-400 mt-1.5"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function TextareaField({ 
  label, 
  placeholder, 
  error, 
  rows = 4, 
  className, 
  ...props 
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { 
  label: string; 
  error?: string; 
}) {
  return (
    <div className="input-wrapper relative">
      <textarea
        placeholder=" "
        rows={rows}
        className={cn(
          'input-field resize-y min-h-[120px]',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      <label className="label-floating">{label}</label>
      {error && (
        <motion.p
          id={`${props.id}-error`}
          className="text-sm text-red-400 mt-1.5"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}