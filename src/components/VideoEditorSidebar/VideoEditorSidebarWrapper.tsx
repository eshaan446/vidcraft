import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { DRAWER_WIDTH } from "../../constants";
import { useAppContext } from "../../hooks/useAppContext";

const VideoEditorSidebarWrapper: React.FC = () => {
  const { setIsSidebarClosing, isMobileSidebarOpen, mobileSidebarToggle } =
    useAppContext();

  const handleDrawerClose = () => {
    setIsSidebarClosing(true);
    mobileSidebarToggle(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsSidebarClosing(false);
  };

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Drawer
        anchor="right"
        variant="temporary"
        open={isMobileSidebarOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      ></Drawer>
      <Drawer
        anchor="right"
        variant="permanent"
        PaperProps={{ sx: { position: "absolute" } }}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textAlign: "center",
            padding: "16px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Vid<span style={{ color: "#e28743" }}>Craft</span>
        </Typography>

        <Box sx={{ textAlign: "center", padding: "16px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              animation: "pulse 3s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": { opacity: 0 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0 },
              },
            }}
          >
            Your Ultimate Video Editing App
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              animation: "pulse 3s ease-in-out infinite 1s",
              "@keyframes pulse": {
                "0%": { opacity: 0 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0 },
              },
            }}
          >
            Create stunning videos with ease.
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              animation: "pulse 3s ease-in-out infinite 2s",
              "@keyframes pulse": {
                "0%": { opacity: 0 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0 },
              },
            }}
          >
            Edit, Enhance, and Share your memories.
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              animation: "pulse 3s ease-in-out infinite 2s",
              "@keyframes pulse": {
                "0%": { opacity: 0 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0 },
              },
            }}
          >
            Trim, slow down, remove backgrounds, and add intros or outros with
            this website.
          </Typography>
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textAlign: "center",
            padding: "16px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Explore different projects
        </Typography>
        <List sx={{ maxWidth: 400, margin: "auto", marginTop: 2 }}>
          <ListItem>
            <ListItemText
              primary="FindYourStay"
              secondary="A simple scalable MERN website for users to add their properties on the website and streamline their rental journey."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="HashBlog"
              secondary="An elegant blogging platform similar to Medium.com that leverages SSR from Next.js 13."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="FoodieBay"
              secondary="A Next.js website that guides you to cook international cuisines all around the world."
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default VideoEditorSidebarWrapper;
