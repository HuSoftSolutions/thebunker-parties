import React from 'react';

const Marker = ({
  className,
  lat,
  lng,
  markerId,
  onClick,
  draggable,
  onDrag, // Although not used, keeping for potential future use
  onDragEnd, // Although not used, keeping for potential future use
  onDragStart, // Although not used, keeping for potential future use
  ...props
}) => 
  lat && lng ? (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <img
      className={className}
      src={'/pin.png'}
      onClick={(e) => onClick ? onClick(e, { markerId, lat, lng }) : null}
      style={{ fontSize: 40 }}
      alt={markerId}
      width={35}
      height={35}
      {...props}
    />
  ) : null;

export default Marker;
