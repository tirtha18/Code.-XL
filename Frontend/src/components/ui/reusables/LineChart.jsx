import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CustomAreaChart({
  mocklabels,
  mockdata,
  showLegend = false,
  showAxes = false,
  lineColor = "rgb(34 197 94)",
  areaColorAbove = "rgba(255, 0, 0, 0.3)", 
  areaColorBelow = "rgba(0, 0, 255, 0.3)",
  delay = 0,
}) {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChart(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const data = mocklabels.map((label, index) => ({
    name: label,
    Score: mockdata[index],
  }));

  return (
    <div className="mb-4 w-full h-full">
      {showChart && (
        <ResponsiveContainer>
          <AreaChart data={data}>
            <XAxis dataKey="name" hide={!showAxes} />
            <YAxis hide={!showAxes} />
           
            <Tooltip />
            {showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey="Score"
              stroke={lineColor}
              fillOpacity={0.3}
              fill={`url(#gradient)`}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={areaColorBelow} />
                  <stop offset="100%" stopColor={areaColorAbove} />
                </linearGradient>
              </defs>
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}