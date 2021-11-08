import React, { useEffect, useCallback } from "react";
import { clearAlert, generateAlert } from "../../redux/alert/slice";
import { clearAuthAlert } from "../../redux/auth/slice";
import { clearBuildsAlert } from "../../redux/builds/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { clearUserAlert } from "../../redux/user/slice";

const Alert: React.FC = () => {
  const dispatch = useAppDispatch();

  const alert = useAppSelector((state) => state.alert);
  const auth = useAppSelector((state) => state.auth.alert);
  const user = useAppSelector((state) => state.user.alert);
  const builds = useAppSelector((state) => state.builds.alert);
  const show = alert.show;

  const type = alert.type || auth.type || user.type || builds.type || null;
  const msg = alert.msg || auth.msg || user.msg || builds.msg || null;

  const clearAlerts = useCallback(() => {
    setTimeout(() => {
      dispatch(clearAuthAlert());
      dispatch(clearBuildsAlert());
      dispatch(clearUserAlert());
      dispatch(clearAlert());
    }, 3000);
  }, [dispatch]);

  useEffect(() => {
    msg !== null &&
      type !== null &&
      dispatch(generateAlert({ type: type, msg: msg }));
  }, [dispatch, msg, type]);

  useEffect(() => {
    show && clearAlerts();
  }, [show, clearAlerts]);

  return (
    <div className="fixed z-20 top-15 right-5 py-2 px-4">
      {show && msg !== null && (
        <div
          className={`${type === "DANGER" ? "bg-red-500" : "bg-green-500"}
           shadow-md py-2 px-4 no-underline rounded text-white font-sans font-semibold text-sm border-red btn-primary hover:text-white hover:bg-red-light focus:outline-none active:shadow-none`}
        >
          {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
