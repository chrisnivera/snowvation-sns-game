'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  function navigateToStages() {
    // navigate to the stages
    router.push('/stages');
  }

  return (
    <div>
      <button onClick={navigateToStages}>Play</button>
    </div>
  );
}
