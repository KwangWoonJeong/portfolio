export interface Skill {
  name: string
  category: 'vision' | 'robotics' | 'edge' | 'infra' | 'languages'
  level: number
  icon?: string
  description: string
}

const skills: Skill[] = [
  // Vision
  { name: 'YOLOv8', category: 'vision', level: 92, icon: '👁', description: '실시간 객체 감지 및 추적 파이프라인 설계' },
  { name: 'OpenCV', category: 'vision', level: 88, icon: '📷', description: '이미지 처리 및 컴퓨터 비전 알고리즘 구현' },
  { name: 'TensorRT', category: 'vision', level: 82, icon: '⚡', description: '모델 최적화 및 추론 가속화' },
  { name: 'ONNX', category: 'vision', level: 80, icon: '🔄', description: '프레임워크 간 모델 변환 및 배포' },

  // Robotics
  { name: 'ROS2 Humble', category: 'robotics', level: 88, icon: '🤖', description: '로봇 시스템 노드 설계 및 통신 아키텍처' },
  { name: 'Nav2', category: 'robotics', level: 75, icon: '🧭', description: '자율 주행 네비게이션 스택 구성' },
  { name: 'Gazebo', category: 'robotics', level: 72, icon: '🌐', description: '로봇 시뮬레이션 환경 구축 및 테스트' },
  { name: 'MoveIt2', category: 'robotics', level: 70, icon: '🦾', description: '매니퓰레이터 모션 플래닝' },

  // Edge AI
  { name: 'Jetson', category: 'edge', level: 85, icon: '🔲', description: 'NVIDIA Jetson 플랫폼 기반 엣지 추론 배포' },
  { name: 'Docker', category: 'edge', level: 90, icon: '🐳', description: 'AI 추론 환경 컨테이너화 및 오케스트레이션' },
  { name: 'TensorRT', category: 'edge', level: 82, icon: '⚡', description: '엣지 디바이스 최적화 추론 엔진' },
  { name: 'ONNX Runtime', category: 'edge', level: 78, icon: '🏃', description: '크로스 플랫폼 추론 런타임 최적화' },

  // Infra
  { name: 'Linux', category: 'infra', level: 92, icon: '🐧', description: '시스템 관리, 서비스 구성, 커널 튜닝' },
  { name: 'Docker', category: 'infra', level: 90, icon: '🐳', description: '멀티 컨테이너 환경 구성 및 관리' },
  { name: 'Git', category: 'infra', level: 88, icon: '📦', description: '버전 관리 및 협업 워크플로우' },
  { name: 'SSH', category: 'infra', level: 85, icon: '🔑', description: '원격 서버 접속 및 터널링' },
  { name: 'systemd', category: 'infra', level: 82, icon: '⚙', description: '서비스 관리 및 자동화' },
  { name: 'CI/CD', category: 'infra', level: 75, icon: '🔁', description: '빌드/배포 파이프라인 구성' },

  // Languages
  { name: 'Python', category: 'languages', level: 92, icon: '🐍', description: 'AI/ML, 자동화, 데이터 처리' },
  { name: 'Bash', category: 'languages', level: 85, icon: '💻', description: '시스템 스크립팅 및 자동화' },
  { name: 'C++', category: 'languages', level: 78, icon: '⚙', description: 'ROS2 노드, 성능 크리티컬 모듈' },
  { name: 'TypeScript', category: 'languages', level: 70, icon: '📘', description: '웹 프론트엔드 및 툴링' },
]

export default skills
