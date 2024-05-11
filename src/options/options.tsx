import React, { useEffect, useState } from "react";
import "./options.css";
import { Container, Paper, Typography } from "@mui/material";
import CompanyInfoSiteList from "../components/CompanyInfoSiteList";

function Options() {
    return (
        <Container>
            <Paper elevation={3}>
                <Typography variant="h2" align="center">
                    {"公司資訊網站列表"}
                </Typography>
                <Typography variant="h6" align="center">
                    {"在搜尋時，會把URL中的{}換成公司名稱。"}
                </Typography>
                <CompanyInfoSiteList></CompanyInfoSiteList>
            </Paper>
        </Container>
    );
}

export default Options;
