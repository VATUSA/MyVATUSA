export const getControllerRating = (rating: number | undefined): string => {
  if (rating === undefined) return "UNK";
  switch (rating) {
    case -1:
      return "AFK";
    case 0:
      return "SUS";
    case 1:
      return "OBS";
    case 2:
      return "S1";
    case 3:
      return "S2";
    case 4:
      return "S3";
    case 5:
      return "C1";
    case 6:
      return "C2";
    case 7:
      return "C3";
    case 8:
      return "I1";
    case 9:
      return "I2";
    case 10:
      return "I3";
    case 11:
      return "SUP";
    case 12:
      return "ADM";
    default:
      return "UNK";
  }
};

export const getPilotRating = (rating: number | undefined): string => {
  if (rating === undefined) return "UNK";
  switch (rating) {
    case 0:
      return "NA";
    case 1:
      return "PPL";
    case 3:
      return "IR";
    case 7:
      return "CMEL";
    case 15:
      return "ATPL";
    case 31:
      return "FI";
    case 63:
      return "FE";
    default:
      return "UNK";
  }
};
