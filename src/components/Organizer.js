import {
  Box,
  Button,
  InputLabel,
  Input,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";

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
  editingFolder,
  setEditingFolder,
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
  };

  const finalizeFolderNameHandler = (id) => {
    let currentFolder = folders.filter((folder) => folder.id === id);
    currentFolder[0].title = folderEditInput;
    currentFolder[0].isEditing = false;
    setFolders([...folders]);
  };

  return (
    <div>
      <Box className={`${boxStyle} ${opened ? "open" : ""}`}>
        <h3>Your Folders</h3>
        {folderAdderOpened ? (
          ""
        ) : (
          <Button onClick={openFolderHandler}>Add Folder</Button>
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
                  <IconButton onClick={() => editFolderNameHandler(folder.id)}>
                    <Edit />
                  </IconButton>
                </div>
                //
                //
              )}{" "}
            </h4>
            <ul>
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
