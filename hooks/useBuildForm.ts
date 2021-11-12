import axios from "axios";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../constants";
import { ScrapeTypes } from "../interfaces";
import { generateAlert } from "../redux/alert/slice";
import { createBuild } from "../redux/builds/thunk";
import { useAppDispatch, useAppSelector } from "../redux/hook";

interface BuildForm {
  name: string;
  url: string;
  platform: string;
}

const useBuildForm = () => {
  const [formInput, setFormInput] = useState<BuildForm>({
    name: "",
    url: "",
    platform: "",
  });
  const [buildArr, setBuildArr] = useState<ScrapeTypes[]>([]);
  const [itemLoading, setItemLoading] = useState<boolean>(false);

  const { alert } = useAppSelector((state) => state.builds);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const fetchItem = useCallback(
    async (url: string, store: string) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        url,
      };

      const res = await axios.post(
        `${API_URL}api/scrape/${store}`,
        body,
        config
      );

      const obj = res.data;
      obj.url = formInput.url;

      return obj;
    },
    [formInput.url]
  );

  const dispatch = useAppDispatch();

  const handleAddItem = useCallback(async () => {
    if (formInput.platform !== "" && formInput.url !== "") {
      setItemLoading(true);

      try {
        const data = await fetchItem(formInput.url, formInput.platform);

        if (data.price === null || data.title === null) {
          dispatch(
            generateAlert({
              type: "DANGER",
              msg: "O item solicitado parece estar indisponível.",
            })
          );

          setItemLoading(false);

          return;
        }

        setBuildArr((prevBuild) => [...prevBuild, data]);
        setItemLoading(false);
      } catch (error: any) {
        dispatch(
          generateAlert({
            type: "DANGER",
            msg: error.message,
          })
        );
        setItemLoading(false);
      }

      return;
    } else {
      dispatch(
        generateAlert({
          type: "DANGER",
          msg: "Algo deu errado",
        })
      );

      return;
    }
  }, [dispatch, formInput.url, formInput.platform, fetchItem]);

  const handleRemoveItem = (id: string) => {
    setItemLoading(true);

    const result = buildArr.filter((item) => item.title !== id);

    setBuildArr(result);
    setItemLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createBuild({
        name: formInput.name,
        build: buildArr,
      })
    );
  };

  useEffect(() => {
    if (alert.type === "SUCCESS") {
      setFormInput({
        name: "",
        url: "",
        platform: "",
      });
      setBuildArr([]);
    }
  }, [alert]);

  return {
    handleAddItem,
    handleSubmit,
    handleInputChange,
    formInput,
    buildArr,
    handleRemoveItem,
    itemLoading,
  };
};

export default useBuildForm;
