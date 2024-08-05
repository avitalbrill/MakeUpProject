import ServiceStore from "../makeUp/service";
import { Grid } from "@mui/material";
import SimplePaper from './paper'
import { useEffect, useState } from 'react';

import image4 from "../image/image (30).png";
import image1 from "../image/image (34).png";
import image3 from "../image/image (36).png";
import image2 from "../image/image (33).png";
import image5 from "../image/image (31).png";

export default function ServiceList() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        ServiceStore.getServices().then((result) => {
            setServices(result);
        });
    }, []);

    const images = [image1, image2, image3, image4, image5]; // מערך של התמונות
    const routerBaseUrl = 'http://localhost:5174/'; // הניתוב הבסיסי של הראוטר

    return (
        <Grid container spacing={1}>
            {services?.map((s) => (
                <SimplePaper
                    image={images[s.id]} // שימוש במפתח של התמונה לפי המיפוי
                    key={s.id}
                    serviceType={s.id}
                    id={s.key}
                    {...s}
                    routerBaseUrl={routerBaseUrl} // מעבר של הניתוב ל-`SimplePaper`
                />
            ))}
        </Grid>
    );
}
