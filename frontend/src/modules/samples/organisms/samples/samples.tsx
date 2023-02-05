import React, { FC } from "react";
import { useQuery } from "react-query";
import samplesApi from "@/modules/samples/api";
import { useSnackbar } from "notistack";
import { Grid, Loading } from "@/modules/shared";
import { SamplesHeader } from "../samples-header";
import "./samples.scss";

const DEFAULT_SAMPLES = [
  "/assets/default-sample-images/IMG_6856.jpg",
  "/assets/default-sample-images/IMG_6930.jpg",
  "/assets/default-sample-images/IMG_6931.jpg",
  "/assets/default-sample-images/IMG_7074.jpg",
  "/assets/default-sample-images/car_road.jpg",
];

const Samples: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: samples, isLoading: isGettingSamples } = useQuery(
    ["samples-get_samples"],
    () => samplesApi.getSamples(),
    {
      onError: () => {
        enqueueSnackbar("There was an error while trying to get images", {
          variant: "error",
        });
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="the-samples">
      {isGettingSamples ? <Loading /> : null}
      <SamplesHeader />
      <Grid
        loadByOrder
        className="the-samples__grid"
        images={
          (samples as any)?.data ||
          (process.env.REACT_APP_USE_DEFAULT_SAMPLES === "true"
            ? DEFAULT_SAMPLES
            : [])
        }
        imageSize={300}
      />
    </div>
  );
};

export { Samples };
