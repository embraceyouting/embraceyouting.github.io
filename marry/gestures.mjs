const VISION = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';
const MODEL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

let modelPromise;
function loadModel() {
    modelPromise ??= (async () => {
        const { FilesetResolver, HandLandmarker } = await import(VISION + '/+esm');
        const vision = await FilesetResolver.forVisionTasks(VISION + '/wasm');
        const options = {
            baseOptions: { modelAssetPath: MODEL, delegate: 'GPU' },
            runningMode: 'VIDEO',
            numHands: 1,
        };
        try {
            return await HandLandmarker.createFromOptions(vision, options);
        } catch {
            options.baseOptions.delegate = 'CPU';
            return HandLandmarker.createFromOptions(vision, options);
        }
    })().catch(error => {
        modelPromise = undefined;
        throw error;
    });
    return modelPromise;
}

function cameraError(error) {
    if (error.name === 'NotAllowedError') return '摄像头权限未开启。可在浏览器中授权后重试。';
    if (error.name === 'NotFoundError') return '未找到可用的摄像头。';
    if (error.name === 'NotReadableError') return '摄像头暂时无法使用，请检查是否被其他应用占用。';
    return '无法开启手势控制，请稍后重试。';
}

function readHand(landmarks) {
    const wrist = landmarks[0];
    const palm = landmarks[9];
    const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const size = distance(wrist, palm);
    if (size < 0.02) return null;

    const extension = [8, 12, 16, 20].reduce((sum, tip) => sum + distance(wrist, landmarks[tip]), 0) / (4 * size);
    const pinch = distance(landmarks[4], landmarks[8]) / size;
    let mode = null;
    if (extension < 1.5) mode = 'TREE';
    else if (pinch < 0.35) mode = 'FOCUS';
    else if (extension > 1.7) mode = 'SCATTER';
    return { x: 1 - palm.x * 2, y: palm.y * 2 - 1, mode };
}

export function createGestureControls({ button, panel, status, video, select, onPointer, onMode }) {
    let revision = 0;
    let request = 0;
    let stream;
    let active = false;

    function setActive(value) {
        active = value;
        button.textContent = active ? '关闭手势' : '启用手势';
        button.setAttribute('aria-pressed', String(active));
    }

    function stop(message = '') {
        revision++;
        cancelAnimationFrame(request);
        stream?.getTracks().forEach(track => track.stop());
        stream = undefined;
        video.srcObject = null;
        panel.hidden = true;
        select.hidden = true;
        setActive(false);
        status.textContent = message;
    }

    function detect(model, currentRevision) {
        let lastRun = 0;
        let lastVideoTime = -1;
        let lastGesture = null;

        function frame(now) {
            if (currentRevision !== revision) return;
            if (video.readyState >= 2 && now - lastRun >= 65 && video.currentTime !== lastVideoTime) {
                lastRun = now;
                lastVideoTime = video.currentTime;
                try {
                    const landmarks = model.detectForVideo(video, now).landmarks[0];
                    const hand = landmarks && readHand(landmarks);
                    if (hand) {
                        onPointer(hand.x, hand.y);
                        if (hand.mode && hand.mode !== lastGesture) onMode(hand.mode);
                    }
                    lastGesture = hand?.mode ?? null;
                } catch {
                    stop('手势识别已中断，请重新启用。');
                    return;
                }
            }
            request = requestAnimationFrame(frame);
        }

        request = requestAnimationFrame(frame);
    }

    async function start(deviceId) {
        stop();
        if (!navigator.mediaDevices?.getUserMedia) {
            status.textContent = '当前环境无法使用摄像头，请在 HTTPS 或本机地址打开。';
            return;
        }

        const currentRevision = revision;
        setActive(true);
        status.textContent = '正在开启摄像头…';

        try {
            const source = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    ...(deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'user' }),
                    width: { ideal: 480 },
                    height: { ideal: 360 },
                },
            });
            if (revision !== currentRevision) {
                source.getTracks().forEach(track => track.stop());
                return;
            }
            stream = source;
            const track = source.getVideoTracks()[0];
            track.addEventListener('ended', () => {
                if (revision === currentRevision) stop('摄像头已断开。');
            }, { once: true });
            video.srcObject = source;
            await video.play();
            if (revision !== currentRevision) return;
            panel.hidden = false;
            status.textContent = '正在加载手势识别…';

            const model = await loadModel();
            if (revision !== currentRevision) return;
            status.textContent = '';
            detect(model, currentRevision);

            const devices = await navigator.mediaDevices.enumerateDevices().catch(() => []);
            if (revision !== currentRevision) return;
            const cameras = devices.filter(device => device.kind === 'videoinput' && device.deviceId);
            select.replaceChildren(...cameras.map((camera, index) => new Option(camera.label || `摄像头 ${index + 1}`, camera.deviceId)));
            const selected = track.getSettings().deviceId;
            if (cameras.some(camera => camera.deviceId === selected)) select.value = selected;
            select.hidden = cameras.length < 2;
        } catch (error) {
            if (revision === currentRevision) stop(cameraError(error));
        }
    }

    select.addEventListener('change', () => start(select.value));
    window.addEventListener('pagehide', () => stop());

    return { toggle: () => active ? stop() : start(), stop };
}
