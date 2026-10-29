<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'

    const emit = defineEmits<{ ready: [] }>()
    const canvas = ref<HTMLCanvasElement>()

    // The three YAMP logo pieces, in the 320 × 274 coordinates of public/yamp.svg.
    const pieces = [
        {
            points: [
                [101.313, 172.793],
                [0, 0],
                [58.0695, 0],
                [130.965, 122.189],
            ],
            from: [-1.1, -0.8, 1.4],
            spin: [0.5, -0.9, 0.6],
            delay: 0,
        },
        {
            points: [
                [202.625, 0],
                [117.375, 0],
                [139.614, 35.7928],
                [161.853, 71.5856],
            ],
            from: [0.1, 1.5, -1.6],
            spin: [-0.8, 0.4, -0.5],
            delay: 0.25,
        },
        {
            points: [
                [320, 0],
                [261.93, 0],
                [133.436, 222.162],
                [161.853, 274],
            ],
            from: [0.9, -0.7, 1.2],
            spin: [0.4, 0.9, 0.7],
            delay: 0.5,
        },
    ]

    const assembleSeconds = 2.6
    const particleCount = 240
    const characters = ' .,:;-=+*xX#@'
    const frameInterval = 1000 / 30

    let dispose = () => {}
    let unmounted = false

    function softDot(size: number, inner: string, outer: string) {
        const sprite = document.createElement('canvas')
        sprite.width = sprite.height = size
        const context = sprite.getContext('2d')!
        const gradient = context.createRadialGradient(
            size / 2,
            size / 2,
            0,
            size / 2,
            size / 2,
            size / 2,
        )
        gradient.addColorStop(0, inner)
        gradient.addColorStop(1, outer)
        context.fillStyle = gradient
        context.fillRect(0, 0, size, size)
        return sprite
    }

    const easeOut = (value: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, value)), 3)

    onMounted(async () => {
        const THREE = await import('../three')
        const element = canvas.value
        if (unmounted || !element) return

        const context = element.getContext('2d')
        const sampler = document
            .createElement('canvas')
            .getContext('2d', { willReadFrequently: true })
        if (!context || !sampler) return

        let renderer: InstanceType<typeof THREE.WebGLRenderer>
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'low-power',
            })
        } catch {
            return
        }

        renderer.toneMapping = THREE.ACESFilmicToneMapping

        let width = 0
        let height = 0
        let columns = 0
        let rows = 0
        let cellWidth = 7
        let cellHeight = 11

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50)
        camera.position.set(0, 0, 9.4)

        scene.add(new THREE.AmbientLight('#ffffff', 0.35))
        const key = new THREE.DirectionalLight('#fff6ee', 2.2)
        key.position.set(3, 4, 6)
        scene.add(key)
        const rim = new THREE.PointLight('#c59977', 60, 14)
        rim.position.set(-2.5, -1.5, -2.2)
        scene.add(rim)
        const fill = new THREE.PointLight('#ffffff', 8, 12)
        fill.position.set(3.5, -2.5, 3)
        scene.add(fill)

        const logo = new THREE.Group()
        scene.add(logo)

        const material = new THREE.MeshStandardMaterial({
            color: '#ecebe6',
            roughness: 0.38,
            metalness: 0.15,
        })
        const depth = 0.32
        const meshes = pieces.map((piece) => {
            const vertices = piece.points.map(
                ([x, y]) => new THREE.Vector2((x! - 160) / 100, (137 - y!) / 100),
            )
            const centre = vertices
                .reduce((sum, vertex) => sum.add(vertex), new THREE.Vector2())
                .divideScalar(vertices.length)
            const shape = new THREE.Shape(vertices.map((vertex) => vertex.clone().sub(centre)))
            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelSegments: 3,
            })
            geometry.translate(0, 0, -depth / 2)

            const mesh = new THREE.Mesh(geometry, material)
            logo.add(mesh)
            return {
                mesh,
                home: new THREE.Vector3(centre.x, centre.y, 0),
                from: new THREE.Vector3(...piece.from),
                spin: new THREE.Euler(...piece.spin),
                delay: piece.delay,
            }
        })

        const rings = [
            { radius: 2.35, tilt: [1.22, 0, 0.18], opacity: 0.55, speed: 0.32 },
            { radius: 2.7, tilt: [1.05, 0.45, -0.3], opacity: 0.35, speed: -0.2 },
        ].map((ring) => {
            const group = new THREE.Group()
            group.rotation.set(ring.tilt[0]!, ring.tilt[1]!, ring.tilt[2]!)
            group.add(
                new THREE.Mesh(
                    new THREE.TorusGeometry(ring.radius, 0.018, 6, 220),
                    new THREE.MeshBasicMaterial({
                        color: '#ffffff',
                        transparent: true,
                        opacity: ring.opacity,
                        depthWrite: false,
                    }),
                ),
            )

            const node = new THREE.Mesh(
                new THREE.SphereGeometry(0.09, 16, 16),
                new THREE.MeshBasicMaterial({ color: '#c59977' }),
            )
            group.add(node)
            scene.add(group)
            return { node, radius: ring.radius, speed: ring.speed, group }
        })

        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const speeds = new Float32Array(particleCount)
        for (let index = 0; index < particleCount; index++) {
            const angle = Math.random() * Math.PI * 2
            const radius = 1.2 + Math.random() * 2.4
            positions.set(
                [
                    Math.cos(angle) * radius,
                    -2.6 + Math.random() * 5.2,
                    Math.sin(angle) * radius - 0.5,
                ],
                index * 3,
            )
            speeds[index] = 0.1 + Math.random() * 0.25
        }

        const particleGeometry = new THREE.BufferGeometry()
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        const particles = new THREE.Points(
            particleGeometry,
            new THREE.PointsMaterial({
                size: 0.12,
                map: new THREE.CanvasTexture(softDot(64, '#ffffffff', '#ffffff00')),
                vertexColors: true,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            }),
        )
        scene.add(particles)

        const accent = new THREE.Color('#c59977')
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
        const compact = window.matchMedia('(max-width: 760px)')
        const pointer = new THREE.Vector2()
        const tilt = new THREE.Vector2()
        let frame = 0
        let start = 0
        let last = 0
        let current = 0
        let visible = true

        function update(time: number, delta: number) {
            const still = motion.matches || compact.matches

            for (const piece of meshes) {
                const progress = still ? 1 : easeOut((time - piece.delay) / assembleSeconds)
                const away = 1 - progress
                piece.mesh.position.copy(piece.home).addScaledVector(piece.from, away)
                piece.mesh.rotation.set(
                    piece.spin.x * away * 1.8,
                    piece.spin.y * away * 1.8,
                    piece.spin.z * away * 1.8,
                )
            }

            tilt.lerp(still ? new THREE.Vector2() : pointer, Math.min(1, delta * 3))
            logo.rotation.set(
                tilt.y * 0.35 + (still ? 0 : Math.sin(time * 0.6) * 0.05),
                tilt.x * 0.5 + (still ? -0.25 : Math.sin(time * 0.35) * 0.3),
                0,
            )
            logo.position.y = still ? 0 : Math.sin(time * 0.9) * 0.06

            for (const ring of rings) {
                const angle = (still ? 1 : time) * ring.speed * Math.PI
                ring.node.position.set(
                    Math.cos(angle) * ring.radius,
                    Math.sin(angle) * ring.radius,
                    0,
                )
                ring.group.rotation.z += still ? 0 : delta * ring.speed * 0.05
            }

            for (let index = 0; index < particleCount; index++) {
                const y = index * 3 + 1
                if (!still) {
                    positions[y]! += speeds[index]! * delta
                    if (positions[y]! > 2.6) positions[y] = -2.6
                }

                const fade = Math.max(0, 1 - Math.abs(positions[y]!) / 2.6) * 0.95
                colors.set([accent.r * fade, accent.g * fade, accent.b * fade], index * 3)
            }

            particleGeometry.attributes.position!.needsUpdate = true
            particleGeometry.attributes.color!.needsUpdate = true
            renderer.render(scene, camera)
            drawAscii()
        }

        function drawAscii() {
            if (!columns || !rows) return
            sampler!.clearRect(0, 0, columns, rows)
            sampler!.drawImage(renderer.domElement, 0, 0, columns, rows)
            const pixels = sampler!.getImageData(0, 0, columns, rows).data

            context!.clearRect(0, 0, width, height)
            context!.font = `${cellWidth * 1.5}px ui-monospace, "Cascadia Code", Consolas, monospace`
            context!.textBaseline = 'top'

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < columns; x++) {
                    const offset = (y * columns + x) * 4
                    const alpha = pixels[offset + 3]! / 255
                    if (alpha < 0.03) continue

                    const red = pixels[offset]!
                    const green = pixels[offset + 1]!
                    const blue = pixels[offset + 2]!
                    const luminance =
                        ((red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255) * alpha
                    const intensity = Math.min(0.999, Math.pow(luminance, 0.7) * 1.1)
                    const character = characters[Math.floor(intensity * characters.length)]!
                    if (character === ' ') continue

                    context!.fillStyle = `rgb(${Math.min(255, 50 + red * 0.85)} ${Math.min(255, 50 + green * 0.85)} ${Math.min(255, 50 + blue * 0.85)})`
                    context!.globalAlpha = 0.45 + intensity * 0.55
                    context!.fillText(character, x * cellWidth, y * cellHeight)
                }
            }

            context!.globalAlpha = 1
        }

        function tick(now: number) {
            frame = requestAnimationFrame(tick)
            if (last && now - last < frameInterval) return
            if (!start) start = now
            const delta = last ? Math.min(0.1, (now - last) / 1000) : 0
            last = now
            current = (now - start) / 1000
            update(current, delta)
        }

        function sync() {
            cancelAnimationFrame(frame)
            frame = 0
            last = 0
            if (visible && !document.hidden && !motion.matches && !compact.matches)
                frame = requestAnimationFrame(tick)
            else update(current, 0)
        }

        function resize() {
            const bounds = element!.getBoundingClientRect()
            if (!bounds.width || !bounds.height) return
            width = bounds.width
            height = bounds.height

            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
            element!.width = Math.round(width * pixelRatio)
            element!.height = Math.round(height * pixelRatio)
            context!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

            cellWidth = Math.max(5, width / 118)
            cellHeight = cellWidth * 1.55
            columns = Math.ceil(width / cellWidth)
            rows = Math.ceil(height / cellHeight)
            sampler!.canvas.width = columns
            sampler!.canvas.height = rows
            renderer.setSize(columns * 2, rows * 2, false)

            camera.aspect = width / height
            camera.position.z = width < height ? (9.4 * height) / width : 9.4
            camera.updateProjectionMatrix()
            if (!frame) update(current, 0)
        }

        function onPointer(event: PointerEvent) {
            const bounds = element!.getBoundingClientRect()
            pointer.set(
                Math.max(
                    -1,
                    Math.min(
                        1,
                        ((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 2,
                    ),
                ),
                Math.max(
                    -1,
                    Math.min(
                        1,
                        ((event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 2,
                    ),
                ),
            )
        }

        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(element)
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            visible = entry?.isIntersecting ?? false
            sync()
        })
        intersectionObserver.observe(element)
        window.addEventListener('pointermove', onPointer, { passive: true })
        document.addEventListener('visibilitychange', sync)
        motion.addEventListener('change', sync)
        compact.addEventListener('change', sync)

        resize()
        sync()
        emit('ready')

        dispose = () => {
            cancelAnimationFrame(frame)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            window.removeEventListener('pointermove', onPointer)
            document.removeEventListener('visibilitychange', sync)
            motion.removeEventListener('change', sync)
            compact.removeEventListener('change', sync)
            scene.traverse((object) => {
                if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) return
                object.geometry.dispose()
                const used = object.material as InstanceType<typeof THREE.Material> & {
                    map?: InstanceType<typeof THREE.Texture> | null
                }
                used.map?.dispose()
                used.dispose()
            })
            renderer.dispose()
            renderer.forceContextLoss()
        }
    })

    onUnmounted(() => {
        unmounted = true
        dispose()
    })
</script>

<template>
    <canvas
        ref="canvas"
        class="support-canvas"
    ></canvas>
</template>

<style scoped>
    .support-canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
    }
</style>
