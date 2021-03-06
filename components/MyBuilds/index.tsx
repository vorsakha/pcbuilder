import React, { useEffect } from "react";
import useBuilds from "../../hooks/useBuilds";
// import usePagination from "../../hooks/usePagination";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Card from "../common/Card";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";
import Button from "../common/Button";
import { handleTitle } from "../../utils/format";
import { AddIcon, DeleteIcon } from "../common/Icons";
import { openModal } from "../../redux/modal/slice";

const MyBuilds = () => {
  const { handleGetBuilds, handleDeleteBuild } = useBuilds();

  const { builds, loading } = useAppSelector((state) => state.builds);

  useEffect(() => {
    handleGetBuilds();
  }, [handleGetBuilds]);

  // const { items, setPagination } = usePagination();

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="min-h-total">
      {loading && <LoadingSpinner />}
      <h1 className="text-start text-2xl my-4 mt-8">Minhas builds</h1>
      <Button
        className="hover:bg-blue-600 bg-blue-500 focus:bg-blue-600  shadow-lg text-gray-200 px-6 py-2 rounded font-medium inline-block ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40"
        click={handleOpenModal}
      >
        <span className="flex items-center">
          <AddIcon className="text-xl mr-1" /> Criar Build
        </span>
      </Button>

      <div className="my-4">
        {builds?.length === 0 ? (
          <p>Nenhuma build salva.</p>
        ) : (
          <ul className="justify-center w-full">
            {builds !== null &&
              builds.map((b, key) => (
                // key < items &&
                <div
                  className="grid grid-cols-1 gap-6 my-8 relative border-t md:p-4"
                  key={key}
                >
                  <h2 className="col-span-1 text-xl text-start font-bold mt-4 md:mt-0">
                    {b.name}
                  </h2>
                  <div className="col-span-1 flex justify-end absolute top-0 right-0 mt-2 md:mt-4 md:mr-4">
                    <Button
                      className="text-xl"
                      danger
                      disabled={loading}
                      click={() => handleDeleteBuild(b.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                  {b.build.map((item, k) => (
                    <Card key={k}>
                      <div className="relative md:w-32 w-20 h-14">
                        <Image
                          src={item.image}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <h2 className="flex items-center mr-auto text-lg md:text-xl text-start text-blue-500">
                        <a
                          className="cursor-pointer"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {handleTitle(item.title)}
                        </a>
                      </h2>
                      <p className="font-bold text-xl flex items-center">
                        R${item.price}
                      </p>
                    </Card>
                  ))}
                </div>
              ))}
          </ul>
        )}
        {/* {builds !== null && items < 20
          ? builds.length > 6 && (
              <div className="flex flex-row justify-center mt-8">
                <Button
                  className="ml-4 hover:bg-blue-600 bg-blue-500 focus:bg-blue-600  shadow-lg text-gray-200 px-6 py-2 rounded font-medium inline-block ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40"
                  click={() => setPagination("more")}
                  transparent
                >
                  Carregar Mais
                </Button>
              </div>
            )
          : builds !== null &&
            builds.length !== 0 && (
              <div className="flex flex-row justify-center mt-8">
                <Button
                  className="ml-4 hover:bg-blue-600 bg-blue-500 focus:bg-blue-600  shadow-lg text-gray-200 px-6 py-2 rounded font-medium inline-block ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40"
                  click={() => setPagination("less")}
                  transparent
                >
                  Carregar Menos
                </Button>
              </div>
            )} */}
      </div>
    </div>
  );
};

export default MyBuilds;
