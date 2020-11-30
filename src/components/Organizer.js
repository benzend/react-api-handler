import { Box, Button, InputLabel, Input, FormControl } from "@material-ui/core";

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
}) => {
  const openFolderHandler = (e) => {
    setFolderAdderOpened(true);
  };

  const addFolderHandler = () => {
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
            <h4>{folder.title}</h4>
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
