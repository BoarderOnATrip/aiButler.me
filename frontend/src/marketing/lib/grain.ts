export type GrainConfig = {
  opacity?: number;
  intensity?: number;
  seed?: number;
};

export function grainStyle(config: GrainConfig = {}): Record<string, string> {
  const opacity = config.opacity ?? 0.022;
  const intensity = config.intensity ?? 1;
  return {
    "--mira-noise-opacity": String(opacity),
    filter: `contrast(${1 + intensity * 0.02}) saturate(0.98)`,
  } as Record<string, string>;
}

export function spotlightStyle(halo = "rgba(184, 115, 51, 0.18)"): Record<string, string> {
  return {
    backgroundImage: `radial-gradient(circle at 50% 0%, ${halo}, transparent 50%)`,
  };
}

