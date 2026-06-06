"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: "110px", minHeight: "28px" }} />;
  }

  const logoSrc =
    resolvedTheme === "dark"
      ? "/iota-dark.svg"
      : "/iota-light.svg";

  return (
    <Image
      src={logoSrc}
      alt="IOTA"
      width={220}
      height={56}
      style={{ width: "110px", height: "auto" }}
      priority
    />
  );
}