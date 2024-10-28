// App.tsx
import React from 'react';
import Profile from './components/profile';
import Login from './components/login';
import Description from './components/description';
import AdviceRantPage from './components/adviceRantPage';
import PostList from './components/PostList';

import { useSelector } from 'react-redux';
import { RootState } from './index';
import SafeXpaceVista from './components/safeXpaceVista';

function App() {
  const hasInfo = useSelector((state: RootState) => state.user.hasInfo);
  const hasDescription =  useSelector((state: RootState) => state.user.hasDescription);
  const isInSafeX = useSelector((state: RootState) => state.user.isInSafeX);
  return (
    <div className='app space-y-6 p-4'>
      {!hasInfo && <Login />}
      {hasInfo && !hasDescription && <Description />}
      {hasDescription && !isInSafeX && <Profile />}
      {isInSafeX && (
        <div className="space-y-8">
          <SafeXpaceVista />
          <AdviceRantPage />
          <PostList /> 
        </div>
      )}
    </div>
  );
}

export default App;