import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";

export function LandingPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 h-[100vh] w-full"
        >
            <div className="h-[100vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden ">
                <h1 className="md:text-7xl text-3xl lg:text-7xl font-bold text-center text-white relative z-20">
                    Gym buddy💪
                </h1>
                <div className="w-[40rem] h-40 relative">
                    {/* Gradients */}
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                    <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                    <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                    {/* Core component */}
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1}
                        particleDensity={1200}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />

                    {/* Radial Gradient to prevent sharp edges */}
                    <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
            </div>
        </motion.div>
    );
}
