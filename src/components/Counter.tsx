"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 24,
    stiffness: 60,
  });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      }),
    [springValue, suffix],
  );

  return <span ref={ref}>0{suffix}</span>;
}
