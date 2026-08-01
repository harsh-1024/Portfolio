// src/data/education.ts

import { Education } from '@/types';

export const education: Education[] = [
  {
    id: 'edu-1',
    institution: 'Stanford University',
    degree: 'Master of Science',
    field: 'Computer Science (AI/ML Specialization)',
    location: 'Stanford, CA',
    startDate: '2015-09',
    endDate: '2017-06',
    grade: 'GPA: 3.9/4.0',
    description: 'Focused on machine learning, distributed systems, and security. Research assistant in the Secure Systems Lab working on adversarial ML and differential privacy. Teaching assistant for CS229 (Machine Learning) and CS231n (Deep Learning).',
    logo: '/images/education/stanford.svg',
  },
  {
    id: 'edu-2',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Electrical Engineering & Computer Sciences',
    location: 'Berkeley, CA',
    startDate: '2011-08',
    endDate: '2015-05',
    grade: 'GPA: 3.8/4.0',
    description: 'Double major in EECS and Mathematics. Honors thesis on "Side-Channel Resistance in Cryptographic Implementations". Member of the Cybersecurity Research Group. ACM ICPC Regional Finalist.',
    logo: '/images/education/berkeley.svg',
  },
];