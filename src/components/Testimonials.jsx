import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "T. Karthikeyan",
      role: "Managing Director",
      company: "Sri Ananda Bhavan Foods",
      text: "Procured our entire commercial kitchen setup from AK Agencies for our new Madurai branch. The stainless steel grade was exceptional, and Abbas Ali ensured installation was completed 3 days ahead of schedule.",
      rating: 5
    },
    {
      id: 2,
      name: "S. Divya",
      role: "Operations Head",
      company: "Cafe Malabar",
      text: "The industrial convection ovens and deep freezers supplied by AK Agencies have minimized our electricity overhead by nearly 15%. Their local support in Tamil Nadu is highly responsive and honest.",
      rating: 5
    },
    {
      id: 3,
      name: "M. Rizwan",
      role: "Executive Chef",
      company: "Royal Biryani House",
      text: "We needed customized lengthy prep tables and specific high-pressure gas ranges. The measurements provided by AK Agencies were millimetre perfect. Heavy duty materials suitable for Indian cooking.",
      rating: 5
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? testimonials.length - 1 : current - 1);

  return (
    <section className="py-28 relative bg-[#0a2717] overflow-hidden flex items-center justify-center">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-light rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 z-10 w-full">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Client Success Stories
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-brand-light mx-auto rounded-full"
          ></motion.div>
        </div>

        <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-14 shadow-2xl overflow-hidden">
          <Quote className="absolute -top-4 -left-4 text-white/5 w-32 h-32 -z-10 rotate-180" />
          
          <div className="relative min-h-[220px] flex flex-col items-center text-center justify-center">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: i === current ? 1 : 0, 
                  x: i === current ? 0 : 20,
                  pointerEvents: i === current ? 'auto' : 'none'
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center w-full"
              >
                <div className="flex gap-1.5 mb-8 text-yellow-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={22} fill={idx < t.rating ? "currentColor" : "none"} className={idx < t.rating ? "" : "text-white/20"}/>
                  ))}
                </div>
                <p className="text-xl md:text-2xl md:leading-relaxed text-gray-100 mb-10 font-medium font-serif italic">
                  “{t.text}”
                </p>
                <div>
                  <h4 className="font-extrabold text-white text-lg tracking-wide uppercase">{t.name}</h4>
                  <p className="text-brand-light font-medium mt-1">{t.role}, {t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-white/10 relative z-20">
            <button onClick={prevSlide} className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand hover:border-brand hover:scale-110 transition-all">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-light w-10' : 'bg-white/20 w-2.5 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand hover:border-brand hover:scale-110 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
