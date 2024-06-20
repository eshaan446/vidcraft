import { useCallback } from "react";

import { ViewSidebar } from "@mui/icons-material";
import { Box, Button, ButtonProps, Tooltip } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";

import { useAppContext } from "../../../hooks/useAppContext";
import useEditVideoFile from "../../../backend/useEditVideoAPI";
import CircularProgressWithLabel from "../../CircularProgressWithLabel";

const VideoEditorToolbar: React.FC = () => {
  const { mobileSidebarToggle, logoEditorToggle, isProcessing, videoRef } =
    useAppContext();

  const { addIntroOrOutro, progress, slowVideo, removeBackground } = useEditVideoFile();

  const handleMobileSidebarToggle = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >(
    (event) => {
      event.preventDefault();
      mobileSidebarToggle();
    },
    [mobileSidebarToggle]
  );

  const handleLogoEditorToggle = useCallback<
    NonNullable<ButtonProps["onClick"]>
  >(
    (event) => {
      event.preventDefault();
      logoEditorToggle();
    },
    [logoEditorToggle]
  );

  const handleAddIntroOrOutro = useCallback(
    (type: "intro" | "outro") => () => {
      // Create input element
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.accept = "video/*";
      inputElement.style.display = "none";

      inputElement.onchange = async (event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
          const selectedVideo = input.files[0];
          const additionalVideoUrl = URL.createObjectURL(selectedVideo);

          const resultBlobUrl = await addIntroOrOutro(additionalVideoUrl, type);

          if (!resultBlobUrl || !videoRef) {
            return;
          }

          videoRef.src = resultBlobUrl;
        }

        // Clean up
        inputElement.remove();
      };

      // Append to the document and trigger click
      document.body.appendChild(inputElement);
      inputElement.click();
    },
    [addIntroOrOutro, videoRef]
  );

  const handleSlowVideo = useCallback(async () => {
    if (videoRef && videoRef.src) {
      const resultBlobUrl = await slowVideo(videoRef.src, 2); // Adjust the factor as needed
      if (!resultBlobUrl) {
        return;
      }
      videoRef.src = resultBlobUrl;
    }
  }, [slowVideo, videoRef]);

  const handleRemoveBackground = useCallback(async () => {
    if (videoRef && videoRef.src) {
      const resultBlobUrl = await removeBackground(videoRef.src, "green", 0.1, 0.1); // Adjust the parameters as needed
      if (!resultBlobUrl) {
        return;
      }
      videoRef.src = resultBlobUrl;
    }
  }, [removeBackground, videoRef]);

  return (
    <Grid container spacing={0} py={1} gap={1}>
      <Grid xs sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Box
          sx={{
            display: { xs: "block", md: "none", lineHeight: 1 },
          }}
        >
          <Tooltip
            arrow
            disableFocusListener
            placement="top"
            title="Toggle sidebar"
          >
            <Button
              sx={{
                minWidth: "32px",
              }}
              size="small"
              variant="outlined"
              onClick={handleMobileSidebarToggle}
            >
              <ViewSidebar />
            </Button>
          </Tooltip>
        </Box>
        <Button
          disabled={isProcessing}
          size="small"
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={handleSlowVideo}
        >
          Slow Video
        </Button>
        <Button
          disabled={isProcessing}
          size="small"
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={handleRemoveBackground}
        >
          Remove Background
        </Button>
        <Button
          disabled={isProcessing}
          size="small"
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={handleAddIntroOrOutro("intro")}
        >
          Add intro
        </Button>
        <Button
          disabled={isProcessing}
          size="small"
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={handleAddIntroOrOutro("outro")}
        >
          Add outro
        </Button>
        {isProcessing && !!progress && (
          <CircularProgressWithLabel value={progress} />
        )}
      </Grid>
    </Grid>
  );
};

export default VideoEditorToolbar;
