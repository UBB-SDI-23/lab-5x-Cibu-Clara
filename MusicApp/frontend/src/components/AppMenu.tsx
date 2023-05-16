import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import GroupIcon from '@mui/icons-material/Group';
import AlbumIcon from '@mui/icons-material/Album';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import {useState} from "react";

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;
	// State variables for hover functionality
	const [isHovered, setIsHovered] = useState(false);

	// Event handlers for hover functionality
    const handleMouseEnter = () => {
       setIsHovered(true);
    };

    const handleMouseLeave = () => {
       setIsHovered(false);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="absolute" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<MusicNoteIcon/>
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Music application
					</Typography>
					<Button
						variant={path.startsWith("/songs") ? "outlined" : "text"}
						to="/songs"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<QueueMusicIcon />}>
						Songs
					</Button>
					<Button
						variant={path.startsWith("/artists") ? "outlined" : "text"}
						to="/artists"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<GroupIcon />}>
						Artists
					</Button>
					<Button
						variant={path.startsWith("/albums") ? "outlined" : "text"}
						to="/albums"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<AlbumIcon />}>
						Albums
					</Button>
					<Button
						variant={path.startsWith("/performances") ? "outlined" : "text"}
						to="/performances"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LibraryMusicIcon />}>
						Performances
					</Button>
					<Button
						variant={path.startsWith("/statistics") ? "outlined" : "text"}
						to="/statistics"
						component={Link}
						color="inherit"
						sx={{ ml: "auto" }}
						startIcon={<SignalCellularAltIcon />}
						onMouseEnter={handleMouseEnter} // Attach event handler for mouse enter
            			onMouseLeave={handleMouseLeave} // Attach event handler for mouse leave
          				>
						Statistics
					</Button>
					{/* Conditionally render the statistics buttons */}
          			{isHovered && (
            		<div
              			style={{
                		position: "absolute",
                		top: "100%",
                		left: "50%",
                		transform: "translateX(-50%)",
						display: "flex",
              			flexDirection: "column",
              			alignItems: "center",
              			marginTop: "8px",
            			}}
          				>
            		<Button variant="outlined">Statistics1</Button>
            		<Button variant="outlined">Statistics2</Button>
          			</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};