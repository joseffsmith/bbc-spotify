import { Box, Input, Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { brandIdAtom } from "./atoms";

export const ShowSearch = () => {
  const [brandId, setBrandId] = useRecoilState(brandIdAtom);

  function subscribeToBrand(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          maxWidth: 600,
          flexGrow: 1,
          columnGap: 1,
        }}
      >
        <Input
          fullWidth
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          placeholder="e.g. b01dmw9x of https://www.bbc.co.uk/sounds/brand/b01dmw9x"
        />

        <Link to={"/" + brandId}>
          <Button variant={"solid"} disabled={!brandId}>
            Load
          </Button>
        </Link>
        <Button
          variant="outlined"
          disabled={!brandId}
          onClick={() => subscribeToBrand()}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};
