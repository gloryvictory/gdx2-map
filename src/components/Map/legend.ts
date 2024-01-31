import { LegendOptions, MaplibreLegendControl } from "@watergis/maplibre-gl-legend";

export const targets = {
  'points-file': 'Файлы',
  'field': 'Месторождения',
  'lu': 'Лицензии',

};

export const legend_option: LegendOptions = {
  showDefault: false, 
  showCheckbox: true, 
  onlyRendered: false,
  reverseOrder:false,
  title: 'Легенда'
}
// add legend control without checkbox, and it will be hide as default
export const legend : MaplibreLegendControl =  new MaplibreLegendControl(targets, legend_option)
