"use client";

import { motion } from "framer-motion";
import { cascadeContainer, cascadeItem } from "@/lib/animations";
import { avis } from "@/lib/packs";

export function Testimonials() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={cascadeContainer}
      className="grid grid-cols-1 gap-s6 lg:grid-cols-3"
    >
      {avis.map((item) => (
        <motion.figure key={item.role} variants={cascadeItem} className="rule-structure flex flex-col p-s6">
          <blockquote className="text-intro flex-1">« {item.citation} »</blockquote>
          <figcaption className="text-label text-fumee rule-t-secondaire mt-s5 pt-s4">
            {item.role} <span className="text-fumee">— exemple</span>
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}
