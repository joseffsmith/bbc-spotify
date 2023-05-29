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
        display: "flex",
        justifyContent: "center",
        px: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: 600,
          flexGrow: 1,
          columnGap: 1,
          px: 1,
        }}
      >
        <Input
          fullWidth
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          placeholder="e.g. b01dmw9x of https://www.bbc.co.uk/sounds/brand/b01dmw9x"
          endDecorator={
            <Button variant={"soft"} disabled={!brandId}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={"/" + brandId}
              >
                Load
              </Link>
            </Button>
          }
        />

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
