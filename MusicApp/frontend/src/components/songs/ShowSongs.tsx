import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Button, TextField, Toolbar
} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Song} from "../../models/Song";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";

export const ShowSongs = () => {
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [order, setOrder] = useState("asc");
    let [input, setInput] = useState<number | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 2; //Math.ceil(1000000 / 100);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/songs/?p=${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setSongs(data);
                setLoading(false);
            });
        }, [])

    const sorting = () => {
        if (order === "asc") {
            const sorted = [...songs].sort((s1, s2) =>
                    s1.song_name.toLowerCase() > s2.song_name.toLowerCase() ? 1 : -1);
            setSongs(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...songs].sort((s1, s2) =>
                s1.song_name.toLowerCase() < s2.song_name.toLowerCase() ? 1 : -1
            );
            setSongs(sorted);
            setOrder("asc");
        }
    }

    const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			setLoading(true);
			fetch(`${BACKEND_API_URL}/songs/?p=${currentPage + 1}`)
				.then((response) => response.json())
				.then((data) => {
					setSongs(data.results);
					setLoading(false);
				});
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			setLoading(true);
			fetch(`${BACKEND_API_URL}/songs/?p=${currentPage - 1}`)
				.then((response) => response.json())
				.then((data) => {
					setSongs(data.results);
					setLoading(false);
				});
		}
	};

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);

		setLoading(true);
		fetch(`${BACKEND_API_URL}/songs/?p=${newPage}`)
			.then((response) => response.json())
			.then((data) => {
				setSongs(data.results);
				setLoading(false);
			});
	};

	const pageNumbers = [];
	for (
		let i = Math.max(1, currentPage - 5);
		i <= Math.min(totalPages, currentPage + 5);
		i++
	) {
		pageNumbers.push(i);
	}

    const [open, setOpen] = React.useState(false);
	const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
	const handleOpen = () => {
		setOpen(!open);
	};

        return (
		<Container>
			<h1>All Songs </h1>
			<label style={{ color: "gray" }}>Current Page: {currentPage}</label>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "900px", marginBottom: "-30px" }}>
            <TextField
                label="Year of Release"
                onChange={(event) => {
						setInput( parseInt(event.target.value))}}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{style: {color: 'darkgrey'}}}
                style={{ marginRight: "16px", color:'whitesmoke' }}
            />
            <Button component={Link} sx={{ mr: 3 }} to={`/songs/filter-by-year/${input}`} variant="contained" style={{color:"whitesmoke"}}>
                Filter
            </Button>
            </div>
			{loading && <CircularProgress />}
			{!loading && songs.length === 0 && <p>No songs found</p>}
            			{!loading && (
				<Toolbar>
					<div style={{ width: "1200px" }}>
						{currentPage > 1 && (
							<button style={{ margin: "3px" }} onClick={() => handlePageChange(currentPage - 1)}>
								Previous
							</button>
						)}
						{pageNumbers[0] > 1 && (
							<>
								<button style={{ margin: "3px" }} onClick={() => handlePageChange(1)}>1</button>
								{pageNumbers[0] > 2 && <span style={{ margin: "3px" }} >...</span>}
							</>
						)}
						{pageNumbers.map((pageNumber) => (
							<button
								style={{
									margin: "3px",
									// backgroundColor: currentPage === pageNumber ? "white" : "",
									backgroundColor: "white",
									color: currentPage === pageNumber ? "blue" : "black",
									pointerEvents: currentPage === pageNumber ? "none" : "auto"
								}}
								key={pageNumber}
								onClick={() => handlePageChange(pageNumber)}
							>
								{pageNumber}
							</button>
						))}
						{pageNumbers[pageNumbers.length - 1] <= totalPages - 1 && (
							<>
								{pageNumbers[pageNumbers.length - 1] <= totalPages - 2 && (
									<span style={{ margin: "3px" }}>...</span>
								)}
								<button style={{ margin: "3px" }} onClick={() => handlePageChange(totalPages)}>
									{totalPages}
								</button>
							</>
						)}
						{currentPage < totalPages && (
							<button style={{ margin: "3px" }} onClick={() => handlePageChange(currentPage + 1)}>
								Next
							</button>
						)}
					</div>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/employees/add`}>
						<Tooltip title="Add a new employee" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
				</Toolbar>
			)}
			{!loading && (
				<IconButton component={Link} sx={{ mr:155 }} to={`/songs/add`}>
					<Tooltip title="Add a new song" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
			{!loading && songs.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
                                <TableCell onClick={() => sorting()} align="center">Song name</TableCell>
								<TableCell align="right">Composer</TableCell>
								<TableCell align="right">Genre</TableCell>
								<TableCell align="right">Year of release</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
                            {songs.map((song, index) => (
								<TableRow key={song.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/songs/${song.id}/details`} title="View song details">
											{song.song_name}
										</Link>
									</TableCell>
									<TableCell align="right">{song.composer}</TableCell>
									<TableCell align="right">{song.genre}</TableCell>
									<TableCell align="right">{song.year_of_release}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/songs/${song.id}/details`}>
											<Tooltip title="View song details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>
										<IconButton component={Link} sx={{ mr: 3 }} to={`/songs/${song.id}/edit`}>
											<EditIcon />
										</IconButton>
										<IconButton component={Link} sx={{ mr: 3 }} to={`/songs/${song.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};