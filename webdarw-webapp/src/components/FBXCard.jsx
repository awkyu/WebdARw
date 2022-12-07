import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ViewInAr from '@mui/icons-material/ViewInAr';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { getFBXURL } from "../backend/FirebaseManager.jsx"

function FBXCard({ name, description, reference, setFbxReference, setFbxVisible, fbxFile }) {

    let handleOpenDrawing = () => {
        console.log(reference);
        setFbxReference(reference);
        setFbxVisible(true);
    }

    let handleDownload = () => {
        getFBXURL(reference)
            .then((result) => {
                console.log(result);
                const a = document.createElement('a')
                a.href = result
                a.download = `${name}.fbx`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            })

    }

    return (
    <Card sx={{ display: 'flex', margin: "10px", backgroundColor: "#440000", width: "300px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5"
            sx={{color: "#FFFFFF"}}>
            {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div"
            sx={{color: "#FFFFFF"}}>
            {description}
            </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="viewModel" onClick={handleOpenDrawing}>
                <ViewInAr sx={{ height: 38, width: 38, color: "#FFFFFF" }} />
            </IconButton>
            <IconButton aria-label="download" onClick={handleDownload}>
                <CloudDownloadIcon sx={{ height: 38, width: 38, color: "#FFFFFF" }} />
                {/* <a href="blob:http://localhost:3000/f7f09b1a-f0a5-4651-adc8-33b2d9ddea03" download="proposed_file_name.fbx"></a> */}
            </IconButton>
        </Box>
        </Box>
        <CardMedia
        component="img"
        sx={{ width: 151, marginRight: "0px" }}
        image={ process.env.PUBLIC_URL + '/assets/filler_3d_image.png' }
        alt="Live from space album cover"
        />
    </Card>
    );
}

export default FBXCard;