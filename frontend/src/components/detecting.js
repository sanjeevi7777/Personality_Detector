import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaVideo ,FaCircle,FaExpand} from 'react-icons/fa';
import NavBar from '../components/navbar';
import { Box, useColorModeValue, Button, HStack, Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

const CameraApp = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const [showComponent, setShowComponent] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunksRef = React.useRef([]);
  const [startTime, setStartTime] = useState(0); // Track recording start time
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isCameraOpen) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - startTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);
    } else {
      clearInterval(interval);
      setElapsedTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isCameraOpen, startTime]);

  const stopCamera = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm',
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
      sendVideoToBackend(videoBlob);
      chunksRef.current = [];
    };

    setMediaRecorder(recorder);
    setStartTime(Date.now()); // Set recording start time
    recorder.start();
    setIsCameraOpen(true);
  };

  const sendVideoToBackend = async (videoBlob) => {
    try {
      const formData = new FormData();
      formData.append('video', videoBlob, 'video.webm');

      const response = await fetch('YOUR_PYTHON_BACKEND_URL', {
        method: 'POST',
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  if (!showComponent) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="md" color="teal" />
        <p> &nbsp;Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Text fontFamily={'cursive'} fontSize={'2xl'} width={'100%'} align={'center'} p={2}>PersonaScan: Discover Your Inner Self  .!</Text>

      <Box  bg={bgColor}style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px', // Adjust the max width as needed
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        boxShadow:'0px 0px 5px 0px rgba(0, 0, 0, 0.3)',
        
        height: isCameraOpen ? 'auto' : '500px', // Adjust the height when the camera is open or closed
      }}>
        {isCameraOpen ? (
  <div style={{ position: 'relative', width: '100%', paddingBottom: '62.5%' }}>
    <Webcam
      audio={true}
      videoConstraints={{ facingMode: 'user' }}
      mirrored={true}
      audioConstraints={{
        echoCancellation: true,
        noiseSuppression: true,
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '0%',
        left: '0%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <FaCircle style={{ marginRight: '0.5rem', marginTop: '0.2rem', color: 'red' }} />
        {formatTime(elapsedTime)}
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        zIndex: 1,
        cursor: 'pointer',
      }}
      onClick={toggleFullScreen}
    >
      <FaExpand size={24} />
    </div>
  </div>
) : (
  <FaVideo size={100} />
)}

      </Box>

      <HStack spacing={40} pt={5} justifyContent={'center'}>
        <Button onClick={isCameraOpen ? stopCamera : startCamera} variant={'outline'} color={'teal'} borderColor={'teal'}>
          {isCameraOpen ? 'Stop Camera' : 'Start Camera'}
        </Button>
          <Button onClick={stopCamera} variant={'solid'} backgroundColor={'teal'} isDisabled={!isCameraOpen}>
            Submit Video
          </Button>
      </HStack>
    </div>
  );
};

export default CameraApp;
