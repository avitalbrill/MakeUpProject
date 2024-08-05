import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageAlt from "../image/image (34).png";
import image1 from '../image/image (26).png'
import SignForm from './signForm';

export default function SimplePaper(props) {
    const { serviceType, name, description, image, price,routerBaseUrl } = props;
    console.log("image", image);
    function img() {
        if (image)
            return image;
        return imageAlt
    }

    return (
        <Box sx={{ p: 2 }}>
            <Paper elevation={3} sx={{ p: 2, margin: '0 25px', maxWidth: 300 }} >
                <img src={img(image)} height={220} width="100%" alt={imageAlt} style={{ marginBottom: '1rem' }} />
                <Typography variant="h5" component="h2" sx={{ minHeight: 50 }}>{name}</Typography>
                <Typography variant="body1" sx={{ minHeight: 60 }}>{description}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ minHeight: 30 }}>The price: {price}</Typography>
                {routerBaseUrl=="http://localhost:5174/"&&<SignForm serviceType={serviceType} nameService={name} price={price}></SignForm>
                }                {/* {type === "admin" && <Button variant="contained" color="primary">Edit Service</Button>} */}
            </Paper>
        </Box>
    );
}


