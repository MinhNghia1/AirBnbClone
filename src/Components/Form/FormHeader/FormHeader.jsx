import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getLocation } from "../../../Apis/viTri";
export default function FormHeader() {
  const getLocation = async () => {
    try {
      const reps = await getLocation();
      console.log(reps);
    } catch (error) {}
  };
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <form>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={getLocation}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </form>
  );
}
