import {
	Button,
	Card,
	CardContent,
	IconButton,
	TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Artist } from "../../models/Artist";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AddArtist = () => {
	const navigate = useNavigate();

	const [artist, setArtist] = useState<Artist>({
		artist_name: "",
		real_name: "",
        country:"",
        email:"",
	});

	const addArtist = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/artists/`, artist);
			navigate("/artists");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/artists`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addArtist}>
						<TextField
							id="artist_name"
							label="Artist name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArtist({ ...artist, artist_name: event.target.value })}
						/>
						<TextField
							id="real_name"
							label="Real name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArtist({ ...artist, real_name: event.target.value })}
						/>
						<TextField
							id="country"
							label="Country"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArtist({ ...artist, country: event.target.value })}
						/>
						<TextField
							id="email"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArtist({ ...artist, email: event.target.value })}
						/>
						<Button type="submit">Add Artist</Button>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};