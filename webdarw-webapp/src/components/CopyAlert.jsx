import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function CopyAlert({alertOpen, setAlertOpen, copiedContent}) {
    return (
        <Box sx={{ width: '100%' }} style={{backgroundColor: "#000000"}}>
            <Collapse in={alertOpen} style={{backgroundColor: "#000000"}}>
                <Alert
                    action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                        setAlertOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                    }
                    sx={{ mb: 2 }}
                    style={{backgroundColor: "#FF5555"}}
                >
                    {copiedContent}
                </Alert>
            </Collapse>
        </Box>
    );
}

export default CopyAlert;