import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Grid, Card, CardContent, CardActions, Typography, Box, Chip } from "@mui/material";
import ServerIcon from '@mui/icons-material/Dns';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import useAuth from '~/hooks/useAuth';
import { signMessage } from './Metamask/Connections';
import axios from 'axios';

interface Node {
  ip: string;
  traffic: number;
}

function NodeItem({node}: {node: Node}) {
    const { auth } = useAuth();
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
        console.log("Disconnect from ", ip);
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
        </Grid>
    );
}

export default function FolderList() {
    const [nodes, setNodes] = React.useState([{ip: "57.158.82.48", traffic: 5},{ip: "10.0.0.3", traffic: 3},{ip: "10.0.0.4", traffic: 7}]);

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