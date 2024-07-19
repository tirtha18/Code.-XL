import React from "react";
import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
export default function NavTabs({ setToggleresult }) {
  const [active, setActive] = useState(false);
  return (
    <div className="w-full">
      <Tabs.Root defaultValue="tab1" orientation="vertical" color="cyan" active>
        <Tabs.List className="space-x-4" aria-label="Manage your account">
          <Tabs.Trigger
            value="tab1"
            className={`hover:text-green-300 ${
              !active ? "text-green-500" : ""
            }`}
            onClick={() => {
              setToggleresult(false);
              setActive(false);
            }}
          >
            Result
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className={`hover:text-green-300 ${active ? "text-green-500" : ""}`}
            onClick={() => {
              setToggleresult(true);
              setActive(true);
            }}
          >
            Questions
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
}
