import {
  Box,
  Button,
  Table,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/joy";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { supabaseClient } from "./SupabaseClient";
import { showsAtom } from "./atoms";
import { useRecoilState } from "recoil";
import { Show } from "./Show";

export function Shows({ brandId }: { brandId: string }) {
  const [_shows, setShows] = useRecoilState(showsAtom);
  const shows = Array.from(Object.values(_shows ?? []));

  const loadShows = async (brandId: string) => {
    const { data, error } = await supabaseClient
      .from("shows")
      .select("*, songs (*)")
      .eq("brand_id", brandId);

    if (data) {
      setShows(
        data.map((d) => {
          return [d.show_id, d];
        })
      );
    }
    setLoading(false);
    return [];
  };

  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.up("sm"));
  const [loading, setLoading] = useState(false);

  const refreshShows = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient.functions.invoke(
      "show-scraper",
      {
        body: { brandId },
      }
    );
    await loadShows(brandId!);
    // const { data, error } = await supabaseClient
    if (data) {
      console.log(data);
    }
  };
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"baseline"}
        justifyContent={"space-between"}
        px={1}
      >
        <Typography level="body3">
          Last update:{" "}
          {new Date().toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Typography>
        <Box display="flex" alignItems={"baseline"} columnGap={2}>
          <Typography level="body3">{shows.length} Shows</Typography>
          <Button
            onClick={() => refreshShows()}
            disabled={loading}
            size="sm"
            variant="plain"
          >
            Refresh
          </Button>
        </Box>
      </Box>
      <Box height={2} px={1}>
        {loading && <LinearProgress />}
      </Box>
      <Table stickyHeader width="100%" hoverRow noWrap>
        <colgroup>
          {mq && <col width="100px"></col>}
          <col width="100%"></col>
          <col width="240px"></col>
          {/* <col></col> */}
        </colgroup>

        <tbody>
          {shows.map((show: any) => {
            return <Show key={show.show_id} show={show} />;
          })}
        </tbody>
      </Table>
    </Box>
  );
}
