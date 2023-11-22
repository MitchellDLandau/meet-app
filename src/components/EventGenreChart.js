import { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

const EventGenreChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const colors = ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC30F"];

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    const getData = () => {
        const data = genres.map(genre => {
            const filteredEvents = events.filter(event => event.summary.toLowerCase().includes(genre.toLowerCase()));
            return {
                name: genre,
                value: filteredEvents.length
            }
        });
        return data;
    };
    return (
        <ResponsiveContainer width="99%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    fill="#8884d8"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                >
                    {data.map((name, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
                <Legend verticalAlign="top" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EventGenreChart;