// src/components/hero/SocialIcons.tsx

'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Code, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/lib/constants';

export function SocialIcons() {
  return (
    <div className="flex items-center gap-4 pt-4" role="list" aria-label="Social links">
      {SOCIAL_LINKS.map((social, index) => (
        <motion.a
          key={social.platform}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={cn(
            'icon-button group',
            social.platform === 'email' && 'cursor-pointer'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {social.icon === 'Github' && <Github className="h-5 w-5" />}
          {social.icon === 'Linkedin' && <Linkedin className="h-5 w-5" />}
          {social.icon === 'Twitter' && <Twitter className="h-5 w-5" />}
          {social.icon === 'Mail' && <Mail className="h-5 w-5" />}
          {social.icon === 'Code' && <Code className="h-5 w-5" />}
          {social.icon === 'BookOpen' && <BookOpen className="h-5 w-5" />}
        </motion.a>
      ))}
    </div>
  );
}