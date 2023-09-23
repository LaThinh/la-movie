import React, { useEffect, useState, memo, useRef } from "react";
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

export function filterPhotoLanguage({
  movieImages,
  language,
}: {
  movieImages: IMovieImages;
  language: string;
}) {
  const photoBackDrop: IPhoto[] = movieImages?.backdrops.filter((photo) => {
    return photo.iso_639_1 == null || photo.iso_639_1 == language;
  });
  const photoLogo: IPhoto[] = movieImages?.logos.filter((photo) => {
    return photo.iso_639_1 == language || photo.iso_639_1 == null;
  });
  const photoPoster: IPhoto[] = movieImages?.posters.filter((photo) => {
    return photo.iso_639_1 == null || photo.iso_639_1 == language;
  });

  const resultPhotos: IMovieImages = {
    backdrops: photoBackDrop,
    logos: photoLogo,
    posters: photoPoster,
  };

  return resultPhotos;
}

export function MovieTabPhotos({ movieImages }: { movieImages: IMovieImages }) {
  //const [movieImages, setMovieImages] = useState<IMovieImages>();
  const [moviePhotoLanguage, setMoviePhotoLanguage] = useState<IMovieImages>();
  const [photoList, setPhotoList] = useState<IPhoto[]>();
  const [loading, setLoading] = useState(true);
  const [photoType, setPhotoType] = useState<PhotoType>();
  const [indexShow, setIndexShow] = useState(0);

  const btnPrev = useRef<HTMLButtonElement>(null);
  const btnNext = useRef<HTMLButtonElement>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // const getPhotos = async () => {
    //   // const data = await getMovieImages({ movieId: movieId });
    //   // if (data) {
    //   //   setMovieImages(data);
    //   // }
    //   // console.log(data);
    //   // setLoading(false);

    //   const photoLanguage = filterPhotoLanguage({
    //     movieImages: movieImages,
    //     language: "en",
    //   });

    //   setMoviePhotoLanguage(photoLanguage);
    //   console.log(photoLanguage);
    // };

    // getPhotos();

    const photoLanguage = filterPhotoLanguage({
      movieImages: movieImages,
      language: "en",
    });

    setMoviePhotoLanguage(photoLanguage);
    setLoading(false);

    document.addEventListener("keydown", keyDownHandler, false);

    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
    };
  }, [movieImages]);

  const handleChangeImageType = (key: React.Key) => {
    if (key == "backdrops") {
      setPhotoType(PhotoType.BackDrops);
      setPhotoList(moviePhotoLanguage?.backdrops);
    }

    if (key == "logos") {
      setPhotoType(PhotoType.Logos);
      setPhotoList(moviePhotoLanguage?.logos);
    }

    if (key == "posters") {
      setPhotoType(PhotoType.Posters);
      setPhotoList(moviePhotoLanguage?.posters);
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

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      btnPrev.current && btnPrev.current.click();
    } else if (e.key === "ArrowRight") {
      btnNext.current && btnNext.current.click();
    }
  };

  const tabColor =
    photoType == PhotoType.BackDrops
      ? "secondary"
      : photoType === PhotoType.Logos
      ? "primary"
      : "danger";

  const classPhotoGrid = `grid grid-col justify-center
  ${photoType === PhotoType.BackDrops && "gap-6 lg:grid-cols-2"}
  ${
    photoType === PhotoType.Logos &&
    "grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-6"
  }
  ${
    photoType === PhotoType.Posters &&
    "gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 2xl:grid-cols-5"
  }
  `;

  return (
    <div className="movie-photos">
      {loading && (
        <div className="text-primary-500 p-5 text-center text-xl">
          Loading Photos <Spinner />
        </div>
      )}

      {movieImages && movieImages.backdrops.length > 0 && (
        <div className="movie-tab-photo m-auto text-center relative">
          <Tabs
            key="tabs-photo"
            color={tabColor}
            aria-label="Tabs colors"
            radius="full"
            size="lg"
            variant="bordered"
            onSelectionChange={(key) => handleChangeImageType(key)}
            classNames={{
              tabList: "m-auto my-3 ",
              cursor: "",
              tab: "max-w-fit py-2 px-2 text-sm lg:py-4 lg:px-8 lg:text-xl lg:font-semibold",
              tabContent: "",
            }}
          >
            {moviePhotoLanguage?.backdrops &&
              moviePhotoLanguage.backdrops.length > 0 && (
                <Tab
                  key="backdrops"
                  aria-controls="tab-photo-backdrops"
                  title={`Backdrops (${moviePhotoLanguage?.backdrops.length})`}
                />
              )}

            {moviePhotoLanguage?.logos &&
              moviePhotoLanguage.logos.length > 0 && (
                <Tab
                  key="logos"
                  aria-controls="tab-photo-logos"
                  title={`Logos (${moviePhotoLanguage?.logos.length})`}
                />
              )}

            {moviePhotoLanguage?.posters &&
              moviePhotoLanguage.posters.length > 0 && (
                <Tab
                  key="posters"
                  aria-controls="tab-photo-posters"
                  title={`Posters (${moviePhotoLanguage?.posters.length})`}
                />
              )}
          </Tabs>

          {photoList?.length == 0 ? (
            <>
              <h3 className="text-2xl text-center my-5 mx-auto capitalize  text-gray-400">
                No Photo Type {photoType}
              </h3>
            </>
          ) : (
            <h5 className="text-sm text-center my-5 mx-auto capitalize lg:text-xl">
              Photo Type {photoType} :
              <span className="ml-3 text-sm">
                Total {photoList?.length} items
              </span>
            </h5>
          )}

          {/* {photoType == "backdrops" && <PhotoBackdrops photoList={photoList} />} */}

          {photoList?.length && photoList.length > 0 && (
            <>
              <div className={classPhotoGrid}>
                {photoList.map((image, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded
                    flex flex-col  items-center justify-center bg-gray-200
                    ${
                      photoType === PhotoType.Logos &&
                      "aspect-square rounded-full bg-gray-400 p-5 md:p-10 lg:p-12"
                    }
                  dark:bg-slate-800 cursor-pointer`}
                    onClick={() => handleShowPhoto(index)}
                  >
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
                  </div>
                ))}
              </div>

              {/* Modal Photo */}
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="5xl"
                className="max-w-screen-2xl my-10"
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
                      <ModalHeader className="flex gap-1 items-center justify-between pr-14">
                        <div className="header-arrow flex gap-2 items-center align-center">
                          <Button
                            color="primary"
                            onClick={handlePrevPhoto}
                            isDisabled={indexShow <= 0}
                            ref={btnPrev}
                          >
                            Prev
                          </Button>
                          {indexShow + 1}/{photoList?.length}
                          <Button
                            color="primary"
                            onClick={handleNextPhoto}
                            isDisabled={
                              indexShow >= (photoList?.length || 1) - 1
                            }
                            ref={btnNext}
                          >
                            Next
                          </Button>
                        </div>
                        <Button
                          color="success"
                          className="text-white hover:text-white font-semibold hidden lg:flex"
                          as={Link}
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
                      </ModalHeader>
                      <ModalBody className="p-0 text-center items-center">
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${photoList[indexShow].file_path}`}
                          alt={"Title"}
                          radius="none"
                          className="w-full m-auto block"
                        />
                      </ModalBody>
                      <ModalFooter className="flex items-center justify-between lg:hidden">
                        <Button
                          color="success"
                          className="text-white w-full max-w-[320px] m-auto hover:text-white font-semibold"
                          as={Link}
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
                        {/* <Button
                          color="primary"
                          className="hidden"
                          onPress={onClose}
                        >
                          Action
                        </Button>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                          size="lg"
                        >
                          Close
                        </Button> */}
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

export default memo(MovieTabPhotos);
