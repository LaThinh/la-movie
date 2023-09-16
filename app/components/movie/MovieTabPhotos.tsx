import React, { useEffect, useState, memo } from "react";
import { getMovieImages } from "@/app/api/FetchMovieDB";
import { IMovieImages, IPhoto } from "@/app/interfaces";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { DownloadIcon } from "@radix-ui/react-icons";

export enum PhotoType {
  Posters = "posters",
  Logos = "logos",
  BackDrops = "backdrops",
}

export function MovieTabPhotos({ movieId }: { movieId: string }) {
  const [movieImages, setMovieImages] = useState<IMovieImages>();
  const [photoList, setPhotoList] = useState<IPhoto[]>();
  const [loading, setLoading] = useState(true);
  const [photoType, setPhotoType] = useState<PhotoType>();
  const [indexShow, setIndexShow] = useState(0);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const getPhotos = async () => {
      const data = await getMovieImages({ movieId: movieId });
      if (data) {
        setMovieImages(data);
      }
      console.log(data);
      setLoading(false);
    };

    getPhotos();
  }, []);

  const handleChangeImageType = (key: React.Key) => {
    if (key == "backdrops") {
      setPhotoType(PhotoType.BackDrops);
      //setPhotoList(movieImages?.backdrops);
      const photoLanguage = movieImages?.backdrops.filter((photo) => {
        return photo.iso_639_1 == "en";
      });
      setPhotoList(photoLanguage);
    }

    if (key == "logos") {
      setPhotoType(PhotoType.Logos);
      //setPhotoList(movieImages?.logos);
      const photoLanguage = movieImages?.logos.filter((photo) => {
        return photo.iso_639_1 == "en";
      });
      setPhotoList(photoLanguage);
    }

    if (key == "posters") {
      setPhotoType(PhotoType.Posters);
      //setPhotoList(movieImages?.posters);
      const photoLanguage = movieImages?.posters.filter((photo) => {
        return photo.iso_639_1 == "en";
      });
      setPhotoList(photoLanguage);
    }
  };

  const handleShowPhoto = (index: number) => {
    setIndexShow(index);
    onOpen();
  };

  const handleNextPhoto = () => {
    setIndexShow(
      Math.min(indexShow + 1, photoList?.length ? photoList.length - 1 : 0)
    );
  };

  const handlePrevPhoto = () => {
    setIndexShow(Math.max(indexShow - 1, 0));
  };

  return (
    <div className="movie-photos">
      {loading && (
        <div className="text-primary-500 p-5 text-center text-xl">
          Loading Photos <Spinner />
        </div>
      )}

      {movieImages && movieImages.backdrops.length > 0 && (
        <div className="movie-tab-photo m-auto text-center">
          <Tabs
            key="tabs-photo"
            color={
              photoType == PhotoType.BackDrops
                ? "secondary"
                : photoType === PhotoType.Logos
                ? "primary"
                : "danger"
            }
            aria-label="Tabs colors"
            radius="full"
            size="lg"
            variant="bordered"
            onSelectionChange={(key) => handleChangeImageType(key)}
            classNames={{
              tabList: "m-auto my-3",
              cursor: "",
              tab: "max-w-fit py-2 px-4 text-lg lg:py-4 lg:px-8 lg:text-xl lg:font-semibold",
              tabContent: "",
            }}
          >
            <Tab key="backdrops" title="Backdrops" />
            <Tab key="logos" title="Logos" />
            <Tab key="posters" title="Posters" />
          </Tabs>

          {photoList?.length == 0 ? (
            <>
              <h3 className="text-2xl text-center my-5 mx-auto capitalize  text-gray-400">
                No Photo Type {photoType}
              </h3>
            </>
          ) : (
            <h3 className="text-sm text-center my-5 mx-auto capitalize lg:text-xl">
              Photo Type {photoType} :
              <span className="ml-3 text-lg">
                Total {photoList?.length} items
              </span>
            </h3>
          )}

          {/* {photoType == "backdrops" && <PhotoBackdrops photoList={photoList} />} */}

          {photoList?.length && photoList.length > 0 && (
            <>
              <div
                className={`grid grid-col
                          ${
                            photoType === PhotoType.BackDrops &&
                            "gap-6 lg:grid-cols-2"
                          }
                          ${
                            photoType === PhotoType.Posters &&
                            "gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4"
                          }
                          ${
                            photoType === PhotoType.Logos &&
                            "grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6"
                          }
                          `}
              >
                {photoList.map((image, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col overflow-hidden items-center justify-center 
                    rounded  bg-gray-200
                    ${
                      photoType === PhotoType.Logos &&
                      "aspect-square rounded-full bg-gray-400 p-5 md:p-10 lg:p-12"
                    }
                  dark:bg-slate-800 cursor-pointer`}
                    onClick={() => handleShowPhoto(index)}
                  >
                    {/* <Link
                      href={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                      target="_blank"
                    > */}
                    <Image
                      src={`https://image.tmdb.org/t/p/${
                        (photoType === PhotoType.BackDrops && "w780") ||
                        (photoType === PhotoType.Logos && "w300") ||
                        (photoType === PhotoType.Posters && "w342") ||
                        "original"
                      }/${image.file_path}`}
                      alt={`Image BackDrops ${index} ${image?.file_path}`}
                      // sizes="400"
                      width={
                        (photoType === PhotoType.BackDrops && "780") ||
                        (photoType === PhotoType.Logos && "300") ||
                        (photoType === PhotoType.Posters && "360") ||
                        "200"
                      }
                      height={240}
                      loading="eager"
                      radius="none"
                      isZoomed
                      removeWrapper
                    />
                    {/* </Link> */}
                  </div>
                ))}
              </div>

              {/* Modal Photo */}
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="5xl"
                className="max-w-screen-xl my-10"
                placement={"center"}
                scrollBehavior={
                  photoType === PhotoType.Posters ? "outside" : "normal"
                }
                // scrollBehavior="outside"
                classNames={{
                  closeButton: "w-10 h-10 m-2 text-2xl text-center",
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex gap-1">
                        <Button
                          color="primary"
                          onClick={handlePrevPhoto}
                          isDisabled={indexShow <= 0}
                        >
                          Prev
                        </Button>
                        <Button
                          color="primary"
                          onClick={handleNextPhoto}
                          isDisabled={indexShow >= photoList.length - 1}
                        >
                          Next
                        </Button>
                      </ModalHeader>
                      <ModalBody className="p-0">
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${photoList[indexShow].file_path}`}
                          alt={"Title"}
                          radius="none"
                        />
                      </ModalBody>
                      <ModalFooter className="flex items-center">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                          size="lg"
                        >
                          Close
                        </Button>
                        <Button
                          color="success"
                          className="text-white hover:text-white font-semibold"
                          as={Link}
                          size="lg"
                          target="_blank"
                          href={`https://image.tmdb.org/t/p/original/${photoList[indexShow].file_path}`}
                        >
                          Download
                          <DownloadIcon
                            width="24"
                            height="24"
                            className="text-white text-lg font-semibold"
                          />
                        </Button>
                        <Button
                          color="primary"
                          className="hidden"
                          onPress={onClose}
                        >
                          Action
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const PhotoBackdrops = ({ photoList }: { photoList: IPhoto[] | undefined }) => {
  return (
    <>
      {photoList?.length && photoList.length > 0 && (
        <div className="grid grid-col gap-6 lg:grid-cols-2">
          {photoList.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col overflow-hidden items-center justify-center 
              max-w-[780px] m-auto rounded-lg
            bg-gray-200 dark:bg-slate-800 "
            >
              <Link
                href={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                target="_blank"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                  alt={`Image BackDrops ${index} ${image?.file_path}`}
                  sizes="780"
                  width={780}
                  loading="eager"
                  radius="none"
                  isZoomed
                  removeWrapper
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const PhotoLogos = (photoList: IPhoto[]) => {
  return (
    <>
      {photoList?.length && photoList.length > 0 && (
        <div className="grid grid-col gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {photoList.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col overflow-hidden items-center justify-center rounded
            bg-gray-500 dark:bg-slate-800 p-4"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w400/${image.file_path}`}
                alt={`Image BackDrops ${index} ${image?.file_path}`}
                sizes="400"
                width={400}
                height={240}
                loading="eager"
                radius="none"
                isZoomed
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const PhotoPosters = (photoList: IPhoto[]) => {
  return (
    <>
      {photoList?.length && photoList.length > 0 && (
        <div className="grid grid-col gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {photoList.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col overflow-hidden items-center justify-center rounded
            bg-gray-300 dark:bg-slate-800 "
            >
              <Image
                src={`https://image.tmdb.org/t/p/w400/${image.file_path}`}
                alt={`Image BackDrops ${index} ${image?.file_path}`}
                sizes="400"
                width={400}
                height={240}
                loading="eager"
                radius="none"
                isZoomed
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(MovieTabPhotos);
