// src/components/blog/BlogSection.tsx

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { blogPosts } from '@/data/blog';
import { Calendar, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';

const featuredPost = blogPosts.find(p => p.featured);
const recentPosts = blogPosts.filter(p => !p.featured).slice(0, 3);

export function BlogSection() {
  return (
    <section id="blog" className="section" aria-label="Blog & Writing">
      <div className="container-custom">
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent-500)]/10 text-[var(--accent-500)] text-sm font-medium mb-4">
            Writing
          </span>
          <h2 className="section-title">Blog & Publications</h2>
          <p className="section-subtitle mx-auto">
            Technical deep-dives on AI, security, and systems engineering.
          </p>
        </ScrollReveal>

        {/* Featured Article */}
        {featuredPost && (
          <ScrollReveal variant="fadeUp" delay={100} className="mb-16">
            <article className="card p-6 lg:p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-500)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex lg:flex-row gap-8">
                {/* Image */}
                <div className="relative lg:w-1/2 shrink-0">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    {featuredPost.coverImage && (
                      <motion.img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      {featuredPost.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag tag-accent text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent-500)] transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  {featuredPost.url && (
                    <a
                      href={featuredPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-fit flex items-center gap-2"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </ScrollReveal>
        )}

        {/* Recent Posts */}
        <ScrollReveal variant="fadeUp" delay={200} className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Recent Posts</h3>
            {recentPosts.length > 0 && (
              <a href="https://medium.com/@alexchen" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent-500)] hover:text-[var(--accent-600)] font-medium flex items-center gap-1">
                View All
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          <ScrollReveal 
            asChild
            variant="fadeUp"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </ScrollReveal>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal variant="fadeUp" delay={300} className="text-center">
          <a
            href="https://medium.com/@alexchen"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Read More on Medium
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  return (
    <motion.article
      className="card-hover group h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl">
        {post.coverImage && (
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag tag-accent text-xs">{tag}</span>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime} min
          </span>
        </div>

        <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-2 group-hover:text-[var(--accent-500)] transition-colors line-clamp-2">
          {post.title}
        </h4>

        <p className="text-[var(--text-secondary)] text-sm flex-1 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--accent-500)] hover:text-[var(--accent-600)] flex items-center gap-1 mt-auto"
          >
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}