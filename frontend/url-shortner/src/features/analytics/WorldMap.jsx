import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_map from 'highcharts/modules/map';
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json';
import { toast } from 'sonner';
import axiosInstance from "../../shared/utils/axiosInstance.js";
import { InfinitySpin } from "react-loader-spinner";

HC_map(Highcharts);

const WorldMap = ({ apiUrl }) => {
    const [mapOptions, setMapOptions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasData, setHasData] = useState(false);

    const getMapData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            const countryCounts = response.data.countryCounts;

            if (Object.keys(countryCounts).length === 0) {
                setHasData(false);
                setLoading(false);
                return;
            }
            setHasData(true);
            const formattedData = Object.entries(countryCounts).map(([code, value]) => ({
                code: code.toLowerCase(),
                value: value
            }));

            const maxValue = Math.max(...formattedData.map(d => d.value));

            setMapOptions({
                chart: {
                    map: mapDataWorld,
                    backgroundColor: 'transparent',
                    style: {
                        fontFamily: 'inherit'
                    }
                },
                accessibility: {
                    enabled: false
                },
                title: {
                    text: undefined, // Hide default title to use custom header
                },
                credits: {
                    enabled: false
                },
                mapNavigation: {
                    enabled: true,
                    enableButtons: true,
                    buttonOptions: {
                        alignTo: 'spacingBox',
                        align: 'right',
                        verticalAlign: 'bottom',
                        theme: {
                            fill: 'white',
                            'stroke-width': 1,
                            stroke: '#e5e7eb',
                            r: 4,
                            states: {
                                hover: {
                                    fill: '#f3f4f6'
                                },
                                select: {
                                    fill: '#e5e7eb'
                                }
                            }
                        }
                    }
                },
                colorAxis: {
                    min: 0,
                    max: maxValue,
                    stops: [
                        [0, '#e0f2fe'],   // Very light blue
                        [0.5, '#3b82f6'], // Blue 500
                        [1, '#1e3a8a']    // Blue 900
                    ],
                    labels: {
                        style: {
                            color: '#9ca3af'
                        }
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    symbolHeight: 10,
                },
                series: [{
                    data: formattedData,
                    mapData: mapDataWorld,
                    joinBy: ['hc-key', 'code'],
                    name: 'Clicks',
                    states: {
                        hover: {
                            color: '#fbbf24', // Amber for hover
                            borderColor: '#b45309',
                        },
                    },
                    borderColor: '#CBD5E1',
                    borderWidth: 0.5,
                    dataLabels: {
                        enabled: false,
                        format: '{point.name}'
                    }
                }],
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderWidth: 0,
                    borderRadius: 10,
                    shadow: true,
                    padding: 10,
                    useHTML: true,
                    headerFormat: '',
                    pointFormat: '<div style="font-family: inherit; text-align: center;"><span style="font-size: 10px; color: #6b7280; text-transform: uppercase; font-weight: 600;">{point.name}</span><br/><span style="font-size: 16px; font-weight: bold; color: #1f2937;">{point.value}</span> <span style="font-size: 12px; color: #9ca3af;">clicks</span></div>'
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

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full flex flex-col min-h-[400px]">
            <h2 className="text-lg font-bold text-gray-800 mb-4 text-center lg:text-left">Geographic Distribution</h2>

            {loading ? (
                <div className="flex flex-col items-center justify-center flex-1">
                    <InfinitySpin
                        visible={true}
                        width="120"
                        color="#4f46e5"
                        ariaLabel="infinity-spin-loading"
                    />
                    <p className="text-gray-400 font-medium text-sm mt-4 animate-pulse">Mapping global data...</p>
                </div>
            ) : hasData && mapOptions ? (
                <div className="flex-1 rounded-xl overflow-hidden">
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'mapChart'}
                        options={mapOptions}
                        containerProps={{ style: { height: "100%" } }}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-900 font-semibold">No Location Data</p>
                    <p className="text-gray-500 text-sm">Waiting for global clicks...</p>
                </div>
            )}
        </div>
    );
}

export default WorldMap;
