import React from 'react';
import AuthStack from './Auth/AuthStack';
import { UserContext } from '../supabase/ViewModel';
import { supabase } from '../supabase/supabase.ts';
import MainStack from './Main/MainStack';

function AppNavigator() {
  const { session, setSession } = React.useContext(UserContext);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session && session.user ? <MainStack /> : <AuthStack />;
}

export default AppNavigator;
