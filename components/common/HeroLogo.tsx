"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeroLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoSrc =
    resolvedTheme === "dark"
      ? "/iota-hero-dark.svg"
      : "/iota-hero-light.svg";

  return (
    <Image
      src={logoSrc}
      alt="IOTA"
      width={1200}
      height={630}
      priority
      className="h-auto w-full max-w-3xl"
    />
  );
}