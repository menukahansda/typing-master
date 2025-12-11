import { LineChart, lineElementClasses } from '@mui/x-charts';

export default function ProgressGraph({ xLabels, uData }) {
  return (
    <LineChart
      series={[
        {
          data: uData,
          label: "wpm",
          area: true,       // enable area under the curve
          showMark: false,
        },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      fill="gradient"        // built-in gradient fill
      sx={{
        [`& .${lineElementClasses.root}`]: {
          strokeWidth: 2,
          stroke: '#3f51b5', // curve line color
        },
      }}
    />
  );
}
