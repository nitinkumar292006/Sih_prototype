import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

export default function VantaNetBackground() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 800,
          minWidth: 1200,
          scale: 1,
          scaleMobile: 1,
          color: 0xda70d6,        // Soft purple lines
          backgroundColor: 0x87ceeb, // Dark background
          points: 8,               // Fewer points → less dense
          maxDistance: 15,         // Shorter lines → subtle
          spacing: 20,             // More spacing → airy look
          showDots: false,         // Dots off
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}

