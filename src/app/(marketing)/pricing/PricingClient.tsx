"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Star, Shield, Clock } from 'lucide-react';
import { mContainer, mSection, mLabel, mDisplay, mCard, marketingTheme } from '@/lib/marketing/theme';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { Plan } from '@/app/core/data/supabase/plans.service';
import { getDiscountedPrice, formatPrice } from '@/lib/discount';

interface PricingClientProps {
  dynamicPlans: Plan[];
}

// Static feature definitions to merge with dynamic pricing
const PLAN_FEATURES = {
  monthly: [
    "Professional School Website",
    "Dynamic Admin Control Panel",
    "5-Day Grace Period",
    "Hosting & Maintenance included",
    "Standard SSL Security",
    "Faculty & Event Management",
    "Notice Board & News Tickers"
  ],
  yearly: [
    "Everything in Monthly Plan",
    "Dedicated Onboarding Support",
    "Custom Domain Integration",
    "Priority Feature Updates",
    "Enhanced Performance Hosting",
    "Strategic Digital Roadmap"
  ]
};

const PLAN_UI_CONFIG = {
  monthly: {
    icon: <Zap size={28} />,
    highlight: false,
    buttonText: "Get Started"
  },
  yearly: {
    icon: <Star size={28} />,
    highlight: true,
    buttonText: "Get Annual Access"
  }
};

export default function PricingClient({ dynamicPlans }: PricingClientProps) {
  
  const monthlyPlan = dynamicPlans.find(p => p.billingcycle === 'monthly');
  const monthlyPrice = monthlyPlan ? Number(monthlyPlan.price) : 0;

  const plans = dynamicPlans.map(dp => {
    const config = PLAN_UI_CONFIG[dp.code as keyof typeof PLAN_UI_CONFIG] || PLAN_UI_CONFIG.monthly;
    const features = PLAN_FEATURES[dp.code as keyof typeof PLAN_FEATURES] || PLAN_FEATURES.monthly;
    
    const discount = getDiscountedPrice(dp);
    
    return {
      name: dp.name,
      description: dp.description,
      price: dp.price,
      billingCycle: dp.billingcycle === 'yearly' ? '/ year' : '/ month',
      features: features,
      buttonText: config.buttonText,
      highlight: config.highlight || false,
      icon: config.icon,
      discount: discount
    };
  });

  return (
    <div className="min-h-screen pt-20 bg-slate-950 overflow-hidden relative">
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "EdDesk School Management",
          "operatingSystem": "Web",
          "applicationCategory": "EducationalApplication",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": Math.min(...plans.map(p => p.discount.finalPrice)).toString(),
            "highPrice": Math.max(...plans.map(p => p.discount.finalPrice)).toString(),
            "priceCurrency": "INR",
            "offerCount": dynamicPlans.length.toString()
          },
          "description": "Next-gen school management system and website ecosystem."
        }}
      />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.eddesk.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Pricing",
              "item": "https://www.eddesk.in/pricing"
            }
          ]
        }}
      />
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header Section */}
      <section className={`${mSection} pt-16 pb-0 relative z-10`}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={mLabel}
            >
              Simple & Transparent Pricing
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${mDisplay} text-5xl md:text-7xl mt-6 mb-8 text-white`}
            >
              Plans that grow with <span className={marketingTheme.gradients.text}>your school.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${marketingTheme.type.bodyLg} text-xl max-w-2xl mx-auto`}
            >
              No hidden fees. No technical complexity. Just a professional digital presence for your institution.
            </motion.p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto pb-24">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group ${plan.highlight ? 'z-20' : 'z-10'}`}
              >
                {plan.highlight && (
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                )}
                
                <div className={`${mCard} h-full relative border-white/10 ${plan.highlight ? 'bg-slate-900/90' : 'bg-slate-950/50'}`}>
                  <div className="flex flex-col h-full">
                    <div className="mb-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.highlight ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                          {plan.icon}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {plan.highlight && (
                            <span className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg shadow-indigo-500/30">
                              Best Value
                            </span>
                          )}
                          {plan.discount.hasDiscount && plan.discount.discountLabel && (
                            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg shadow-emerald-500/20 animate-bounce">
                              {plan.discount.discountLabel}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{plan.name}</h3>
                      <p className={marketingTheme.type.body + " mb-8"}>{plan.description}</p>
                      
                      <div className="flex flex-col">
                        {plan.discount.showStrikethrough && (
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-slate-500 text-xl line-through decoration-red-500/50 decoration-2">
                              {formatPrice(plan.discount.originalPrice)}
                            </span>
                            <div className="px-2.5 py-1 bg-indigo-500 text-white text-[10px] font-black rounded-lg uppercase tracking-tight flex items-center gap-1 shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              Offer Active
                            </div>
                          </div>
                        )}
                        <div className="flex items-baseline space-x-1">
                          <span className="text-2xl font-black text-white/50 self-start mt-2">₹</span>
                          <span className="text-6xl font-black text-white tracking-tighter">
                            {formatPrice(plan.discount.finalPrice).replace('₹', '').trim()}
                          </span>
                          <span className="text-slate-500 font-bold uppercase tracking-widest text-sm ml-2">
                            {plan.billingCycle}
                          </span>
                        </div>

                        {plan.discount.savingsLabel && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 flex items-center gap-4 shadow-xl shadow-emerald-500/5"
                          >
                            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40">
                              <Zap size={20} fill="currentColor" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Guaranteed Savings</span>
                              <span className="text-white text-sm font-black tracking-tight">{plan.discount.savingsLabel}</span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 mb-12 flex-1">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3 group/item">
                          <div className={`mt-1 p-0.5 rounded-full ${plan.highlight ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                            <Check size={14} />
                          </div>
                          <span className={`${marketingTheme.type.body} text-sm group-hover/item:text-slate-200 transition-colors`}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className={`w-full py-6 rounded-2xl font-black text-center transition-all flex items-center justify-center space-x-3 px-6 ${
                        plan.highlight 
                          ? 'bg-white text-slate-950 hover:bg-slate-100 shadow-2xl shadow-indigo-500/20' 
                          : 'bg-slate-900 border border-white/10 text-white hover:border-indigo-500/50'
                      }`}
                    >
                      <span>{plan.buttonText}</span>
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={`${mSection} pt-0 pb-32 relative z-10`}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-white/5 pt-24">
               <div>
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mx-auto mb-6 text-indigo-400">
                    <Shield size={20} />
                  </div>
                  <h4 className="text-white font-black mb-2 uppercase tracking-widest text-xs">Payment Protection</h4>
                  <p className="text-slate-500 text-sm">Secure transactions powered by Razorpay with end-to-end encryption.</p>
               </div>
               <div>
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mx-auto mb-6 text-indigo-400">
                    <Clock size={20} />
                  </div>
                  <h4 className="text-white font-black mb-2 uppercase tracking-widest text-xs">Easy Setup</h4>
                  <p className="text-slate-500 text-sm">Launch your school website in minutes with our ready-to-use templates.</p>
               </div>
               <div>
                  <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mx-auto mb-6 text-indigo-400">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-white font-black mb-2 uppercase tracking-widest text-xs">Data Portability</h4>
                  <p className="text-slate-500 text-sm">We provide your school data handover if you decide to cancel.</p>
               </div>
             </div>
          </div>
          
          {/* FAQ/Terms Note for Razorpay */}
          <div className="mt-24 max-w-3xl mx-auto bg-slate-900/30 border border-white/5 rounded-3xl p-8 text-center">
            <h5 className="text-white font-black mb-4 uppercase tracking-widest text-[10px] text-indigo-400">Subscription Policy</h5>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              "Every subscription comes with a 5-day grace period. After cancellation, you can retrieve your institutional data within 30 days. We focus on transparency and your school's data integrity."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
