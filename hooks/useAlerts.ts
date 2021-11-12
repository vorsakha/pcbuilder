import { useState } from "react";
import { clearAlert } from "../redux/alert/slice";
import { clearAuthAlert } from "../redux/auth/slice";
import { clearBuildsAlert } from "../redux/builds/slice";
import { useAppDispatch } from "../redux/hook";
import { clearUserAlert } from "../redux/user/slice";

const useAlerts = () => {
  const [alerts, setAlerts] = useState<{ msg: string; type: string }[]>([]);

  const dispatch = useAppDispatch();

  const resolveAlert = (id: string) => {
    setTimeout(() => {
      dispatch(clearAuthAlert());
      dispatch(clearBuildsAlert());
      dispatch(clearUserAlert());
      dispatch(clearAlert());

      const filteredArray = alerts.filter((alert) => alert.msg === id);

      setAlerts(filteredArray);
    }, 3000);
  };

  const handleAlerts = (msg: string, type: string) => {
    const checkIfAlertExists =
      alerts.filter((alert) => alert.msg === msg).length !== 0;

    if (checkIfAlertExists) {
      return;
    }

    setAlerts((prev) => [...prev, { msg, type }]);

    resolveAlert(msg);
  };

  return { alerts, handleAlerts };
};

export default useAlerts;
