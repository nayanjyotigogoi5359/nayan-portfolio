import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Process from "@/components/Process";
import Portrait from "@/components/Portrait";
import Origin from "@/components/Origin";
import Toolkit from "@/components/Toolkit";
import Experiments from "@/components/Experiments";
import Frontier from "@/components/Frontier";
import Connection from "@/components/Connection";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Manifesto />
        <Portrait />
        <Origin />
        <Toolkit />
        <Experiments />
        <Process />
        <Frontier />
        <Connection />
      </main>
    </>
  );
}
