import React from 'react';
import BarChart from './barChart.jsx';
import RatingCount from './ratingCount.jsx';
import StarLabels from './starLabels.jsx';

export default function RatingBreakdownMain() {
  return (
      <div className="ratingsbreakdown head">ratingsbreakdown>
        <BarChart />
        <RatingCount />
        <StarLabels />
      </div>
  );
}
