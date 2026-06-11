"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Site-wide interactive particle field.
 * Particles drift in ambient chaos; clicking anywhere sends a burst of
 * energy that snaps nearby particles into an ordered grid (gold/blue glow)
 * before they decay back into drift. Chaos -> order -> entropy.
 */
export function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const TOUCH = window.matchMedia("(hover: none)").matches;
        const MOBILE = window.innerWidth < 760;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, 1, 1, 400);
        camera.position.z = 120;

        let VW = 0;
        let VH = 0;
        function sizeWorld() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            VH = 2 * Math.tan(THREE.MathUtils.degToRad(55 / 2)) * camera.position.z;
            VW = VH * camera.aspect;
        }
        sizeWorld();

        const COUNT = MOBILE ? 380 : 800;
        const GRID = MOBILE ? 9 : 11;
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);
        const vel = new Float32Array(COUNT * 2);
        const phase = new Float32Array(COUNT);
        const excite = new Float32Array(COUNT);
        const hue = new Float32Array(COUNT);

        const baseCol = new THREE.Color(0x55617f);
        const goldCol = new THREE.Color(0xe8b44c);
        const blueCol = new THREE.Color(0x6ba8ff);
        const tmpCol = new THREE.Color();

        for (let i = 0; i < COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * VW * 1.15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * VH * 1.15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
            vel[i * 2] = (Math.random() - 0.5) * 0.02;
            vel[i * 2 + 1] = (Math.random() - 0.5) * 0.02;
            phase[i] = Math.random() * Math.PI * 2;
            hue[i] = Math.random();
            sizes[i] = 1.6 + Math.random() * 2.4;
            baseCol.toArray(colors, i * 3);
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main(){
                    vColor = color;
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (160.0 / -mv.z);
                    gl_Position = projectionMatrix * mv;
                }`,
            fragmentShader: `
                varying vec3 vColor;
                void main(){
                    float d = length(gl_PointCoord - vec2(0.5));
                    float a = smoothstep(0.5, 0.12, d);
                    gl_FragColor = vec4(vColor, a * 0.9);
                }`,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        /* ripple rings */
        const ripples: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>[] = [];
        const ringGeo = new THREE.RingGeometry(0.97, 1, 64);
        function spawnRipple(x: number, y: number, color: THREE.Color) {
            const m = new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity: 0.85,
                side: THREE.DoubleSide,
            });
            const r = new THREE.Mesh(ringGeo, m);
            r.position.set(x, y, 0);
            r.scale.setScalar(0.001);
            r.userData = { t: 0 };
            scene.add(r);
            ripples.push(r);
        }

        const mouse = { x: 0, y: 0, wx: 0, wy: 0 };
        const onMove = (e: PointerEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouse.wx = (mouse.x * VW) / 2;
            mouse.wy = (mouse.y * VH) / 2;
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        /* THE BURST — click anywhere that isn't interactive */
        function burst(clientX: number, clientY: number) {
            const wx = ((clientX / window.innerWidth) * 2 - 1) * VW / 2;
            const wy = (-(clientY / window.innerHeight) * 2 + 1) * VH / 2;
            const R = MOBILE ? 26 : 34;
            for (let i = 0; i < COUNT; i++) {
                const dx = positions[i * 3] - wx;
                const dy = positions[i * 3 + 1] - wy;
                const d = Math.hypot(dx, dy);
                if (d < R) {
                    const f = 1 - d / R;
                    const inv = d > 0.001 ? 1 / d : 0;
                    vel[i * 2] += dx * inv * f * 1.55;
                    vel[i * 2 + 1] += dy * inv * f * 1.55;
                    excite[i] = Math.min(1, excite[i] + f * 1.6);
                }
            }
            spawnRipple(wx, wy, Math.random() > 0.5 ? goldCol : blueCol);
        }
        const onDown = (e: PointerEvent) => {
            const t = e.target as HTMLElement;
            if (t.closest("a, button, input, textarea, select, nav, [data-no-burst]")) return;
            burst(e.clientX, e.clientY);
        };
        window.addEventListener("pointerdown", onDown);

        /* animation loop */
        const clock = new THREE.Clock();
        const drift = RM ? 0.15 : 1;
        let raf = 0;

        function tick() {
            const dt = Math.min(clock.getDelta(), 0.05);
            const t = clock.elapsedTime;

            for (let i = 0; i < COUNT; i++) {
                const ix = i * 3;
                const iy = ix + 1;
                let x = positions[ix];
                let y = positions[iy];
                const e = excite[i];

                // ambient wander (chaos)
                vel[i * 2] += Math.sin(t * 0.4 + phase[i]) * 0.0009 * drift;
                vel[i * 2 + 1] += Math.cos(t * 0.33 + phase[i] * 1.7) * 0.0009 * drift;

                // gentle pull toward the cursor for liveliness
                if (!TOUCH && !RM) {
                    const cdx = mouse.wx - x;
                    const cdy = mouse.wy - y;
                    const cd = cdx * cdx + cdy * cdy;
                    if (cd < 900) {
                        vel[i * 2] += cdx * 0.00012;
                        vel[i * 2 + 1] += cdy * 0.00012;
                    }
                }

                // when excited: snap toward nearest grid node (order from chaos)
                if (e > 0.02) {
                    const gx = Math.round(x / GRID) * GRID;
                    const gy = Math.round(y / GRID) * GRID;
                    const k = e * 0.045;
                    vel[i * 2] += (gx - x) * k;
                    vel[i * 2 + 1] += (gy - y) * k;
                    excite[i] = Math.max(0, e - dt * 0.45);
                }

                vel[i * 2] *= 0.94;
                vel[i * 2 + 1] *= 0.94;
                x += vel[i * 2];
                y += vel[i * 2 + 1];

                const hw = VW * 0.6;
                const hh = VH * 0.6;
                if (x > hw) x = -hw;
                if (x < -hw) x = hw;
                if (y > hh) y = -hh;
                if (y < -hh) y = hh;
                positions[ix] = x;
                positions[iy] = y;

                if (e > 0.01) {
                    tmpCol.copy(goldCol).lerp(blueCol, hue[i]);
                    tmpCol.lerp(baseCol, 1 - Math.min(1, e * 1.4));
                    tmpCol.toArray(colors, ix);
                } else if (colors[ix] !== baseCol.r) {
                    tmpCol.fromArray(colors, ix).lerp(baseCol, 0.08);
                    tmpCol.toArray(colors, ix);
                }
            }
            geo.attributes.position.needsUpdate = true;
            geo.attributes.color.needsUpdate = true;

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.userData.t += dt;
                const p = r.userData.t / 1.1;
                r.scale.setScalar(1 + p * (MOBILE ? 30 : 44));
                r.material.opacity = 0.85 * (1 - p);
                if (p >= 1) {
                    scene.remove(r);
                    r.material.dispose();
                    ripples.splice(i, 1);
                }
            }

            if (!RM) {
                camera.position.x += (mouse.x * 4 - camera.position.x) * 0.03;
                camera.position.y += (mouse.y * 3 - camera.position.y) * 0.03;
                camera.lookAt(0, 0, 0);
            }

            renderer.render(scene, camera);
            raf = requestAnimationFrame(tick);
        }
        tick();
        window.addEventListener("resize", sizeWorld);

        /* one introductory pulse so visitors discover the field */
        let introTimer: ReturnType<typeof setTimeout> | undefined;
        if (!RM) {
            introTimer = setTimeout(
                () => burst(window.innerWidth * 0.62, window.innerHeight * 0.4),
                1400
            );
        }

        return () => {
            cancelAnimationFrame(raf);
            if (introTimer) clearTimeout(introTimer);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("resize", sizeWorld);
            ripples.forEach((r) => {
                scene.remove(r);
                r.material.dispose();
            });
            ringGeo.dispose();
            geo.dispose();
            mat.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="fixed inset-0 z-0 pointer-events-none"
            />
            <div className="field-vignette" aria-hidden="true" />
        </>
    );
}
