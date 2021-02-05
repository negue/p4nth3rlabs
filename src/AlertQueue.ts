import { Dispatch, useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';
import { AllAlerts } from './components/alerts/types';

export function useAlertQueue(dispatch: Dispatch<any>): AllAlerts | null {
  const ctx = useContext(AppContext);
  const [currentAlert, setCurrentAlert] = useState<AllAlerts | null>(null);

  useEffect(() => {
    if (ctx.state.alerts.length === 0) setCurrentAlert(null);
    else if (currentAlert?.id !== ctx.state.alerts[0].id) {
      setCurrentAlert(ctx.state.alerts[0]);
      setTimeout(() => dispatch({ type: 'alert_complete' }), 5000);
    }
  }, [ctx, dispatch, currentAlert]);

  return currentAlert;
}
