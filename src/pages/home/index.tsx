import React from 'react';
import { history as router } from 'umi';

function HomePage() {

  function handleJumpTo(route: string):void {
    router.push(route);
  }

  return (
    <>
      <h1>home</h1>
      <h1 onClick={() => {handleJumpTo('/drag-test-1')}}>drag-test-1</h1>
      <h1 onClick={() => {handleJumpTo('/dnd-test')}}>dnd-test</h1>
    </>
  )
}

export default HomePage;
