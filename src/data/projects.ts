export interface ProjectResult {
  metric: string
  before: string
  after: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  impact: string
  thumbnail: string
  tags: string[]
  category: 'vision' | 'robotics' | 'edge' | 'control'
  github?: string
  demo?: string
  featured: boolean
  problem: string
  approach: string
  architecture: string
  results: ProjectResult[]
  learnings: string[]
  codeSnippet?: { language: string; code: string; title: string }
}

const projects: Project[] = [
  {
    slug: 'livestock-ai',
    title: '축산 AI 분석 시스템',
    subtitle: 'YOLOv8 기반 실시간 가축 행동 감지 및 건강 모니터링 파이프라인',
    impact: '실시간 감지 정확도 94.2% 달성',
    thumbnail: '/projects/livestock-ai.png',
    tags: ['YOLOv8', 'ROS2', 'Python', 'OpenCV', 'Edge'],
    category: 'vision',
    featured: true,
    problem:
      '축산 농장에서 가축의 행동 패턴과 건강 상태를 실시간으로 모니터링해야 하는 과제. 기존 수작업 관찰 방식은 대규모 농장에서 확장이 불가능하며, 질병 조기 발견이 지연되어 경제적 손실이 발생했다.',
    approach:
      'YOLOv8을 축산 데이터셋으로 커스텀 트레이닝하여 가축 객체 감지 모델을 구축했다. ROS2 노드로 멀티 카메라 입력 처리 파이프라인을 설계하고, 감지 결과에 행동 분류 후처리 로직을 적용했다. OpenCV 기반 전처리로 조명 변화에 강건한 입력을 확보하고, 결과를 대시보드로 실시간 스트리밍했다.',
    architecture: `graph LR
  A[Camera] --> B[ROS2 Image Topic]
  B --> C[YOLO Node]
  C --> D[Detection]
  D --> E[Behavior Classifier]
  E --> F[Dashboard]`,
    results: [
      { metric: '감지 정확도', before: '78%', after: '94.2%' },
      { metric: '처리 FPS', before: '12', after: '28' },
      { metric: '모니터링 커버리지', before: '30%', after: '95%' },
    ],
    learnings: [
      'ROS2 QoS 프로파일 설정이 실시간 이미지 처리 안정성에 큰 영향을 미침',
      '데이터 증강(augmentation)이 야간/역광 조건에서의 정확도를 15% 이상 개선',
      '행동 분류는 감지 이후 경량 모델로 분리하는 것이 전체 파이프라인 지연 시간 최적화에 유리',
      'Edge 디바이스 배포 시 배치 크기와 입력 해상도 트레이드오프 분석이 필수적',
    ],
    codeSnippet: {
      language: 'python',
      title: 'ros2_yolo_node.py',
      code: `class YoloDetectorNode(Node):
    def __init__(self):
        super().__init__('yolo_detector')
        self.model = YOLO('livestock_v8.pt')
        self.bridge = CvBridge()
        self.sub = self.create_subscription(
            Image, '/camera/image_raw',
            self.image_callback, 10
        )
        self.pub = self.create_publisher(
            DetectionArray, '/detections', 10
        )

    def image_callback(self, msg: Image):
        frame = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
        results = self.model(frame, conf=0.6)
        detections = self.parse_results(results)
        self.pub.publish(detections)
        self.get_logger().info(
            f'Detected {len(detections.items)} objects'
        )`,
    },
  },
  {
    slug: 'ros2-yolo-docker',
    title: 'ROS2 + YOLO 컨테이너 환경',
    subtitle: 'Docker 기반 ROS2 Humble + CUDA + YOLOv8 통합 배포 환경',
    impact: '배포 시간 3일 → 15분으로 단축',
    thumbnail: '/projects/ros2-yolo-docker.png',
    tags: ['Docker', 'ROS2 Humble', 'YOLOv8', 'GPU Passthrough', 'systemd'],
    category: 'edge',
    featured: true,
    problem:
      'ROS2와 딥러닝 추론 환경의 종속성이 자주 충돌했다. 새 머신마다 환경 셋업에 2-3일이 소요되었고, 팀원 간 환경 차이로 인한 "내 컴에서는 되는데" 문제가 반복적으로 발생했다.',
    approach:
      'Multi-stage Docker 빌드로 ROS2 Humble + CUDA + YOLOv8 런타임을 하나의 이미지로 통합했다. NVIDIA Container Toolkit으로 GPU passthrough를 설정하고, systemd 서비스로 컨테이너 자동 시작을 구현했다. 이미지 크기 최적화를 위해 불필요한 빌드 의존성을 제거하고 레이어 캐싱을 활용했다.',
    architecture: `graph TB
  A[Host OS - Ubuntu 22.04] --> B[Docker Engine]
  B --> C[NVIDIA Container Toolkit]
  C --> D[CUDA Runtime]
  D --> E[ROS2 Humble Container]
  E --> F[YOLO Inference Node]
  E --> G[Camera Driver Node]
  E --> H[Topic Bridge]`,
    results: [
      { metric: '환경 구축 시간', before: '3일', after: '15분' },
      { metric: '이미지 크기', before: '4.2GB', after: '2.8GB' },
      { metric: '재현성', before: '수동', after: '100% 자동' },
    ],
    learnings: [
      'Multi-stage 빌드에서 CUDA 런타임과 개발 도구를 분리하면 이미지 크기를 40% 줄일 수 있음',
      'ROS2 DDS 통신이 Docker 네트워크 모드에 민감하여 --network host 사용이 가장 안정적',
      'systemd의 Restart=always와 Docker health check 조합으로 무중단 운영 달성',
    ],
    codeSnippet: {
      language: 'dockerfile',
      title: 'Dockerfile',
      code: `# Stage 1: Build dependencies
FROM ros:humble AS builder
RUN apt-get update && apt-get install -y \\
    python3-pip ros-humble-cv-bridge
RUN pip3 install ultralytics opencv-python

# Stage 2: Runtime
FROM nvidia/cuda:11.8.0-runtime-ubuntu22.04
COPY --from=builder /opt/ros /opt/ros
COPY --from=builder /usr/lib/python3 /usr/lib/python3
COPY ./ros2_ws /workspace/ros2_ws

ENV ROS_DOMAIN_ID=42
WORKDIR /workspace
RUN . /opt/ros/humble/setup.sh && \\
    colcon build --symlink-install

ENTRYPOINT ["/ros_entrypoint.sh"]
CMD ["ros2", "launch", "yolo_pkg", "detect.launch.py"]`,
    },
  },
  {
    slug: 'autonomous-control',
    title: '자율주행 제어 시스템',
    subtitle: 'PID/MPC 비교 구현 및 칼만 필터 기반 센서 퓨전 경로 추종',
    impact: '경로 추종 오차 ±3cm 이내',
    thumbnail: '/projects/autonomous-control.png',
    tags: ['PID', 'MPC', 'Kalman Filter', 'Python', 'C++', 'Simulation'],
    category: 'control',
    featured: false,
    problem:
      '자율 이동 로봇의 안정적인 경로 추종이 필요했다. 센서 노이즈와 통신 지연에 강건한 제어 시스템이 요구되었으며, 다양한 주행 환경에서 일관된 성능을 보장해야 했다.',
    approach:
      '칼만 필터 기반 센서 퓨전으로 IMU와 엔코더 데이터를 결합하여 상태를 추정했다. PID 컨트롤러와 MPC를 각각 구현하여 경로 추종 성능을 비교했다. 시뮬레이션 환경에서 다양한 경로 패턴에 대해 검증을 수행하고, 최적 파라미터를 도출했다.',
    architecture: `graph LR
  A[IMU + Encoder] --> B[Kalman Filter]
  B --> C[State Estimation]
  C --> D{Controller}
  D --> E[PID]
  D --> F[MPC]
  E --> G[Motor Command]
  F --> G
  G --> H[Robot]
  H --> A`,
    results: [
      { metric: '경로 추종 오차', before: '±15cm', after: '±3cm' },
      { metric: '제어 주기', before: '20Hz', after: '50Hz' },
      { metric: '장애물 회피 성공률', before: '72%', after: '96%' },
    ],
    learnings: [
      'MPC는 PID 대비 곡선 구간에서 30% 낮은 추종 오차를 보이나 연산 비용이 5배 높음',
      '칼만 필터의 프로세스 노이즈(Q) 튜닝이 전체 시스템 성능에 결정적 영향',
      '제어 주기를 50Hz로 높이려면 MPC 최적화 문제의 Horizon 길이를 줄여 연산 시간을 확보해야 함',
      'C++로 제어 루프를 구현하고 Python으로 상위 플래너를 작성하는 혼합 아키텍처가 효과적',
    ],
  },
  {
    slug: 'edge-ai-pipeline',
    title: 'Edge AI 배포 파이프라인',
    subtitle: 'PyTorch → ONNX → TensorRT 최적화 및 Jetson 자동 배포',
    impact: '추론 속도 4배 향상 (TensorRT 최적화)',
    thumbnail: '/projects/edge-ai-pipeline.png',
    tags: ['Jetson', 'TensorRT', 'ONNX', 'Docker', 'CI/CD'],
    category: 'edge',
    featured: false,
    problem:
      '클라우드 의존 없이 엣지 디바이스에서 실시간 AI 추론이 필요했다. 모델 최적화와 배포 자동화가 없으면 매번 수동으로 변환과 배포를 반복해야 했고, 디바이스별 호환성 문제가 빈번했다.',
    approach:
      'PyTorch 모델을 ONNX로 변환한 뒤 TensorRT 엔진으로 최적화하는 3단계 파이프라인을 구축했다. Jetson 전용 Docker 이미지를 만들어 아키텍처 차이를 추상화하고, GitHub Actions 기반 CI/CD로 모델 변환부터 디바이스 배포까지 자동화했다.',
    architecture: `graph LR
  A[PyTorch Model] --> B[ONNX Export]
  B --> C[TensorRT Engine]
  C --> D[Jetson Docker Image]
  D --> E[GitHub Actions CI/CD]
  E --> F[Edge Device Deploy]`,
    results: [
      { metric: '추론 속도', before: '45ms', after: '11ms' },
      { metric: '모델 크기', before: '180MB', after: '42MB' },
      { metric: '배포 자동화', before: '수동', after: 'GitHub Actions' },
    ],
    learnings: [
      'TensorRT FP16 양자화로 정확도 손실 0.3% 미만으로 속도 2배 추가 향상 가능',
      'ONNX opset 버전과 TensorRT 버전 호환성 매트릭스를 반드시 확인해야 함',
      'Jetson의 JetPack 버전에 따라 CUDA/cuDNN 조합이 다르므로 Docker base 이미지 선택이 중요',
      'CI/CD에서 ARM64 크로스 빌드 시 QEMU 에뮬레이션보다 네이티브 빌드 러너가 10배 빠름',
    ],
  },
]

export default projects
