import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MOCK_DATA } from '../constants/mockData';

const BlogPostViewScreen = ({ id }) => {
    const post = MOCK_DATA.BLOG.blog_posts[Number(id)];

    if (!post) {
        redirect('/blog');
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 fade-in">
            <Link href="/blog" className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12 inline-block hover:text-slate-900 transition-colors">
                ← Back to Journal
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.publish_date}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 serif leading-tight mb-8">{post.title}</h1>
                <div className="flex items-center gap-4 border-y border-slate-100 py-6">
                    <div className="text-sm">
                        <span className="text-slate-400 uppercase tracking-widest text-[10px] block mb-1">Author</span>
                        <span className="font-bold text-slate-900">{post.author}</span>
                    </div>
                </div>
            </header>

            <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto object-cover grayscale mb-12 border border-slate-200"
            />

            <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed serif">
                {post.content.split('\n').map((para, i) => (
                    <p key={i} className="mb-6">{para}</p>
                ))}
            </div>

            <footer className="mt-20 pt-12 border-t border-slate-200 text-center">
                <h3 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold mb-8">Share this insight</h3>
                <div className="flex justify-center gap-6">
                    <span className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 cursor-not-allowed text-center">f</span>
                    <span className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 cursor-not-allowed text-center">t</span>
                    <span className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 cursor-not-allowed text-center">in</span>
                </div>
            </footer>
        </div>
    );
};

export default BlogPostViewScreen;
