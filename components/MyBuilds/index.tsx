import React, { useEffect } from "react";
import useBuilds from "../../hooks/useBuilds";
import usePagination from "../../hooks/usePagination";
import { useAppSelector } from "../../redux/hook";
import Card from "../common/Card";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";
import Button from "../common/Button";
import { AiFillDelete as DeleteIcon } from "@react-icons/all-files/ai/AiFillDelete";
import { handleTitle } from "../../utils/format";

const MyBuilds = () => {
  const { handleGetBuilds, handleDeleteBuild } = useBuilds();

  const { builds, loading } = useAppSelector((state) => state.builds);

  useEffect(() => {
    handleGetBuilds();
  }, [handleGetBuilds]);

  const { items, setPagination } = usePagination();

  return (
    <div className="min-h-total">
      {loading && <LoadingSpinner />}
      <h1 className="text-start text-2xl my-4 mt-8">Minhas builds</h1>
      <div className="my-4">
        {builds === null ? (
          <p>Nenhuma build salva.</p>
        ) : (
          <ul className="justify-center w-full">
            {builds.map(
              (b, key) =>
                key < items && (
                  <div
                    className="grid grid-cols-1 gap-6 my-12 relative"
                    key={key}
                  >
                    <h2 className="col-span-1 text-xl text-start font-bold">
                      {b.name}
                    </h2>
                    <div className="col-span-1 flex justify-end absolute top-0 right-0">
                      <Button
                        className="text-xl"
                        danger
                        disabled={loading}
                        click={() => handleDeleteBuild(b.id)}
                      >
                        {loading ? (
                          <LoadingSpinner
                            className="text-white text-md"
                            notAbsolute
                          />
                        ) : (
                          <DeleteIcon />
                        )}
                      </Button>
                    </div>
                    {b.build.map((item, k) => (
                      <Card key={k}>
                        <p className="font-bold text-xl flex items-center">
                          R${item.price}
                        </p>
                        <h2 className="text-xl text-start text-blue-500 mb-4">
                          <a
                            className="mr-8 cursor-pointer"
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {handleTitle(item.title)}
                          </a>
                        </h2>

                        <img src={item.image} alt={item.title} />
                      </Card>
                    ))}
                  </div>
                )
            )}
          </ul>
        )}
        {builds !== null && items < 20
          ? builds.length > 6 && (
              <div className="flex flex-row justify-center mt-8">
                <Button
                  className="ml-4"
                  click={() => setPagination("more")}
                  transparent
                >
                  Load More
                </Button>
              </div>
            )
          : builds !== null &&
            builds.length !== 0 && (
              <div className="flex flex-row justify-center mt-8">
                <Button
                  className="ml-4"
                  click={() => setPagination("less")}
                  transparent
                >
                  Load less
                </Button>
              </div>
            )}
      </div>
    </div>
  );
};

export default MyBuilds;