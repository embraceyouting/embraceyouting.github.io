import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const TREE_HEIGHT = 24;
const TREE_RADIUS = 8;
const GOLD = 0xffd966;
const TAU = Math.PI * 2;

function treePosition() {
    const height = Math.random() ** 0.8;
    const angle = height * 50 * Math.PI + Math.random() * Math.PI;
    const radius = Math.max(0.5, TREE_RADIUS * (1 - height)) * (0.8 + Math.random() * 0.4);
    return new THREE.Vector3(Math.cos(angle) * radius, (height - 0.5) * TREE_HEIGHT, Math.sin(angle) * radius);
}

function scatterPosition(min, max) {
    const radius = THREE.MathUtils.randFloat(min, max);
    const angle = Math.random() * TAU;
    const y = THREE.MathUtils.randFloatSpread(2);
    const horizontal = Math.sqrt(1 - y * y);
    return new THREE.Vector3(Math.cos(angle) * horizontal * radius, y * radius, Math.sin(angle) * horizontal * radius);
}

function textureFromCanvas(size, draw) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    draw(canvas.getContext('2d'), size);
    return new THREE.CanvasTexture(canvas);
}

function createOrnaments(group) {
    const box = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const sphere = new THREE.SphereGeometry(0.5, 12, 8);
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.5, 0),
        new THREE.Vector3(0, 0.25, 0),
        new THREE.Vector3(0.1, 0.47, 0),
        new THREE.Vector3(0.34, 0.39, 0),
    ]);
    const cane = new THREE.TubeGeometry(curve, 10, 0.083, 6, false);
    const stripes = textureFromCanvas(64, (context, size) => {
        context.fillStyle = '#fff4eb';
        context.fillRect(0, 0, size, size);
        context.strokeStyle = '#ab2328';
        context.lineWidth = 8;
        for (let x = -size; x < size; x += 16) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x + size, size);
            context.stroke();
        }
    });
    stripes.colorSpace = THREE.SRGBColorSpace;
    stripes.wrapS = THREE.RepeatWrapping;
    stripes.repeat.x = 2;

    const gold = new THREE.MeshStandardMaterial({
        color: GOLD, metalness: 0.88, roughness: 0.21, emissive: 0x4f2908, emissiveIntensity: 0.27,
    });
    const green = new THREE.MeshStandardMaterial({
        color: 0x164f31, metalness: 0.27, roughness: 0.65, emissive: 0x092a1b, emissiveIntensity: 0.3,
    });
    const red = new THREE.MeshStandardMaterial({
        color: 0xc4272b, metalness: 0.42, roughness: 0.26, emissive: 0x5b0714, emissiveIntensity: 0.25,
    });
    const candy = new THREE.MeshStandardMaterial({ map: stripes, roughness: 0.46 });
    const dust = new THREE.MeshBasicMaterial({ color: 0xffe2a1 });

    return [
        [box, green, 600], [box, gold, 450], [sphere, gold, 330],
        [sphere, red, 75], [cane, candy, 45], [new THREE.TetrahedronGeometry(0.1), dust, 1100],
    ].map(([geometry, material, count], batchIndex) => {
        const isDust = batchIndex === 5;
        const mesh = new THREE.InstancedMesh(geometry, material, count);
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        mesh.frustumCulled = false;
        group.add(mesh);

        const ornaments = Array.from({ length: count }, () => {
            const tree = treePosition();
            return {
                tree,
                scatter: scatterPosition(isDust ? 12 : 8, isDust ? 29 : 20),
                position: tree.clone(),
                rotation: new THREE.Euler(Math.random() * TAU, Math.random() * TAU, Math.random() * TAU),
                speed: THREE.MathUtils.randFloat(-1.1, 1.1),
                size: THREE.MathUtils.randFloat(0.4, 0.9),
            };
        });
        return { mesh, ornaments, isDust };
    });
}

function createStar(group) {
    const shape = new THREE.Shape();
    for (let point = 0; point < 10; point++) {
        const angle = Math.PI / 2 + point * TAU / 10;
        const radius = point % 2 === 0 ? 1.52 : 0.65;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (point === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    }
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.32, bevelThickness: 0.09, bevelSize: 0.09, bevelSegments: 2,
    }).center();
    const star = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        color: 0xffedba, emissive: 0xffbf40, emissiveIntensity: 0.8, metalness: 0.35, roughness: 0.25,
    }));
    star.position.y = TREE_HEIGHT / 2 + 1.35;
    group.add(star);

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: textureFromCanvas(64, (context, size) => {
            const center = size / 2;
            const gradient = context.createRadialGradient(center, center, 0, center, center, center);
            gradient.addColorStop(0, '#fff7dbea');
            gradient.addColorStop(0.22, '#ffc5484d');
            gradient.addColorStop(1, '#ffac3300');
            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);
        }),
        blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.7,
    }));
    glow.position.copy(star.position);
    glow.scale.setScalar(6);
    group.add(glow);
}

function createSnow(scene) {
    const count = 650;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let index = 0; index < count; index++) {
        positions[index * 3] = THREE.MathUtils.randFloatSpread(90);
        positions[index * 3 + 1] = THREE.MathUtils.randFloatSpread(65);
        positions[index * 3 + 2] = THREE.MathUtils.randFloatSpread(55);
        speeds[index] = THREE.MathUtils.randFloat(1.5, 4.5);
    }

    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', attribute);
    const material = new THREE.PointsMaterial({
        size: 0.18,
        map: textureFromCanvas(32, (context, size) => {
            const center = size / 2;
            const gradient = context.createRadialGradient(center, center, 0, center, center, center);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.55, '#fffd');
            gradient.addColorStop(1, '#fff0');
            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);
        }),
        color: 0xd8e7ff,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
    });
    scene.add(new THREE.Points(geometry, material));

    return (delta, time) => {
        for (let index = 0; index < count; index++) {
            positions[index * 3] += Math.sin(time + index) * delta * 0.8;
            positions[index * 3 + 1] -= speeds[index] * delta;
            if (positions[index * 3 + 1] < -32.5) positions[index * 3 + 1] = 32.5;
        }
        attribute.needsUpdate = true;
    };
}

export function createScene(container, setStatus) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.42;
    container.append(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1523, 0.011);
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(renderer);
    scene.environment = generator.fromScene(room, 0.04).texture;
    room.dispose();
    generator.dispose();

    const light = new THREE.DirectionalLight(0xffe3a5, 2.1);
    light.position.set(4, 7, 8);
    const rim = new THREE.DirectionalLight(0xa3c5ff, 1.6);
    rim.position.set(-6, 3, -3);
    scene.add(light, rim, new THREE.HemisphereLight(0xe0edff, 0x35472d, 1.1));

    const group = new THREE.Group();
    scene.add(group);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    const ornaments = createOrnaments(group);
    createStar(group);
    const updateSnow = createSnow(scene);

    const photoBox = new THREE.BoxGeometry(1, 1, 0.055);
    const photoPlane = new THREE.PlaneGeometry(1, 1);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.65, roughness: 0.32 });
    const photos = [];
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const transform = new THREE.Object3D();
    const focusPosition = new THREE.Vector3();
    const pointer = new THREE.Vector2();
    let mode = 'TREE';
    let focus = null;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let contextLost = false;

    function update(now, snap) {
        const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
        lastTime = now;
        elapsed += delta;
        const transition = snap ? 1 : 1 - Math.exp(-delta * 4);
        const rotate = snap ? 0 : delta;

        if (mode === 'TREE') {
            group.rotation.y += 0.23 * rotate;
            group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, 0, transition);
        } else if (mode === 'SCATTER') {
            group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 2.7, transition);
            group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.64, transition);
        }
        if (snap && mode !== 'SCATTER') group.rotation.set(0, 0, 0);

        for (const { mesh, ornaments: batch, isDust } of ornaments) {
            mesh.visible = !isDust || mode !== 'TREE';
            if (!mesh.visible) continue;
            batch.forEach((item, index) => {
                item.position.lerp(mode === 'TREE' ? item.tree : item.scatter, transition);
                item.rotation.y += item.speed * rotate;
                transform.position.copy(item.position);
                transform.rotation.copy(item.rotation);
                const size = isDust ? item.size * (0.95 + 0.35 * Math.sin(elapsed * 3 + index)) : item.size;
                transform.scale.setScalar(size);
                transform.updateMatrix();
                mesh.setMatrixAt(index, transform.matrix);
            });
            mesh.instanceMatrix.needsUpdate = true;
        }

        if (focus) {
            const diameter = 5.5 / Math.min(camera.aspect, 1);
            const distance = Math.max(12, diameter / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.73));
            focusPosition.copy(camera.position);
            focusPosition.z -= distance;
            group.worldToLocal(focusPosition);
        }

        for (const photo of photos) {
            const { mesh, tree, scatter } = photo;
            const selected = photo === focus;
            mesh.position.lerp(selected ? focusPosition : mode === 'TREE' ? tree : scatter, transition);
            const size = selected ? 4.45 : mode === 'SCATTER' ? 1.85 : 0.98;
            mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, size, transition));
            if (selected) mesh.lookAt(camera.position);
            else if (mode === 'TREE') mesh.rotation.set(0, Math.atan2(tree.x, tree.z), 0);
            else mesh.rotation.y += 0.34 * rotate;
        }
        if (rotate) updateSnow(rotate, elapsed);
        renderer.render(scene, camera);
    }

    function tick(now) {
        update(now, false);
        frame = requestAnimationFrame(tick);
    }

    function draw() {
        if (document.hidden || contextLost) return;
        if (motion.matches) update(performance.now(), true);
        else if (!frame) frame = requestAnimationFrame(tick);
    }

    function stop() {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
    }

    function resize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.position.set(0, 1.35, Math.max(59, 31 / camera.aspect));
        camera.updateProjectionMatrix();
        const pixelLimit = Math.sqrt(2300000 / (width * height));
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6, pixelLimit));
        renderer.setSize(width, height, false);
        draw();
    }

    renderer.domElement.addEventListener('webglcontextlost', event => {
        event.preventDefault();
        contextLost = true;
        stop();
        setStatus('3D 画面已中断，照片仍可在相册中查看。', false);
    });
    renderer.domElement.addEventListener('webglcontextrestored', () => {
        contextLost = false;
        setStatus('', true);
        draw();
    });
    new ResizeObserver(resize).observe(container);
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : draw());
    motion.addEventListener('change', () => {
        stop();
        draw();
    });
    resize();

    return {
        setPointer(x, y) {
            pointer.set(x, y);
            if (mode === 'SCATTER') draw();
        },
        setMode(nextMode, nextFocus) {
            mode = nextMode;
            focus = nextFocus;
            draw();
        },
        addPhoto(image) {
            const texture = new THREE.Texture(image);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
            const ratio = image.width / image.height;
            const width = 1.2 * Math.min(1, ratio);
            const height = 1.2 * Math.min(1, 1 / ratio);
            const frame = new THREE.Mesh(photoBox, frameMaterial);
            frame.scale.set(width + 0.09, height + 0.09, 1);
            const picture = new THREE.Mesh(photoPlane, new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
            picture.position.z = 0.032;
            picture.scale.set(width, height, 1);
            const mesh = new THREE.Group();
            mesh.add(frame, picture);
            group.add(mesh);

            const photo = { mesh, tree: new THREE.Vector3(), scatter: scatterPosition(9, 19) };
            photos.push(photo);
            photos.forEach(({ tree }, index) => {
                const progress = (index + 0.5) / photos.length;
                const angle = index * Math.PI * (3 - Math.sqrt(5)) + Math.PI / 4;
                const radius = 4 + TREE_RADIUS * 0.9 * (1 - progress);
                tree.set(Math.cos(angle) * radius, (progress - 0.5) * TREE_HEIGHT * 0.89, Math.sin(angle) * radius);
            });
            mesh.position.copy(mode === 'TREE' ? photo.tree : photo.scatter);
            draw();
            return photo;
        },
    };
}
