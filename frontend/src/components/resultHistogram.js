import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer} from 'recharts';
import { Button, Heading, Text, Box, Spinner } from '@chakra-ui/react';
import NavBar from '../components/navbar';
import '../styles/result.css'; // Import the CSS file for styling
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [loading, setLoading] = useState(true); // Introduce a loading state
  var score = 74;
  const navigate = useNavigate();
  const data = [
    { name: 'Eye-Contact', percentage: 40 },
    { name: 'Confidence', percentage: 70 },
    { name: 'Clarity', percentage: 20 },
    { name: 'Boldness', percentage: 100 }
  ];
  const scorechart = [
    { name: 'Success', percentage: score },
    { name: 'Failure', percentage: 100 - score }
  ];
  const totalPercentage = scorechart.reduce((sum, item) => sum + item.percentage, 0);
  const isSuccess = score >= 50;

  useEffect(() => {
    // Simulate loading delay
    const delay = setTimeout(() => {
      setLoading(false); // After the data is loaded, set loading to false
    }, 4000); // Simulating a 2-second loading delay

    return () => clearTimeout(delay); // Clear the timeout if the component unmounts
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="md" color="teal" />
        <p > &nbsp;Loading...</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Box>
        <Button variant={'outline'} borderColor={'teal'} marginLeft={5} marginTop={5} onClick={() => navigate('/camera')}>
          <ArrowBackIcon/> Back
        </Button>
      </Box>
      <div className="main-container">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={500}>

            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="percentage" fill="lightblue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="svg-heading-container">
          <div className="svg-container">
            <svg width="400" height="400">
              {scorechart.map((item, index) => {
                const startAngle = index === 0 ? 0 : scorechart.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.percentage / totalPercentage) * 360, 0);
                const endAngle = (item.percentage / totalPercentage) * 360 + startAngle;
                const color = isSuccess ? (index === 0 ? '#33b864' : '#C80815') : (index === 0 ? ' #33b864': '#C80815');
                const startAngleRadians = (startAngle - 90) * (Math.PI / 180);
                const endAngleRadians = (endAngle - 90) * (Math.PI / 180);

                const startX = Math.cos(startAngleRadians) * 100 + 200;
                const startY = Math.sin(startAngleRadians) * 100 + 200;

                const endX = Math.cos(endAngleRadians) * 100 + 200;
                const endY = Math.sin(endAngleRadians) * 100 + 200;

                return (
                  <path
                    key={item.name}
                    d={`M${startX} ${startY} A 100 100 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${endX} ${endY}`}
                    fill="none"
                    stroke={color}
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
          </div>
          <div className="assessment-heading">
            <Heading
              padding={5}
              textAlign={'center'}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '4xl' }}
              lineHeight={'110%'}>
              Your{' '}
              <Text as={'span'} color={'teal.600'}>
                Personality
              </Text>
              <br />
              Assessment Score :{' '}
              <Text as={'span'} color={isSuccess ? 'teal.600' : 'red.600'}>
                {` ${score}%`}
              </Text>
            </Heading>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
