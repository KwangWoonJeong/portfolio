import { Helmet } from 'react-helmet-async'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import TechStack from '../components/sections/TechStack'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import Blog from '../components/sections/Blog'
import Contact from '../components/sections/Contact'
import { personSchema } from '../utils/structuredData'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>만보 | Computer Vision &amp; Physical AI Engineer</title>
        <meta
          name="description"
          content="ROS2, YOLOv8, Edge AI 전문 엔지니어 만보의 포트폴리오. 실시간 객체 감지, 로봇 제어, 엣지 배포 프로젝트."
        />
        <link rel="canonical" href="https://manbo.dev/" />
        <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
      </Helmet>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
    </>
  )
}
