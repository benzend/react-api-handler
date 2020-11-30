import { useState } from "react";
import { Organizer } from "./components/";
import "./App.css";

import { Box, Button, Container, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    width: "300px",
    boxShadow: "3px 3px 7px gray",
    padding: 10,
    border: "1px solid #aaa",
  },
  cont: {},
  organizerButton: {
    position: "fixed",
    top: 0,
    right: 0,
    fontSize: "1.2rem",
    padding: ".1% .8%",
    margin: ".8% 2%",
  },
  organizerBox: {
    position: "fixed",
    top: 0,
    right: "-20%",
    marginTop: "100px",
    padding: "20px",
    width: "220px",
    transition: "all .6s ease",
    "&.open": {
      right: 0,
    },
  },
  addFolderContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
});

function App() {
  const [people, setPeople] = useState([]);

  const [folders, setFolders] = useState([
    { id: "folder1", title: "Male", items: ["item1", "item2", "item3"] },
    { id: "folder2", title: "Female", items: ["item1", "item2", "item3"] },
  ]);

  const [folderAdderOpened, setFolderAdderOpened] = useState(false);

  const [organizerOpened, setOrganizerOpened] = useState(false);

  const [folderName, setFolderName] = useState("");

  const addPersonHandler = () => {
    const fetchData = async () => {
      const response = await fetch("https://api.randomuser.me/");
      const data = await response.json();
      const results = data.results[0];
      const allResults = [...people, results];
      console.log(people);
      setPeople(allResults);
    };
    fetchData();
  };

  const organizerButtonHandler = () => {
    setOrganizerOpened(!organizerOpened);
  };

  const classes = useStyles();

  return (
    <div className="App">
      <Organizer
        opened={organizerOpened}
        setOpen={organizerButtonHandler}
        folders={folders}
        setFolders={setFolders}
        folderAdderOpened={folderAdderOpened}
        setFolderAdderOpened={setFolderAdderOpened}
        folderName={folderName}
        setFolderName={setFolderName}
        buttonStyle={classes.organizerButton}
        boxStyle={classes.organizerBox}
        addFolderStyle={classes.addFolderContainer}
      />
      <h1>Hello World</h1>
      <Button onClick={addPersonHandler} variant="contained">
        Add person
      </Button>
      <Container className={classes.cont}>
        <Grid spacing={1} justify="center" container>
          {people
            ? people.map((person) => (
                <Grid key={person.login.md5} item>
                  <Box className={classes.box}>
                    <div>{`Name: ${person.name.title} ${person.name.first} ${person.name.last}`}</div>
                    <div>{`Age: ${person.dob.age}`}</div>
                    <div>{`Email: ${person.email}`}</div>
                    <div>{`Phone Number: ${person.phone}`}</div>
                    <div>
                      <img src={person.picture.large} alt="a person" />
                    </div>
                  </Box>
                </Grid>
              ))
            : "...loading"}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
