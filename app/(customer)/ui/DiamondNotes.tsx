"use client";
import React, { useCallback, useEffect, useState } from "react";
import closeIcon from "@/public/close_icn.svg";
import Image from "next/image";
import MotTable from "./MotTable";
import MotTableHead from "./MotTableHead";
import MotTableHeadCell from "./MotTableHeadCell";
import { DiamondNotesTableHeader } from "@/utils/MotTableConstant";
import MotTableBody from "./MotTableBody";
import MotTableRow from "./MotTableRow";
import MotTableRowCell from "./MotTableRowCell";
import useApiRequest from "@/hooks/useApi";
import { addDiamondNotesApi } from "../api/diamond.api";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";

interface DiamonNoteProps {
  hideDiamondNotesModal: any;
  diamondList: Array<any>;
}

const DiamondNotes = ({
  diamondList = [],
  hideDiamondNotesModal = () => {},
}: DiamonNoteProps) => {
  const router = useRouter();
  const [commonNote, setCommonNote] = useState("");
  const [singleNoteMap, setSingleNoteMap] = useState<any>({});

  const {
    loading: isAddDiamondNotesLoading,
    data: addDiamondNotesResponse,
    request: addDiamondNotesRequest,
  } = useApiRequest(addDiamondNotesApi);

  const inputChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    if (name === "commonnotes") {
      setCommonNote(value);
      const updatedNotes = diamondList.reduce((acc, item) => {
        acc[item._id] = value;
        return acc;
      }, {});
      setSingleNoteMap(updatedNotes);
    }
  };

  const updateSingleNote = (diamondId: any, notes: any) => {
    setSingleNoteMap((prevState: any) => ({
      ...prevState,
      [diamondId]: notes,
    }));
  };

  const setCommonNotes = useCallback((diamondList: any) => {
    diamondList.forEach((item: any) => {
      setSingleNoteMap((prevState: any) => ({
        ...prevState,
        [item._id]: item.userNotes,
      }));
    });
  }, []);

  const inputSingleChangeHandler = (diamondId: any, event: any) => {
    const { value } = event.target;
    updateSingleNote(diamondId, value);
  };

  const convertMapToArray = (map: { [s: string]: string }) => {
    return Object.entries(map).map(([diamondId, notes]) => ({
      diamondId,
      notes,
    }));
  };

  const addNotes = () => {
    const notesArray = convertMapToArray(singleNoteMap);
    addDiamondNotesRequest(router, notesArray);
  };

  useEffect(() => {
    if (!isAddDiamondNotesLoading && addDiamondNotesResponse) {
      if (addDiamondNotesResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(addDiamondNotesResponse.message);
        hideDiamondNotesModal(true);
      }
    }
    setCommonNotes(diamondList);
  }, [
    isAddDiamondNotesLoading,
    addDiamondNotesResponse,
    diamondList,
    setCommonNotes,
    hideDiamondNotesModal,
    router,
  ]);

  const handleRemoveNotes = () => {
    const clearedNotes = diamondList.reduce((acc: any, item: any) => {
      acc[item._id] = "";
      return acc;
    }, {});
    setSingleNoteMap(clearedNotes);
    const newArray = convertMapToArray(clearedNotes);
    addDiamondNotesRequest(router, newArray);
  };

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 overflow-y-auto  h-dvh w-[calc(100%+15px)] z-[31] bg-black/15 px-5 py-8 flex justify-center  pb-[50px]`}
    >
      <div className="bg-white max-w-[815px] h-max   w-full rounded-[10px] md:mx-3 ">
        <div className=" relative font-poppins text-tertiary border-b-[1px] border-primary/50 py-5">
          <h3 className="font-semibold text-xl leading-[30px] text-center">
            STONE NOTES
          </h3>
          <Image
            src={closeIcon}
            alt=""
            className="absolute top-[25px] right-[17px] cursor-pointer"
            onClick={() => hideDiamondNotesModal()}
          />
        </div>
        <div className="px-[14px] pt-3 pb-4">
          {diamondList.length === 1 ? null : (
            <div className="flex flex-row justify-start items-start pb-[10px]">
              <span className="font-poppins font-medium text-base leading-6 mr-2 min-w-[168px] max-w-[168px] w-full mt-2">
                Write Common Note
              </span>

              <textarea
                className="diamondnotes h-auto max-w-full w-full"
                name="commonnotes"
                placeholder="Write Notes"
                rows={2}
                value={commonNote}
                onChange={inputChangeHandler}
              />
            </div>
          )}

          <div className="overflow-x-auto rounded-md bg-white pb-4">
            <MotTable>
              <MotTableHead>
                {DiamondNotesTableHeader.map((single: any, index: any) => {
                  return (
                    <MotTableHeadCell
                      key={`Mot-Table-headers-${index}`}
                      styles={single?.customStyle || ""}
                    >
                      {single.headerName}
                    </MotTableHeadCell>
                  );
                })}
              </MotTableHead>
              <MotTableBody>
                {diamondList.map((item: any) => {
                  return (
                    <MotTableRow key={item._id}>
                      <MotTableRowCell>{item.stoneNo}</MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {item.lab ? item.lab : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {item.shape ? item.shape : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {item.caratWeight ? item.caratWeight.toFixed(2) : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {item.color ? item.color : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {item.clarity ? item.clarity : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="px-2">
                        <textarea
                          className="border border-primary/20 px-2 py-1 rounded-[6px]  placeholder:font-poppins placeholder:text-sm leading-5 placeholder:text-primary/60  placeholder:capitalize outline-none; h-auto min-w-[200px] w-full"
                          name="singlenotes"
                          placeholder=""
                          rows={1}
                          value={singleNoteMap[item._id] || ""}
                          onChange={(e) =>
                            inputSingleChangeHandler(item._id, e)
                          }
                        />
                      </MotTableRowCell>
                    </MotTableRow>
                  );
                })}
              </MotTableBody>
            </MotTable>
          </div>
          <div className="flex justify-end gap-x-2 pt-12">
            {diamondList.length === 1 ? null : (
              <button
                className="font-semibold font-poppins text-base  border-[1px] uppercase rounded-[10px] border-tertiary  text-tertiary py-[8px] px-[10px]  hover:-translate-y-1 hover:scale-105 duration-500"
                onClick={handleRemoveNotes}
              >
                remove notes
              </button>
            )}

            <button
              className="font-semibold font-poppins text-base border-[1px] rounded-[10px] border-tertiary bg-tertiary text-white py-[8px] px-[10px]  hover:-translate-y-1 hover:scale-105 duration-500"
              onClick={addNotes}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondNotes;
