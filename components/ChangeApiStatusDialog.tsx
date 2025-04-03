import { enableDisableSourceTypeApi } from "@/app/(admin)/admin/api/api-managment.api";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function ChangeApiStatusDialog({
  hideChangeStatusDialog = () => {},
  apiObj,
  getAPIList,
}: {
  hideChangeStatusDialog: () => void;
  apiObj: any;
  getAPIList: () => void;
}) {

  const dispatch = useDispatch();
  const router = useRouter();
  const {
    loading: enableDisableSourceTypeRequestLoading,
    data: enableDisableSourceTypeResponse,
    request: enableDisableSourceTypeRequest,
  } = useApi(enableDisableSourceTypeApi);

  useEffect(() => {
    if (
      !enableDisableSourceTypeRequestLoading &&
      enableDisableSourceTypeResponse
    ) {
      
      if (
        enableDisableSourceTypeResponse.responseCode === ResponseCodes.SUCCESS
      ) {
        dispatch(
          showAlert({
            message: enableDisableSourceTypeResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
        hideChangeStatusDialog();
        getAPIList();
      }
    }
  }, [enableDisableSourceTypeRequestLoading, enableDisableSourceTypeResponse]);

  const onYesOption = () => {
    enableDisableSourceTypeRequest(router,apiObj.sourceType,!apiObj.isDisabled)
  }

   const onNoOption = () => {
    hideChangeStatusDialog();
   }

  return (
    <div>
      <div className="relative w-full max-w-3xl mx-auto bg-white rounded-[11px] shadow-lg flex justify-start">
        <div>
          <div className="bg-white max-w-[500px] w-full p-6 rounded-lg z-40">
            <p> Are you sure you want to change status ?</p>
            <div className="flex flex-row justify-center items-center gap-x-2 py-4">
              <button
                className="py-2 px-6 bg-tertiary text-white rounded-xl"
                onClick={onYesOption}
              >
                Yes
              </button>
              <button
                className="py-2 px-6 bg-tertiary text-white rounded-xl"
                onClick={onNoOption}
              >
                No
              </button>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeApiStatusDialog;
