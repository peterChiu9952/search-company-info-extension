import React, { useEffect, useState } from "react";
import "./popup.css";
import CompanyNameParser from "../script/CompanyNameParser";
import { Box, Button, TextField } from "@mui/material";

function Popup() {
    const [searchInput, setSearchInput] = useState("");
    const [companyInfoSites, setCompanyInfoSites] = useState([]);

    const handleSearch = (index: number) => {
        const query = new URL(
            companyInfoSites[index].url.replace("{}", searchInput)
        );
        chrome.tabs.create({ url: query.href, active: false });
    };

    const getCompanyName = () => {
        chrome.tabs
            .query({ active: true, lastFocusedWindow: true })
            .then(([tab]) => {
                const companyName = CompanyNameParser.getCompanyNameFromTitle(
                    tab.url,
                    tab.title
                );
                setSearchInput(companyName);
            });
    };

    useEffect(() => {
        chrome.storage.local.get(["companyInfoSites"]).then((res) => {
            setCompanyInfoSites(res.companyInfoSites);
        });
        getCompanyName();
    }, []);

    return (
        <Box>
            <TextField
                variant="outlined"
                type="text"
                sx={{ width: "100%", m: "8px 0" }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            {companyInfoSites.map((query, index) => (
                <Button
                    variant="contained"
                    sx={{ width: "100%", m: "8px 0" }}
                    key={query.url}
                    onClick={() => handleSearch(index)}
                >
                    {query.name}
                </Button>
            ))}
        </Box>
    );
}

export default Popup;
