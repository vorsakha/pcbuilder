import axios from "axios";
import { useCallback } from "react";
import { useState } from "react";
import { API_URL } from "../constants";
import { ScrapeTypes } from "../interfaces";
import { generateAlert } from "../redux/alert/slice";
import { createBuild } from "../redux/builds/thunk";
import { useAppDispatch } from "../redux/hook";

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const fetchItem = async (url: string, store: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      url,
    };

    const res = await axios.post(`${API_URL}api/scrape/${store}`, body, config);

    const obj = res.data;
    obj.url = formInput.url;

    return obj;
  };

  const dispatch = useAppDispatch();

  const handleAddItem = useCallback(async () => {
    if (formInput.url !== "" || formInput.platform !== "") {
      setItemLoading(true);

      const data = await fetchItem(formInput.url, formInput.platform);

      if (data.title === null) {
        dispatch(
          generateAlert({
            type: "DANGER",
            msg: "O item solicitado parece estar fora de estoque.",
          })
        );

        return;
      }

      setBuildArr((prevBuild) => [...prevBuild, data]);
      setItemLoading(false);
      return;
    } else {
      dispatch(
        generateAlert({
          type: "DANGER",
          msg: "Você precisa digitar algo...",
        })
      );

      return;
    }
  }, [dispatch, formInput]);

  const handleRemoveItem = useCallback((id: number) => {
    const arr = buildArr;

    const newArr = arr.splice(id, 1);

    setBuildArr(newArr);
  }, []); // eslint-disable-line

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createBuild({
        name: formInput.name,
        build: buildArr,
      })
    );

    setFormInput({
      name: "",
      url: "",
      platform: "",
    });
    setBuildArr([]);
  };

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
