"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
 * ScrollServicesWorld — Interconnected 3D Service Universe
 *
 * Architecture:
 * - 500vh scroll track with a sticky 100svh viewport.
 * - One THREE.WebGLRenderer + PerspectiveCamera + Scene renders a
 *   single continuous universe containing three deep 3D worlds
 *   positioned along the Z axis (W1 z=0, W2 z=-26, W3 z=-52).
 * - Scroll progress drives a smooth CatmullRom camera flight path
 *   that serpentines through all three worlds — passing through two
 *   glowing wormhole gates — while a second curve steers lookAt.
 * - Worlds:
 *   W1 STOREFRONT ENGINE — crystalline Shopify Dawn storefront,
 *      orbiting product monoliths, edge-network web, LCP particle
 *      column, polar grid floor (emerald).
 *   W2 AI COMMAND CENTER — layered AI core with pulsing nucleus,
 *      agent satellites with live beam links, Fibonacci neural
 *      lattice, double-helix data stream, radar scan pulses (cyan).
 *   W3 TELEMETRY MATRIX — instanced equalizer skyscraper city,
 *      holographic dashboard panels, tube line-chart arcs with
 *      travelling pulses, donut chart, radar sweep (purple).
 * - Universe glue: 2400-star starfield, 4 flowing particle rivers
 *   spanning the whole journey, 2 wormhole gates, per-zone fog /
 *   background colour lerping.
 * - HTML HUD overlays: world panel, badge annotations, flight
 *   progress meter, nav rail — all crossfade with the active world.
 * ───────────────────────────────────────────────────────────── */

interface ServiceWorldData {
  id: string;
  worldNumber: string;
  shortName: string;
  category: string;
  title: string;
  accentColor: string;
  badge: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  description: string;
}

const SERVICE_WORLDS: ServiceWorldData[] = [
  {
    id: "world-ecommerce",
    worldNumber: "WORLD 01 // STOREFRONT ENGINE",
    shortName: "STOREFRONT ENGINE",
    category: "HEADLESS E-COMMERCE & SHOPIFY DAWN ARCHITECTURE",
    title: "High-Conversion Shopify Dawn & Headless Systems",
    accentColor: "#10B981",
    badge: "98+ Lighthouse",
    metric: "0.4s",
    metricLabel: "Measured LCP (Largest Contentful Paint)",
    tags: ["Shopify Dawn", "Liquid", "Astro", "TinaCMS", "GraphQL"],
    description:
      "Engineered storefronts that bypass page-builder bloat — edge-cached Dawn sections, headless Astro fronts, and GraphQL-driven catalogues tuned for sub-second first paint.",
  },
  {
    id: "world-ai",
    worldNumber: "WORLD 02 // AI COMMAND CENTER",
    shortName: "AI COMMAND CENTER",
    category: "AUTONOMOUS AI & CRAWL4AI AGENT WORKFLOWS",
    title: "FastAPI, Crawl4AI & Autonomous Agent Pipelines",
    accentColor: "#06B6D4",
    badge: "10x Ops Leverage",
    metric: "100%",
    metricLabel: "Automated Data Extraction & Ingestion",
    tags: ["FastAPI", "Crawl4AI", "Python", "Hermes Agent", "Vector Search"],
    description:
      "Custom scrapers, LLM ingestion pipelines, and agentic workflows that run autonomously in the background — turning hours of ops into zero-touch automation.",
  },
  {
    id: "world-systems",
    worldNumber: "WORLD 03 // TELEMETRY MATRIX",
    shortName: "TELEMETRY MATRIX",
    category: "CUSTOM SYSTEMS, POWER BI & ANALYTICS TELEMETRY",
    title: "Power BI Dashboards & Engineering Integrations",
    accentColor: "#A855F7",
    badge: "Real-time Telemetry",
    metric: "<0.2s",
    metricLabel: "Stream Latency",
    tags: ["Power BI", "Pine Script", "REST/GraphQL", "SQL", "Mechatronics Eng"],
    description:
      "Executive dashboards, Pine Script quant indicators, and hardware-software telemetry that translate complex operational data into real-time decisions.",
  },
];

const N = SERVICE_WORLDS.length;
const WORLD_Z = [0, -26, -52]; // world centres along Z
const GATE_Z = [-13, -39]; // wormhole gates between worlds
const HUD_ZONE = 0.06; // entry/exit padding on the scroll track

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));
const smoothstep = (v: number) => v * v * (3 - 2 * v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ── Badge annotation overlays (HTML over WebGL) ────────────── */
interface BadgeAnnotation {
  label: string;
  detail: string;
  worldIdx: number;
  anchor: { x: string; y: string }; // CSS positioning relative to viewport
  accent: string;
}

const BADGE_DEFS: BadgeAnnotation[] = [
  {
    label: "⚡ 98+ Lighthouse",
    detail: "Performance · A11y · SEO · Best Practices",
    worldIdx: 0,
    anchor: { x: "left-[6%]", y: "top-[16%]" },
    accent: "#10B981",
  },
  {
    label: "🚀 0.4s LCP",
    detail: "Edge-cached Dawn sections · 14KB payload",
    worldIdx: 0,
    anchor: { x: "right-[6%]", y: "top-[58%]" },
    accent: "#10B981",
  },
  {
    label: "🤖 Crawl4AI Engine",
    detail: "LLM-ready markdown + structured JSON extraction",
    worldIdx: 1,
    anchor: { x: "right-[6%]", y: "top-[18%]" },
    accent: "#06B6D4",
  },
  {
    label: "🧠 Vector DB Sync",
    detail: "1,420 docs indexed · semantic retrieval",
    worldIdx: 1,
    anchor: { x: "left-[6%]", y: "top-[56%]" },
    accent: "#06B6D4",
  },
  {
    label: "📊 <0.2s Stream Latency",
    detail: "Real-time telemetry · live data ingestion",
    worldIdx: 2,
    anchor: { x: "left-[7%]", y: "top-[17%]" },
    accent: "#A855F7",
  },
  {
    label: "📈 Power BI Dashboards",
    detail: "Executive views · Pine Script quant indicators",
    worldIdx: 2,
    anchor: { x: "right-[7%]", y: "top-[55%]" },
    accent: "#A855F7",
  },
];

/* ═══════════════════════════════════════════════════════════════
 * Shared 3D helpers
 * ═══════════════════════════════════════════════════════════════ */

// Soft radial glow texture used by all point clouds & sprites
function makeRadialTexture(THREE: any) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(0.6, "rgba(255,255,255,0.14)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function makePoints(
  THREE: any,
  positions: Float32Array | number[],
  opts: {
    color: number;
    size: number;
    map?: any;
    opacity?: number;
    vertexColors?: boolean;
  },
) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions as number[], 3),
  );
  const mat = new THREE.PointsMaterial({
    color: opts.color,
    size: opts.size,
    map: opts.map ?? null,
    transparent: true,
    opacity: opts.opacity ?? 1,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    vertexColors: opts.vertexColors ?? false,
  });
  return new THREE.Points(geo, mat);
}

function lineSeg(
  THREE: any,
  pts: any[],
  color: number,
  opacity: number,
) {
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.LineSegments(geo, mat);
}

function glowSprite(THREE: any, tex: any, color: number, scale: number, opacity = 0.8) {
  const mat = new THREE.SpriteMaterial({
    map: tex,
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(scale, scale, 1);
  return s;
}

/* ═══════════════════════════════════════════════════════════════
 * WORLD 1 — STOREFRONT ENGINE (emerald)
 * Crystalline Shopify Dawn storefront + orbiting product monoliths
 * + edge-network web + ascending LCP particle column.
 * ═══════════════════════════════════════════════════════════════ */
function buildWorld1(THREE: any, glowTex: any, q: number) {
  const group = new THREE.Group();
  const accent = 0x10b981;
  const updaters: ((t: number, dt: number) => void)[] = [];

  /* ── Crystalline storefront ── */
  const store = new THREE.Group();
  // Glass body
  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(7, 4.6, 5),
    new THREE.MeshPhysicalMaterial({
      color: 0x0a2b1f,
      metalness: 0.35,
      roughness: 0.12,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  glass.position.y = 0.3;
  store.add(glass);
  // Emerald edge skeleton
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(7, 4.6, 5)),
    new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.85,
    }),
  );
  edges.position.y = 0.3;
  store.add(edges);
  // Roof prism (Dawn "roofline")
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(5.1, 2.4, 4),
    new THREE.MeshBasicMaterial({
      color: accent,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    }),
  );
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 3.8;
  store.add(roof);
  const roofGlow = glowSprite(THREE, glowTex, accent, 7, 0.16);
  roofGlow.position.y = 3.6;
  store.add(roofGlow);
  // Inner podium + product pedestal
  const podium = new THREE.Mesh(
    new THREE.CylinderGeometry(1.15, 1.5, 0.5, 24),
    new THREE.MeshStandardMaterial({
      color: 0x062018,
      metalness: 0.8,
      roughness: 0.25,
      emissive: accent,
      emissiveIntensity: 0.25,
    }),
  );
  podium.position.y = -1.75;
  store.add(podium);
  const hero = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.85, 0),
    new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.6,
      roughness: 0.2,
      emissive: accent,
      emissiveIntensity: 0.9,
      flatShading: true,
    }),
  );
  hero.position.y = -0.6;
  store.add(hero);
  updaters.push((t) => {
    hero.rotation.y = t * 0.6;
    hero.rotation.x = Math.sin(t * 0.4) * 0.25;
    hero.position.y = -0.6 + Math.sin(t * 1.2) * 0.18;
  });
  group.add(store);

  /* ── Orbiting product monoliths on tilted rings ── */
  const monolithGeos = [
    new THREE.IcosahedronGeometry(0.55, 0),
    new THREE.OctahedronGeometry(0.6, 0),
    new THREE.TorusKnotGeometry(0.4, 0.13, 48, 8),
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.DodecahedronGeometry(0.55, 0),
    new THREE.CapsuleGeometry(0.32, 0.6, 4, 10),
  ];
  const orbits: {
    mesh: any;
    ring: any;
    radius: number;
    speed: number;
    phase: number;
    tilt: number;
    incline: number;
  }[] = [];
  monolithGeos.forEach((geo, i) => {
    const solid = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color: 0x0d3a2a,
        metalness: 0.7,
        roughness: 0.25,
        emissive: accent,
        emissiveIntensity: 0.35,
        flatShading: true,
      }),
    );
    const wire = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color: 0x6ee7b7,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
    );
    wire.scale.setScalar(1.12);
    solid.add(wire);
    group.add(solid);
    orbits.push({
      mesh: solid,
      ring: null,
      radius: 6.2 + (i % 3) * 1.5,
      speed: 0.22 + (i % 3) * 0.07,
      phase: (i / monolithGeos.length) * Math.PI * 2,
      tilt: 0.28 + (i % 2) * 0.22,
      incline: (i % 3) * 0.15 - 0.15,
    });
  });
  // Visible orbit rings
  [6.2, 7.7, 9.2].forEach((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.015, 8, 128),
      new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.22,
      }),
    );
    ring.rotation.x = Math.PI / 2 - (0.28 + (i % 2) * 0.22);
    ring.rotation.z = i * 0.15 - 0.15;
    group.add(ring);
  });
  updaters.push((t) => {
    orbits.forEach((o) => {
      const a = o.phase + t * o.speed;
      const x = Math.cos(a) * o.radius;
      const z0 = Math.sin(a) * o.radius;
      // tilt the orbit plane
      const y = z0 * Math.sin(o.tilt) + Math.sin(a * 2) * 0.2;
      o.mesh.position.set(x, y * Math.cos(o.incline), z0 * Math.cos(o.tilt));
      o.mesh.rotation.y = a * 1.5;
      o.mesh.rotation.x = t * 0.5 + o.phase;
    });
  });

  /* ── Edge-network web (CDN nodes + links) ── */
  const nodeCount = Math.round(14 * q);
  const nodePos: any[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const a = (i / nodeCount) * Math.PI * 2;
    const r = 11 + Math.sin(i * 3.7) * 2.5;
    nodePos.push(
      new THREE.Vector3(
        Math.cos(a) * r,
        2.5 + Math.sin(i * 2.3) * 3.5,
        Math.sin(a) * r,
      ),
    );
  }
  const webPts: any[] = [];
  for (let i = 0; i < nodeCount; i++) {
    webPts.push(nodePos[i], nodePos[(i + 1) % nodeCount]);
    if (i % 2 === 0) webPts.push(nodePos[i], nodePos[(i + 3) % nodeCount]);
  }
  const web = lineSeg(THREE, webPts, accent, 0.14);
  group.add(web);
  const nodeArr = new Float32Array(nodeCount * 3);
  nodePos.forEach((p, i) => {
    nodeArr[i * 3] = p.x;
    nodeArr[i * 3 + 1] = p.y;
    nodeArr[i * 3 + 2] = p.z;
  });
  const nodes = makePoints(THREE, nodeArr, {
    color: 0x34d399,
    size: 0.45,
    map: glowTex,
    opacity: 0.9,
  });
  group.add(nodes);
  updaters.push((t) => {
    web.rotation.y = t * 0.03;
    nodes.rotation.y = t * 0.03;
    (nodes.material as any).opacity = 0.6 + Math.sin(t * 2.2) * 0.3;
  });

  /* ── LCP particle column — sub-second data rising ── */
  const colCount = Math.round(500 * q);
  const colPos = new Float32Array(colCount * 3);
  const colSpeed = new Float32Array(colCount);
  for (let i = 0; i < colCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.6) * 1.4;
    colPos[i * 3] = Math.cos(a) * r;
    colPos[i * 3 + 1] = Math.random() * 12 - 2;
    colPos[i * 3 + 2] = Math.sin(a) * r;
    colSpeed[i] = 2.2 + Math.random() * 3.5;
  }
  const column = makePoints(THREE, colPos, {
    color: 0xa7f3d0,
    size: 0.16,
    map: glowTex,
    opacity: 0.75,
  });
  group.add(column);
  updaters.push((t, dt) => {
    const attr = column.geometry.getAttribute("position");
    for (let i = 0; i < colCount; i++) {
      let y = attr.getY(i) + colSpeed[i] * dt;
      if (y > 10) y = -2;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  /* ── Ground: polar grid + glow disc ── */
  const polar = new THREE.PolarGridHelper(14, 12, 8, 64, accent, 0x064e3b);
  polar.position.y = -3.4;
  (polar.material as any).transparent = true;
  (polar.material as any).opacity = 0.28;
  group.add(polar);
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(4.4, 48),
    new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = -3.38;
  group.add(disc);
  updaters.push((t) => {
    polar.rotation.y = t * 0.05;
    disc.scale.setScalar(1 + Math.sin(t * 1.4) * 0.06);
  });

  /* ── Lighting ── */
  const p1 = new THREE.PointLight(accent, 90, 34, 2);
  p1.position.set(0, 4, 3);
  group.add(p1);
  const p2 = new THREE.PointLight(0x34d399, 50, 26, 2);
  p2.position.set(-6, -1, -4);
  group.add(p2);
  updaters.push((t) => {
    p1.intensity = 90 + Math.sin(t * 2.1) * 22;
  });

  return {
    group,
    update: (t: number, dt: number) => updaters.forEach((u) => u(t, dt)),
  };
}

/* ═══════════════════════════════════════════════════════════════
 * WORLD 2 — AI COMMAND CENTER (cyan)
 * Layered AI core + agent satellites with beam links + Fibonacci
 * neural lattice + double-helix data stream + radar scan pulses.
 * ═══════════════════════════════════════════════════════════════ */
function buildWorld2(THREE: any, glowTex: any, q: number) {
  const group = new THREE.Group();
  const accent = 0x06b6d4;
  const updaters: ((t: number, dt: number) => void)[] = [];

  /* ── Layered AI core ── */
  const core = new THREE.Group();
  const shellOuter = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.1, 1),
    new THREE.MeshBasicMaterial({
      color: accent,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    }),
  );
  core.add(shellOuter);
  const shellMid = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.35, 1),
    new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  core.add(shellMid);
  const nucleus = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 2),
    new THREE.MeshStandardMaterial({
      color: 0x0e7490,
      metalness: 0.4,
      roughness: 0.15,
      emissive: accent,
      emissiveIntensity: 2.2,
    }),
  );
  core.add(nucleus);
  const coreGlow = glowSprite(THREE, glowTex, 0x67e8f9, 11, 0.5);
  core.add(coreGlow);
  group.add(core);
  updaters.push((t) => {
    shellOuter.rotation.y = t * 0.18;
    shellOuter.rotation.x = Math.sin(t * 0.23) * 0.3;
    shellMid.rotation.y = -t * 0.28;
    nucleus.rotation.y = t * 0.5;
    const pulse = 1 + Math.sin(t * 2.4) * 0.09;
    nucleus.scale.setScalar(pulse);
    (coreGlow.material as any).opacity = 0.35 + Math.sin(t * 2.4) * 0.18;
  });

  /* ── Agent satellites with live beam links ── */
  const satCount = 5;
  const sats: {
    mesh: any;
    glow: any;
    beam: any;
    radius: number;
    speed: number;
    phase: number;
    tiltX: number;
    tiltZ: number;
  }[] = [];
  for (let i = 0; i < satCount; i++) {
    const mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.42, 0),
      new THREE.MeshStandardMaterial({
        color: 0x155e75,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x22d3ee,
        emissiveIntensity: 1.1,
        flatShading: true,
      }),
    );
    const glow = glowSprite(THREE, glowTex, 0x22d3ee, 2.2, 0.55);
    mesh.add(glow);
    group.add(mesh);
    const beamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    const beam = new THREE.Line(
      beamGeo,
      new THREE.LineBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(beam);
    sats.push({
      mesh,
      glow,
      beam,
      radius: 5.2 + i * 0.85,
      speed: 0.35 + (i % 3) * 0.14,
      phase: (i / satCount) * Math.PI * 2,
      tiltX: 0.35 + (i % 3) * 0.3,
      tiltZ: (i % 2) * 0.4 - 0.2,
    });
  }
  const v3tmp = new THREE.Vector3();
  updaters.push((t) => {
    sats.forEach((s) => {
      const a = s.phase + t * s.speed;
      v3tmp.set(Math.cos(a) * s.radius, 0, Math.sin(a) * s.radius);
      v3tmp.applyEuler(new THREE.Euler(s.tiltX, 0, s.tiltZ));
      s.mesh.position.copy(v3tmp);
      s.mesh.rotation.y = a * 2;
      const pos = s.beam.geometry.getAttribute("position");
      pos.setXYZ(0, 0, 0, 0);
      pos.setXYZ(1, v3tmp.x, v3tmp.y, v3tmp.z);
      pos.needsUpdate = true;
      (s.beam.material as any).opacity =
        0.22 + Math.abs(Math.sin(t * 3 + s.phase)) * 0.3;
    });
  });

  /* ── Fibonacci neural lattice ── */
  const latCount = Math.round(46 * q);
  const latRadius = 6.6;
  const latPts: any[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < latCount; i++) {
    const y = 1 - (i / (latCount - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    latPts.push(
      new THREE.Vector3(
        Math.cos(theta) * r * latRadius,
        y * latRadius,
        Math.sin(theta) * r * latRadius,
      ),
    );
  }
  const latLines: any[] = [];
  for (let i = 0; i < latCount; i++) {
    for (let j = i + 1; j < latCount; j++) {
      if (latPts[i].distanceTo(latPts[j]) < 3.1) {
        latLines.push(latPts[i], latPts[j]);
      }
    }
  }
  const lattice = new THREE.Group();
  lattice.add(lineSeg(THREE, latLines, accent, 0.12));
  const latArr = new Float32Array(latCount * 3);
  latPts.forEach((p, i) => {
    latArr[i * 3] = p.x;
    latArr[i * 3 + 1] = p.y;
    latArr[i * 3 + 2] = p.z;
  });
  lattice.add(
    makePoints(THREE, latArr, {
      color: 0x67e8f9,
      size: 0.4,
      map: glowTex,
      opacity: 0.85,
    }),
  );
  group.add(lattice);
  updaters.push((t) => {
    lattice.rotation.y = -t * 0.06;
    lattice.rotation.x = Math.sin(t * 0.15) * 0.12;
  });

  /* ── Double-helix data stream (crawl ingestion) ── */
  const helixCount = Math.round(220 * q);
  const helixPos = new Float32Array(helixCount * 2 * 3);
  const helix = makePoints(THREE, helixPos, {
    color: 0xa5f3fc,
    size: 0.15,
    map: glowTex,
    opacity: 0.8,
  });
  group.add(helix);
  const rungGeo = new THREE.BufferGeometry();
  const rungPositions = new Float32Array(14 * 2 * 3);
  rungGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(rungPositions, 3),
  );
  const rungs = new THREE.LineSegments(
    rungGeo,
    new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(rungs);
  updaters.push((t) => {
    const attr = helix.geometry.getAttribute("position");
    const h = 13;
    for (let i = 0; i < helixCount; i++) {
      const p = i / helixCount;
      const yy = p * h - h / 2;
      const ang = p * Math.PI * 7 + t * 1.1;
      const rr = 4.4;
      attr.setXYZ(
        i * 2,
        Math.cos(ang) * rr,
        yy,
        Math.sin(ang) * rr,
      );
      attr.setXYZ(
        i * 2 + 1,
        Math.cos(ang + Math.PI) * rr,
        yy,
        Math.sin(ang + Math.PI) * rr,
      );
    }
    attr.needsUpdate = true;
    const rp = rungs.geometry.getAttribute("position");
    for (let k = 0; k < 14; k++) {
      const p = (k + 0.5) / 14;
      const yy = p * h - h / 2;
      const ang = p * Math.PI * 7 + t * 1.1;
      rp.setXYZ(k * 2, Math.cos(ang) * 4.4, yy, Math.sin(ang) * 4.4);
      rp.setXYZ(
        k * 2 + 1,
        Math.cos(ang + Math.PI) * 4.4,
        yy,
        Math.sin(ang + Math.PI) * 4.4,
      );
    }
    rp.needsUpdate = true;
  });

  /* ── Radar scan pulses expanding from core ── */
  const pulses: any[] = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.96, 1, 64),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    group.add(ring);
    pulses.push(ring);
  }
  updaters.push((t) => {
    pulses.forEach((ring, i) => {
      const p = ((t * 0.35 + i / pulses.length) % 1 + 1) % 1;
      const s = 1 + p * 9;
      ring.scale.setScalar(s);
      (ring.material as any).opacity = (1 - p) * 0.45;
      ring.position.y = -0.2 + p * 0.4;
    });
  });

  /* ── Ground ── */
  const polar = new THREE.PolarGridHelper(14, 10, 7, 56, accent, 0x164e63);
  polar.position.y = -6.6;
  (polar.material as any).transparent = true;
  (polar.material as any).opacity = 0.22;
  group.add(polar);
  updaters.push((t) => {
    polar.rotation.y = -t * 0.04;
  });

  /* ── Lighting ── */
  const p1 = new THREE.PointLight(accent, 110, 38, 2);
  p1.position.set(0, 1.5, 0);
  group.add(p1);
  const p2 = new THREE.PointLight(0x22d3ee, 45, 26, 2);
  p2.position.set(7, 5, 5);
  group.add(p2);
  updaters.push((t) => {
    p1.intensity = 110 + Math.sin(t * 2.4) * 30;
  });

  return {
    group,
    update: (t: number, dt: number) => updaters.forEach((u) => u(t, dt)),
  };
}

/* ═══════════════════════════════════════════════════════════════
 * WORLD 3 — TELEMETRY MATRIX (purple)
 * Instanced equalizer skyscraper city + holographic dashboard
 * panels + tube line-chart arcs with travelling pulses + donut
 * chart + radar sweep + rising telemetry particles.
 * ═══════════════════════════════════════════════════════════════ */
function buildWorld3(THREE: any, glowTex: any, q: number) {
  const group = new THREE.Group();
  const accent = 0xa855f7;
  const updaters: ((t: number, dt: number) => void)[] = [];

  /* ── Equalizer skyscraper city (instanced) ── */
  const GRID = 8;
  const SPACING = 1.65;
  const count = GRID * GRID;
  const cityGeo = new THREE.BoxGeometry(1, 1, 1);
  cityGeo.translate(0, 0.5, 0); // grow from ground
  const cityMat = new THREE.MeshStandardMaterial({
    color: 0x2b1055,
    metalness: 0.65,
    roughness: 0.3,
    emissive: accent,
    emissiveIntensity: 0.5,
  });
  const city = new THREE.InstancedMesh(cityGeo, cityMat, count);
  city.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(city);
  // Sparkle caps on column tops
  const capPos = new Float32Array(count * 3);
  const caps = makePoints(THREE, capPos, {
    color: 0xd8b4fe,
    size: 0.32,
    map: glowTex,
    opacity: 0.85,
  });
  group.add(caps);
  const m4 = new THREE.Matrix4();
  const colHeights = new Float32Array(count);
  const half = ((GRID - 1) * SPACING) / 2;
  updaters.push((t) => {
    let i = 0;
    for (let gx = 0; gx < GRID; gx++) {
      for (let gz = 0; gz < GRID; gz++) {
        const x = gx * SPACING - half;
        const z = gz * SPACING - half;
        const d = Math.sqrt(x * x + z * z);
        const h =
          1.2 +
          Math.abs(
            Math.sin(t * 1.4 + d * 0.9) * 2.6 +
              Math.sin(t * 0.8 + gx * 1.3) * 1.3 +
              Math.cos(t * 1.1 + gz * 0.9) * 1.1,
          );
        colHeights[i] = h;
        m4.makeScale(1, h, 1);
        m4.setPosition(x, -4.2, z);
        city.setMatrixAt(i, m4);
        capPos[i * 3] = x;
        capPos[i * 3 + 1] = -4.2 + h;
        capPos[i * 3 + 2] = z;
        i++;
      }
    }
    city.instanceMatrix.needsUpdate = true;
    caps.geometry.getAttribute("position").needsUpdate = true;
  });

  /* ── Holographic dashboard panels ── */
  const panelDefs = [
    { pos: [-7.6, 2.4, -1.5], rotY: 0.65, w: 4.6, h: 2.9 },
    { pos: [7.4, 3.2, -2.5], rotY: -0.6, w: 4.2, h: 2.6 },
    { pos: [0.5, 5.4, -6.5], rotY: 0.08, w: 5.2, h: 3.1 },
  ];
  panelDefs.forEach((def, pi) => {
    const panel = new THREE.Group();
    // translucent fill
    panel.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(def.w, def.h),
        new THREE.MeshBasicMaterial({
          color: accent,
          transparent: true,
          opacity: 0.06,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );
    // glowing frame
    panel.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(def.w, def.h)),
        new THREE.LineBasicMaterial({
          color: 0xc084fc,
          transparent: true,
          opacity: 0.8,
        }),
      ),
    );
    // mini bar chart
    const bars = 7;
    for (let b = 0; b < bars; b++) {
      const bh = 0.4 + Math.abs(Math.sin(b * 1.7 + pi)) * (def.h * 0.45);
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(def.w / (bars * 1.7), bh, 0.02),
        new THREE.MeshBasicMaterial({
          color: b % 2 ? 0xc084fc : accent,
          transparent: true,
          opacity: 0.75,
        }),
      );
      bar.position.set(
        -def.w / 2 + ((b + 0.75) / bars) * def.w,
        -def.h / 2 + bh / 2 + 0.25,
        0.02,
      );
      panel.add(bar);
    }
    // mini trend line
    const linePts = [];
    for (let s = 0; s <= 16; s++) {
      linePts.push(
        new THREE.Vector3(
          -def.w / 2 + (s / 16) * def.w,
          Math.sin(s * 0.8 + pi * 2) * def.h * 0.18 + def.h * 0.22,
          0.03,
        ),
      );
    }
    panel.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(linePts),
        new THREE.LineBasicMaterial({
          color: 0xe9d5ff,
          transparent: true,
          opacity: 0.9,
        }),
      ),
    );
    panel.position.set(def.pos[0], def.pos[1], def.pos[2]);
    panel.rotation.y = def.rotY;
    group.add(panel);
    updaters.push((t) => {
      panel.position.y = def.pos[1] + Math.sin(t * 0.8 + pi * 2.1) * 0.28;
      panel.rotation.y = def.rotY + Math.sin(t * 0.4 + pi) * 0.06;
    });
  });

  /* ── Tube line-chart arcs with travelling pulses ── */
  const arcDefs = [
    { y: 1.2, amp: 1.4, phase: 0, color: 0xc084fc },
    { y: 2.6, amp: 1.0, phase: 2.1, color: accent },
  ];
  arcDefs.forEach((ad) => {
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const p = i / 24;
      pts.push(
        new THREE.Vector3(
          -8 + p * 16,
          ad.y + Math.sin(p * Math.PI * 3 + ad.phase) * ad.amp,
          -1.5 + Math.cos(p * Math.PI * 2 + ad.phase) * 1.6,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 96, 0.045, 8, false),
      new THREE.MeshBasicMaterial({
        color: ad.color,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(tube);
    const pulse = glowSprite(THREE, glowTex, ad.color, 1.6, 0.95);
    group.add(pulse);
    updaters.push((t) => {
      const p = (t * 0.12 + ad.phase * 0.1) % 1;
      const pos = curve.getPoint(p);
      pulse.position.copy(pos);
    });
  });

  /* ── Donut chart ── */
  const donut = new THREE.Group();
  const seg1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.34, 12, 64, Math.PI * 1.25),
    new THREE.MeshStandardMaterial({
      color: 0x7e22ce,
      metalness: 0.5,
      roughness: 0.25,
      emissive: accent,
      emissiveIntensity: 0.8,
    }),
  );
  donut.add(seg1);
  const seg2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.34, 12, 40, Math.PI * 0.75),
    new THREE.MeshStandardMaterial({
      color: 0x3b0764,
      metalness: 0.5,
      roughness: 0.25,
      emissive: 0xd8b4fe,
      emissiveIntensity: 0.6,
    }),
  );
  seg2.rotation.z = Math.PI * 1.3;
  donut.add(seg2);
  donut.position.set(-5.8, 4.6, -7);
  donut.rotation.set(0.5, 0.4, 0);
  group.add(donut);
  updaters.push((t) => {
    donut.rotation.z = t * 0.25;
    donut.position.y = 4.6 + Math.sin(t * 0.7) * 0.3;
  });

  /* ── Radar sweep on the ground ── */
  const radar = new THREE.Group();
  for (let r = 1; r <= 3; r++) {
    radar.add(
      new THREE.Mesh(
        new THREE.RingGeometry(r * 2 - 0.03, r * 2, 48),
        new THREE.MeshBasicMaterial({
          color: accent,
          transparent: true,
          opacity: 0.22,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );
  }
  const wedge = new THREE.Mesh(
    new THREE.CircleGeometry(6, 32, 0, 0.55),
    new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  radar.add(wedge);
  radar.rotation.x = -Math.PI / 2;
  radar.position.y = -4.15;
  group.add(radar);
  updaters.push((t) => {
    wedge.rotation.z = t * 0.9;
  });

  /* ── Rising telemetry particles ── */
  const telCount = Math.round(450 * q);
  const telPos = new Float32Array(telCount * 3);
  const telSpeed = new Float32Array(telCount);
  for (let i = 0; i < telCount; i++) {
    telPos[i * 3] = (Math.random() - 0.5) * 18;
    telPos[i * 3 + 1] = Math.random() * 14 - 4.2;
    telPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    telSpeed[i] = 0.6 + Math.random() * 1.6;
  }
  const telemetry = makePoints(THREE, telPos, {
    color: 0xd8b4fe,
    size: 0.14,
    map: glowTex,
    opacity: 0.6,
  });
  group.add(telemetry);
  updaters.push((t, dt) => {
    const attr = telemetry.geometry.getAttribute("position");
    for (let i = 0; i < telCount; i++) {
      let y = attr.getY(i) + telSpeed[i] * dt;
      if (y > 10) y = -4.2;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });

  /* ── Ground grid ── */
  const grid = new THREE.GridHelper(26, 26, accent, 0x3b0764);
  grid.position.y = -4.25;
  (grid.material as any).transparent = true;
  (grid.material as any).opacity = 0.24;
  group.add(grid);

  /* ── Lighting ── */
  const p1 = new THREE.PointLight(accent, 100, 36, 2);
  p1.position.set(0, 5, 2);
  group.add(p1);
  const p2 = new THREE.PointLight(0xc084fc, 55, 28, 2);
  p2.position.set(-6, 2, -6);
  group.add(p2);
  updaters.push((t) => {
    p1.intensity = 100 + Math.sin(t * 1.7) * 25;
  });

  return {
    group,
    update: (t: number, dt: number) => updaters.forEach((u) => u(t, dt)),
  };
}

/* ═══════════════════════════════════════════════════════════════
 * UNIVERSE GLUE — starfield, particle rivers, wormhole gates
 * ═══════════════════════════════════════════════════════════════ */

function buildStarfield(THREE: any, glowTex: any, q: number) {
  const count = Math.round(2400 * q);
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const palette = [
    new THREE.Color(0xffffff),
    new THREE.Color(0x6ee7b7),
    new THREE.Color(0x67e8f9),
    new THREE.Color(0xd8b4fe),
    new THREE.Color(0x93c5fd),
  ];
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 90;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 55;
    pos[i * 3 + 2] = 24 - Math.random() * 100;
    const c = palette[Math.floor(Math.random() * palette.length)];
    const dim = 0.35 + Math.random() * 0.65;
    col[i * 3] = c.r * dim;
    col[i * 3 + 1] = c.g * dim;
    col[i * 3 + 2] = c.b * dim;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  const stars = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.22,
      map: glowTex,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
  return stars;
}

// Glowing particle rivers flowing along the whole journey
function buildStreams(THREE: any, glowTex: any, q: number) {
  const streams: {
    points: any;
    curve: any;
    count: number;
    speed: number;
  }[] = [];
  const defs = [
    { color: 0x34d399, off: 0.0, rad: 7.5, turns: 2.2, speed: 26 },
    { color: 0x22d3ee, off: 2.1, rad: 9.5, turns: 2.8, speed: 20 },
    { color: 0xc084fc, off: 4.2, rad: 8.5, turns: 2.5, speed: 23 },
    { color: 0x93c5fd, off: 1.1, rad: 12.0, turns: 1.8, speed: 17 },
  ];
  defs.forEach((d) => {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const p = i / 40;
      const z = 18 - p * 80;
      const a = p * Math.PI * d.turns * 2 + d.off;
      pts.push(
        new THREE.Vector3(
          Math.cos(a) * d.rad,
          Math.sin(a * 1.3) * (d.rad * 0.45),
          z,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const count = Math.round(340 * q);
    const arr = new Float32Array(count * 3);
    const points = makePoints(THREE, arr, {
      color: d.color,
      size: 0.2,
      map: glowTex,
      opacity: 0.55,
    });
    streams.push({ points, curve, count, speed: d.speed });
  });
  const group = new THREE.Group();
  streams.forEach((s) => group.add(s.points));
  return {
    group,
    update: (t: number) => {
      streams.forEach((s) => {
        const attr = s.points.geometry.getAttribute("position");
        for (let i = 0; i < s.count; i++) {
          const p = (i / s.count + t / s.speed) % 1;
          const pos = s.curve.getPoint(p);
          attr.setXYZ(i, pos.x, pos.y, pos.z);
        }
        attr.needsUpdate = true;
      });
    },
  };
}

// Wormhole gate — stacked rotating rings + swirling particle disc
function buildGate(THREE: any, glowTex: any, color: number, q: number) {
  const group = new THREE.Group();
  const updaters: ((t: number) => void)[] = [];
  const ringRadii = [4.6, 5.3, 6.0];
  ringRadii.forEach((r, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.06 + i * 0.02, 10, 72),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.55 - i * 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(ring);
    updaters.push((t) => {
      ring.rotation.z = t * (0.3 + i * 0.18) * (i % 2 ? -1 : 1);
      (ring.material as any).opacity =
        0.4 - i * 0.1 + Math.sin(t * 2 + i) * 0.12;
    });
  });
  // swirl disc
  const count = Math.round(300 * q);
  const pos = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 2); // angle, radius
  for (let i = 0; i < count; i++) {
    seeds[i * 2] = Math.random() * Math.PI * 2;
    seeds[i * 2 + 1] = 1.2 + Math.random() * 4.4;
  }
  const swirl = makePoints(THREE, pos, {
    color,
    size: 0.2,
    map: glowTex,
    opacity: 0.7,
  });
  group.add(swirl);
  updaters.push((t) => {
    const attr = swirl.geometry.getAttribute("position");
    for (let i = 0; i < count; i++) {
      const a = seeds[i * 2] + t * (1.6 - seeds[i * 2 + 1] * 0.16);
      const r = seeds[i * 2 + 1];
      attr.setXYZ(
        i,
        Math.cos(a) * r,
        Math.sin(a) * r,
        Math.sin(a * 3 + t) * 0.35,
      );
    }
    attr.needsUpdate = true;
  });
  const gateGlow = glowSprite(THREE, glowTex, color, 12, 0.22);
  group.add(gateGlow);
  updaters.push((t) => {
    (gateGlow.material as any).opacity = 0.16 + Math.sin(t * 1.8) * 0.07;
  });
  return {
    group,
    update: (t: number) => updaters.forEach((u) => u(t)),
  };
}

/* ═══════════════════════════════════════════════════════════════
 * ScrollServicesWorld — Main Component
 * ═══════════════════════════════════════════════════════════════ */

export default function ScrollServicesWorld() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [flightPct, setFlightPct] = useState(0);

  const smoothRef = useRef(0);
  const activeIdxRef = useRef(-1);
  const pctRef = useRef(-1);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerSmoothRef = useRef({ x: 0, y: 0 });
  const threeCleanupRef = useRef<(() => void) | null>(null);

  /* ── Pointer parallax (fine pointers only) ── */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* ── Three.js lifecycle ── */
  useEffect(() => {
    let disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed || !canvasContainerRef.current) return;

      const container = canvasContainerRef.current;
      const isMobile = container.clientWidth < 768;
      const q = isMobile ? 0.55 : 1; // particle quality scale

      // ── Renderer ──
      const renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, isMobile ? 1.75 : 2),
      );
      renderer.setClearColor(0x050508, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);

      // ── Camera ──
      const camera = new THREE.PerspectiveCamera(
        isMobile ? 66 : 56,
        container.clientWidth / container.clientHeight,
        0.1,
        240,
      );

      // ── Scene ──
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050508, 0.014);

      // Per-zone atmosphere colours (deep space tints)
      const zoneColors = [
        new THREE.Color(0x03130d), // emerald space
        new THREE.Color(0x02141b), // cyan space
        new THREE.Color(0x0e0618), // purple space
      ];
      const bgColor = new THREE.Color(0x03130d);

      // ── Base lighting ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
      keyLight.position.set(6, 12, 10);
      scene.add(keyLight);

      // ── Glow texture shared by all point clouds ──
      const glowTex = makeRadialTexture(THREE);

      // ── Build the three worlds ──
      const w1 = buildWorld1(THREE, glowTex, q);
      w1.group.position.z = WORLD_Z[0];
      scene.add(w1.group);
      const w2 = buildWorld2(THREE, glowTex, q);
      w2.group.position.z = WORLD_Z[1];
      scene.add(w2.group);
      const w3 = buildWorld3(THREE, glowTex, q);
      w3.group.position.z = WORLD_Z[2];
      scene.add(w3.group);

      // ── Universe glue ──
      const stars = buildStarfield(THREE, glowTex, q);
      scene.add(stars);
      const rivers = buildStreams(THREE, glowTex, q);
      scene.add(rivers.group);
      const gate1 = buildGate(THREE, glowTex, 0x2dd4bf, q);
      gate1.group.position.set(0, 0.6, GATE_Z[0]);
      scene.add(gate1.group);
      const gate2 = buildGate(THREE, glowTex, 0x818cf8, q);
      gate2.group.position.set(0, 0.6, GATE_Z[1]);
      scene.add(gate2.group);

      // ── Camera flight path — serpentine through all 3 worlds ──
      const camCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.5, 17),
        new THREE.Vector3(7, 3.0, 9),
        new THREE.Vector3(8, 0.6, 0), // close pass — W1
        new THREE.Vector3(3, -2.0, -8),
        new THREE.Vector3(0, 0.6, -13), // GATE 1
        new THREE.Vector3(-6, 2.6, -19),
        new THREE.Vector3(-8, 0.8, -26), // close pass — W2
        new THREE.Vector3(-2, -2.2, -33),
        new THREE.Vector3(0, 0.6, -39), // GATE 2
        new THREE.Vector3(6, 2.6, -45),
        new THREE.Vector3(8, 1.0, -52), // close pass — W3
        new THREE.Vector3(0, 1.8, -62), // finale pull-back
      ]);
      const lookCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.8, 2),
        new THREE.Vector3(0, 0.6, 0), // W1
        new THREE.Vector3(0, 0.7, -7),
        new THREE.Vector3(0, 0.7, -13), // gate 1
        new THREE.Vector3(0, 0.8, -20),
        new THREE.Vector3(0, 0.8, -26), // W2
        new THREE.Vector3(0, 0.7, -33),
        new THREE.Vector3(0, 0.7, -39), // gate 2
        new THREE.Vector3(0, 0.8, -46),
        new THREE.Vector3(0, 0.6, -52), // W3
        new THREE.Vector3(0, 0.4, -58),
      ]);

      // ── Sizing ──
      const updateSize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.fov = w < 768 ? 66 : 56;
        camera.updateProjectionMatrix();
      };
      updateSize();
      const ro = new ResizeObserver(updateSize);
      ro.observe(container);

      // ── Pause when offscreen ──
      let onScreen = true;
      const io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0 },
      );
      io.observe(container);

      // ── Animation loop ──
      let raf = 0;
      const timer = new THREE.Timer();
      const camPos = new THREE.Vector3();
      const lookPos = new THREE.Vector3();
      const tangent = new THREE.Vector3();
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!onScreen) return;
        timer.update();
        const dt = Math.min(timer.getDelta(), 0.05);
        const t = timer.getElapsed();
        const section = sectionRef.current;
        if (!section) return;

        // ── Scroll progress along the track ──
        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const raw = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
        // Map into [HUD_ZONE, 1 - HUD_ZONE] so first/last worlds hold
        const mapped = HUD_ZONE + raw * (1 - HUD_ZONE * 2);
        smoothRef.current +=
          (mapped - smoothRef.current) * (reduced ? 1 : 0.075);
        const sp = clamp(smoothRef.current, 0, 1);

        // ── Pointer parallax (smoothed) ──
        pointerSmoothRef.current.x +=
          (pointerRef.current.x - pointerSmoothRef.current.x) * 0.05;
        pointerSmoothRef.current.y +=
          (pointerRef.current.y - pointerSmoothRef.current.y) * 0.05;

        // ── Camera flight ──
        camCurve.getPoint(sp, camPos);
        lookCurve.getPoint(sp, lookPos);
        camPos.x += pointerSmoothRef.current.x * 0.9;
        camPos.y += -pointerSmoothRef.current.y * 0.55;
        camera.position.copy(camPos);
        lookPos.x += pointerSmoothRef.current.x * 1.6;
        lookPos.y += -pointerSmoothRef.current.y * 0.9;
        camera.lookAt(lookPos);
        // Subtle banking into turns
        camCurve.getTangent(sp, tangent);
        camera.rotateZ(clamp(tangent.x * -0.22, -0.16, 0.16));

        // ── Atmosphere: lerp fog / bg colour by zone ──
        const zoneF = sp * (N - 1);
        const zi = clamp(Math.floor(zoneF), 0, N - 2);
        const zfrac = smoothstep(clamp(zoneF - zi, 0, 1));
        bgColor.copy(zoneColors[zi]).lerp(zoneColors[zi + 1], zfrac);
        renderer.setClearColor(bgColor, 1);
        (scene.fog as any).color.copy(bgColor);

        // ── Active world (for HUD) ──
        const idx = clamp(Math.round(zoneF), 0, N - 1);
        if (idx !== activeIdxRef.current) {
          activeIdxRef.current = idx;
          setActiveIdx(idx);
        }
        const pct = Math.round(raw * 100);
        if (pct !== pctRef.current) {
          pctRef.current = pct;
          setFlightPct(pct);
        }

        // ── Animate worlds + universe ──
        w1.update(t, dt);
        w2.update(t, dt);
        w3.update(t, dt);
        rivers.update(t);
        gate1.update(t);
        gate2.update(t);
        stars.rotation.y = t * 0.004;

        renderer.render(scene, camera);
      };
      tick();

      // ── Cleanup ──
      const cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        scene.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            const mats = Array.isArray(obj.material)
              ? obj.material
              : [obj.material];
            mats.forEach((m: any) => {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          }
        });
        glowTex.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
      threeCleanupRef.current = cleanup;
    })();

    return () => {
      disposed = true;
      threeCleanupRef.current?.();
      threeCleanupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Scroll to world ── */
  const scrollToWorld = useCallback((idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const target =
      window.scrollY +
      rect.top +
      ((idx / (N - 1) - HUD_ZONE) / (1 - HUD_ZONE * 2)) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const activeWorld = SERVICE_WORLDS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="services-3d-world"
      aria-label="Interactive 3D services universe"
      className="snap-section relative w-full h-[500vh] bg-[#050508]"
    >
      {/* Inline HUD keyframes */}
      <style>{`
        @keyframes hud-in {
          from { opacity: 0; transform: translateY(18px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
        @keyframes warp-flash {
          0%   { opacity: 0; }
          18%  { opacity: 0.5; }
          100% { opacity: 0; }
        }
        @keyframes scroll-hint-bob {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%      { transform: translateY(7px); opacity: 1; }
        }
        .hud-in { animation: hud-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-svh overflow-hidden select-none">
        {/* Three.js WebGL canvas container */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0"
          style={{ touchAction: "pan-y" }}
        />

        {/* Warp flash on world transition */}
        <div
          key={`warp-${activeIdx}`}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${activeWorld.accentColor}26 0%, transparent 65%)`,
            animation: "warp-flash 0.9s ease-out both",
          }}
        />

        {/* ── Badge annotations ── */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
          {BADGE_DEFS.map((badge, i) => {
            const isVisible = badge.worldIdx === activeIdx;
            return (
              <div
                key={i}
                className={`absolute transition-all duration-700 ease-out ${badge.anchor.x} ${badge.anchor.y} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                }`}
              >
                <div
                  className="px-4 py-2.5 rounded-xl border backdrop-blur-md font-mono text-[11px] text-left shadow-2xl max-w-[230px]"
                  style={{
                    backgroundColor: "rgba(5,5,10,0.72)",
                    borderColor: `${badge.accent}55`,
                    boxShadow: `0 0 24px ${badge.accent}22`,
                  }}
                >
                  <div
                    className="font-semibold tracking-wide"
                    style={{ color: badge.accent }}
                  >
                    {badge.label}
                  </div>
                  <div className="text-white/50 mt-0.5 leading-snug">
                    {badge.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Top HUD: world indicator + universe label ── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-start justify-between px-4 md:px-8 pt-16 md:pt-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-[#0a0a10]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-xl max-w-[70vw]">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{
                backgroundColor: activeWorld.accentColor,
                boxShadow: `0 0 8px ${activeWorld.accentColor}`,
              }}
            />
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-white/70 truncate">
              {activeWorld.worldNumber}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-[#0a0a10]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-xl">
            {SERVICE_WORLDS.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => scrollToWorld(idx)}
                aria-label={`Fly to ${w.shortName}`}
                className={`pointer-events-auto px-2.5 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
                  idx === activeIdx
                    ? "bg-white/15 text-white border border-white/25"
                    : "text-white/40 hover:text-white/70 border border-transparent"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* ── Left HUD: service intel panel ── */}
        <div className="absolute z-30 left-4 md:left-8 right-4 md:right-auto bottom-[88px] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:max-w-md pointer-events-none">
          <div key={`panel-${activeIdx}`} className="hud-in">
            <div
              className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase mb-2"
              style={{ color: activeWorld.accentColor }}
            >
              {activeWorld.category}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.05] tracking-tight mb-3">
              {activeWorld.title}
            </h2>
            <p className="hidden md:block text-sm text-white/55 leading-relaxed mb-5 max-w-sm">
              {activeWorld.description}
            </p>
            <div className="flex items-end gap-6 mb-4">
              <div>
                <div
                  className="text-4xl md:text-6xl font-black tracking-tighter"
                  style={{
                    color: activeWorld.accentColor,
                    textShadow: `0 0 32px ${activeWorld.accentColor}66`,
                  }}
                >
                  {activeWorld.metric}
                </div>
                <div className="text-[10px] md:text-[11px] font-mono text-white/45 mt-1 max-w-[180px] leading-snug">
                  {activeWorld.metricLabel}
                </div>
              </div>
              <div
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono mb-1"
                style={{
                  borderColor: `${activeWorld.accentColor}55`,
                  color: activeWorld.accentColor,
                  backgroundColor: `${activeWorld.accentColor}0f`,
                }}
              >
                ◆ {activeWorld.badge}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeWorld.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] md:text-[11px] font-mono text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right rail: world nav (desktop) ── */}
        <div className="absolute z-30 right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-0 pointer-events-auto">
          {SERVICE_WORLDS.map((w, idx) => (
            <div key={w.id} className="flex flex-col items-center">
              <button
                onClick={() => scrollToWorld(idx)}
                className="group flex items-center gap-3 py-2"
                aria-label={`Fly to ${w.shortName}`}
              >
                <span
                  className={`text-[9px] font-mono tracking-widest transition-all duration-300 ${
                    idx === activeIdx
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-60"
                  }`}
                  style={{ color: w.accentColor }}
                >
                  {w.shortName}
                </span>
                <span
                  className={`rounded-full transition-all duration-300 ${
                    idx === activeIdx ? "w-3 h-3" : "w-2 h-2"
                  }`}
                  style={{
                    backgroundColor:
                      idx === activeIdx ? w.accentColor : "rgba(255,255,255,0.2)",
                    boxShadow:
                      idx === activeIdx ? `0 0 12px ${w.accentColor}` : "none",
                  }}
                />
              </button>
              {idx < N - 1 && (
                <div className="w-px h-8 bg-gradient-to-b from-white/25 to-white/5" />
              )}
            </div>
          ))}
        </div>

        {/* ── Bottom HUD: flight progress + scroll hint ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-4 md:px-8 pb-5 md:pb-6 pointer-events-none">
          {flightPct < 3 && (
            <div className="flex justify-center mb-4">
              <div
                className="flex flex-col items-center gap-1 text-white/60"
                style={{ animation: "scroll-hint-bob 1.8s ease-in-out infinite" }}
              >
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
                  Scroll to fly
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 max-w-3xl mx-auto">
            <span className="text-[9px] md:text-[10px] font-mono text-white/40 tracking-widest uppercase shrink-0">
              Flight
            </span>
            <div className="relative flex-1 h-[3px] bg-white/10 rounded-full">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-150"
                style={{
                  width: `${flightPct}%`,
                  background: `linear-gradient(90deg, #10B981, #06B6D4 50%, #A855F7)`,
                  boxShadow: `0 0 12px ${activeWorld.accentColor}88`,
                }}
              />
              {[0, 50, 100].map((p, i) => (
                <span
                  key={p}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full border transition-all duration-300"
                  style={{
                    left: `${p}%`,
                    backgroundColor:
                      flightPct >= p ? SERVICE_WORLDS[i]?.accentColor : "#0a0a10",
                    borderColor: `${SERVICE_WORLDS[i]?.accentColor}88`,
                    boxShadow:
                      flightPct >= p
                        ? `0 0 8px ${SERVICE_WORLDS[i]?.accentColor}`
                        : "none",
                  }}
                />
              ))}
            </div>
            <span
              className="text-[10px] md:text-xs font-mono shrink-0 tabular-nums"
              style={{ color: activeWorld.accentColor }}
            >
              {String(flightPct).padStart(3, "0")}%
            </span>
          </div>
        </div>

        {/* ── Cinematic vignette ── */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.5)_100%)]" />
      </div>
    </section>
  );
}
