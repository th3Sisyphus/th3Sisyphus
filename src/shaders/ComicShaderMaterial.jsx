import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

export const ComicShaderMaterial = shaderMaterial(
  {
    uTexture: null,
    uHover: 0.0,
    uTime: 0.0,
    uScrollVelocity: 0.0,
    uBreakProgress: 0.0,
    uResolution: new THREE.Vector2(1, 1),
    uPaperColor: new THREE.Color('#f4f1ea'),
    uInkColor: new THREE.Color('#0a0a0c'),
    uAccentCrimson: new THREE.Color('#e62429'),
    uAccentGold: new THREE.Color('#f59e0b'),
  },
  // Vertex Shader
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    uniform float uScrollVelocity;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Dynamic scroll velocity curvature (bends plane when scrolling fast)
      float bendFactor = sin(uv.y * 3.14159265);
      pos.z += bendFactor * uScrollVelocity * 0.12;

      // Subtle breathing wave when hovered
      float hoverWave = sin(uv.x * 5.0 + uTime * 2.5) * cos(uv.y * 5.0 + uTime * 2.0) * 0.03 * uHover;
      pos.z += hoverWave;

      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  /* glsl */ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    uniform float uBreakProgress;
    uniform vec2 uResolution;
    uniform vec3 uPaperColor;
    uniform vec3 uInkColor;
    uniform vec3 uAccentCrimson;
    uniform vec3 uAccentGold;

    // Pseudo-random noise
    float hash21(vec2 p) {
      p = fract(p * vec2(234.34, 435.345));
      p += dot(p, p + 34.23);
      return fract(p.x * p.y);
    }

    void main() {
      vec2 uv = vUv;

      // 1. Voxel / Block Disintegration / Break Progress (Mining strike effect)
      if (uBreakProgress > 0.001) {
        float blockSize = mix(0.015, 0.08, uBreakProgress);
        vec2 gridUv = floor(uv / blockSize);
        float h = hash21(gridUv);

        // Voxel displacement & crumble fall
        float fall = uBreakProgress * uBreakProgress * (0.2 + h * 0.4);
        uv.y -= fall;
        uv.x += (h - 0.5) * uBreakProgress * 0.1;

        // Break-away discard threshold
        if (h < uBreakProgress * 1.1) {
          discard;
        }

        // Clamp to avoid repeat edge artifact
        uv = clamp(uv, 0.0, 1.0);
      }

      // Sample original texture
      vec4 texColor = texture2D(uTexture, uv);
      
      // Calculate perceptual luminance
      float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

      // 2. High-Contrast Halftone Dot Pattern (Classic 45° comic screen angle)
      float freq = 65.0;
      mat2 rot = mat2(0.7071, -0.7071, 0.7071, 0.7071);
      vec2 rotUv = rot * (uv * freq);
      vec2 grid = fract(rotUv) - 0.5;
      float dotDist = length(grid);

      // Dot radius inversely proportional to brightness
      float targetRadius = sqrt(max(0.0, 1.0 - lum)) * 0.56;
      float dotMask = smoothstep(targetRadius - 0.08, targetRadius + 0.08, dotDist);

      // Inked comic thresholding
      vec3 inkPass;
      if (lum < 0.22) {
        // Deep shadow: heavy solid ink + subtle crimson shading
        inkPass = mix(uInkColor, uAccentCrimson * 0.2, 0.15);
      } else if (lum < 0.68) {
        // Midtones: high-contrast halftone dot matrix
        inkPass = mix(uInkColor, uPaperColor, dotMask);
      } else {
        // Highlights: crisp comic paper off-white
        inkPass = uPaperColor;
      }

      // Blend subtle ink hatching for rich depth
      float hatch = sin((uv.x + uv.y) * 120.0);
      if (lum > 0.22 && lum < 0.45 && hatch > 0.5) {
        inkPass = mix(inkPass, uInkColor, 0.4);
      }

      // 3. Smooth transition from inked comic to full-color original on hover
      vec3 finalRgb = mix(inkPass, texColor.rgb, uHover);

      // 4. Sharp Comic Panel Border & Glowing Accent Rim
      float borderWidth = 0.02;
      float borderX = min(uv.x, 1.0 - uv.x);
      float borderY = min(uv.y, 1.0 - uv.y);
      float border = min(borderX, borderY);
      
      if (border < borderWidth) {
        float borderEdge = smoothstep(0.0, borderWidth, border);
        vec3 rimAccent = mix(uAccentCrimson, uAccentGold, sin(uTime * 3.0 + uv.x * 6.28) * 0.5 + 0.5);
        vec3 outerBorder = mix(rimAccent, uInkColor, 0.25);
        finalRgb = mix(outerBorder, finalRgb, borderEdge);
      }

      // Mining impact flash when breaking
      if (uBreakProgress > 0.001) {
        finalRgb += vec3(uAccentGold) * (1.0 - uBreakProgress) * 0.6;
      }

      gl_FragColor = vec4(finalRgb, 1.0);
    }
  `
)

extend({ ComicShaderMaterial })
