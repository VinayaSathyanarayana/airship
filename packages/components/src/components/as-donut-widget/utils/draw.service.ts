import { SVGContainer } from '../types/Container';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import { color as d3Color } from 'd3-color';
import { event as d3event, select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';

export function renderDonut(
  container: SVGContainer,
  data: any,
  width: number,
  height: number,
  arcSize: number,
  padding: number,
  onMouseOver?,
  onMouseOut?,
  onMouseMove?,
  onClick?) {

  const radius = Math.min(width, height);
  const center = radius / 2;
  const pie = d3Pie().value((d: any) => d.value).padAngle(0.01);  // TODO: check this
  const arc = d3Arc()
    .innerRadius((center - arcSize) - padding)
    .outerRadius(center - padding);

  let selected = null;

  const donut = container.append('g')
    .attr('class', 'donut')
    .style('transform', 'translate(50%, 50%)')
    .selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('class', 'path')
    .attr('d', <any>arc)  // TODO: check this
    .attr('fill', (d: any) => d.data.color)
    .style('cursor', 'pointer');

  donut.on('mouseover', function (d: any) {
    if (selected) return;
    if (onMouseOver) onMouseOver(d.data, d3event.pageX, d3event.pageY);

    select(this)
      .transition('arc-fill-in')
      .duration(250)
      .attr('fill', <any>d3Color(d.data.color).darker(0.6));  // TODO: check this
  });

  donut.on('mousemove', function () {
    if (selected) return;
    if (onMouseMove) onMouseMove(d3event.pageX, d3event.pageY);
  })

  donut.on('mouseout', function (d: any) {
    if (selected) return;
    if (onMouseOut) onMouseOut();

    select(this)
      .transition('arc-fill-out')
      .duration(250)
      .attr('fill', d.data.color);
  });

  donut.on('click', function (d: any) {
    if (onMouseOut) onMouseOut();
    
    if (selected && selected === d) {
      selected = null;
      if (onClick) onClick();
      unselectItem(container)
    } else {
      selected = d;
      if (onClick) onClick(d);
      selectItem(container, selected)
    }
  })

  // TODO: think different transitions for new data and updates
  donut.transition('enter-donut')
    .duration(500)
    .attrTween('d', (d: any) => {
      const interp = interpolate({ startAngle: 0, endAngle: 0 }, d);
      return (t) => arc(interp(t));
    });
}

function selectItem(svg: SVGContainer, selected: any) {
  svg.selectAll('.donut path')
    .transition('arc-fill-in-out')
    .duration(250)
    .attr('fill', (d: any) => {
      if (selected === d) {
        return selected.data.color;
      } else {
        return '#e2e6e3';
      }
    })
}

function unselectItem(svg: SVGContainer) {
  svg.selectAll('.donut path')
    .transition('arc-fill-in-out')
    .duration(250)
    .attr('fill', (d: any) => d.data.color);
}

export default {
  renderDonut
};