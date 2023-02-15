const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width:" 100%",
  height:" 100%",
});

export default FlexCenter;
