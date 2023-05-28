import {
  Box,
  Button,
  Table,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/joy";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { supabaseClient } from "./SupabaseClient";
import { showsAtomFamily } from "./atoms";
import { useRecoilState } from "recoil";
import { Show } from "./Show";

export function Shows() {
  const params = useParams();
  const { brand_id } = params;
  const [shows, setShows] = useRecoilState(showsAtomFamily(brand_id!));

  const loadShows = async (brand_id: string) => {
    const { data, error } = await supabaseClient
      .from("shows")
      .select("*")
      .eq("brand_id", brand_id)
      .order("release_timestamp", { ascending: false });
    if (data) {
      setLoading(false);
      return setShows(Array.from(data.values()));
    }
    setLoading(false);
    return [];
  };

  useEffect(() => {
    loadShows(brand_id!);
  }, [brand_id]);

  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.up("sm"));
  const [loading, setLoading] = useState(true);

  const refreshShows = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient.functions.invoke(
      "show-scraper",
      {
        body: { brand_id },
      }
    );
    await loadShows(brand_id!);
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
