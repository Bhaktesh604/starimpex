"use client";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { ResponseCodes } from "@/interfaces/response.interface";
import { ResponseMessages } from "@/utils/response.messages";
import { links } from "@/utils/links";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type ApiResponse = {
  responseCode: number;
  message: string;
  data: any;
};

const useApiRequest = <T extends (...args: any[]) => any>(apiFunc: T) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const request = useCallback(
    async (
      router: AppRouterInstance,
      ...args: Parameters<typeof apiFunc>
    ): Promise<void> => {
      setLoading(true);
      try {
        const result: ApiResponse = await apiFunc(...args);
        setData(result);
        setLoading(false);

        if (result.responseCode !== ResponseCodes.SUCCESS) {
          dispatch(
            showAlert({
              message: result?.message
                ? result.message
                : ResponseMessages.SOMETHING_WENT_WRONG,
              variant: EVariant.ERROR,
            })
          );
        }
        if (result.responseCode === ResponseCodes.UNAUTHORIZED) {
          localStorage.clear();
          router.push(links.HOME);
        }
      } catch (error: any) {
        setData(error?.response?.data);
        setLoading(false);
        if (error?.response?.data?.responseCode === ResponseCodes.NOT_FOUND)
          return;
        dispatch(
          showAlert({
            message: error?.response?.data
              ? error.response.data?.message
                ? error.response.data.message
                : ResponseMessages.SOMETHING_WENT_WRONG
              : ResponseMessages.INTERNAL_SERVER_ERROR,
            variant: EVariant.ERROR,
          })
        );
        if (
          error?.response?.data?.responseCode === ResponseCodes.UNAUTHORIZED
        ) {
          localStorage.clear();
          router.push(links.HOME);
        }
      }
    },
    [apiFunc, dispatch]
  );

  return { data, loading, request };
};

export default useApiRequest;
