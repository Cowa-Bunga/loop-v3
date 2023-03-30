import { Box } from '@mui/material';
import NavBar from '../../NavBar';

 const LayoutBase = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Box sx={{ pt: '60px' }}>{children}</Box>
    </Box>
  );
};

export default LayoutBase;