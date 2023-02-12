import {
  area
  // curveMonotoneX
} from "d3-shape";
type Props = {
    y0: any;
    y1: any;
}
export function makeCustomLayer({ y0, y1 }: Props) {
  return function ({ series, xScale, yScale, innerHeight }: any) {
    const areaGenerator = area()
      .x((d :any) => xScale(d.data.x))
      .y0((d) => yScale(y0))
      .y1((d) => yScale(y1));
    // .y0((d) => Math.min(innerHeight, yScale(d.data.y - 40)))
    // .y1((d) => yScale(d.data.y + 0))
    // .curve(curveMonotoneX);

    console.log("===============");
    console.log("===series: ", series);
    console.log("===xScale: ", xScale);
    console.log("===yScale: ", yScale);
    console.log("===innerHeight: ", innerHeight);

    return (
      <path
        d={areaGenerator(series[0].data) || undefined}
        // fill="url(#pattern)"
        fill="purple"
        // fillOpacity={0.6}
        // stroke="#3daff7"
        // strokeWidth={2}
      />
    );
  };
}