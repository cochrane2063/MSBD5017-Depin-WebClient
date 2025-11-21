import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Grid } from "@mui/material";
import ServerIcon from '@mui/icons-material/Dns';
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
        <Grid size={6}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ServerIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={node.ip} secondary={`Traffic: ${node.traffic}`} />
                <ButtonGroup
                    disableElevation
                    variant="outlined"
                    aria-label="Disabled button group"
                >
                    <Button onClick={() => disconnect({ip: node.ip})} color="secondary" >Disconnect</Button>
                    <Button onClick={() => connect({ip: node.ip})}>Connect</Button>
                </ButtonGroup>
            </ListItem>
        </Grid>
    );
}

export default function FolderList() {
    const [nodes, setNodes] = React.useState([{ip: "57.158.82.48", traffic: 5},{ip: "10.0.0.3", traffic: 3},{ip: "10.0.0.4", traffic: 7}]);

    return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Grid container spacing={2}>
            {nodes.map((node, index) => (
                <NodeItem key={index} node={node} />
            ))}
        </Grid>
    </List>
    );
}