import {
  Box,
  Button,
  InputLabel,
  Input,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { Edit, DeleteForever } from "@material-ui/icons";

export const Organizer = ({
  opened,
  setOpen,
  buttonStyle,
  boxStyle,
  folders,
  setFolders,
  folderAdderOpened,
  setFolderAdderOpened,
  addFolderStyle,
  folderName,
  setFolderName,
  folderEditInput,
  setFolderEditInput,
  editingFolders,
  setEditingFolders,
  editingFolder,
  setEditingFolder,
  folderItemsStyle,
}) => {
  const openFolderHandler = (e) => {
    setFolderAdderOpened(true);
  };

  const addFolderHandler = () => {
    if (folderName === "") {
      alert("You need to give your folder a name");
      return;
    }
    const foldersCopy = [...folders];
    const newFolder = {
      id: `folder${folders.length + 1}`,
      title: folderName,
      items: [],
    };
    const newFolders = [...foldersCopy, newFolder];
    setFolders(newFolders);
    setFolderAdderOpened(false);
    setFolderName("");
  };

  const editFolderNameHandler = (id) => {
    let currentFolder = folders.filter((folder) => folder.id === id);
    currentFolder[0].isEditing = true;
    setFolders([...folders]);

    // Just used as a checker for cancelHandler
    setEditingFolder(true);
  };

  const finalizeFolderNameHandler = (id) => {
    if (folderEditInput === "") {
      alert("You need to give the folder a name");
      return;
    } else if (folderEditInput.length > 20) {
      alert("That name is too long, it needs to be under 20 characters");
      return;
    }
    let currentFolder = folders.filter((folder) => folder.id === id);
    currentFolder[0].title = folderEditInput;
    currentFolder[0].isEditing = false;
    setFolders([...folders]);
    setFolderEditInput("");

    // Just used as a checker for cancelHandler
    setEditingFolder(false);
  };

  const cancelHandler = () => {
    if (folderEditInput === "" && editingFolders && editingFolder) {
      alert("You need to give the folder a name before canceling");
      return;
    }
    setEditingFolders(false);
    setFolderAdderOpened(false);
    setFolderName("");
  };

  const deleteFolderHandler = (id) => {
    let updatedFolders = folders.filter((folder) => folder.id !== id);
    setFolders([...updatedFolders]);
  };

  return (
    <div>
      <Box className={`${boxStyle} ${opened ? "open" : ""}`}>
        <h3>Your Folders</h3>
        {editingFolders || folderAdderOpened ? (
          <Button variant="contained" onClick={cancelHandler}>
            Cancel
          </Button>
        ) : (
          <>
            {folderAdderOpened ? (
              ""
            ) : (
              <Button variant="contained" onClick={openFolderHandler}>
                Add Folder
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() =>
                setEditingFolders(
                  folders.length !== 0 ? !editingFolders : false
                )
              }
            >
              Edit Folder
            </Button>{" "}
          </>
        )}

        {folderAdderOpened ? (
          <div className={addFolderStyle}>
            <FormControl variant="filled">
              <InputLabel htmlFor="folder-name">Folder Name</InputLabel>
              <Input
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
                name="folder-name"
                type="text"
                value={folderName}
              ></Input>
            </FormControl>
            <Button onClick={addFolderHandler}>Add</Button>
          </div>
        ) : null}
        {folders.map((folder) => (
          <div key={folder.id}>
            <h4>
              {folder.isEditing ? (
                //
                //
                <div>
                  <Input
                    onChange={(e) => setFolderEditInput(e.target.value)}
                    type="text"
                    placeholder={folder.title}
                  />
                  <Button onClick={() => finalizeFolderNameHandler(folder.id)}>
                    Set Name
                  </Button>
                </div>
              ) : (
                //
                //
                <div>
                  {folder.title}
                  {editingFolders ? (
                    <>
                      <IconButton
                        onClick={() => editFolderNameHandler(folder.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteFolderHandler(folder.id)}
                      >
                        <DeleteForever />
                      </IconButton>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                //
                //
              )}{" "}
            </h4>
            <ul className={folderItemsStyle}>
              {folder.items.map((item, index) => (
                <li key={`${folder.title}${item}${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Box>
      <Button onClick={setOpen} className={buttonStyle}>
        Your Lists
      </Button>
    </div>
  );
};
