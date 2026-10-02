import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function DevOpsWorldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 240

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      })
    } catch {
      return // Fallback silently if WebGL is unavailable
    }

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Master Group for Mouse Parallax
    const worldGroup = new THREE.Group()
    scene.add(worldGroup)

    // 1. Particle Cloud Globe
    const particleCount = 750
    const globeRadius = 70
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorSky = new THREE.Color("#38bdf8")
    const colorIndigo = new THREE.Color("#818cf8")
    const colorEmerald = new THREE.Color("#10b981")

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi

      const x = globeRadius * Math.cos(theta) * Math.sin(phi)
      const y = globeRadius * Math.sin(theta) * Math.sin(phi)
      const z = globeRadius * Math.cos(phi)

      positions[i * 3] = x + (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 4

      const mixed = Math.random() > 0.6 ? colorSky : Math.random() > 0.3 ? colorIndigo : colorEmerald
      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
    }

    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial)
    worldGroup.add(particleSystem)

    // 2. Wireframe Lattice Cage
    const cageGeometry = new THREE.IcosahedronGeometry(globeRadius, 2)
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial)
    worldGroup.add(cageMesh)

    // 3. Azure Regional Data Center Nodes & Arcs
    const nodes = [
      { name: "westeurope", lat: 52.3676, lon: 4.9041 },
      { name: "eastus", lat: 37.9269, lon: -78.0249 },
      { name: "southindia", lat: 12.9716, lon: 77.5946 },
      { name: "southeastasia", lat: 1.3521, lon: 103.8198 },
      { name: "northeurope", lat: 53.3498, lon: -6.2603 },
    ]

    function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lon + 180) * (Math.PI / 180)
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      )
    }

    const nodeVectors = nodes.map((n) => latLonToVector3(n.lat, n.lon, globeRadius))

    // Glowing Node Points
    const nodeGeometry = new THREE.SphereGeometry(2.5, 12, 12)
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
    })

    nodeVectors.forEach((pos) => {
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial)
      nodeMesh.position.copy(pos)
      worldGroup.add(nodeMesh)

      // Outer Pulsing Ring
      const ringGeo = new THREE.RingGeometry(3.5, 5, 24)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.position.copy(pos)
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0))
      worldGroup.add(ringMesh)
    })

    // 4. Traffic Flow Bezier Arcs
    const curves: THREE.CubicBezierCurve3[] = []
    for (let i = 0; i < nodeVectors.length; i++) {
      for (let j = i + 1; j < nodeVectors.length; j++) {
        const v1 = nodeVectors[i]
        const v2 = nodeVectors[j]
        const distance = v1.distanceTo(v2)

        if (distance < 130) {
          const mid = v1.clone().add(v2).multiplyScalar(0.5)
          const midLen = mid.length()
          mid.normalize().multiplyScalar(midLen + distance * 0.3) // Elevate arc above surface

          const curve = new THREE.CubicBezierCurve3(v1, v1.clone().lerp(mid, 0.5), v2.clone().lerp(mid, 0.5), v2)
          curves.push(curve)

          const points = curve.getPoints(36)
          const curveGeometry = new THREE.BufferGeometry().setFromPoints(points)
          const curveMaterial = new THREE.LineBasicMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.35,
          })
          const line = new THREE.Line(curveGeometry, curveMaterial)
          worldGroup.add(line)
        }
      }
    }

    // 5. Animated Data Packet Sprites moving along arcs
    const packets: { mesh: THREE.Mesh; curve: THREE.CubicBezierCurve3; progress: number; speed: number }[] = []
    const packetGeo = new THREE.SphereGeometry(1.2, 8, 8)
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x34d399 })

    curves.forEach((curve) => {
      const packet = new THREE.Mesh(packetGeo, packetMat)
      worldGroup.add(packet)
      packets.push({
        mesh: packet,
        curve,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      })
    })

    // Mouse Tracking for Parallax
    let targetRotationX = 0
    let targetRotationY = 0
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1
      mouseY = -(((e.clientY - rect.top) / container.clientHeight) * 2 - 1)
      targetRotationY = mouseX * 0.6
      targetRotationX = mouseY * 0.4
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      // Base globe spin
      worldGroup.rotation.y += delta * 0.15

      // Smooth mouse parallax damping
      worldGroup.rotation.y += (targetRotationY - worldGroup.rotation.y) * 0.04
      worldGroup.rotation.x += (targetRotationX - worldGroup.rotation.x) * 0.04

      // Particle subtle wave
      particleSystem.rotation.y -= delta * 0.05

      // Move data packets along arcs
      packets.forEach((p) => {
        p.progress += p.speed
        if (p.progress > 1) p.progress = 0
        const pt = p.curve.getPoint(p.progress)
        p.mesh.position.copy(pt)
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-75"
      aria-hidden="true"
    />
  )
}
