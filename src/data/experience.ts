export interface Experience {
  hash: string
  title: string
  period: string
  role: string
  description: string
  achievements: string[]
  tags: string[]
}

const experiences: Experience[] = [
  {
    hash: 'a3f2b1c',
    title: '축산 AI 분석 프로젝트',
    period: '2024.03 - 2024.12',
    role: 'Computer Vision Engineer',
    description:
      '대규모 축산 농장의 가축 행동 분석 및 건강 모니터링 시스템 개발. YOLOv8 기반 실시간 객체 감지 파이프라인을 설계하고, ROS2 노드 아키텍처로 카메라 입력부터 대시보드 출력까지 end-to-end 파이프라인을 구축했다.',
    achievements: [
      'YOLOv8 기반 실시간 객체 감지 파이프라인 구축 (정확도 94.2%)',
      'ROS2 노드 아키텍처 설계 및 멀티 카메라 동시 처리 구현',
      'Edge 디바이스(Jetson) 배포 최적화로 처리 속도 2.3배 향상',
      'OpenCV 전처리 파이프라인으로 야간/역광 환경 대응',
    ],
    tags: ['YOLOv8', 'ROS2', 'OpenCV', 'Jetson', 'Python'],
  },
  {
    hash: 'e7d4c9a',
    title: 'ROS2 + Docker 컨테이너 환경 구축',
    period: '2024.06 - 2024.09',
    role: 'DevOps / Systems Engineer',
    description:
      'ROS2 Humble과 딥러닝 추론 환경의 재현 가능한 배포 시스템 설계. Multi-stage Docker 빌드와 GPU passthrough 설정으로 환경 구축 시간을 대폭 단축했다.',
    achievements: [
      'Multi-stage Docker 빌드로 이미지 크기 33% 절감 (4.2GB → 2.8GB)',
      'GPU passthrough + systemd 서비스로 무중단 자동 시작 구현',
      '환경 구축 시간 3일 → 15분으로 단축',
      '팀 내 배포 표준화 가이드 작성 및 적용',
    ],
    tags: ['Docker', 'ROS2', 'CUDA', 'systemd', 'Linux'],
  },
  {
    hash: 'b8f1d3e',
    title: '자율주행 제어 시스템 연구',
    period: '2024.01 - 2024.05',
    role: 'Control Systems Engineer',
    description:
      'PID와 MPC 제어기를 비교 구현하고, 칼만 필터 기반 센서 퓨전으로 자율 이동 로봇의 경로 추종 성능을 개선하는 연구를 수행했다.',
    achievements: [
      '칼만 필터 기반 IMU + 엔코더 센서 퓨전 구현',
      'PID / MPC 비교 실험으로 제어기 선택 가이드라인 도출',
      '경로 추종 오차 ±15cm → ±3cm 달성',
      'C++ 제어 루프 + Python 상위 플래너 혼합 아키텍처 설계',
    ],
    tags: ['PID', 'MPC', 'Kalman Filter', 'C++', 'Python'],
  },
  {
    hash: 'c2a9f7b',
    title: '자기주도 학습 — Edge AI & Physical AI',
    period: '2025.01 - 현재',
    role: 'Self-directed Learner',
    description:
      'Edge AI 배포 파이프라인과 Physical AI 분야를 집중 학습 중. TensorRT 최적화, ONNX 변환, Jetson 플랫폼 활용 등 엣지 디바이스에서의 실시간 AI 추론 역량을 강화하고 있다.',
    achievements: [
      'PyTorch → ONNX → TensorRT 변환 파이프라인 구축 (추론 속도 4배 향상)',
      'Jetson 전용 Docker 이미지 및 CI/CD 자동 배포 설계',
      '포트폴리오 웹사이트 직접 설계 및 개발 (React + TypeScript)',
      'Linux 시스템 관리 및 네트워크 심화 학습',
    ],
    tags: ['TensorRT', 'ONNX', 'Jetson', 'Docker', 'React'],
  },
]

export default experiences
