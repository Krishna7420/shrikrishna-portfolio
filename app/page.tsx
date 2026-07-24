import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";

import About from "./components/About/About";
import Projects from "./components/Sections/Projects";
import Experience from "./components/Sections/Experience";
import Contact from "./components/Sections/Contact";
import ScrollApple from "./components/three/ScrollApple";
import Live from "./components/Sections/Live";
import TodaysEventCard from "./components/TodaysEventCard";



export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">

    

      <div className="relative z-10">

        <Navbar />
        <TodaysEventCard />
        <Hero />
        <About />
        <ScrollApple />
        <Projects />
        <Live />  
        <Experience />
        <Contact />
       

      </div>

    </main>
  );
}