"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
 * ScrollServicesWorld — True Three.js WebGL 3D World
 *
 * Architecture:
 * - 400vh scroll track with a sticky 100svh viewport.
 * - A single THREE.WebGLRenderer + THREE.PerspectiveCamera + THREE.Scene
 *   renders three distinct 3D worlds positioned along the Z axis.
 * - Scroll progress drives smooth camera.position interpolation
 *   and camera.lookAt targeting.
 * - Three Worlds:
 *   W1 — Wireframe storefront geometry + glowing vertex nodes + emerald particles
 *   W2 — Glowing AI Core orb (wireframe + inner mesh) + orbiting satellites + line beams
 *   W3 — Holographic column matrix + dynamic heights + data particles
 * - HTML annotation badges overlay the canvas with fade transitions.
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
      "Engineered storefronts that bypass page-builder bloat — sub-second loads, zero layout shift, and full editorial freedom via headless architecture.",
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
const WORLD_SPACING = 22; // Z distance between world centres
const HUD_ZONE = 0.07;
const CAMERA_OFFSET = 12; // camera sits this far ahead of focal point

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/* ── Badge annotation overlays (HTML over WebGL) ────────────── */
interface BadgeAnnotation {
  label: string;
  detail: string;
  worldIdx: number;
  anchor: { x: string; y: string }; // CSS positioning relative to viewport
}

const BADGE_DEFS: BadgeAnnotation[] = [
  {
    label: "⚡ 98+ Lighthouse",
    detail: "Performance · A11y · SEO · Best Practices",
    worldIdx: 0,
    anchor: { x: "left-[8%]", y: "top-[18%]" },
  },
  {
    label: "🚀 0.4s LCP",
    detail: "Edge-cached Dawn sections · 14KB payload",
    worldIdx: 0,
    anchor: { x: "right-[8%]", y: "bottom-[28%]" },
  },
  {
    label: "🤖 Crawl4AI Engine",
    detail: "LLM-ready markdown + structured JSON extraction",
    worldIdx: 1,
    anchor: { x: "right-[8%]", y: "top-[22%]" },
  },
  {
    label: "🧠 Vector DB Sync",
    detail: "1,420 docs indexed · semantic retrieval",
    worldIdx: 1,
    anchor: { x: "left-[8%]", y: "bottom-[25%]" },
  },
  {
    label: "📊 <0.2s Stream Latency",
    detail: "Real-time telemetry · live data ingestion",
    worldIdx: 2,
    anchor: { x: "left-[10%]", y: "top-[20%]" },
  },
  {
    label: "📈 Power BI Dashboards",
    detail: "Executive views · Pine Script quant indicators",
    worldIdx: 2,
    anchor: { x: "right-[10%]", y: "bottom-[30%]" },
  },
];

/* ═══════════════════════════════════════════════════════════════
 * World Builder Functions
 * Each creates a THREE.Group with the 3D geometry for one world.
 * ═══════════════════════════════════════════════════════════════ */

function buildWorld1(THREE: any) {
  const group = new THREE.Group();
  const accent = new THREE.Color(0x10b981);
  const clock = new THREE.Clock();
  const animatedObjects: { update: (t: number) => void }[] = [];

  // ── Wireframe store geometry ──
  // Front wall
  const frontWallGeo = new THREE.BoxGeometry(6, 4, 0.15);
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const frontWall = new THREE.Mesh(frontWallGeo, wireframeMat);
  frontWall.position.set(0, 0, 1);
  group.add(frontWall);

  // Roof (inverted V)
  const roofGeo = new THREE.ConeGeometry(4.2, 2.2, 4);
  const roofMat = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 3.1, 1);
  roof.rotation.y = Math.PI / 4;
  group.add(roof);

  // Side panels
  const sideGeo = new THREE.BoxGeometry(0.15, 4, 6);
  const sideL = new THREE.Mesh(sideGeo, wireframeMat.clone());
  sideL.position.set(-3, 0, -2);
  group.add(sideL);
  const sideR = new THREE.Mesh(sideGeo, wireframeMat.clone());
  sideR.position.set(3, 0, -2);
  group.add(sideR);

  // Back wall
  const backGeo = new THREE.BoxGeometry(6, 4, 0.15);
  const backWall = new THREE.Mesh(backGeo, wireframeMat.clone());
  backWall.position.set(0, 0, -5);
  group.add(backWall);

  // Floor plane
  const floorGeo = new THREE.PlaneGeometry(6, 6);
  const floorMat = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2, -2);
  group.add(floor);

  // ── Glowing vertex nodes ──
  const nodePositions: [number, number, number][] = [
    [-3, 2, 1], [3, 2, 1], [-3, -2, 1], [3, -2, 1],
    [0, 4.2, 1], [-3, 2, -5], [3, 2, -5], [-3, -2, -5], [3, -2, -5],
    [0, -2, 1], [0, 2, -5], [-3, 0, -5], [3, 0, -5],
  ];
  const nodeSpheres: THREE.Mesh[] = [];
  nodePositions.forEach((pos) => {
    const geo = new THREE.SphereGeometry(0.12, 8, 8);
    const mat = new THREE.MeshBasicMaterial({ color: accent });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    group.add(mesh);
    nodeSpheres.push(mesh);
  });
  animatedObjects.push({
    update(t: number) {
      nodeSpheres.forEach((s, i) => {
        const s2 = 1 + 0.35 * Math.sin(t * 2 + i * 0.8);
        s.scale.setScalar(s2);
      });
    },
  });

  // ── Emerald particle field ──
  const particleCount = 300;
  const pPositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 14;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
  const pMat = new THREE.PointsMaterial({
    color: accent,
    size: 0.08,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particles = new THREE.Points(pGeo, pMat);
  group.add(particles);
  animatedObjects.push({
    update(t: number) {
      const pos = particles.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pos.array[i * 3 + 1] += Math.sin(t + i * 0.1) * 0.002;
      }
      pos.needsUpdate = true;
      particles.rotation.y = t * 0.05;
    },
  });

  // ── Point lights for glow ──
  const pl1 = new THREE.PointLight(0x10b981, 2, 12);
  pl1.position.set(0, 2, 2);
  group.add(pl1);

  return { group, animatedObjects, clock };
}

function buildWorld2(THREE: any) {
  const group = new THREE.Group();
  const accent = new THREE.Color(0x06b6d4);
  const animatedObjects: { update: (t: number) => void }[] = [];

  // ── AI Core orb — outer wireframe ──
  const coreOuterGeo = new THREE.IcosahedronGeometry(2.5, 1);
  const coreOuterMat = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });
  const coreOuter = new THREE.Mesh(coreOuterGeo, coreOuterMat);
  group.add(coreOuter);

  // ── AI Core orb — inner solid mesh ──
  const coreInnerGeo = new THREE.IcosahedronGeometry(1.2, 2);
  const coreInnerMat = new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.3,
    roughness: 0.3,
    metalness: 0.8,
  });
  const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
  group.add(coreInner);

  // ── Orbiting satellite nodes ──
  const satelliteCount = 8;
  const satellites: {
    mesh: THREE.Mesh;
    angle: number;
    radius: number;
    speed: number;
    yOffset: number;
  }[] = [];

  for (let i = 0; i < satelliteCount; i++) {
    const geo = new THREE.OctahedronGeometry(0.2, 0);
    const mat = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.8,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const radius = 3.5 + Math.random() * 1.5;
    const angle = (i / satelliteCount) * Math.PI * 2;
    const speed = 0.3 + Math.random() * 0.4;
    const yOffset = (Math.random() - 0.5) * 2;
    satellites.push({ mesh, angle, radius, speed, yOffset });
    group.add(mesh);
  }

  // ── Connecting line beams ──
  const lineGroup = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.3,
  });
  const lines: THREE.Line[] = [];
  for (let i = 0; i < satelliteCount; i++) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(6); // 2 points * 3 components
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const line = new THREE.Line(geo, lineMat.clone());
    lines.push(line);
    lineGroup.add(line);
  }
  group.add(lineGroup);

  // ── Orbit rings ──
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.RingGeometry(3.2 + i * 0.8, 3.25 + i * 0.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.08 + i * 0.02,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + (i - 1) * 0.15;
    ring.rotation.z = i * 0.3;
    group.add(ring);
  }

  // ── Data particle field ──
  const pCount = 200;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4 + Math.random() * 6;
    pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i * 3 + 2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: accent,
    size: 0.06,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particleField = new THREE.Points(pGeo, pMat);
  group.add(particleField);

  // ── Point lights ──
  const pl = new THREE.PointLight(0x06b6d4, 3, 15);
  pl.position.set(0, 0, 0);
  group.add(pl);

  animatedObjects.push({
    update(t: number) {
      coreOuter.rotation.x = t * 0.15;
      coreOuter.rotation.y = t * 0.2;
      coreInner.rotation.x = -t * 0.3;
      coreInner.rotation.z = t * 0.25;
      coreInnerMat.emissiveIntensity = 0.4 + 0.3 * Math.sin(t * 2);

      // Update satellites
      satellites.forEach((s, i) => {
        const a = s.angle + t * s.speed;
        s.mesh.position.set(
          Math.cos(a) * s.radius,
          s.yOffset + Math.sin(t * 0.8 + i) * 0.5,
          Math.sin(a) * s.radius,
        );
        s.mesh.rotation.x = t;
        s.mesh.rotation.y = t * 1.5;

        // Update connecting line
        const posAttr = lines[i].geometry.attributes.position as THREE.BufferAttribute;
        posAttr.array[0] = 0;
        posAttr.array[1] = 0;
        posAttr.array[2] = 0;
        posAttr.array[3] = s.mesh.position.x;
        posAttr.array[4] = s.mesh.position.y;
        posAttr.array[5] = s.mesh.position.z;
        posAttr.needsUpdate = true;

        // Pulse line opacity
        const d = s.mesh.position.length();
        (lines[i].material as THREE.LineBasicMaterial).opacity = clamp(0.5 - d * 0.05, 0.05, 0.4);
      });

      particleField.rotation.y = t * 0.03;
      particleField.rotation.x = t * 0.02;
    },
  });

  return { group, animatedObjects };
}

function buildWorld3(THREE: any) {
  const group = new THREE.Group();
  const accent = new THREE.Color(0xa855f7);
  const animatedObjects: { update: (t: number) => void }[] = [];

  // ── Holographic column matrix ──
  const cols = 7;
  const rows = 5;
  const columns: { mesh: THREE.Mesh; baseH: number; speed: number; phase: number }[] = [];

  for (let x = 0; x < cols; x++) {
    for (let z = 0; z < rows; z++) {
      const w = 0.4;
      const baseH = 0.5 + Math.random() * 2.5;
      const geo = new THREE.BoxGeometry(w, baseH, w);
      const mat = new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.35,
        roughness: 0.4,
        metalness: 0.7,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (x - (cols - 1) / 2) * 1.2,
        baseH / 2 - 1.5,
        (z - (rows - 1) / 2) * 1.2 - 3,
      );
      group.add(mesh);
      columns.push({
        mesh,
        baseH,
        speed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // ── Column wireframe outlines ──
  columns.forEach((col) => {
    const edges = new THREE.EdgesGeometry(col.mesh.geometry);
    const lineMat = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.5,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    col.mesh.add(wireframe);
  });

  // ── Floating data particles ──
  const pCount = 250;
  const pPos = new Float32Array(pCount * 3);
  const pVelocities = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 14;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
    pVelocities[i * 3] = (Math.random() - 0.5) * 0.01;
    pVelocities[i * 3 + 1] = 0.005 + Math.random() * 0.015;
    pVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: accent,
    size: 0.07,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const dataParticles = new THREE.Points(pGeo, pMat);
  group.add(dataParticles);

  // ── Holographic scan line (a thin plane sweeping upward) ──
  const scanGeo = new THREE.PlaneGeometry(10, 0.04);
  const scanMat = new THREE.MeshBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const scanLine = new THREE.Mesh(scanGeo, scanMat);
  scanLine.rotation.x = -Math.PI / 2;
  group.add(scanLine);

  // ── Point lights ──
  const pl1 = new THREE.PointLight(0xa855f7, 2, 14);
  pl1.position.set(0, 3, -3);
  group.add(pl1);

  animatedObjects.push({
    update(t: number) {
      // Animate column heights
      columns.forEach((col) => {
        const targetScale = 0.6 + 0.4 * Math.sin(t * col.speed + col.phase);
        col.mesh.scale.y = THREE.MathUtils.lerp(col.mesh.scale.y, targetScale, 0.1);
        const mat = col.mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.2 + 0.3 * Math.abs(Math.sin(t * col.speed + col.phase));
      });

      // Animate data particles rising
      const posAttr = dataParticles.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pCount; i++) {
        posAttr.array[i * 3] += pVelocities[i * 3];
        posAttr.array[i * 3 + 1] += pVelocities[i * 3 + 1];
        posAttr.array[i * 3 + 2] += pVelocities[i * 3 + 2];
        // Reset if too high
        if (posAttr.array[i * 3 + 1] > 5) {
          posAttr.array[i * 3 + 1] = -4;
          posAttr.array[i * 3] = (Math.random() - 0.5) * 14;
        }
      }
      posAttr.needsUpdate = true;

      // Scan line sweeps up
      scanLine.position.y = ((t * 0.8) % 8) - 4;
      (scanLine.material as THREE.MeshBasicMaterial).opacity =
        0.15 + 0.25 * Math.abs(Math.sin(t * 0.8));
    },
  });

  return { group, animatedObjects };
}

/* ═══════════════════════════════════════════════════════════════
 * ScrollServicesWorld — Main Component
 * ═══════════════════════════════════════════════════════════════ */

export default function ScrollServicesWorld() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showBadges, setShowBadges] = useState<boolean[]>([true, false, false]);

  const smoothRef = useRef(0);
  const activeIdxRef = useRef(-1);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerSmoothRef = useRef({ x: 0, y: 0 });
  const threeCleanupRef = useRef<(() => void) | null>(null);

  /* ── Three.js lifecycle ── */
  useEffect(() => {
    let disposed = false;

    (async () => {
      const THREE = await import("three");
      if (disposed || !canvasContainerRef.current) return;

      const container = canvasContainerRef.current;

      // ── Renderer ──
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x050508, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // ── Camera ──
      const camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        200,
      );

      // ── Scene ──
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050508, 0.018);

      // ── Lighting ──
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(5, 10, 8);
      scene.add(dirLight);

      // ── Build 3 worlds ──
      const w1 = buildWorld1(THREE);
      w1.group.position.set(0, 0, 0);
      scene.add(w1.group);

      const w2 = buildWorld2(THREE);
      w2.group.position.set(0, 0, -WORLD_SPACING);
      scene.add(w2.group);

      const w3 = buildWorld3(THREE);
      w3.group.position.set(0, 0, -WORLD_SPACING * 2);
      scene.add(w3.group);

      // ── Background grid floor ──
      const gridHelper = new THREE.GridHelper(60, 40, 0x10b981, 0x0a1a12);
      gridHelper.position.y = -3;
      gridHelper.material.opacity = 0.15;
      gridHelper.material.transparent = true;
      scene.add(gridHelper);

      // ── Sizing ──
      const updateSize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      updateSize();

      // ── Animation loop ──
      let raf = 0;
      const clock = new THREE.Clock();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tick = () => {
        const elapsed = clock.getElapsedTime();
        const section = sectionRef.current;

        if (section) {
          const rect = section.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          const rawProgress = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;

          // Smooth the progress
          smoothRef.current +=
            (rawProgress - smoothRef.current) * (reduced ? 1 : 0.08);
          if (Math.abs(rawProgress - smoothRef.current) < 0.0003)
            smoothRef.current = rawProgress;

          const p = smoothRef.current;
          // Flight progress (0..1 within the world space)
          const flight = clamp(
            (p - HUD_ZONE) / (1 - HUD_ZONE * 2),
            0,
            1,
          );

          // Current world index
          const flt = flight * (N - 1);
          const currentWorldIdx = Math.min(
            N - 1,
            Math.round(flt),
          );

          if (currentWorldIdx !== activeIdxRef.current) {
            activeIdxRef.current = currentWorldIdx;
            setActiveIdx(currentWorldIdx);
            setShowBadges((prev) => {
              const next = [...prev];
              next.forEach((_, i) => { next[i] = i === currentWorldIdx; });
              return next;
            });
          }

          // Camera position along Z axis
          const totalDepth = WORLD_SPACING * (N - 1);
          const camZ = CAMERA_OFFSET - flight * totalDepth;
          const focalZ = -flight * totalDepth;

          // Pointer parallax
          pointerSmoothRef.current.x +=
            (pointerRef.current.x - pointerSmoothRef.current.x) * 0.06;
          pointerSmoothRef.current.y +=
            (pointerRef.current.y - pointerSmoothRef.current.y) * 0.06;

          // Subtle sine wave on camera for organic feel
          const sineOffset = Math.sin(flight * Math.PI * 2) * 1.5;
          const px = pointerSmoothRef.current.x * 2;
          const py = pointerSmoothRef.current.y * 1.5;

          camera.position.set(
            px,
            1 + sineOffset * 0.3 + py,
            camZ,
          );
          camera.lookAt(px * 0.3, 0.5 + py * 0.2, focalZ);
        }

        // ── Update world animations ──
        w1.animatedObjects.forEach((o) => o.update(elapsed));
        w2.animatedObjects.forEach((o) => o.update(elapsed));
        w3.animatedObjects.forEach((o) => o.update(elapsed));

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);

      // ── Resize listener ──
      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(container);
      window.addEventListener("resize", updateSize);

      // ── Cleanup ──
      threeCleanupRef.current = () => {
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateSize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        scene.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
            else obj.material.dispose();
          }
        });
      };
    })();

    return () => {
      disposed = true;
      threeCleanupRef.current?.();
      threeCleanupRef.current = null;
    };
  }, []);

  /* ── Pointer parallax ── */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
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
      (HUD_ZONE + (idx / (N - 1)) * (1 - HUD_ZONE * 2)) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const activeWorld = SERVICE_WORLDS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="services-3d-world"
      aria-label="Interactive 3D services world"
      className="snap-section relative w-full h-[400vh] bg-[#050508]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-svh overflow-hidden select-none">
        {/* Three.js WebGL canvas container */}
        <div
          ref={canvasContainerRef}
          className="absolute inset-0"
          style={{ touchAction: "none" }}
        />

        {/* HTML annotation badges overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {BADGE_DEFS.map((badge, i) => {
            const isVisible = showBadges[badge.worldIdx] ?? false;
            return (
              <div
                key={i}
                className={`absolute transition-all duration-700 ease-out ${badge.anchor.x} ${badge.anchor.y} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                <div
                  className="px-4 py-2.5 rounded-xl border backdrop-blur-md font-mono text-[11px] text-left shadow-2xl max-w-[220px]"
                  style={{
                    backgroundColor: "rgba(10,10,16,0.85)",
                    borderColor: `${activeWorld.accentColor}50`,
                    color: activeWorld.accentColor,
                    boxShadow: `0 0 24px ${activeWorld.accentColor}25`,
                  }}
                >
                  <span className="flex items-center gap-1.5 whitespace-nowrap font-semibold text-[12px]">
                    {badge.label}
                  </span>
                  <span className="block text-white/50 mt-1 text-[10px] leading-tight">
                    {badge.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Top HUD ── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between gap-3 max-w-7xl mx-auto w-full px-4 md:px-8 pt-16 md:pt-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
              style={{ backgroundColor: activeWorld.accentColor }}
            />
            <span className="text-[11px] md:text-xs font-mono tracking-widest text-white/70 truncate">
              {activeWorld.worldNumber}
            </span>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 bg-[#101014]/90 backdrop-blur-md px-2 md:px-3 py-1.5 rounded-full border border-white/10 shadow-xl shrink-0">
            {SERVICE_WORLDS.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => scrollToWorld(idx)}
                aria-label={`Fly to ${w.shortName}`}
                className={`px-2.5 md:px-3 py-1 rounded-full text-[11px] md:text-xs font-mono transition-all duration-300 ${
                  idx === activeIdx
                    ? "bg-white/15 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom HUD: service intel card + progress meter ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 max-w-7xl mx-auto w-full px-4 md:px-8 pb-4 md:pb-6">
          {/* Flight progress meter */}
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase shrink-0">
              Flight Progress
            </span>
            <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  backgroundColor: activeWorld.accentColor,
                  width: `${((activeIdx / (N - 1)) * 100).toFixed(1)}%`,
                }}
              />
            </div>
          </div>

          {/* Service intel card */}
          <div
            className="rounded-2xl border backdrop-blur-xl p-4 md:p-5 transition-all duration-500"
            style={{
              backgroundColor: "rgba(10,10,16,0.7)",
              borderColor: `${activeWorld.accentColor}30`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 ${activeWorld.accentColor}15`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                    {activeWorld.category}
                  </span>
                </div>
                <h3 className="text-white text-sm md:text-base font-semibold leading-tight">
                  {activeWorld.title}
                </h3>
                <p className="text-white/50 text-[11px] md:text-xs mt-1.5 leading-relaxed max-w-xl">
                  {activeWorld.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div
                  className="text-2xl md:text-3xl font-bold font-mono"
                  style={{ color: activeWorld.accentColor }}
                >
                  {activeWorld.metric}
                </div>
                <div className="text-[10px] text-white/40 mt-0.5 max-w-[140px]">
                  {activeWorld.metricLabel}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {activeWorld.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono border"
                  style={{
                    borderColor: `${activeWorld.accentColor}30`,
                    color: `${activeWorld.accentColor}cc`,
                    backgroundColor: `${activeWorld.accentColor}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
