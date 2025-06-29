/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, wrapEffect } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// Keep shader code as-is since it's a core part of the WebGL functionality
const waveVertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;
}
`;

const waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 8;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p - fbm(p + fbm(p2)));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  vec3 col = mix(vec3(0.0), waveColor, f);
  gl_FragColor = vec4(col, 1.0);
}
`;

const ditherFragmentShader = `
precision highp float;
uniform float colorNum;
uniform float pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,
  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,
  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,
  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,
  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,
  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,
  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,
  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0
);

vec3 dither(vec2 uv, vec3 color) {
  int x = int(uv.x * resolution.x) % 8;
  int y = int(uv.y * resolution.y) % 8;
  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;
  color += threshold;
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  color.rgb = dither(uvPixel, color.rgb);
  outputColor = color;
}
`;

class RetroEffectImpl extends Effect {
  declare public uniforms: Map<string, THREE.Uniform<any>>;
  constructor() {
    const uniforms = new Map<string, THREE.Uniform<any>>([
      ['colorNum', new THREE.Uniform(4.0)],
      ['pixelSize', new THREE.Uniform(2.0)]
    ]);
    super('RetroEffect', ditherFragmentShader, { uniforms });
    this.uniforms = uniforms;
  }
  set colorNum(value: number) {
    this.uniforms.get('colorNum')!.value = value;
  }
  get colorNum(): number {
    return this.uniforms.get('colorNum')!.value;
  }
  set pixelSize(value: number) {
    this.uniforms.get('pixelSize')!.value = value;
  }
  get pixelSize(): number {
    return this.uniforms.get('pixelSize')!.value;
  }
}

const RetroEffect = wrapEffect(RetroEffectImpl) as React.ForwardRefExoticComponent<
  React.RefAttributes<RetroEffectImpl>
>;

interface WaveUniforms {
  [key: string]: THREE.Uniform<any>;
  time: THREE.Uniform<number>;
  resolution: THREE.Uniform<THREE.Vector2>;
  waveSpeed: THREE.Uniform<number>;
  waveFrequency: THREE.Uniform<number>;
  waveAmplitude: THREE.Uniform<number>;
  waveColor: THREE.Uniform<THREE.Color>;
  mousePos: THREE.Uniform<THREE.Vector2>;
  enableMouseInteraction: THREE.Uniform<number>;
  mouseRadius: THREE.Uniform<number>;
}

interface DitheredWavesProps {
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  waveColor: [number, number, number];
  colorNum: number;
  pixelSize: number;
  disableAnimation: boolean;
  enableMouseInteraction: boolean;
  mouseRadius: number;
}

// Memoized DitheredWaves component to prevent unnecessary rerenders
const DitheredWaves = memo(function DitheredWaves({
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  waveColor,
  colorNum,
  pixelSize,
  disableAnimation,
  enableMouseInteraction,
  mouseRadius
}: DitheredWavesProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const effect = useRef<RetroEffectImpl>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0
  });
  const { size } = useThree();

  // Create uniforms with useMemo to avoid recreating them on every render
  const uniforms = useMemo<WaveUniforms>(() => {
    return {
      time: new THREE.Uniform(0),
      resolution: new THREE.Uniform(new THREE.Vector2(size.width, size.height)),
      waveSpeed: new THREE.Uniform(waveSpeed),
      waveFrequency: new THREE.Uniform(waveFrequency),
      waveAmplitude: new THREE.Uniform(waveAmplitude),
      waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
      mousePos: new THREE.Uniform(new THREE.Vector2(mousePos.x, mousePos.y)),
      enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
      mouseRadius: new THREE.Uniform(mouseRadius)
    };
  }, [
    size,
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    mousePos,
    enableMouseInteraction,
    mouseRadius
  ]);

  // Use useCallback for event handlers to avoid recreating them on every render
  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (enableMouseInteraction) {
        setMousePos({ x: e.pageX, y: e.pageY });
      }
    },
    [enableMouseInteraction]
  );

  // Update resolution when size changes
  useEffect(() => {
    if (uniforms.resolution) {
      uniforms.resolution.value.set(size.width, size.height);
    }
  }, [size, uniforms]);

  // Update effect parameters when props change
  useEffect(() => {
    if (effect.current) {
      effect.current.colorNum = colorNum;
      effect.current.pixelSize = pixelSize;
    }
  }, [colorNum, pixelSize]);

  // Animation frame logic
  useFrame((_, delta) => {
    if (!disableAnimation && uniforms.time) {
      uniforms.time.value += delta * 0.5;
    }

    // Only update mouse position uniforms when they've changed
    if (enableMouseInteraction && uniforms.mousePos) {
      uniforms.mousePos.value.set(mousePos.x, mousePos.y);
    }
  });

  // Memoize shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: waveVertexShader,
      fragmentShader: waveFragmentShader,
      uniforms
    });
  }, [uniforms]);

  return (
    <>
      <mesh ref={mesh} onPointerMove={handlePointerMove}>
        <planeGeometry args={[2, 2]} />
        <primitive object={shaderMaterial} attach="material" />
      </mesh>
      <EffectComposer>
        <RetroEffect ref={effect} />
      </EffectComposer>
    </>
  );
});

import {
  DEFAULT_COLOR_NUM,
  DEFAULT_DISABLE_ANIMATION,
  DEFAULT_ENABLE_MOUSE_INTERACTION,
  DEFAULT_MOUSE_RADIUS,
  DEFAULT_PIXEL_SIZE,
  DEFAULT_WAVE_AMPLITUDE,
  DEFAULT_WAVE_COLOR,
  DEFAULT_WAVE_FREQUENCY,
  DEFAULT_WAVE_SPEED
} from './dither.constants';
import { DitherProps } from './dither.types';

/**
 * Dither component creates a retro wave effect with configurable parameters
 * and optional mouse interaction.
 *
 * @param props - Component properties
 * @returns Memoized React component with dithered wave effect
 */
const Dither = memo(function Dither({
  waveSpeed = DEFAULT_WAVE_SPEED,
  waveFrequency = DEFAULT_WAVE_FREQUENCY,
  waveAmplitude = DEFAULT_WAVE_AMPLITUDE,
  waveColor = DEFAULT_WAVE_COLOR,
  colorNum = DEFAULT_COLOR_NUM,
  pixelSize = DEFAULT_PIXEL_SIZE,
  disableAnimation = DEFAULT_DISABLE_ANIMATION,
  enableMouseInteraction = DEFAULT_ENABLE_MOUSE_INTERACTION,
  mouseRadius = DEFAULT_MOUSE_RADIUS
}: DitherProps) {
  // Memoize the props object to prevent unnecessary recreation
  const waveProps = useMemo(
    () => ({
      waveSpeed,
      waveFrequency,
      waveAmplitude,
      waveColor,
      colorNum,
      pixelSize,
      disableAnimation,
      enableMouseInteraction,
      mouseRadius
    }),
    [
      waveSpeed,
      waveFrequency,
      waveAmplitude,
      waveColor,
      colorNum,
      pixelSize,
      disableAnimation,
      enableMouseInteraction,
      mouseRadius
    ]
  );

  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <DitheredWaves {...waveProps} />
      </Canvas>
    </div>
  );
});

export { Dither };
export default Dither;
