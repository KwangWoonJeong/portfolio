export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readTime: string
}

const posts: BlogPost[] = [
  {
    slug: 'ros2-docker-gpu-passthrough',
    title: 'ROS2 Humble + Docker GPU Passthrough 완벽 가이드',
    date: '2024-12-15',
    tags: ['ros2', 'docker'],
    excerpt:
      'NVIDIA Container Toolkit을 활용한 ROS2 Docker 환경에서의 GPU 가속 설정. DDS 통신과 네트워크 모드 선택까지 실전 삽질기.',
    readTime: '5 min read',
  },
  {
    slug: 'yolov8-custom-training-livestock',
    title: 'YOLOv8 커스텀 트레이닝: 축산 데이터셋 구축기',
    date: '2024-11-28',
    tags: ['yolov8', 'dataset'],
    excerpt:
      '축산 환경에 특화된 커스텀 데이터셋 구축부터 YOLOv8 트레이닝, 평가까지. 데이터 증강 전략과 야간 환경 대응 노하우.',
    readTime: '8 min read',
  },
  {
    slug: 'systemd-ros2-autostart',
    title: 'systemd로 ROS2 노드 자동 시작 설정하기',
    date: '2024-10-20',
    tags: ['linux', 'systemd', 'ros2'],
    excerpt:
      '서버 재부팅 후에도 ROS2 노드가 자동으로 시작되도록 systemd 서비스를 구성하는 방법. Restart 정책과 의존성 관리.',
    readTime: '4 min read',
  },
  {
    slug: 'tensorrt-optimization-guide',
    title: 'TensorRT 최적화로 추론 속도 4배 올리기',
    date: '2024-09-10',
    tags: ['tensorrt', 'optimization'],
    excerpt:
      'PyTorch 모델을 ONNX로 변환하고 TensorRT 엔진으로 최적화하는 전체 파이프라인. FP16 양자화와 배치 처리 전략.',
    readTime: '7 min read',
  },
  {
    slug: 'kalman-filter-intuition',
    title: '칼만 필터 직관적 이해: 센서 퓨전 입문',
    date: '2024-08-05',
    tags: ['control', 'kalman'],
    excerpt:
      '수식 없이 시작하는 칼만 필터의 핵심 직관. 예측-보정 사이클을 로봇 센서 퓨전 예제로 이해하기.',
    readTime: '6 min read',
  },
]

export default posts
