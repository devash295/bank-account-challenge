import useMediaQuery from "@mui/material/useMediaQuery";
import { customTheme } from "../Theme";

const useIsMobile = () => {
  const isMobile = useMediaQuery(customTheme.breakpoints.down("sm"));
  return isMobile;
};

export default useIsMobile;
