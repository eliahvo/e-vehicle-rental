import React from 'react';
import { AppContext } from '../../../contexts/AppContext';

export const useMapStyle = (): (
  | { elementType: string; stylers: { color: string }[]; featureType?: undefined }
  | { elementType: string; stylers: { visibility: string }[]; featureType?: undefined }
  | { featureType: string; elementType: string; stylers: { color: string }[] }
  | { featureType: string; stylers: { visibility: string }[]; elementType?: undefined }
)[] => {
  const { darkMode } = React.useContext(AppContext);
  if (darkMode) {
    return [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#212121',
          },
        ],
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#212121',
          },
        ],
      },
      {
        elementType: 'geometry',
        featureType: 'administrative',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'administrative.country',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'administrative.locality',
        stylers: [
          {
            color: '#bdbdbd',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'poi',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        elementType: 'geometry',
        featureType: 'poi.park',
        stylers: [
          {
            color: '#181818',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'poi.park',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        featureType: 'poi.park',
        stylers: [
          {
            color: '#1b1b1b',
          },
        ],
      },
      {
        elementType: 'geometry.fill',
        featureType: 'road',
        stylers: [
          {
            color: '#2c2c2c',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'road',
        stylers: [
          {
            color: '#8a8a8a',
          },
        ],
      },
      {
        elementType: 'geometry',
        featureType: 'road.arterial',
        stylers: [
          {
            color: '#373737',
          },
        ],
      },
      {
        elementType: 'geometry',
        featureType: 'road.highway',
        stylers: [
          {
            color: '#3c3c3c',
          },
        ],
      },
      {
        elementType: 'geometry',
        featureType: 'road.highway.controlled_access',
        stylers: [
          {
            color: '#4e4e4e',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'road.local',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'transit',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        elementType: 'geometry',
        featureType: 'water',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        featureType: 'water',
        stylers: [
          {
            color: '#3d3d3d',
          },
        ],
      },
    ];
  }
  return [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      elementType: 'geometry',
      featureType: 'poi',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      featureType: 'poi',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'geometry',
      featureType: 'poi.park',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      featureType: 'poi.park',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      elementType: 'geometry',
      featureType: 'road',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      featureType: 'road.arterial',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'geometry',
      featureType: 'road.highway',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      featureType: 'road.highway',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      featureType: 'road.local',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      elementType: 'geometry',
      featureType: 'transit.line',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      elementType: 'geometry',
      featureType: 'transit.station',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      elementType: 'geometry',
      featureType: 'water',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      featureType: 'water',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];
};
