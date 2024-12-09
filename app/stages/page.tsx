import Head from "next/head";
import Game from "../components/game";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Mini Game with Excalibur.js</title>
        <meta name="description" content="A simple mini-game built with Excalibur.js and Next.js" />
      </Head>
      <main>
        <Game />
      </main>
    </div>
  );
};

export default Home;