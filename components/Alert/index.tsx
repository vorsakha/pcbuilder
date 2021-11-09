import React, { useEffect } from "react";
import useAlerts from "../../hooks/useAlerts";
import { generateAlert } from "../../redux/alert/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const Alert: React.FC = () => {
  const dispatch = useAppDispatch();

  const alert = useAppSelector((state) => state.alert);
  const auth = useAppSelector((state) => state.auth.alert);
  const user = useAppSelector((state) => state.user.alert);
  const builds = useAppSelector((state) => state.builds.alert);

  const type = alert.type || auth.type || user.type || builds.type || null;
  const msg = alert.msg || auth.msg || user.msg || builds.msg || null;

  const { handleAlerts, alerts } = useAlerts();

  useEffect(() => {
    if (msg !== null && type !== null) {
      dispatch(generateAlert({ type: type, msg: msg }));

      handleAlerts(msg, type);
    }
  }, [dispatch, msg, type]); //eslint-disable-line

  return (
    <div className="fixed z-20 top-15 right-5 py-2 px-4">
      {alerts.map((alert, key) => (
        <div
          key={key}
          className={`${alert.type === "DANGER" ? "bg-red-500" : "bg-green-500"}
           shadow-md py-2 px-4 my-2 no-underline rounded text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none`}
        >
          {alert.msg}
        </div>
      ))}
    </div>
  );
};

export default Alert;
