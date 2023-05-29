import { Box, Input, Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { brandIdAtom, isLoadingShowsAtom, showsAtom } from "./atoms";
import { supabaseClient } from "./SupabaseClient";

export const ShowSearch = () => {
  const [brandId, setBrandId] = useRecoilState(brandIdAtom);

  const setLoadingShows = useSetRecoilState(isLoadingShowsAtom);
  const setShows = useSetRecoilState(showsAtom);
  const handleSetBrandId = async (brandId: string) => {
    if (!brandId) {
      return;
    }
    setLoadingShows(true);
    const b = brandId.toLowerCase().trim();

    const { data, error } = await supabaseClient
      .from("shows")
      .select("*, songs (*)")
      .eq("brand_id", b);

    if (data) {
      const res = Object.fromEntries(
        data.map((d) => {
          return [d.show_id, d];
        })
      );
      setShows(res);
    }
    setLoadingShows(false);
  };

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
            <Button
              variant={"soft"}
              disabled={!brandId}
              onClick={() => handleSetBrandId(brandId)}
            >
              Load
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
