"use client";
import React, { useEffect, useState } from "react";
import EditIcon from "@/public/assets/admin-dashboard/ic-edit.svg";
import Image from "next/image";
import { geApiListApi } from "../api/api-managment.api";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { useRouter } from "next/navigation";
import EditMarkupDialog from "@/components/EditMarkupDialog";
import ChangeApiStatusDialog from "@/components/ChangeApiStatusDialog";
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";
import DragDropIcon from "@/public/assets/admin-dashboard/ic-drag-drop.svg";
import DocumentIcon from "@/public/assets/admin-dashboard/ic-document.svg";
import CancelIcon from "@/public/assets/admin-dashboard/ic-red-cancel.svg";
import { getUploadSampleFile, uploadDiamondsViaFile } from "../api/diamond.api";
import { toast } from "react-toastify";
import { USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";

interface FileWithPreview extends File {
  preview: string;
}

const Page = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState<any>();
  const [showMarkupDialog, setMarkupDialog] = useState(false);
  const [showChangeStatusDialog, setChangeStatusDialog] = useState(false);
  const [apiObj, setApiObj] = useState<any>();
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const {
    loading: isGetAPIRequestLoading,
    data: getApiListResponse,
    request: getApiListRequest,
  } = useApi(geApiListApi);

  useEffect(() => {
    if (!isGetAPIRequestLoading && getApiListResponse) {
      if (getApiListResponse.responseCode === ResponseCodes.SUCCESS) {
        setApiData(getApiListResponse.data);
      }
    }
  }, [isGetAPIRequestLoading, getApiListResponse]);

  const getAPIList = () => {
    getApiListRequest(router);
  };

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      getAPIList();
    }
  }, []);

  const hideMarkupDialog = () => {
    setMarkupDialog(false);
  };

  const hideChangeStatusDialog = () => {
    setChangeStatusDialog(false);
  };

  const handleMarkupPercentage = (obj: string) => {
    setApiObj(obj);
    setMarkupDialog(true);
  };

  const onEnableDisableSourceType = (obj: any) => {
    setApiObj(obj);
    setChangeStatusDialog(true);
  };

  const handleFileUpload = async () => {
    try {
      const response = await uploadDiamondsViaFile(file);
      if (response.data.responseCode === ResponseCodes.SUCCESS) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      return;
    }
  };

  const downloadSampleFile = async () => {
    try {
      const response = await getUploadSampleFile();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      return;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/html": [".xlsx", ".csv"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        const fileWithPreview: FileWithPreview = Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        });
        setFile(fileWithPreview);
        setSelectedFileName(selectedFile.name);
      }
    },
  });

  return (
    <div className="bg-customer-background h-[calc(100dvh-5rem)] px-4 md:px-8 py-3">
      <div>
        <p className="text-xl font-medium">Upload from file</p>
        <div className="my-5">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="cursor-pointer flex flex-col justify-center items-center py-8 bg-tertiary bg-opacity-[5%] border-dashed border-2 border-tertiary rounded-xl"
          >
            <input {...(getInputProps() as DropzoneInputProps)} />

            {selectedFileName ? (
              <>
                <Image src={DocumentIcon} alt="image" width={30} height={30} />
                <div className="flex items-center">
                  <p className="text-base text-tertiary font-medium mt-2">
                    {selectedFileName}
                  </p>
                  <Image
                    src={CancelIcon}
                    alt="image"
                    width={16}
                    height={16}
                    className="mt-[0.6rem] ml-[0.3rem] z-[5s]"
                    onClick={() => {
                      setFile(null);
                      setSelectedFileName("");
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <Image src={DragDropIcon} alt="image" width={30} height={30} />
                <p className="text-base text-tertiary font-medium mt-2">
                  Drag and drop
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center my-[1.5rem]">
          <button
            className={`rounded-xl font-semibold text-sm leading-6 uppercase ${
              selectedFileName ? "bg-tertiary" : "bg-[#BFBFBF]"
            } text-white py-[0.438rem] px-[0.938rem]`}
            onClick={handleFileUpload}
            disabled={!selectedFileName}
          >
            UPLOAD
          </button>
          <button
            className="ml-2 rounded-xl font-semibold text-sm leading-6 uppercase bg-tertiary text-white py-[0.438rem] px-[0.938rem]"
            onClick={downloadSampleFile}
          >
            DOWNLOAD SAMPLE
          </button>
        </div>
      </div>
      <div>
        <p className="text-xl font-medium">API Providers</p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-[1rem]">
          {apiData && apiData.length > 0
            ? apiData.map((obj: any) => (
                <>
                  {obj.sourceType === "file" ? (
                    ""
                  ) : (
                    <div className="bg-secondary p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="capitalize text-opacity-[87%] text-lg font-medium">
                          {obj.sourceType.replace("_", " ")}
                        </p>
                        <div>
                          <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-neutral-300 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-tertiary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-tertiary checked:bg-neutral-300 checked:focus:bg-neutral-300 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={!obj.isDisabled}
                            onChange={() => onEnableDisableSourceType(obj)}
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="font-normal text-opacity-[80%]">
                          Markup {obj?.markupPercentage}%
                        </p>
                        <Image
                          src={EditIcon}
                          alt="edit"
                          className="ml-[0.3rem] cursor-pointer"
                          onClick={() => handleMarkupPercentage(obj)}
                        />
                      </div>
                    </div>
                  )}
                </>
              ))
            : ""}
        </div>
      </div>
      {showMarkupDialog ? (
        <>
          <div className="fixed inset-0 z-[8]">
            <div className="fixed w-full h-screen bg-black opacity-40"></div>
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <EditMarkupDialog
                hideMarkupDialog={hideMarkupDialog}
                apiObj={apiObj}
                getAPIList={getAPIList}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {showChangeStatusDialog ? (
        <>
          <div className="fixed inset-0 z-[8]">
            <div className="fixed w-full h-screen bg-black opacity-40"></div>
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <ChangeApiStatusDialog
                hideChangeStatusDialog={hideChangeStatusDialog}
                apiObj={apiObj}
                getAPIList={getAPIList}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
