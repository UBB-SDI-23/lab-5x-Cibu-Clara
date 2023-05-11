import './App.css'
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { ShowSongs } from "./components/songs/ShowSongs";
import { SongDetails } from "./components/songs/SongDetails";
import { DeleteSong } from "./components/songs/DeleteSong";
import { AddSong } from "./components/songs/AddSong";
import {EditSong} from "./components/songs/EditSong";
import {FilterSongsByYear} from "./components/songs/FilterSongsByYear";
import {ShowArtists} from "./components/artists/ShowArtist";
import {ArtistDetails} from "./components/artists/ArtistDetails";
import {EditArtist} from "./components/artists/EditArtist";
import {DeleteArtist} from "./components/artists/DeleteArtist";
import {AddArtist} from "./components/artists/AddArtist";
import {ShowAlbums} from "./components/albums/ShowAlbums";
import {AddAlbum} from "./components/albums/AddAlbum";

function App() {
	return (
		<React.Fragment>
			<Router>
				<AppMenu />
				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/songs" element={<ShowSongs />} />
					<Route path="/songs/:songId/details" element={<SongDetails />} />
					<Route path="/songs/:songId/edit" element={<EditSong />} />
					<Route path="/songs/:songId/delete" element={<DeleteSong />} />
					<Route path="/songs/add" element={<AddSong />} />
					<Route path="/songs/filter-by-year/:year" element={<FilterSongsByYear />} />

					<Route path="/artists" element={<ShowArtists />} />
					<Route path="/artists/:artistId/details" element={<ArtistDetails />} />
					<Route path="/artists/:artistId/edit" element={<EditArtist />} />
					<Route path="/artists/:artistId/delete" element={<DeleteArtist />} />
					<Route path="/artists/add" element={<AddArtist />} />

					<Route path="/albums" element={<ShowAlbums />} />
					<Route path="/albums/:albumId/details" element={<AlbumDetails />} />
					<Route path="/albums/:albumId/edit" element={<EditAlbum />} />
					<Route path="/albums/:albumId/delete" element={<DeleteAlbum />} />
					<Route path="/albums/add" element={<AddAlbum />} />
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App;