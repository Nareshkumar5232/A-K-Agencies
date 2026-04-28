import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Cpu, Target } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Commercial Grade Durability",
      desc: "304 & 316 grade stainless steel structures built for continuous high-heat Indian kitchens."
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Wholesale Value",
      desc: "Direct-to-business pricing bypassing retail markups for maximum ROI on your setup."
    },
    {
      icon: <Cpu size={28} />,
      title: "Modern Technology",
      desc: "Energy-efficient compressors and smart thermostats reducing your monthly utility overheads."
    },
    {
      icon: <Target size={28} />,
      title: "Customized Fitting",
      desc: "Tailor-made workstations dimensioned perfectly to match your precise floor plans."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            The AK Agencies Standard
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-brand mx-auto rounded-full shadow-sm"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-extrabold text-gray-800 mb-6 leading-tight">
              Fueling South India's Hospitality Sector Since 2005
            </h3>
            <div className="space-y-6 text-lg text-gray-600 font-medium">
              <p>
                Based in Cumbum, Tamil Nadu, AK Agencies is the preferred distribution partner for hundreds of restaurants, hotels, bakeries, and industrial canteens across the state.
              </p>
              <p>
                We recognize that a commercial kitchen isn't just about appliances; it's a demanding, high-pressure ecosystem. A single breakdown can disrupt your entire service. That’s why we exclusively source and manufacture heavy-duty, rigorously tested equipment capable of maintaining operational momentum.
              </p>
            </div>
            
            <div className="mt-8 p-6 lg:p-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand group-hover:w-full transition-all duration-500 z-0"></div>
              <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
                <h4 className="font-extrabold text-brand mb-3 flex items-center gap-3 group-hover:text-white">
                  <Target size={24} /> A. Abbas Ali (Proprietor)
                </h4>
                <p className="text-gray-700 font-medium group-hover:text-white/90">
                  "Our core philosophy is straightforward: provide robust machinery that outlasts its warranty, paired with honest, rapid after-sales response."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {highlights.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-6 shadow-inner">
                  {item.icon}
                </div>
                <h4 className="text-xl font-extrabold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
