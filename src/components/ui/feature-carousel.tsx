"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Layout, 
  Cloud, 
  Sparkles 
} from "lucide-react";
import { cn } from "../../lib/utils";

const FEATURES = [
  {
    id: "ui-ux",
    label: "UI/UX Design",
    icon: Smartphone,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/87bbb6190962053.65c360ceee298.png",
    description: "AI-powered mobile interfaces and user-centric design systems.",
  },
  {
    id: "web-dev",
    label: "Web Development",
    icon: Layout,
    image: "https://c2crental.ca/lovable-uploads/ae30751c-fe6d-4959-839f-3ebc3decea01.png",
    description: "Full-stack production platforms with seamless logic and performance.",
  },
  {
    id: "ai-automation",
    label: "AI Automation",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    description: "Automating lead flows and dealership operations with custom AI agents.",
  },
  {
    id: "product-strategy",
    label: "Product Strategy",
    icon: Sparkles,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/640e2c190962053.65c360ceeee86.png",
    description: "Mapping complex business logic into intuitive user experiences.",
  }
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] flex flex-col lg:flex-row min-h-[500px] lg:aspect-video border border-border/40 bg-white shadow-2xl">
        <div className="w-full lg:w-[40%] min-h-[150px] md:min-h-[200px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-16 bg-dark">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-dark via-dark/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-dark via-dark/80 to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-6 md:px-8 py-3 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-accent text-white border-accent z-10"
                        : "bg-transparent text-white/40 border-white/10 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-white" : "text-white/20"
                      )}
                    >
                      {React.createElement(feature.icon, { size: 18, strokeWidth: 2 })}
                    </div>

                    <span className="font-body text-[12px] md:text-[13px] tracking-[0.1em] whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-h-[400px] md:min-h-[500px] lg:h-full relative bg-[#f5f4f2] flex items-center justify-center py-16 px-6 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -2 : isNext ? 2 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 md:border-8 border-white bg-white shadow-xl origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[1px] brightness-90"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-accent text-white px-3 py-1 rounded-none text-[10px] font-body uppercase tracking-[0.2em] w-fit shadow-lg mb-3">
                          {feature.label}
                        </div>
                        <p className="text-white font-body text-lg md:text-xl leading-tight tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-6 left-6 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(232,71,10,0.8)]" />
                    <span className="text-white/80 text-[9px] font-body uppercase tracking-[0.2em]">
                      Case Study
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
