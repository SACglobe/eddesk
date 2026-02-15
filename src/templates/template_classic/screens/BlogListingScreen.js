"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_DATA } from '../constants/mockData';

const BlogListingScreen = () => {
    const { BLOG } = MOCK_DATA;
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredPosts = selectedCategory
        ? BLOG.blog_posts.filter(post => post.category === selectedCategory)
        : BLOG.blog_posts;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 fade-in">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-widest serif">The School Journal</h1>
                <div className="h-1 w-20 bg-slate-900 mx-auto mt-4"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${!selectedCategory ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
                >
                    All Categories
                </button>
                {BLOG.blog_categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredPosts.map((post, idx) => (
                    <article key={idx} className="bg-white border border-slate-200 group">
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                <span>{post.category}</span>
                                <span>•</span>
                                <span>{post.publish_date}</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 serif mb-4 leading-tight group-hover:text-slate-600 transition-colors">
                                <Link href={`/blog/${idx}`}>{post.title}</Link>
                            </h2>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                            <Link
                                href={`/blog/${idx}`}
                                className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1 hover:text-slate-500 hover:border-slate-500 transition-colors"
                            >
                                Read Article
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogListingScreen;
