import { useEffect, useState } from "react";
import { Organizer } from "./components/";
import "./App.css";

import { Box, Button, Container, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    position: "relative",
    width: "300px",
    boxShadow: "3px 3px 7px gray",
    padding: 10,
    border: "1px solid #aaa",
  },
  cont: {
    marginTop: "20px",
  },
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
  menuContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 10,
  },
  menu: {
    position: "relative",
    top: "50px",
    justifyContent: "center",
  },
  menuCancelBtn: {
    position: "relative",
    top: "60px",
  },
  folderItems: {
    listStyle: "none",
  },
});

function App() {
  const [people, setPeople] = useState([]);

  const [folders, setFolders] = useState([
    {
      id: "folder1",
      title: "Example folder",
      items: ["item1", "item2", "item3"],
      isEditing: false,
    },
  ]);

  const [folderAdderOpened, setFolderAdderOpened] = useState(false);

  const [organizerOpened, setOrganizerOpened] = useState(false);

  const [folderName, setFolderName] = useState("");

  const [folderEditInput, setFolderEditInput] = useState("");

  const [editingFolders, setEditingFolders] = useState(false);

  // This is just used as a checker so cancelHandler can work correctly
  const [editingFolder, setEditingFolder] = useState(false);

  useEffect(() => {
    if (folders.length === 0) {
      setEditingFolders(false);
    }
  }, [folders]);

  const addPersonHandler = () => {
    const fetchData = async () => {
      const response = await fetch("https://api.randomuser.me/");
      const data = await response.json();
      const results = data.results[0];
      const allResults = [...people, results];
      console.log(people);
      await allResults.forEach((result) => (result.editingFolder = false));
      setPeople(allResults);
    };
    fetchData();
  };

  const organizerButtonHandler = () => {
    setOrganizerOpened(!organizerOpened);
  };

  const addToFolderHandler = (person, folderName) => {
    let folder = folders.filter((folder) => folder.title === folderName);
    folder[0].items = [
      ...folder[0].items,
      person.name.first + " " + person.name.last,
    ];
    setFolders([...folders]);
  };

  const menuOpenedHandler = (person) => {
    let updatePerson = people.filter((human) => human.id === person.id);
    updatePerson[0].editingFolder = !updatePerson[0].editingFolder;
    setPeople([...people]);
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
        folderEditInput={folderEditInput}
        setFolderEditInput={setFolderEditInput}
        buttonStyle={classes.organizerButton}
        boxStyle={classes.organizerBox}
        addFolderStyle={classes.addFolderContainer}
        editingFolders={editingFolders}
        setEditingFolders={setEditingFolders}
        editingFolder={editingFolder}
        setEditingFolder={setEditingFolder}
        folderItemsStyle={classes.folderItems}
      />
      <h1>Hello World</h1>
      <Button onClick={addPersonHandler} variant="contained">
        Add person
      </Button>
      <Container className={classes.cont}>
        <Grid spacing={1} justify="center" container>
          {people.map((person) => (
            <Grid key={person.login.md5} item>
              <Box className={classes.box}>
                <div>{`Name: ${person.name.title} ${person.name.first} ${person.name.last}`}</div>
                <div>{`Age: ${person.dob.age}`}</div>
                <div>{`Email: ${person.email}`}</div>
                <div>{`Phone Number: ${person.phone}`}</div>
                <div>
                  <img src={person.picture.large} alt="a person" />
                </div>
                <Button onClick={() => menuOpenedHandler(person)}>
                  Add to Folder
                </Button>
                {person.editingFolder ? (
                  <div className={classes.menuContainer}>
                    <Grid spacing={1} container className={classes.menu}>
                      {folders.map((folder) => (
                        <Grid key={`${folder.title}Button`} item>
                          <Button
                            onClick={() =>
                              addToFolderHandler(person, folder.title)
                            }
                            variant="contained"
                          >
                            {`${folder.title} Folder`}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                    <div className={classes.menuCancelBtn}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => menuOpenedHandler(person)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
