import React from "react";
import { createRoot } from "react-dom/client";
import Options from "./options";

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Options />);
