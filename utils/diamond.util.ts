import { EDiamondEyeClean } from "@/interfaces/common.interface";

export const getEyeCleanValue = (eyeClean: number) => {
  if (eyeClean === 100) {
    return EDiamondEyeClean.E0;
  }
  if (eyeClean > 80) {
    return EDiamondEyeClean.E1;
  }
  if (eyeClean > 70) {
    return EDiamondEyeClean.E2;
  }
  if (eyeClean === null) {
    return "-";
  }
  return EDiamondEyeClean.E3;
};
