import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Styles from './popUpModal.module.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const PopUpModal : React.FC<IModalProps> = ({show, onHide, modalHeader, imageURL }) =>  {
  return (
    <Modal
    open={show}
    onClose={onHide}
    className ={Styles.modal}
     >
        <Box className={Styles.box}>
              
              
                  <Carousel responsive={responsive} className ={Styles.carosuel}>
                      {imageURL.map((url) =>  <img src={url} className ={Styles.image}  />)}
                  </Carousel>
              
        </Box>
    </Modal>
  );
}


export default PopUpModal;
