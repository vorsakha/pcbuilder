import { useCallback } from "react";
import { deleteBuild, loadBuilds } from "../redux/builds/thunk";
import { useAppDispatch } from "../redux/hook";

const useBuilds = () => {
  const dispatch = useAppDispatch();

  const handleGetBuilds = useCallback(() => {
    dispatch(loadBuilds());
  }, [dispatch]);

  const handleDeleteBuild = useCallback(
    (id) => {
      dispatch(deleteBuild(id));
    },
    [dispatch]
  );

  return { handleGetBuilds, handleDeleteBuild };
};

export default useBuilds;
