import React from "react";
import Icons from "@/components/AppIcons";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

type Props = {
  text: string | null;
  detailsText?: string | null;
  hasValue: boolean | undefined;
  clear: (event: React.MouseEvent) => void;
  Icon: JSX.Element;
  onClick?: () => void;
  onKeyDown?: () => void;
};

const CommonDateContainer = React.forwardRef(
  ({ text, detailsText, clear, hasValue, Icon, onClick, onKeyDown }: Props, ref: any) => {
    const color = hasValue ? "primary.main" : "text.secondary";
    return (
      <Stack ref={ref} component="div" direction="row" sx={{ height: 50 }}>
        <Button
          onClick={onClick}
          onKeyDown={onKeyDown}
          variant="text"
          sx={{ flexGrow: 1, justifyContent: "start", p: 0 }}
        >
          <Box sx={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography textTransform="none" color={color} fontSize="medium">
              {Icon}
            </Typography>
          </Box>
          <Stack direction="column">
            <Typography variant="body1" textTransform="none" color={color} align="left">
              {text}
            </Typography>
            {hasValue && detailsText && (
              <Typography
                textTransform="none"
                color="text.secondary"
                fontSize="smaller"
                align="left"
              >
                {detailsText}
              </Typography>
            )}
          </Stack>
        </Button>
        {hasValue && (
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", mr: "0.5rem" }}
          >
            <IconButton onClick={(e) => clear(e)} size="small" sx={{ width: 40 }}>
              <Icons.Close />
            </IconButton>
          </Box>
        )}
      </Stack>
    );
  },
);

export default CommonDateContainer;
