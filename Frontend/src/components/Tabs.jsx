import React from "react";
import { TabNav } from "@primer/react";

export default function Tabs({ setToggleresult }) {
  return (
    <div className="w-full">
      <TabNav.Link
        onClick={() => setToggleresult(false)}
        href="#"
        active
      >
        Report Card
      </TabNav.Link>
      <TabNav.Link active href="#" onClick={() => setToggleresult(true)}>
        Questions
      </TabNav.Link>
    </div>
  );
}
