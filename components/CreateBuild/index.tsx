import React from "react";
import useBuildForm from "../../hooks/useBuildForm";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";
import Card from "../common/Card";
// import { handleTitle } from "../../utils/format";
import { AddIcon, RemoveIcon, CloseIcon } from "../common/Icons";
import { closeModal } from "../../redux/modal/slice";
// import useBuilds from "../../hooks/useBuilds";

const CreateBuild = () => {
  const { loading } = useAppSelector((state) => state.builds);
  const { showModal } = useAppSelector((state) => state.modal);

  const {
    formInput,
    buildArr,
    handleInputChange,
    handleSubmit,
    handleAddItem,
    handleRemoveItem,
    itemLoading,
  } = useBuildForm();

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      {showModal && (
        <>
          <div className="fixed bg-gray-800 bg-opacity-20 w-full h-full top-0 right-0 z-20" />

          <div className="absolute w-full">
            <div className="flex flex-col items-center justify-center flex-1 md:px-20 text-center">
              <div className="mt-6 z-50 bg-white flex-row justify-center">
                <div className="relative">
                  <button
                    className="absolute right-0 p-4 text-black"
                    onClick={handleCloseModal}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <form
                  className="border shadow-lg rounded px-6 sm:px-12 pt-6 pb-8"
                  onSubmit={handleSubmit}
                >
                  {loading && <LoadingSpinner />}
                  <h1 className="text-2xl flex justify-center py-2 mb-4">
                    Crie uma build
                  </h1>
                  <h2 className="text-left font-bold text-lg mb-4">
                    Nomeie sua build
                  </h2>
                  <input
                    className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
                    type="text"
                    name="name"
                    placeholder="Nome da build"
                    onChange={handleInputChange}
                    value={formInput.name}
                    required
                    autoComplete="Nome da build"
                  />
                  <div className="rounded my-4 mb-8">
                    <h2 className="text-left font-bold text-lg mb-4">
                      Adicione items
                    </h2>
                    <input
                      className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
                      type="text"
                      name="url"
                      placeholder="URL"
                      onChange={handleInputChange}
                      value={formInput.url}
                      required
                      autoComplete="URL"
                    />
                    <select
                      className="text-gray-700 w-full py-2 px-3 focus:outline-none focus:ring ring-1 ring-black ring-opacity-20 rounded mb-2"
                      name="platform"
                      required
                      onChange={handleInputChange}
                      value={formInput.platform}
                    >
                      <option
                        className="text-gray-500"
                        value=""
                        disabled
                        defaultValue=""
                      >
                        Selecione a loja
                      </option>
                      <option className="text-gray-700" value="amazon">
                        Amazon
                      </option>
                      <option className="text-gray-700" value="kabum">
                        KaBuM
                      </option>
                      <option className="text-gray-700" value="mercado-livre">
                        Mercado Livre
                      </option>
                      <option className="text-gray-700" value="pichau">
                        Pichau
                      </option>
                    </select>
                    <Button
                      success
                      click={handleAddItem}
                      disabled={itemLoading}
                    >
                      {itemLoading ? (
                        <LoadingSpinner
                          className="text-white text-md"
                          notAbsolute
                        />
                      ) : (
                        <AddIcon />
                      )}
                    </Button>
                    <div className="grid grid-cols-1 gap-6 mt-4 items-center">
                      {buildArr.length !== 0 &&
                        buildArr.map((item, key) => (
                          <Card key={key}>
                            <div className="relative md:w-32 w-20 h-14">
                              <Image
                                src={item.image}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>

                            {/* <h2 className="flex items-center">
                              {handleTitle(item.title, true)}
                            </h2> */}
                            <h3 className="flex items-center mx-auto">
                              <strong>R${item.price}</strong>
                            </h3>
                            <div className="flex items-center ml-auto">
                              <div>
                                <Button
                                  danger
                                  click={() => handleRemoveItem(item.title)}
                                  disabled={itemLoading}
                                >
                                  <RemoveIcon />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button success disabled={loading} type="submit">
                      {loading ? (
                        <LoadingSpinner
                          className="text-white text-md"
                          notAbsolute
                        />
                      ) : (
                        <span>Salvar Build</span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateBuild;
