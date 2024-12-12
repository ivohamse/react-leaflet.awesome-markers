import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.awesome-markers';

export type AwesomeMarkerProps = L.AwesomeMarkers.AwesomeMarkersIconOptions & {
  position: L.LatLngExpression;
  onClick?: () => void;
  iconColor?: string;
  prefix?: string;
};

const AwesomeMarker: React.FC<AwesomeMarkerProps> = ({
  position,
  icon,
  onClick,
  iconColor = 'white',
  markerColor = 'red',
  prefix = 'fa'
}) => {
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!markerRef.current) {
      const customIcon = L.AwesomeMarkers.icon({
        icon: icon ?? 'info-sign',
        iconColor,
        markerColor,
        prefix,
      })

      markerRef.current = L.marker(position, { icon: customIcon });
      if (onClick) {
        markerRef.current.on('click', onClick);
      }
      markerRef.current.addTo(L.map('map'));
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [position, icon, iconColor, markerColor, prefix, onClick]);

  return null;
};

export default AwesomeMarker;