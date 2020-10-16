import Leaflet, { PointTuple } from 'leaflet';

import retirementHome from '../assets/images/retirement-home.svg';
import seniorCenter from '../assets/images/senior-center.svg';

const iconSize: PointTuple = [40, 40];
const popupAnchor: PointTuple = [190, 40];

export const retirementHomeIcon = Leaflet.icon({
  iconUrl: retirementHome,
  iconSize,
  popupAnchor,
});

export const seniorCenterIcon = Leaflet.icon({
  iconUrl: seniorCenter,
  iconSize,
  popupAnchor,
});
