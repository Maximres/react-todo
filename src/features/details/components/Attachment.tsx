import React from "react";
import Icons from "@/components/AppIcons";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

const Attachment = () => {
  return (
    <Box mx="1rem" my="0.5rem">
      <Paper variant="outlined">
        <Stack direction="row" sx={{ height: 50 }}>
          <Button variant="text" sx={{ flexGrow: 1, justifyContent: "start", p: 0 }}>
            <Box
              sx={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Typography textTransform="none" color="text.secondary" fontSize="medium">
                <Icons.File />
              </Typography>
            </Box>
            <Typography variant="body1" textTransform="none" color="text.secondary">
              Add file
            </Typography>
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export { Attachment };
