import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_map from 'highcharts/modules/map';
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json';
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";
import {InfinitySpin} from "react-loader-spinner";

HC_map(Highcharts);

const WorldMap = ({ apiUrl }) => {
    const [mapOptions, setMapOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasData, setHasData] = useState(false);


    const getMapData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            const countryCounts = response.data.countryCounts;
            // formatting the data for the high charts
            // [
            //   { code: 'in', value: 735 },
            //   { code: 'us', value: 18 },
            //   { code: 'fr', value: 19 }
            // ]
            if (Object.keys(countryCounts).length === 0) {
                setHasData(false); // No data available
                setLoading(false);
                return;
            }
            setHasData(true);
            const formattedData = Object.entries(countryCounts).map(([code, value]) => ({
                code: code.toLowerCase(),
                value: value
            }));

            // Highcharts map options dynamically
            setMapOptions({
                chart: {
                    map: mapDataWorld,
                },
                title: {
                    text: 'Click + scans by location',
                    style : {
                        fontWeight: 'bold'
                    }
                },
                mapNavigation: {
                    enabled: true,
                    enableButtons: true,
                    buttonOptions: {
                        alignTo: 'spacingBox', // Align buttons to the map
                        align: 'left', // Align to the left
                        verticalAlign: 'bottom', // Vertical alignment (top, middle, bottom)
                        width: 18, // Button width
                        height: 18, // Button height
                    }
                },
                colorAxis: {
                    min: 0,
                    max: Math.max(...formattedData.map(d => d.value)),
                    stops: [
                        [0, '#EFEFFF'],
                        [0.5, '#44AFFE'],
                        [1, '#0050A1'],
                    ],
                },
                series: [{
                    data: formattedData.map(d => [d.code, d.value]),
                    mapData: mapDataWorld,
                    name: 'Clicks',
                    states: {
                        hover: {
                            color: '#238CCB',
                            borderColor: null,
                        },
                    },
                    joinBy: ['hc-key', 0],
                }],
                tooltip: {
                    pointFormat: '{point.properties.name}: <b>{point.value}</b> clicks',
                }
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Error fetching location data");
        }
    }

    useEffect(() => {
        getMapData();
    }, []);

    if (loading) {
        return (
            <div className="rounded-lg p-4 h-96 flex items-center justify-center">
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
                <p>Preparing your graph data...</p>
            </div>
        );
    }

    if (!hasData) {
        return (
            <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
                <p className="text-lg font-semibold">
                    No data available.
                </p>
            </div>
        );
    }

    return (
        <div>
            {mapOptions && (
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'mapChart'}
                    options={mapOptions}
                />
            )}
        </div>
    );
}

export default WorldMap;
