import {
  Box,
  Button,
  //   Collapse,
  Sheet,
  Table,
  Typography,
  useTheme,
} from "@mui/joy";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

export function Shows() {
  const shows: any = useLoaderData();
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"baseline"}
        justifyContent={"space-between"}
        px={1}
      >
        <Typography level="body2">
          Last update:{" "}
          {new Date().toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Typography>
        <Box display="flex" alignItems={"baseline"} columnGap={2}>
          <Typography level="body2">{shows.length} Shows</Typography>
          <Button size="sm" variant="plain">
            Refresh
          </Button>
        </Box>
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
            return <Row show={show} key={show.show_id} />;
          })}
        </tbody>
      </Table>
    </Box>
  );
}

const Row = ({ show }: { show: any }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <tr
        style={{ cursor: "pointer" }}
        key={show.show_id}
        onClick={() => {
          setOpen((p) => !p);
        }}
      >
        {mq && (
          <td>
            <img width={80} src={show.image_url} />
          </td>
        )}

        <td style={{ overflow: "hidden" }}>
          <Typography overflow={"hidden"} textOverflow={"ellipsis"}>
            {show.name}
          </Typography>
          <Typography
            level="body3"
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {show.backup_name}
          </Typography>
          <Typography level="body2">
            {new Date(show.release_timestamp).toLocaleString("en-GB", {
              dateStyle: "short",
            })}
          </Typography>
        </td>
        <td style={{ textAlign: "right" }}>
          <Button
            size="sm"
            variant="plain"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            View songs
          </Button>
          <Button
            size="sm"
            variant="soft"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Add to playlist
          </Button>
        </td>
      </tr>
      {/* <tr>
        <td
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            ...(!open && {
              border: "none",
            }),
          }}
          colSpan={6}
        >
          <div>
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div">
                History
              </Typography>
              <Table aria-label="purchases">
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Customer</td>
                    <td align="right">Amount</td>
                    <td align="right">Total price ($)</td>
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </Box>
          </div>
        </td>
      </tr> */}
    </>
  );
};
