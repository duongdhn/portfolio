import React from 'react';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
    handleRefreshPost: () => void;
}

const RefreshPost = ({ handleRefreshPost }: Props) => {
    return (
        <Button variant="contained" color="secondary" size="small" sx={{ marginLeft: '8px' }} onClick={handleRefreshPost}><RefreshIcon></RefreshIcon></Button>
    );
}

export default React.memo(RefreshPost);
