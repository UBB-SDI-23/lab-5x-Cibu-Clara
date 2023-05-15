import {
	Button,
	Card,
	CardContent,
	IconButton,
	TextField,
	Autocomplete
} from "@mui/material";
import { Container } from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Artist } from "../../models/Artist";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {debounce} from 'lodash';
import axios from "axios";
import {Album} from "../../models/Album";

export const AddAlbum = () => {
	const navigate = useNavigate();
	const artist: Artist = {
		artist_name: "",
		real_name: "",
		country: "",
		email: ""
    }

	const [album, setAlbum] = useState<Album>({
		album_title: "",
		nr_of_tracks: 1,
		label: "",
		year_of_release: 2000,
		main_artist: artist
	});

	const [page] = useState(1);
    const [pageSize] = useState(10);
	const [artists, setArtists] = useState<Artist[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			let url = `${BACKEND_API_URL}/artists/order-by-name/${query}/?page=${page}&page_size=${pageSize}`;
			const response = await fetch(url);
			const { results } = await response.json();
			setArtists(results);
			console.log(results);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

	const addAlbum = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/albums/`, album);
			navigate("/albums");
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (event:any, value: any, reason: any) => {
		console.log("input", event, value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/albums`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addAlbum}>
						<TextField
							id="album_title"
							label="Album title"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAlbum({ ...album, album_title: event.target.value })}
						/>
						<TextField
							id="nr_of_tracks"
							label="Number of tracks"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAlbum({ ...album, nr_of_tracks: +event.target.value })}
						/>
						<TextField
							id="label"
							label="Label"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAlbum({ ...album, label: event.target.value })}
						/>
						<TextField
							id="year_of_release"
							label="Year of release"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAlbum({ ...album, year_of_release: +event.target.value })}
						/>
						<Autocomplete
							id="main_artist"
							options={artists}
							getOptionLabel={(option) => `${option.artist_name}`}
							renderInput={(params) => <TextField {...params} label="Artist" variant="outlined" />}
							filterOptions={(options, state) => options.filter((option) => option.artist_name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange}
							onChange={( event, value) => {
								if (value) {
									console.log(value);
									console.log(event);
									setAlbum({ ...album, main_artist: value.id});
								}
							}}
						/>
						<Button type="submit">Add Album</Button>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
};
