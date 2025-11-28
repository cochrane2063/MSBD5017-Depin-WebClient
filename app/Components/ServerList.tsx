import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Grid, Card, CardContent, CardActions, Typography, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import ServerIcon from '@mui/icons-material/Dns';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Rating from '@mui/material/Rating';
import useAuth from '~/hooks/useAuth';
import { signMessage } from './Metamask/Connections';
import axios from 'axios';

interface Node {
  ip: string;
  traffic: number;
  price : number;
}

function NodeItem({node}: {node: Node}) {
    const { auth } = useAuth();
    const [ratingOpen, setRatingOpen] = React.useState(false);
    const [ratingValue, setRatingValue] = React.useState<number | null>(null);
    const [submittingRating, setSubmittingRating] = React.useState(false);
    const connect = async ({ip}: {ip: string}) => {
        const res = await signMessage(auth.providerWithInfo.provider, auth.accounts[0]);
        try {
            const res_string = res?.publicKey + '\n' + res?.sign;
            let response = await axios.post('http://' + ip + ":8080/connect", res_string);
            console.log(response.data); // Log the response from the server
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const disconnect = ({ip}: {ip: string}) => {
        // TODO check code
        setRatingOpen(true);
    }

    const handleCloseRating = () => {
        setRatingOpen(false);
        setRatingValue(null);
    };

    const handleSubmitRating = async () => {
        if (ratingValue == null) {
            return;
        }
        setSubmittingRating(true);
        try {
            // await axios.post('http://' + node.ip + ":8080/rate", {
            //     rating: ratingValue,
            // }, {
            //     headers: { "Content-Type": "application/json" }
            // });
            // console.log('Rating submitted');
        } catch (err) {
            console.error('Failed to submit rating', err);
        } finally {
            setSubmittingRating(false);
            handleCloseRating();
        }
    }

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <ServerIcon />
                        </Avatar>
                        <Typography variant="h6" component="div" noWrap>
                            {node.ip}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SignalCellularAltIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                            Traffic Load:
                        </Typography>
                        <Chip 
                            label={node.traffic} 
                            size="small" 
                            color={node.traffic > 5 ? "warning" : "success"} 
                            variant="outlined" 
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                            Price:
                        </Typography>
                        <Chip 
                            label={node.price} 
                            size="small" 
                            color={node.price > 15 ? "warning" : "success"} 
                            variant="outlined" 
                        />
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        size="small"
                    >
                        <Button 
                            onClick={() => disconnect({ip: node.ip})} 
                            color="error" 
                            variant="outlined"
                        >
                            Disconnect
                        </Button>
                        <Button 
                            onClick={() => connect({ip: node.ip})}
                            color="primary"
                        >
                            Connect
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>

            <Dialog open={ratingOpen} onClose={handleCloseRating}>
                <DialogTitle>Rate this server</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography component="span">Your rating:</Typography>
                        <Rating
                            name={`server-rating-${node.ip}`}
                            value={ratingValue}
                            onChange={(_, newValue) => setRatingValue(newValue)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRating} disabled={submittingRating}>Cancel</Button>
                    <Button onClick={handleSubmitRating} disabled={submittingRating || ratingValue == null} variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default function FolderList() {
    const [nodes, setNodes] = React.useState([{ip: "57.158.82.48", traffic: 5, price: 10},{ip: "57.158.82.47", traffic: 3, price: 15},{ip: "57.158.82.49", traffic: 7, price: 20}]);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4, fontWeight: 'bold' }}>
                Available Servers
            </Typography>
            <Grid container spacing={3}>
                {nodes.map((node, index) => (
                    <NodeItem key={index} node={node} />
                ))}
            </Grid>
        </Box>
    );
}