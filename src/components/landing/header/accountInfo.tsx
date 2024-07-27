import styled from "styled-components";
import AppLogo from "../../icons/appLogo";
import { Typography } from "@mui/material";

const AccountInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "8px",
  width: "30%",
  margin: "10px 30px",
});
const Text = styled(Typography)({
  color: "white",
});
const AccountInfo = () => {
  return (
    <AccountInfoContainer>
      <div style={{ height: "50px", width: "50px" }}>
        <AppLogo />
      </div>
      <Text>Account Balance</Text>
      <Text style={{ fontWeight: 600, marginTop: "10px", fontSize: 24 }}>
        $1000
      </Text>
      <Text>+0.8% than last week</Text>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
